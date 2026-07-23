-- TABLA DE PEDIDOS Y VENTAS - AHORRAYA COOP
-- Copia y ejecuta este script en tu gestor de base de datos PostgreSQL (como Supabase, Neon, o Railway)

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    date TIMESTAMPTZ NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_rut VARCHAR(50) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_address TEXT NOT NULL,
    method VARCHAR(50) NOT NULL,
    payment VARCHAR(50) NOT NULL,
    shipping_cost NUMERIC DEFAULT 0,
    total NUMERIC NOT NULL,
    status VARCHAR(100) DEFAULT 'Recibido (Pendiente de Pago)',
    items JSONB NOT NULL
);

-- Índices de velocidad de consulta para búsqueda y reportes
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(date);
