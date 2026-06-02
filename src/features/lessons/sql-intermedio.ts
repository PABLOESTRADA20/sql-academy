import { LessonCategory } from "@/types";

export const sqlIntermedio: LessonCategory = {
  slug: "sql-intermedio",
  title: "SQL Intermedio",
  description: "Consultas más complejas: combinaciones de tablas, subconsultas y vistas.",
  lessons: [
    {
      slug: "join",
      title: "JOIN",
      description: "Combina filas de dos o más tablas basándose en una columna relacionada",
      content: `Los **JOINs** permiten combinar datos de múltiples tablas en una sola consulta.

## Tipos de JOIN

### INNER JOIN
Devuelve solo las filas que tienen coincidencia en ambas tablas.

\`\`\`sql
SELECT u.nombre, p.titulo
FROM usuarios u
INNER JOIN posts p ON u.id = p.usuario_id;
\`\`\`

### LEFT JOIN
Devuelve todas las filas de la tabla izquierda y las coincidencias de la derecha.

\`\`\`sql
SELECT u.nombre, p.titulo
FROM usuarios u
LEFT JOIN posts p ON u.id = p.usuario_id;
\`\`\`

### RIGHT JOIN
Devuelve todas las filas de la tabla derecha y las coincidencias de la izquierda.

\`\`\`sql
SELECT u.nombre, p.titulo
FROM usuarios u
RIGHT JOIN posts p ON u.id = p.usuario_id;
\`\`\`

### FULL JOIN
Devuelve todas las filas cuando hay coincidencia en alguna de las tablas.

\`\`\`sql
SELECT u.nombre, p.titulo
FROM usuarios u
FULL JOIN posts p ON u.id = p.usuario_id;
\`\`\`

### CROSS JOIN
Producto cartesiano de ambas tablas.

\`\`\`sql
SELECT u.nombre, c.nombre
FROM usuarios u
CROSS JOIN colores c;
\`\`\`

## Ejemplo práctico

\`\`\`sql
SELECT 
    u.nombre,
    COUNT(p.id) as total_posts,
    COALESCE(AVG(p.likes), 0) as promedio_likes
FROM usuarios u
LEFT JOIN posts p ON u.id = p.usuario_id
GROUP BY u.id, u.nombre
ORDER BY total_posts DESC;
\`\`\``,
      syntax: `SELECT columnas
FROM tabla1
[INNER|LEFT|RIGHT|FULL] JOIN tabla2
ON tabla1.columna = tabla2.columna;`,
      examples: [
        {
          title: "INNER JOIN",
          description: "Usuarios con sus posts",
          code: "SELECT u.nombre, p.titulo, p.fecha\nFROM usuarios u\nINNER JOIN posts p ON u.id = p.usuario_id\nORDER BY p.fecha DESC;",
          result: "| nombre | titulo              | fecha      |\n|--------|---------------------|------------|\n| Ana    | SQL para principiantes | 2024-01-15 |\n| Carlos | PostgreSQL Avanzado | 2024-01-14 |\n| Ana    | Tips de optimización | 2024-01-12 |"
        },
      ],
    },
    {
      slug: "union",
      title: "UNION",
      description: "Combina resultados de múltiples consultas",
      content: `**UNION** combina el resultado de dos o más consultas SELECT en un único conjunto de resultados.

## Reglas importantes
- Mismo número de columnas en cada SELECT
- Tipos de datos compatibles
- UNION elimina duplicados
- UNION ALL incluye duplicados

\`\`\`sql
-- Clientes y proveedores como contactos
SELECT nombre, email, 'Cliente' as tipo
FROM clientes
UNION ALL
SELECT nombre, email, 'Proveedor' as tipo
FROM proveedores
ORDER BY nombre;
\`\`\``,
      syntax: `SELECT columnas FROM tabla1
UNION [ALL]
SELECT columnas FROM tabla2;`,
      examples: [
        {
          title: "UNION de clientes y proveedores",
          description: "Lista completa de contactos",
          code: "SELECT nombre, ciudad FROM clientes\nUNION\nSELECT nombre, ciudad FROM proveedores\nORDER BY nombre;",
          result: "| nombre   | ciudad    |\n|----------|-----------|\n| Ana S.A. | Madrid    |\n| Carlos   | Barcelona |\n| Laura    | Valencia  |\n| TechCorp | Madrid    |"
        },
      ],
    },
    {
      slug: "case",
      title: "CASE",
      description: "Expresiones condicionales en SQL",
      content: `**CASE** es la expresión condicional de SQL, similar a if-else en programación.

## Sintaxis

\`\`\`sql
SELECT 
    CASE 
        WHEN condición1 THEN resultado1
        WHEN condición2 THEN resultado2
        ELSE resultado_default
    END as nombre_columna
FROM tabla;
\`\`\`

## Ejemplos

\`\`\`sql
-- Clasificar precios
SELECT 
    nombre,
    precio,
    CASE 
        WHEN precio < 20 THEN 'Económico'
        WHEN precio BETWEEN 20 AND 100 THEN 'Medio'
        WHEN precio > 100 THEN 'Premium'
    END as categoria_precio
FROM productos;

-- CASE simple
SELECT 
    nombre,
    CASE estado
        WHEN 'activo' THEN 'Usuario activo'
        WHEN 'inactivo' THEN 'Usuario inactivo'
        WHEN 'bloqueado' THEN 'Usuario bloqueado'
    END as estado_descripcion
FROM usuarios;
\`\`\``,
      syntax: `CASE 
    WHEN condición THEN resultado
    [WHEN ... THEN ...]
    [ELSE resultado]
END`,
      examples: [
        {
          title: "Clasificar productos",
          description: "Categorizar productos por precio",
          code: "SELECT nombre, precio,\n    CASE \n        WHEN precio < 50 THEN 'Barato'\n        WHEN precio BETWEEN 50 AND 200 THEN 'Normal'\n        ELSE 'Caro'\n    END as rango\nFROM productos\nORDER BY precio;",
          result: "| nombre     | precio | rango |\n|------------|--------|-------|\n| USB Cable  | 19     | Barato|\n| Teclado    | 149    | Normal|\n| Laptop     | 2999   | Caro  |"
        },
      ],
    },
    {
      slug: "subconsultas",
      title: "Subconsultas",
      description: "Consultas anidadas dentro de otras consultas",
      content: `Las **subconsultas** son consultas SELECT anidadas dentro de otra consulta.

## Tipos de subconsultas

### Subconsulta escalar (devuelve un valor)
\`\`\`sql
SELECT nombre, precio
FROM productos
WHERE precio > (SELECT AVG(precio) FROM productos);
\`\`\`

### Subconsulta de fila única
\`\`\`sql
SELECT * FROM usuarios
WHERE id = (SELECT usuario_id FROM pedidos WHERE total = (SELECT MAX(total) FROM pedidos));
\`\`\`

### Subconsulta de múltiples filas
\`\`\`sql
SELECT nombre, email
FROM usuarios
WHERE id IN (SELECT usuario_id FROM pedidos WHERE total > 100);
\`\`\`

### Subconsulta correlacionada
\`\`\`sql
SELECT u.nombre, (
    SELECT COUNT(*) 
    FROM posts p 
    WHERE p.usuario_id = u.id
) as total_posts
FROM usuarios u;
\`\`\`

### EXISTS
\`\`\`sql
SELECT nombre FROM usuarios u
WHERE EXISTS (
    SELECT 1 FROM pedidos p 
    WHERE p.usuario_id = u.id AND p.total > 500
);
\`\`\``,
      syntax: `SELECT columnas
FROM tabla
WHERE columna OPERADOR (SELECT columna FROM tabla2 WHERE condición);`,
      examples: [
        {
          title: "Productos sobre promedio",
          description: "Productos más caros que el promedio",
          code: "SELECT nombre, precio\nFROM productos\nWHERE precio > (SELECT AVG(precio) FROM productos)\nORDER BY precio DESC;",
          result: "| nombre     | precio |\n|------------|--------|\n| Laptop Pro | 2999   |\n| Monitor 4K | 899    |\n| Tablet     | 499    |"
        },
      ],
    },
    {
      slug: "funciones-agregadas",
      title: "Funciones Agregadas",
      description: "Funciones que realizan cálculos sobre conjuntos de valores",
      content: `Las **funciones agregadas** realizan cálculos sobre un conjunto de valores y devuelven un único resultado.

## Funciones principales

### COUNT - Contar filas
\`\`\`sql
SELECT COUNT(*) as total FROM usuarios;
SELECT COUNT(DISTINCT ciudad) FROM usuarios;
\`\`\`

### SUM - Sumar valores
\`\`\`sql
SELECT SUM(total) as ingresos_totales FROM pedidos;
\`\`\`

### AVG - Promedio
\`\`\`sql
SELECT AVG(precio) as precio_promedio FROM productos;
\`\`\`

### MAX y MIN
\`\`\`sql
SELECT 
    MAX(precio) as mas_caro,
    MIN(precio) as mas_barato
FROM productos;
\`\`\`

## Combinando funciones

\`\`\`sql
SELECT 
    categoria,
    COUNT(*) as total,
    AVG(precio)::numeric(10,2) as promedio,
    SUM(stock) as stock_total,
    MAX(precio) as precio_maximo
FROM productos
GROUP BY categoria
ORDER BY promedio DESC;
\`\`\``,
      syntax: `SELECT función_agregada(columna)
FROM tabla
[GROUP BY columna];`,
      examples: [
        {
          title: "Estadísticas de productos",
          description: "Resumen por categoría",
          code: "SELECT categoria,\n    COUNT(*) as total,\n    AVG(precio)::numeric(10,2) as precio_promedio,\n    MAX(precio) as mas_caro\nFROM productos\nGROUP BY categoria\nORDER BY total DESC;",
          result: "| categoria    | total | precio_promedio | mas_caro |\n|--------------|-------|-----------------|----------|\n| Electrónicos | 12    | 450.50          | 2999     |\n| Ropa         | 8     | 45.30           | 120      |\n| Hogar        | 5     | 32.80           | 89       |"
        },
      ],
    },
    {
      slug: "vistas",
      title: "Vistas",
      description: "Tablas virtuales basadas en consultas SELECT",
      content: `Una **vista** (VIEW) es una tabla virtual cuyo contenido está definido por una consulta SELECT.

## Crear una vista

\`\`\`sql
CREATE VIEW usuarios_activos AS
SELECT id, nombre, email, fecha_registro
FROM usuarios
WHERE activo = true;
\`\`\`

## Usar una vista

\`\`\`sql
SELECT * FROM usuarios_activos ORDER BY fecha_registro DESC;
\`\`\`

## Vista con JOINs

\`\`\`sql
CREATE VIEW resumen_ventas AS
SELECT 
    p.nombre as producto,
    c.nombre as categoria,
    v.cantidad,
    v.total,
    v.fecha
FROM ventas v
JOIN productos p ON v.producto_id = p.id
JOIN categorias c ON p.categoria_id = c.id;
\`\`\``,
      syntax: `CREATE [OR REPLACE] VIEW nombre_vista AS
SELECT consulta;`,
      examples: [
        {
          title: "Crear vista de usuarios con posts",
          description: "Vista que combina usuarios y sus posts",
          code: "CREATE VIEW usuarios_con_posts AS\nSELECT u.id, u.nombre, COUNT(p.id) as total_posts\nFROM usuarios u\nLEFT JOIN posts p ON u.id = p.usuario_id\nGROUP BY u.id, u.nombre;\n\nSELECT * FROM usuarios_con_posts;",
          result: "| id | nombre | total_posts |\n|----|--------|-------------|\n| 1  | Ana    | 5           |\n| 2  | Carlos | 3           |\n| 3  | Laura  | 0           |"
        },
      ],
    },
  ],
};
