import { LessonCategory } from "@/types";

export const sqlAvanzado: LessonCategory = {
  slug: "sql-avanzado",
  title: "SQL Avanzado",
  description: "Técnicas avanzadas de SQL: CTEs, window functions, triggers y procedimientos.",
  lessons: [
    {
      slug: "cte",
      title: "CTE (Common Table Expressions)",
      description: "Consultas temporales con WITH para mejor legibilidad",
      content: `Las **CTE** (Common Table Expressions) permiten crear consultas auxiliares temporales usando la cláusula **WITH**.

## Sintaxis básica

\`\`\`sql
WITH nombre_cte AS (
    SELECT columna1, columna2
    FROM tabla
    WHERE condición
)
SELECT * FROM nombre_cte;
\`\`\`

## CTE Recursiva

\`\`\`sql
WITH RECURSIVE numeros AS (
    SELECT 1 as n
    UNION ALL
    SELECT n + 1 FROM numeros WHERE n < 10
)
SELECT * FROM numeros;
\`\`\`

## Múltiples CTEs

\`\`\`sql
WITH 
ventas_2024 AS (
    SELECT * FROM ventas WHERE EXTRACT(YEAR FROM fecha) = 2024
),
top_productos AS (
    SELECT producto_id, SUM(total) as total
    FROM ventas_2024
    GROUP BY producto_id
    ORDER BY total DESC
    LIMIT 5
)
SELECT p.nombre, tp.total
FROM top_productos tp
JOIN productos p ON tp.producto_id = p.id;
\`\`\`

## Ejemplo: Jerarquía de empleados

\`\`\`sql
WITH RECURSIVE jerarquia AS (
    SELECT id, nombre, gerente_id, 1 as nivel
    FROM empleados
    WHERE gerente_id IS NULL
    
    UNION ALL
    
    SELECT e.id, e.nombre, e.gerente_id, j.nivel + 1
    FROM empleados e
    JOIN jerarquia j ON e.gerente_id = j.id
)
SELECT * FROM jerarquia ORDER BY nivel, nombre;
\`\`\``,
      syntax: `WITH nombre_cte [(columna1, columna2, ...)] AS (
    consulta SELECT
)
SELECT * FROM nombre_cte;`,
      examples: [
        {
          title: "CTE simple",
          description: "Usar CTE para filtrar usuarios activos",
          code: "WITH usuarios_activos AS (\n    SELECT id, nombre, email\n    FROM usuarios\n    WHERE activo = true\n)\nSELECT * FROM usuarios_activos\nORDER BY nombre;",
          result: "| id | nombre | email             |\n|----|--------|-------------------|\n| 1  | Ana    | ana@email.com     |\n| 2  | Carlos | carlos@email.com  |"
        },
      ],
    },
    {
      slug: "window-functions",
      title: "Window Functions",
      description: "Funciones que realizan cálculos sobre un conjunto de filas relacionadas",
      content: `Las **Window Functions** realizan cálculos a través de un conjunto de filas relacionadas con la fila actual, sin agrupar los resultados.

## Sintaxis

\`\`\`sql
función_ventana() OVER (
    [PARTITION BY columna]
    [ORDER BY columna]
    [ROWS o RANGE entre frames]
)
\`\`\`

## Funciones principales

### ROW_NUMBER, RANK, DENSE_RANK

\`\`\`sql
SELECT 
    nombre,
    salario,
    ROW_NUMBER() OVER (ORDER BY salario DESC) as fila,
    RANK() OVER (ORDER BY salario DESC) as ranking,
    DENSE_RANK() OVER (ORDER BY salario DESC) as ranking_denso
FROM empleados;
\`\`\`

### LAG y LEAD

\`\`\`sql
SELECT 
    fecha,
    total,
    LAG(total) OVER (ORDER BY fecha) as dia_anterior,
    total - LAG(total) OVER (ORDER BY fecha) as diferencia
FROM ventas_diarias;
\`\`\`

### SUM, AVG con ventana

\`\`\`sql
SELECT 
    fecha,
    total,
    SUM(total) OVER (ORDER BY fecha) as acumulado,
    AVG(total) OVER (ORDER BY fecha ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as media_movil_7d
FROM ventas_diarias;
\`\`\``,
      syntax: `función() OVER (PARTITION BY columna ORDER BY columna)`,
      examples: [
        {
          title: "Ranking de empleados",
          description: "Ranking de salarios por departamento",
          code: "SELECT nombre, departamento, salario,\n    RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) as ranking\nFROM empleados\nORDER BY departamento, ranking;",
          result: "| nombre  | departamento | salario | ranking |\n|---------|-------------|---------|---------|\n| Ana     | Ventas      | 50000   | 1       |\n| Carlos  | Ventas      | 45000   | 2       |\n| María   | IT          | 60000   | 1       |\n| Pedro   | IT          | 55000   | 2       |"
        },
      ],
    },
    {
      slug: "triggers",
      title: "Triggers",
      description: "Funciones que se ejecutan automáticamente ante eventos en la base de datos",
      content: `Un **TRIGGER** es una función que se ejecuta automáticamente cuando ocurre un evento (INSERT, UPDATE, DELETE) en una tabla.

## Crear función para trigger

\`\`\`sql
CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_modificacion = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
\`\`\`

## Crear trigger

\`\`\`sql
CREATE TRIGGER trigger_actualizar_fecha
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_fecha_modificacion();
\`\`\`

## Tipos de triggers

- **BEFORE**: Se ejecuta antes de la operación
- **AFTER**: Se ejecuta después de la operación
- **INSTEAD OF**: Reemplaza la operación (solo en vistas)
- **FOR EACH ROW**: Se ejecuta por cada fila afectada
- **FOR EACH STATEMENT**: Se ejecuta una vez por sentencia

## Ejemplo: Auditoría

\`\`\`sql
CREATE TABLE auditoria_usuarios (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    accion TEXT,
    dato_anterior JSONB,
    dato_nuevo JSONB,
    fecha TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION auditar_usuarios()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO auditoria_usuarios (usuario_id, accion, dato_anterior, dato_nuevo)
    VALUES (
        COALESCE(NEW.id, OLD.id),
        TG_OP,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD)::jsonb END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auditoria
    AFTER INSERT OR UPDATE OR DELETE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION auditar_usuarios();
\`\`\``,
      syntax: `CREATE [OR REPLACE] TRIGGER nombre_trigger
{BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE}
ON nombre_tabla
[FOR EACH ROW]
EXECUTE FUNCTION nombre_funcion();`,
      examples: [
        {
          title: "Trigger de actualización",
          description: "Actualizar fecha_modificacion automáticamente",
          code: "-- Función\nCREATE OR REPLACE FUNCTION set_fecha_mod()\nRETURNS TRIGGER AS $$\nBEGIN\n    NEW.fecha_modificacion = NOW();\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\n-- Trigger\nCREATE TRIGGER trg_set_fecha\n    BEFORE UPDATE ON usuarios\n    FOR EACH ROW\n    EXECUTE FUNCTION set_fecha_mod();",
          result: "CREATE TRIGGER"
        },
      ],
    },
    {
      slug: "procedures",
      title: "Procedures",
      description: "Procedimientos almacenados con lógica de negocio",
      content: `Los **procedimientos almacenados** (PROCEDURE) son bloques de código que se ejecutan en el servidor de la base de datos.

## Crear un procedimiento

\`\`\`sql
CREATE OR REPLACE PROCEDURE transferir_fondos(
    cuenta_origen INT,
    cuenta_destino INT,
    monto DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar saldo suficiente
    IF (SELECT saldo FROM cuentas WHERE id = cuenta_origen) < monto THEN
        RAISE EXCEPTION 'Saldo insuficiente';
    END IF;
    
    -- Realizar transferencia
    UPDATE cuentas SET saldo = saldo - monto WHERE id = cuenta_origen;
    UPDATE cuentas SET saldo = saldo + monto WHERE id = cuenta_destino;
    
    -- Registrar transacción
    INSERT INTO transacciones (cuenta_origen, cuenta_destino, monto)
    VALUES (cuenta_origen, cuenta_destino, monto);
END;
$$;
\`\`\`

## Ejecutar procedimiento

\`\`\`sql
CALL transferir_fondos(1, 2, 500.00);
\`\`\`

## Diferencia con funciones

- **PROCEDURE**: No devuelve valor, usa CALL
- **FUNCTION**: Devuelve valor, se usa en SELECT
- **PROCEDURE**: Soporta transacciones internas
- **FUNCTION**: No soporta COMMIT/ROLLBACK`,
      syntax: `CREATE [OR REPLACE] PROCEDURE nombre(parámetros)
LANGUAGE plpgsql
AS $$
BEGIN
    -- lógica
END;
$$;`,
      examples: [
        {
          title: "Procedimiento de registro",
          description: "Registrar usuario con validación",
          code: "CREATE OR REPLACE PROCEDURE registrar_usuario(\n    p_nombre TEXT,\n    p_email TEXT,\n    p_edad INT\n)\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    IF EXISTS (SELECT 1 FROM usuarios WHERE email = p_email) THEN\n        RAISE EXCEPTION 'El email ya está registrado';\n    END IF;\n    \n    INSERT INTO usuarios (nombre, email, edad)\n    VALUES (p_nombre, p_email, p_edad);\nEND;\n$$;\n\nCALL registrar_usuario('Nuevo', 'nuevo@email.com', 25);",
          result: "CALL"
        },
      ],
    },
    {
      slug: "functions",
      title: "Functions",
      description: "Funciones definidas por el usuario en PostgreSQL",
      content: `Las **funciones** en PostgreSQL permiten encapsular lógica reutilizable que devuelve un valor.

## Tipos de funciones

### Función escalar
\`\`\`sql
CREATE OR REPLACE FUNCTION calcular_iva(precio DECIMAL)
RETURNS DECIMAL
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN precio * 1.21;
END;
$$;

-- Uso
SELECT nombre, precio, calcular_iva(precio) as precio_con_iva
FROM productos;
\`\`\`

### Función con tabla
\`\`\`sql
CREATE OR REPLACE FUNCTION obtener_usuarios_activos()
RETURNS TABLE(id INT, nombre TEXT, email TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.nombre, u.email
    FROM usuarios u
    WHERE u.activo = true;
END;
$$;

-- Uso
SELECT * FROM obtener_usuarios_activos();
\`\`\`

### Función con INOUT
\`\`\`sql
CREATE OR REPLACE FUNCTION intercambiar(INOUT a INT, INOUT b INT)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Intercambia valores
    SELECT b, a INTO a, b;
END;
$$;
\`\`\``,
      syntax: `CREATE [OR REPLACE] FUNCTION nombre(parámetros)
RETURNS tipo_retorno
LANGUAGE plpgsql
AS $$
BEGIN
    -- lógica
    RETURN valor;
END;
$$;`,
      examples: [
        {
          title: "Función de utilidad",
          description: "Calcular edad a partir de fecha de nacimiento",
          code: "CREATE OR REPLACE FUNCTION calcular_edad(fecha_nac DATE)\nRETURNS INT\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    RETURN EXTRACT(YEAR FROM AGE(fecha_nac))::INT;\nEND;\n$$;\n\nSELECT nombre, calcular_edad(fecha_nacimiento) as edad\nFROM usuarios;",
          result: "| nombre | edad |\n|--------|------|\n| Ana    | 28   |\n| Carlos | 35   |"
        },
      ],
    },
    {
      slug: "particiones",
      title: "Particiones",
      description: "Divide tablas grandes en partes más pequeñas y manejables",
      content: `El **particionamiento** divide una tabla grande en fragmentos más pequeños (particiones) para mejorar el rendimiento y la gestión.

## Tipos de particiones

### Partición por rango
\`\`\`sql
CREATE TABLE ventas (
    id SERIAL,
    fecha DATE NOT NULL,
    total DECIMAL NOT NULL
) PARTITION BY RANGE (fecha);

CREATE TABLE ventas_2024_q1 PARTITION OF ventas
    FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE ventas_2024_q2 PARTITION OF ventas
    FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
\`\`\`

### Partición por lista
\`\`\`sql
CREATE TABLE usuarios (
    id SERIAL,
    nombre TEXT,
    pais TEXT NOT NULL
) PARTITION BY LIST (pais);

CREATE TABLE usuarios_es PARTITION OF usuarios
    FOR VALUES IN ('España', 'México', 'Argentina');

CREATE TABLE usuarios_us PARTITION OF usuarios
    FOR VALUES IN ('USA', 'Canadá');
\`\`\`

### Partición por hash
\`\`\`sql
CREATE TABLE logs (
    id SERIAL,
    mensaje TEXT,
    nivel TEXT
) PARTITION BY HASH (id);

CREATE TABLE logs_0 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE logs_1 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE logs_2 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE logs_3 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 3);
\`\`\`

## Ventajas

- Mejor rendimiento en consultas con filtros por clave de partición
- Mantenimiento más fácil (purgar particiones antiguas)
- Carga paralela de datos`,
      syntax: `CREATE TABLE nombre (
    columnas
) PARTITION BY {RANGE | LIST | HASH} (columna);

CREATE TABLE particion PARTITION OF nombre
    FOR VALUES FROM (inicio) TO (fin);`,
      examples: [
        {
          title: "Partición por fecha",
          description: "Ventas particionadas por trimestre",
          code: "CREATE TABLE ventas_2024 (\n    id SERIAL,\n    fecha DATE,\n    total DECIMAL\n) PARTITION BY RANGE (fecha);\n\nCREATE TABLE ventas_q1 PARTITION OF ventas_2024\n    FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');\n\nINSERT INTO ventas_2024 (fecha, total)\nVALUES ('2024-02-15', 1500);\n\nSELECT * FROM ventas_q1;",
          result: "| id | fecha      | total |\n|----|------------|-------|\n| 1  | 2024-02-15 | 1500  |"
        },
      ],
    },
  ],
};
