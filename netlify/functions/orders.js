const { Client } = require('pg');

// Helper to construct response with proper CORS headers
const createResponse = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
};

exports.handler = async (event, context) => {
    // Handle CORS preflight options request
    if (event.httpMethod === 'OPTIONS') {
        return createResponse(200, { message: 'CORS Preflight OK' });
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error('❌ DATABASE_URL environment variable is missing.');
        return createResponse(500, { 
            error: 'Database connection string not configured.',
            code: 'DB_URL_MISSING'
        });
    }

    const client = new Client({
        connectionString: dbUrl,
        ssl: {
            rejectUnauthorized: false // Required for hosted services like Neon/Supabase over HTTPS
        }
    });

    try {
        await client.connect();
    } catch (err) {
        console.error('❌ Failed to connect to PostgreSQL:', err);
        return createResponse(500, { 
            error: 'Failed to establish database connection.',
            code: 'DB_CONNECTION_FAILED' 
        });
    }

    try {
        // --- GET METHOD (Read Orders) ---
        if (event.httpMethod === 'GET') {
            const queryParams = event.queryStringParameters || {};
            const orderId = queryParams.id;

            if (orderId) {
                // Fetch single order (Tracking lookup)
                const queryText = 'SELECT * FROM orders WHERE UPPER(id) = UPPER($1)';
                const res = await client.query(queryText, [orderId]);
                
                if (res.rows.length === 0) {
                    return createResponse(404, { error: 'Order not found' });
                }
                
                const dbOrder = res.rows[0];
                const formattedOrder = {
                    id: dbOrder.id,
                    date: dbOrder.date,
                    customer: {
                        name: dbOrder.customer_name,
                        rut: dbOrder.customer_rut,
                        phone: dbOrder.customer_phone,
                        email: dbOrder.customer_email,
                        address: dbOrder.customer_address
                    },
                    method: dbOrder.method,
                    payment: dbOrder.payment,
                    shippingCost: Number(dbOrder.shipping_cost),
                    total: Number(dbOrder.total),
                    status: dbOrder.status,
                    items: dbOrder.items
                };
                
                return createResponse(200, formattedOrder);
            } else {
                // Fetch all orders (Admin views dashboard)
                const queryText = 'SELECT * FROM orders ORDER BY date DESC';
                const res = await client.query(queryText);
                
                const formattedOrders = res.rows.map(dbOrder => ({
                    id: dbOrder.id,
                    date: dbOrder.date,
                    customer: {
                        name: dbOrder.customer_name,
                        rut: dbOrder.customer_rut,
                        phone: dbOrder.customer_phone,
                        email: dbOrder.customer_email,
                        address: dbOrder.customer_address
                    },
                    method: dbOrder.method,
                    payment: dbOrder.payment,
                    shippingCost: Number(dbOrder.shipping_cost),
                    total: Number(dbOrder.total),
                    status: dbOrder.status,
                    items: dbOrder.items
                }));
                
                return createResponse(200, formattedOrders);
            }
        } 
        
        // --- POST METHOD (Create Order) ---
        else if (event.httpMethod === 'POST') {
            let body;
            try {
                body = JSON.parse(event.body);
            } catch (e) {
                return createResponse(400, { error: 'Invalid JSON request body' });
            }

            const { id, date, customer, method, payment, shippingCost, items, total, status } = body;

            if (!id || !customer || !items || !total) {
                return createResponse(400, { error: 'Missing mandatory order fields' });
            }

            const insertText = `
                INSERT INTO orders (
                    id, date, customer_name, customer_rut, customer_phone, 
                    customer_email, customer_address, method, payment, 
                    shipping_cost, total, status, items
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                RETURNING id
            `;

            const values = [
                id,
                date || new Date().toISOString(),
                customer.name,
                customer.rut,
                customer.phone,
                customer.email,
                customer.address,
                method,
                payment,
                shippingCost || 0,
                total,
                status || 'Recibido (Pendiente de Pago)',
                JSON.stringify(items)
            ];

            await client.query(insertText, values);
            return createResponse(201, { success: true, orderId: id });
        } 
        
        // Unsupported HTTP methods
        else {
            return createResponse(405, { error: 'Method Not Allowed' });
        }
    } catch (err) {
        console.error('❌ Database query execution error:', err);
        return createResponse(500, { 
            error: 'Failed to query database', 
            details: err.message 
        });
    } finally {
        await client.end();
    }
};
