-- TABLA DE PEDIDOS Y VENTAS - AHORRAYA COOP
-- Copia y ejecuta este script en tu gestor de base de datos PostgreSQL (como Supabase, Neon, o Railway)

-- 1. CREACIÓN DEL ESQUEMA PERSONALIZADO SECURE_STORE
CREATE SCHEMA IF NOT EXISTS secure_store;

-- 2. CREACIÓN DE LA TABLA EN EL NUEVO ESQUEMA
CREATE TABLE IF NOT EXISTS secure_store.orders (
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

-- 3. ÍNDICES DE VELOCIDAD DE CONSULTA Y EVALUACIÓN DE POLÍTICAS RLS
CREATE INDEX IF NOT EXISTS idx_orders_status ON secure_store.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_date ON secure_store.orders(date);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON secure_store.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_id_upper ON secure_store.orders(UPPER(id));

-- 4. HABILITACIÓN DE SEGURIDAD A NIVEL DE FILA (RLS)
ALTER TABLE secure_store.orders ENABLE ROW LEVEL SECURITY;

-- 5. POLÍTICAS DE ACCESO RLS

-- A. Acceso completo para Ejecutivos / Administradores
DROP POLICY IF EXISTS admin_all_policy ON secure_store.orders;
CREATE POLICY admin_all_policy ON secure_store.orders
    FOR ALL
    USING (current_setting('app.current_user_role', true) = 'admin')
    WITH CHECK (current_setting('app.current_user_role', true) = 'admin');

-- B. Búsqueda de Pedidos Anónima (Seguimiento / Tracking)
-- Un cliente anónimo solo puede buscar por ID si coincide con el ID guardado en el contexto de sesión
DROP POLICY IF EXISTS anonymous_select_policy ON secure_store.orders;
CREATE POLICY anonymous_select_policy ON secure_store.orders
    FOR SELECT
    USING (
        current_setting('app.current_user_role', true) = 'anonymous' 
        AND UPPER(id) = UPPER(current_setting('app.current_order_id', true))
    );

-- C. Creación de Órdenes (Clientes finales)
-- Permite que los clientes registren pedidos (operación POST en el checkout)
DROP POLICY IF EXISTS customer_insert_policy ON secure_store.orders;
CREATE POLICY customer_insert_policy ON secure_store.orders
    FOR INSERT
    WITH CHECK (true);
