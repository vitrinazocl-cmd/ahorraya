const https = require('https');
const crypto = require('crypto');
const { Client } = require('pg');

// Environment variables or fallback credentials for Getnet Chile Web Checkout
const GETNET_LOGIN = process.env.GETNET_LOGIN || 'b2a0c8d1e2f34567890abcdef1234567';
const GETNET_SECRET_KEY = process.env.GETNET_SECRET_KEY || '1234567890abcdef1234567890abcdef';

const SANDBOX_HOST = 'checkout.test.getnet.cl';
const PRODUCTION_HOST = 'checkout.getnet.cl';

// Generate WS-Security tranKey authentication header for Getnet
function generateGetnetAuth(login, secretKey) {
    const seed = new Date().toISOString();
    const rawNonce = crypto.randomBytes(16);
    const nonceBase64 = rawNonce.toString('base64');
    
    // tranKey = Base64( SHA-256( rawNonce + seed + secretKey ) )
    const hash = crypto.createHash('sha256');
    hash.update(rawNonce);
    hash.update(seed);
    hash.update(secretKey);
    const tranKey = hash.digest('base64');

    return {
        login: login,
        tranKey: tranKey,
        nonce: nonceBase64,
        seed: seed
    };
}

// HTTPS helper to make request to Getnet PlacetoPay REST API
function requestGetnet(method, path, body, isProduction) {
    return new Promise((resolve, reject) => {
        const hostname = isProduction ? PRODUCTION_HOST : SANDBOX_HOST;
        const options = {
            hostname,
            port: 443,
            path,
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (e) {
                    resolve({ error: 'Failed to parse JSON response', raw: data });
                }
            });
        });

        req.on('error', (err) => { reject(err); });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

// Database helper (optional PostgreSQL order status update)
async function updateOrderStatusInDB(orderId, status) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) return;
    const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
    try {
        await client.connect();
        await client.query('BEGIN');
        await client.query("SELECT set_config('app.current_user_role', 'admin', true)");
        await client.query("UPDATE secure_store.orders SET status = $1 WHERE id = $2", [status, orderId]);
        await client.query('COMMIT');
    } catch (e) {
        console.error(`Failed to update DB status for ${orderId}:`, e);
    } finally {
        await client.end();
    }
}

// Netlify Handler
exports.handler = async (event, context) => {
    const isProduction = process.env.GETNET_ENV === 'production';
    const login = process.env.GETNET_LOGIN || GETNET_LOGIN;
    const secretKey = process.env.GETNET_SECRET_KEY || GETNET_SECRET_KEY;

    const protocol = event.headers['x-forwarded-proto'] || 'https';
    const host = event.headers.host;
    const baseUrl = `${protocol}://${host}`;

    // 1. RETURN CALLBACK URL FROM GETNET
    if (event.httpMethod === 'GET' && event.queryStringParameters && event.queryStringParameters.action === 'return') {
        const orderId = event.queryStringParameters.orderId || 'Desconocido';
        const requestId = event.queryStringParameters.requestId;

        let redirectUrl = `${baseUrl}/checkout-success.html?orderId=${orderId}&status=error`;

        try {
            if (requestId) {
                const auth = generateGetnetAuth(login, secretKey);
                const statusRes = await requestGetnet('POST', `/api/session/${requestId}`, { auth }, isProduction);

                if (statusRes.status && statusRes.status.status === 'APPROVED') {
                    await updateOrderStatusInDB(orderId, 'Pagado (Getnet Web Checkout)');
                    const amountVal = statusRes.payment?.[0]?.amount?.total?.value || '';
                    redirectUrl = `${baseUrl}/checkout-success.html?orderId=${orderId}&status=success&method=Getnet&amount=${amountVal}`;
                } else if (statusRes.status && (statusRes.status.status === 'REJECTED' || statusRes.status.status === 'FAILED')) {
                    await updateOrderStatusInDB(orderId, 'Pago Rechazado (Getnet)');
                    redirectUrl = `${baseUrl}/checkout-success.html?orderId=${orderId}&status=failure&method=Getnet`;
                } else {
                    await updateOrderStatusInDB(orderId, 'Pago Cancelado (Getnet)');
                    redirectUrl = `${baseUrl}/checkout-success.html?orderId=${orderId}&status=aborted&method=Getnet`;
                }
            }
        } catch (err) {
            console.error('Error handling Getnet return:', err);
        }

        return {
            statusCode: 302,
            headers: { 'Location': redirectUrl, 'Cache-Control': 'no-cache' },
            body: ''
        };
    }

    // 2. CREATE TRANSACTION API SESSION
    if (event.httpMethod === 'POST') {
        try {
            const body = JSON.parse(event.body || '{}');
            const { orderId, amount, customer } = body;

            if (!orderId || !amount) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Faltan parámetros requeridos (orderId, amount)' })
                };
            }

            const auth = generateGetnetAuth(login, secretKey);
            const expiration = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 mins

            const payload = {
                auth,
                locale: 'es_CL',
                payment: {
                    reference: String(orderId),
                    description: `Compra AhorraYa! Mayorista - Orden ${orderId}`,
                    amount: {
                        currency: 'CLP',
                        total: Math.round(amount)
                    }
                },
                expiration,
                returnUrl: `${baseUrl}/.netlify/functions/getnet?action=return&orderId=${encodeURIComponent(orderId)}`,
                ipAddress: event.headers['client-ip'] || '127.0.0.1',
                userAgent: event.headers['user-agent'] || 'AhorraYaWeb'
            };

            if (customer && customer.email) {
                payload.buyer = {
                    name: customer.name || 'Cliente',
                    surname: '',
                    email: customer.email,
                    mobile: customer.phone || ''
                };
            }

            const getnetRes = await requestGetnet('POST', '/api/session', payload, isProduction);

            if (getnetRes.processUrl) {
                const reqId = getnetRes.requestId || '';
                return {
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        processUrl: getnetRes.processUrl,
                        requestId: reqId,
                        status: getnetRes.status
                    })
                };
            } else {
                return {
                    statusCode: 500,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        error: 'No se pudo generar la sesión de Web Checkout Getnet',
                        details: getnetRes
                    })
                };
            }
        } catch (err) {
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: err.message })
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
    };
};
