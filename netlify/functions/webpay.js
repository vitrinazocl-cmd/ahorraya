const https = require('https');
const { Client } = require('pg');

// Transbank Webpay Plus Integration Credentials (default for sandbox/testing)
const SANDBOX_COMMERCE_CODE = '597055555532';
const SANDBOX_API_KEY = '579B532A7440BB0C9079DED94D31EA1615B1C2B88DF7C5C254D0DE07C4F3C7B2';
const SANDBOX_HOST = 'webpay3gint.transbank.cl';

const PRODUCTION_HOST = 'webpay3g.transbank.cl';

// Helper to make request to Transbank REST API
function requestTransbank(method, path, body, commerceCode, apiKey, isProduction) {
    return new Promise((resolve, reject) => {
        const hostname = isProduction ? PRODUCTION_HOST : SANDBOX_HOST;
        const options = {
            hostname,
            port: 443,
            path,
            method,
            headers: {
                'Tbk-Api-Key-Id': commerceCode,
                'Tbk-Api-Key-Secret': apiKey,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (e) {
                    resolve({ error: 'Failed to parse JSON response', raw: data });
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

// Helper to update order status in PostgreSQL database
async function updateOrderStatus(orderId, status) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error('❌ DATABASE_URL missing for order update.');
        return;
    }
    const client = new Client({
        connectionString: dbUrl,
        ssl: { rejectUnauthorized: false }
    });
    try {
        await client.connect();
        await client.query('BEGIN');
        await client.query("SELECT set_config('app.current_user_role', 'admin', true)");
        await client.query(
            "UPDATE secure_store.orders SET status = $1 WHERE id = $2",
            [status, orderId]
        );
        await client.query('COMMIT');
        console.log(`✅ Order ${orderId} status updated to ${status} in PostgreSQL.`);
    } catch (e) {
        console.error(`❌ Failed to update status of order ${orderId} in DB:`, e);
        try {
            await client.query('ROLLBACK');
        } catch (_) {}
    } finally {
        await client.end();
    }
}

// Main handler
exports.handler = async (event, context) => {
    // 1. DETERMINE SYSTEM CONFIGURATION (Production vs Integration credentials)
    const isProduction = !!process.env.WEBPAY_API_KEY;
    const commerceCode = process.env.WEBPAY_COMMERCE_CODE || SANDBOX_COMMERCE_CODE;
    const apiKey = process.env.WEBPAY_API_KEY || SANDBOX_API_KEY;

    const protocol = event.headers['x-forwarded-proto'] || 'https';
    const host = event.headers.host;
    const baseUrl = `${protocol}://${host}`;

    // 2. TRANSACTION CALLBACK RETURN PATH (Transbank redirects user back here)
    if (event.httpMethod === 'GET' && event.queryStringParameters && event.queryStringParameters.action === 'return') {
        const token = event.queryStringParameters.token_ws;
        const tbkToken = event.queryStringParameters.tbk_token;
        
        let orderId = 'Unknown';
        let redirectUrl = `${baseUrl}/checkout-success.html?status=error`;

        try {
            // CASE A: User completed the checkout or payment failed
            if (token) {
                // Call Transbank Commit endpoint
                const commitRes = await requestTransbank(
                    'PUT',
                    `/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
                    null,
                    commerceCode,
                    apiKey,
                    isProduction
                );

                orderId = commitRes.buy_order || 'Unknown';
                
                // Transbank code 0 = Approved
                if (commitRes.status === 'AUTHORIZED' && commitRes.response_code === 0) {
                    await updateOrderStatus(orderId, 'Pagado (WebPay)');
                    redirectUrl = `${baseUrl}/checkout-success.html?orderId=${orderId}&status=success&amount=${commitRes.amount}`;
                } else {
                    await updateOrderStatus(orderId, 'Fallo de Pago (WebPay)');
                    redirectUrl = `${baseUrl}/checkout-success.html?orderId=${orderId}&status=failure`;
                }
            } 
            // CASE B: User clicked "Volver al comercio" (aborted transaction)
            else if (tbkToken) {
                // Fetch status to retrieve order ID
                const statusRes = await requestTransbank(
                    'GET',
                    `/rswebpaytransaction/api/webpay/v1.2/transactions/${tbkToken}`,
                    null,
                    commerceCode,
                    apiKey,
                    isProduction
                );
                orderId = statusRes.buy_order || 'Unknown';
                await updateOrderStatus(orderId, 'Pago Cancelado (WebPay)');
                redirectUrl = `${baseUrl}/checkout-success.html?orderId=${orderId}&status=aborted`;
            }
        } catch (err) {
            console.error('❌ Error handling Webpay return:', err);
            redirectUrl = `${baseUrl}/checkout-success.html?orderId=${orderId}&status=error`;
        }

        // Return HTTP 302 Redirect to the frontend success/error page
        return {
            statusCode: 302,
            headers: {
                'Location': redirectUrl,
                'Cache-Control': 'no-cache'
            },
            body: ''
        };
    }

    // 3. ACTION: CREATE TRANSACTION (Called by frontend app.js)
    if (event.httpMethod === 'POST') {
        try {
            const { action, orderId, amount } = JSON.parse(event.body);

            if (action === 'create') {
                if (!orderId || !amount) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ error: 'Missing orderId or amount' })
                    };
                }

                const payload = {
                    buy_order: orderId,
                    session_id: `session_${orderId}`,
                    amount: Math.round(amount),
                    return_url: `${baseUrl}/.netlify/functions/webpay?action=return`
                };

                const transbankRes = await requestTransbank(
                    'POST',
                    '/rswebpaytransaction/api/webpay/v1.2/transactions',
                    payload,
                    commerceCode,
                    apiKey,
                    isProduction
                );

                if (transbankRes.token && transbankRes.url) {
                    return {
                        statusCode: 200,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            token: transbankRes.token,
                            url: transbankRes.url
                        })
                    };
                } else {
                    return {
                        statusCode: 500,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            error: 'Failed to initialize Webpay Plus transaction',
                            details: transbankRes
                        })
                    };
                }
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
