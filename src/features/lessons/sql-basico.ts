import { LessonCategory } from "@/types";

export const sqlBasico: LessonCategory = {
  slug: "sql-basico",
  title: "SQL Básico",
  description: "Fundamentos de SQL: consultas esenciales para trabajar con bases de datos relacionales.",
  lessons: [
    {
      slug: "select",
      title: "SELECT",
      description: "Aprende a consultar datos con la sentencia SELECT",
      content: `La sentencia **SELECT** es la instrucción fundamental de SQL. Se utiliza para consultar y recuperar datos de una o más tablas en una base de datos.

## ¿Qué es SELECT?

SELECT te permite especificar qué columnas quieres obtener de una tabla, aplicando filtros, ordenamiento y agregaciones según necesites.

## Sintaxis básica

\`\`\`sql
SELECT columna1, columna2, ...
FROM nombre_tabla;
\`\`\`

Para seleccionar todas las columnas:
\`\`\`sql
SELECT * FROM nombre_tabla;
\`\`\`

## Ejemplos prácticos

### Seleccionar columnas específicas
\`\`\`sql
SELECT nombre, email FROM usuarios;
\`\`\`

### Seleccionar con alias
\`\`\`sql
SELECT 
    nombre AS "Nombre del usuario",
    email AS "Correo electrónico"
FROM usuarios;
\`\`\`

### Seleccionar con expresiones
\`\`\`sql
SELECT 
    nombre,
    precio,
    precio * 1.21 AS "Precio con IVA"
FROM productos;
\`\`\`

### Seleccionar valores distintos
\`\`\`sql
SELECT DISTINCT ciudad FROM usuarios;
\`\`\`

## Buenas prácticas

1. Especifica siempre las columnas que necesitas, evita SELECT *
2. Usa alias descriptivos para columnas calculadas
3. Mantén la legibilidad con indentación adecuada`,
      syntax: `SELECT [DISTINCT] columna1, columna2, ...
FROM nombre_tabla
[WHERE condición]
[ORDER BY columna [ASC|DESC]]
[LIMIT n];`,
      examples: [
        {
          title: "Seleccionar usuarios",
          description: "Obtener todos los usuarios de la tabla",
          code: "SELECT id, nombre, email FROM usuarios;",
          result: "| id | nombre  | email             |\n|----|---------|-------------------|\n| 1  | Ana     | ana@email.com     |\n| 2  | Carlos  | carlos@email.com  |\n| 3  | María   | maria@email.com   |"
        },
      ],
    },
    {
      slug: "insert",
      title: "INSERT",
      description: "Aprende a insertar nuevos registros en una tabla",
      content: `La sentencia **INSERT** permite agregar nuevas filas de datos a una tabla de la base de datos.

## Sintaxis básica

\`\`\`sql
INSERT INTO nombre_tabla (columna1, columna2, ...)
VALUES (valor1, valor2, ...);
\`\`\`

## Insertar múltiples registros

\`\`\`sql
INSERT INTO usuarios (nombre, email)
VALUES 
    ('Ana', 'ana@email.com'),
    ('Carlos', 'carlos@email.com'),
    ('María', 'maria@email.com');
\`\`\`

## Insertar con RETURNING

PostgreSQL permite devolver los valores insertados:

\`\`\`sql
INSERT INTO usuarios (nombre, email)
VALUES ('Pedro', 'pedro@email.com')
RETURNING *;
\`\`\`

## Buenas prácticas

1. Siempre especifica las columnas
2. Valida los datos antes de insertar
3. Usa transacciones para inserciones múltiples`,
      syntax: `INSERT INTO nombre_tabla (columna1, columna2, ...)
VALUES (valor1, valor2, ...)
[RETURNING *|expresión];`,
      examples: [
        {
          title: "Insertar un usuario",
          description: "Agregar un nuevo usuario a la tabla",
          code: "INSERT INTO usuarios (nombre, email, edad)\nVALUES ('Laura', 'laura@email.com', 28);",
          result: "INSERT 0 1"
        },
      ],
    },
    {
      slug: "update",
      title: "UPDATE",
      description: "Aprende a modificar registros existentes",
      content: `La sentencia **UPDATE** modifica los valores de una o más columnas en registros existentes.

## Sintaxis básica

\`\`\`sql
UPDATE nombre_tabla
SET columna1 = valor1, columna2 = valor2
WHERE condición;
\`\`\`

## Importante

Siempre usa la cláusula **WHERE** para especificar qué registros actualizar. Sin WHERE, se actualizarán TODOS los registros.

## Ejemplos

\`\`\`sql
-- Actualizar email de un usuario específico
UPDATE usuarios
SET email = 'nuevo@email.com'
WHERE id = 1;

-- Actualizar múltiples columnas
UPDATE productos
SET precio = 29.99, stock = stock - 1
WHERE id = 100;
\`\`\``,
      syntax: `UPDATE nombre_tabla
SET columna1 = valor1, columna2 = valor2, ...
WHERE condición;`,
      examples: [
        {
          title: "Actualizar usuario",
          description: "Modificar el email de un usuario",
          code: "UPDATE usuarios\nSET email = 'ana.nuevo@email.com'\nWHERE id = 1\nRETURNING *;",
          result: "| id | nombre | email                |\n|----|--------|----------------------|\n| 1  | Ana    | ana.nuevo@email.com  |"
        },
      ],
    },
    {
      slug: "delete",
      title: "DELETE",
      description: "Aprende a eliminar registros de una tabla",
      content: `La sentencia **DELETE** elimina una o más filas de una tabla.

## Sintaxis básica

\`\`\`sql
DELETE FROM nombre_tabla
WHERE condición;
\`\`\`

## Advertencia

Sin la cláusula WHERE, se eliminarán TODOS los registros de la tabla.

## DELETE vs TRUNCATE

- **DELETE**: Elimina filas una por una, permite WHERE, mantiene la estructura
- **TRUNCATE**: Elimina todas las filas rápidamente, no permite WHERE

\`\`\`sql
-- Eliminar un usuario específico
DELETE FROM usuarios WHERE id = 1;

-- Eliminar todos los usuarios inactivos
DELETE FROM usuarios WHERE activo = false;

-- Vaciar la tabla (más rápido que DELETE sin WHERE)
TRUNCATE TABLE usuarios;
\`\`\``,
      syntax: `DELETE FROM nombre_tabla
WHERE condición
[RETURNING *];`,
      examples: [
        {
          title: "Eliminar usuario",
          description: "Eliminar un usuario por ID",
          code: "DELETE FROM usuarios\nWHERE id = 3\nRETURNING id, nombre;",
          result: "| id | nombre |\n|----|--------|\n| 3  | María  |"
        },
      ],
    },
    {
      slug: "where",
      title: "WHERE",
      description: "Filtra registros con condiciones específicas",
      content: `La cláusula **WHERE** filtra registros que cumplen una condición específica.

## Operadores de comparación

| Operador | Descripción     |
|----------|-----------------|
| =        | Igual a         |
| <> o !=  | Diferente de    |
| >        | Mayor que       |
| <        | Menor que       |
| >=       | Mayor o igual   |
| <=       | Menor o igual   |

## Operadores lógicos

- **AND**: Todas las condiciones deben ser verdaderas
- **OR**: Al menos una condición debe ser verdadera
- **NOT**: Invierte el resultado

## Ejemplos

\`\`\`sql
-- Usuarios mayores de 25 años
SELECT * FROM usuarios WHERE edad > 25;

-- Usuarios de ciudad específica con edad
SELECT * FROM usuarios 
WHERE ciudad = 'Madrid' AND edad >= 18;

-- Productos con precio entre 10 y 50
SELECT * FROM productos
WHERE precio BETWEEN 10 AND 50;

-- Usuarios con email de dominio específico
SELECT * FROM usuarios
WHERE email LIKE '%@gmail.com';

-- Usuarios en múltiples ciudades
SELECT * FROM usuarios
WHERE ciudad IN ('Madrid', 'Barcelona', 'Valencia');
\`\`\``,
      syntax: `SELECT columnas
FROM tabla
WHERE condición
[AND | OR | NOT] condición;`,
      examples: [
        {
          title: "Filtrar usuarios",
          description: "Usuarios mayores de edad de Madrid",
          code: "SELECT nombre, edad, ciudad\nFROM usuarios\nWHERE edad >= 18\nAND ciudad = 'Madrid';",
          result: "| nombre | edad | ciudad |\n|--------|------|--------|\n| Carlos | 32   | Madrid |\n| Laura  | 28   | Madrid |"
        },
      ],
    },
    {
      slug: "order-by",
      title: "ORDER BY",
      description: "Ordena los resultados de una consulta",
      content: `**ORDER BY** ordena los resultados de una consulta en orden ascendente (ASC) o descendente (DESC).

## Sintaxis

\`\`\`sql
SELECT columnas
FROM tabla
ORDER BY columna1 [ASC|DESC], columna2 [ASC|DESC];
\`\`\`

## Ejemplos

\`\`\`sql
-- Orden ascendente (por defecto)
SELECT nombre, precio FROM productos ORDER BY precio;

-- Orden descendente
SELECT nombre, precio FROM productos ORDER BY precio DESC;

-- Múltiples columnas
SELECT nombre, precio, stock 
FROM productos 
ORDER BY stock DESC, precio ASC;

-- Ordenar por alias
SELECT nombre, precio * 1.21 AS precio_iva
FROM productos
ORDER BY precio_iva DESC;
\`\`\``,
      syntax: `SELECT columnas
FROM tabla
ORDER BY columna [ASC|DESC] [, columna2 [ASC|DESC]];`,
      examples: [
        {
          title: "Ordenar productos",
          description: "Productos ordenados por precio descendente",
          code: "SELECT nombre, precio\nFROM productos\nORDER BY precio DESC\nLIMIT 5;",
          result: "| nombre        | precio |\n|---------------|--------|\n| Laptop Pro    | 2999   |\n| Monitor 4K    | 899    |\n| Teclado RGB   | 149    |\n| Mouse Pad     | 39     |\n| USB Cable     | 19     |"
        },
      ],
    },
    {
      slug: "group-by",
      title: "GROUP BY",
      description: "Agrupa filas que comparten valores",
      content: `**GROUP BY** agrupa filas que tienen los mismos valores en columnas específicas, permitiendo aplicar funciones de agregación.

## Sintaxis

\`\`\`sql
SELECT columna, función_agregada(columna)
FROM tabla
GROUP BY columna;
\`\`\`

## Ejemplos

\`\`\`sql
-- Contar usuarios por ciudad
SELECT ciudad, COUNT(*) as total
FROM usuarios
GROUP BY ciudad;

-- Precio promedio por categoría
SELECT categoria, AVG(precio) as precio_promedio
FROM productos
GROUP BY categoria;

-- Total de ventas por producto
SELECT producto_id, SUM(cantidad) as total_vendido
FROM ventas
GROUP BY producto_id;
\`\`\``,
      syntax: `SELECT columna_agrupada, función_agregada(...)
FROM tabla
GROUP BY columna_agrupada;`,
      examples: [
        {
          title: "Agrupar por ciudad",
          description: "Contar usuarios en cada ciudad",
          code: "SELECT ciudad, COUNT(*) as total_usuarios\nFROM usuarios\nGROUP BY ciudad\nORDER BY total_usuarios DESC;",
          result: "| ciudad    | total_usuarios |\n|-----------|----------------|\n| Madrid    | 15             |\n| Barcelona | 12             |\n| Valencia  | 8              |\n| Sevilla   | 5              |"
        },
      ],
    },
    {
      slug: "having",
      title: "HAVING",
      description: "Filtra grupos después de GROUP BY",
      content: `**HAVING** es similar a WHERE, pero se usa para filtrar grupos creados por GROUP BY.

## Diferencia clave

- **WHERE**: Filtra filas ANTES de la agrupación
- **HAVING**: Filtra grupos DESPUÉS de la agrupación

## Sintaxis

\`\`\`sql
SELECT columna, función_agregada(columna)
FROM tabla
GROUP BY columna
HAVING condición_agregada;
\`\`\`

## Ejemplos

\`\`\`sql
-- Ciudades con más de 10 usuarios
SELECT ciudad, COUNT(*) as total
FROM usuarios
GROUP BY ciudad
HAVING COUNT(*) > 10;

-- Categorías con precio promedio mayor a 50
SELECT categoria, AVG(precio) as promedio
FROM productos
GROUP BY categoria
HAVING AVG(precio) > 50;

-- Productos con más de 100 ventas
SELECT producto_id, SUM(cantidad) as total
FROM ventas
GROUP BY producto_id
HAVING SUM(cantidad) > 100;
\`\`\``,
      syntax: `SELECT columna, función_agregada(...)
FROM tabla
GROUP BY columna
HAVING condición;`,
      examples: [
        {
          title: "Filtrar grupos",
          description: "Categorías con más de 3 productos",
          code: "SELECT categoria, COUNT(*) as total_productos\nFROM productos\nGROUP BY categoria\nHAVING COUNT(*) > 3\nORDER BY total_productos DESC;",
          result: "| categoria | total_productos |\n|-----------|----------------|\n| Electrónicos | 12          |\n| Ropa       | 8              |\n| Hogar      | 5              |"
        },
      ],
    },
    {
      slug: "limit",
      title: "LIMIT",
      description: "Limita el número de resultados",
      content: `**LIMIT** restringe el número de filas devueltas por una consulta. Es especialmente útil con ORDER BY.

## Sintaxis

\`\`\`sql
SELECT columnas
FROM tabla
LIMIT n [OFFSET m];
\`\`\`

- **LIMIT n**: Devuelve solo n filas
- **OFFSET m**: Salta las primeras m filas

## Ejemplos

\`\`\`sql
-- Los 5 productos más caros
SELECT nombre, precio
FROM productos
ORDER BY precio DESC
LIMIT 5;

-- Los siguientes 10 (paginación)
SELECT * FROM usuarios
ORDER BY id
LIMIT 10 OFFSET 10;

-- Los 3 usuarios más jóvenes
SELECT nombre, edad
FROM usuarios
ORDER BY edad ASC
LIMIT 3;
\`\`\``,
      syntax: `SELECT columnas
FROM tabla
[ORDER BY columna]
LIMIT n [OFFSET m];`,
      examples: [
        {
          title: "Top productos",
          description: "Los 3 productos más caros",
          code: "SELECT nombre, precio\nFROM productos\nORDER BY precio DESC\nLIMIT 3;",
          result: "| nombre      | precio |\n|-------------|--------|\n| Laptop Pro  | 2999   |\n| Monitor 4K  | 899    |\n| Tablet      | 499    |"
        },
      ],
    },
  ],
};
