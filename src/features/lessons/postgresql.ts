import { LessonCategory } from "@/types";

export const postgresqlLessons: LessonCategory = {
  slug: "postgresql",
  title: "PostgreSQL",
  description: "Características específicas de PostgreSQL: arquitectura, índices, JSONB, replicación.",
  lessons: [
    {
      slug: "arquitectura",
      title: "Arquitectura",
      description: "Entiende cómo funciona PostgreSQL internamente",
      content: `## Arquitectura de PostgreSQL

PostgreSQL utiliza una arquitectura **cliente-servidor** con un modelo de procesos.

### Componentes principales

\`\`\`
┌─────────────────────────────────┐
│          PostgreSQL             │
│  ┌───────────────────────────┐  │
│  │    Shared Memory          │  │
│  │  ┌─────┐ ┌─────┐ ┌────┐  │  │
│  │  │Shared│ │WAL  │ │CLOG│  │  │
│  │  │Buffer│ │Buffer│ │    │  │  │
│  │  └─────┘ └─────┘ └────┘  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │    Background Processes   │  │
│  │  ┌────┐ ┌────┐ ┌────────┐│  │
│  │  │WAL │ │Auto│ │Check-  ││  │
│  │  │Writer│ │Vaccum│ │pointer││  │
│  │  └────┘ └────┘ └────────┘│  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
\`\`\`

### Ciclo de vida de una consulta

1. **Parser**: Analiza sintaxis SQL
2. **Analyzer**: Valida semántica y permisos
3. **Rewriter**: Optimiza reglas y vistas
4. **Planner**: Genera plan de ejecución
5. **Executor**: Ejecuta el plan
6. **Writer**: Escribe resultados

### Archivos importantes

- **postgresql.conf**: Configuración principal
- **pg_hba.conf**: Autenticación de clientes
- **pg_ident.conf**: Mapeo de usuarios`,
      syntax: `-- Ver configuración actual
SHOW ALL;

-- Ver procesos activos
SELECT * FROM pg_stat_activity;

-- Ver tamaño de base de datos
SELECT pg_size_pretty(pg_database_size('mi_bd'));`,
      examples: [
        {
          title: "Monitorear actividad",
          description: "Consultar procesos activos en PostgreSQL",
          code: "SELECT pid, usename, application_name, state, query\nFROM pg_stat_activity\nWHERE state != 'idle'\nORDER BY query_start DESC;",
          result: "| pid  | usename  | application_name | state  | query                            |\n|------|----------|-----------------|--------|----------------------------------|\n| 1234 | postgres | psql            | active | SELECT * FROM pg_stat_activity   |\n| 1235 | ana      | DataGrip        | active | SELECT * FROM usuarios           |"
        },
      ],
    },
    {
      slug: "roles",
      title: "Roles",
      description: "Gestión de roles y permisos en PostgreSQL",
      content: `Los **roles** en PostgreSQL pueden representar usuarios o grupos.

## Crear roles

\`\`\`sql
-- Rol de login
CREATE ROLE usuario_con_login LOGIN PASSWORD 'contraseña';

-- Rol sin login (para grupos)
CREATE ROLE grupo_lectura;

-- Rol con privilegios
CREATE ROLE admin SUPERUSER CREATEDB CREATEROLE;
\`\`\`

## Gestionar roles

\`\`\`sql
-- Modificar rol
ALTER ROLE usuario_con_login PASSWORD 'nueva_contraseña';

-- Eliminar rol
DROP ROLE usuario_con_login;

-- Ver roles
SELECT rolname, rolsuper, rolcreatedb, rolcanlogin
FROM pg_roles;
\`\`\`

## Privilegios

\`\`\`sql
-- Conceder permisos
GRANT SELECT ON todos_los_usuarios TO grupo_lectura;
GRANT INSERT, UPDATE ON usuarios TO grupo_escritura;

-- Revocar permisos
REVOKE DELETE ON usuarios FROM grupo_escritura;

-- Conceder membresía
GRANT grupo_lectura TO usuario_con_login;
\`\`\``,
      syntax: `CREATE ROLE nombre [LOGIN] [SUPERUSER] [CREATEDB] [PASSWORD '...'];`,
      examples: [
        {
          title: "Crear y configurar rol",
          description: "Rol de solo lectura para analistas",
          code: "CREATE ROLE analista LOGIN PASSWORD 'analista123';\nGRANT CONNECT ON DATABASE mi_bd TO analista;\nGRANT USAGE ON SCHEMA public TO analista;\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO analista;\nALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO analista;",
          result: "CREATE ROLE\nGRANT\nGRANT\nGRANT\nALTER DEFAULT PRIVILEGES"
        },
      ],
    },
    {
      slug: "usuarios",
      title: "Usuarios",
      description: "Gestión de usuarios y autenticación",
      content: `Los **usuarios** son roles con capacidad de iniciar sesión.

## Crear usuarios

\`\`\`sql
CREATE USER ana WITH PASSWORD 'contraseña_segura';
-- CREATE USER es equivalente a CREATE ROLE con LOGIN
\`\`\`

## Configurar autenticación

Editando **pg_hba.conf**:

\`\`\`
# TYPE  DATABASE  USER    ADDRESS       METHOD
local   all       all                    peer
host    all       all     127.0.0.1/32   scram-sha-256
host    all       all     ::1/128        scram-sha-256
\`\`\`

## Métodos de autenticación

- **trust**: Sin contraseña
- **password**: Contraseña en texto plano
- **md5**: Contraseña cifrada con MD5
- **scram-sha-256**: Método más seguro
- **peer**: Autenticación por usuario del SO
- **ldap**: Autenticación contra LDAP`,
      syntax: `CREATE USER nombre WITH [OPTIONS] PASSWORD 'contraseña';`,
      examples: [
        {
          title: "Crear usuario administrador",
          description: "Usuario con permisos de administración",
          code: "CREATE USER admin_dba WITH \n    SUPERUSER \n    CREATEDB \n    CREATEROLE \n    PASSWORD 'dba_pass_123';\n\nGRANT ALL PRIVILEGES ON DATABASE mi_bd TO admin_dba;",
          result: "CREATE ROLE\nGRANT"
        },
      ],
    },
    {
      slug: "indices",
      title: "Índices",
      description: "Optimización de consultas con índices",
      content: `Los **índices** mejoran la velocidad de las consultas al permitir búsquedas más rápidas.

## Tipos de índices

### B-tree (por defecto)
\`\`\`sql
CREATE INDEX idx_usuarios_email ON usuarios(email);
\`\`\`

### Hash
\`\`\`sql
CREATE INDEX idx_usuarios_id_hash ON usuarios USING HASH (id);
\`\`\`

### GiST
\`\`\`sql
CREATE INDEX idx_datos_geo ON ubicaciones USING GIST (coordenadas);
\`\`\`

### GIN (para JSONB y arrays)
\`\`\`sql
CREATE INDEX idx_datos_json ON usuarios USING GIN (metadata);
\`\`\`

## Índices compuestos
\`\`\`sql
CREATE INDEX idx_ordenes_usuario_fecha 
ON ordenes(usuario_id, fecha DESC);
\`\`\`

## Índices parciales
\`\`\`sql
CREATE INDEX idx_usuarios_activos 
ON usuarios(email) 
WHERE activo = true;
\`\`\`

## Analizar uso de índices
\`\`\`sql
-- Ver índices de una tabla
SELECT * FROM pg_indexes WHERE tablename = 'usuarios';

-- Ver uso de índices
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan;
\`\`\``,
      syntax: `CREATE [UNIQUE] INDEX nombre_idx ON tabla (columna1, columna2);`,
      examples: [
        {
          title: "Crear índice",
          description: "Índice en email de usuarios",
          code: "CREATE UNIQUE INDEX idx_usuarios_email ON usuarios(email);\n\n-- Verificar plan de consulta\nEXPLAIN ANALYZE\nSELECT * FROM usuarios WHERE email = 'ana@email.com';",
          result: "CREATE INDEX\n                              QUERY PLAN\n-------------------------------------------------------------------\nIndex Scan using idx_usuarios_email on usuarios  (cost=0.15..8.17 rows=1 width=36)\n  Index Cond: (email = 'ana@email.com'::text)\n  Planning Time: 0.123 ms\n  Execution Time: 0.045 ms"
        },
      ],
    },
    {
      slug: "jsonb",
      title: "JSONB",
      description: "Trabaja con datos JSON de forma eficiente",
      content: `**JSONB** permite almacenar y consultar datos JSON de forma eficiente en PostgreSQL.

## Ventajas de JSONB

- Almacenamiento binario optimizado
- Indexación GIN para búsquedas rápidas
- Operadores específicos para consultas

## Tabla con JSONB

\`\`\`sql
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    metadata JSONB
);

INSERT INTO productos (nombre, metadata) VALUES
('Laptop', '{"marca": "Dell", "ram": 16, "color": "gris", "puertos": ["USB-C", "HDMI"]}');
\`\`\`

## Operadores JSONB

\`\`\`sql
-- Acceder a campo
SELECT metadata->'marca' as marca FROM productos;
SELECT metadata->>'marca' as marca_texto FROM productos;

-- ¿Contiene clave?
SELECT * FROM productos WHERE metadata ? 'color';

-- ¿Contiene valor?
SELECT * FROM productos WHERE metadata @> '{"ram": 16}';

-- ¿Tiene alguna clave del array?
SELECT * FROM productos WHERE metadata ?| ARRAY['marca', 'color'];
\`\`\`

## Índice GIN en JSONB

\`\`\`sql
CREATE INDEX idx_productos_metadata ON productos USING GIN (metadata);
\`\`\`

## Actualizar campos JSONB

\`\`\`sql
-- Agregar campo
UPDATE productos 
SET metadata = metadata || '{"stock": 10}'::jsonb
WHERE id = 1;

-- Eliminar campo
UPDATE productos 
SET metadata = metadata - 'color'
WHERE id = 1;
\`\`\``,
      syntax: `columna JSONB`,
      examples: [
        {
          title: "Consultar JSONB",
          description: "Buscar productos por características",
          code: "SELECT nombre, metadata->>'marca' as marca\nFROM productos\nWHERE metadata @> '{\"ram\": 16}'\nAND metadata->>'marca' = 'Dell';",
          result: "| nombre | marca |\n|--------|-------|\n| Laptop | Dell  |\n| Monitor| Dell  |"
        },
      ],
    },
    {
      slug: "uuid",
      title: "UUID",
      description: "Identificadores únicos universales en PostgreSQL",
      content: `**UUID** (Universally Unique Identifier) genera identificadores únicos a nivel global.

## Generar UUIDs

\`\`\`sql
-- Habilitar extensión
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Generar UUID v4
SELECT uuid_generate_v4();
-- Resultado: 550e8400-e29b-41d4-a716-446655440000

-- Usar UUID como PK
CREATE TABLE usuarios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);
\`\`\`

## Ventajas

- Únicos globalmente (no requieren secuencia central)
- Seguros (no revelan información como IDs secuenciales)
- Compatibles con sistemas distribuidos
- Se pueden generar en el cliente

## Consideraciones

- Ocupan más espacio que INT (16 bytes vs 4 bytes)
- Índices B-tree en UUID pueden ser menos eficientes
- Alternativa: ULID o Snowflake IDs`,
      syntax: `CREATE EXTENSION "uuid-ossp";
SELECT uuid_generate_v4();`,
      examples: [
        {
          title: "Tabla con UUID",
          description: "Usar UUID como identificador principal",
          code: "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";\n\nCREATE TABLE pedidos (\n    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n    usuario_id UUID REFERENCES usuarios(id),\n    total DECIMAL NOT NULL,\n    creado_en TIMESTAMP DEFAULT NOW()\n);\n\nINSERT INTO pedidos (usuario_id, total) VALUES\n    ('550e8400-e29b-41d4-a716-446655440000', 150.00)\nRETURNING *;",
          result: "| id                                   | usuario_id                           | total  | creado_en               |\n|--------------------------------------|--------------------------------------|--------|-------------------------|\n| 6ba7b810-9dad-11d1-80b4-00c04fd430c8 | 550e8400-e29b-41d4-a716-446655440000 | 150.00 | 2024-01-15 10:30:00     |"
        },
      ],
    },
    {
      slug: "arrays",
      title: "Arrays",
      description: "Trabaja con arreglos en PostgreSQL",
      content: `PostgreSQL permite almacenar **arrays** de cualquier tipo de dato.

## Declarar arrays

\`\`\`sql
CREATE TABLE articulos (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    etiquetas TEXT[],
    calificaciones INT[]
);
\`\`\`

## Insertar arrays

\`\`\`sql
INSERT INTO articulos (nombre, etiquetas, calificaciones) VALUES
('PostgreSQL Guide', ARRAY['sql', 'postgresql', 'database'], ARRAY[5, 4, 5]);
\`\`\`

## Acceder a elementos

\`\`\`sql
-- Primer elemento (índice 1)
SELECT etiquetas[1] FROM articulos;

-- Rango
SELECT etiquetas[1:2] FROM articulos;

-- Longitud del array
SELECT array_length(etiquetas, 1) FROM articulos;
\`\`\`

## Operaciones con arrays

\`\`\`sql
-- ¿Contiene elemento?
SELECT * FROM articulos WHERE 'sql' = ANY(etiquetas);

-- Todos los elementos
SELECT * FROM articulos WHERE etiquetas @> ARRAY['sql', 'database'];

-- Agregar elemento
UPDATE articulos 
SET etiquetas = array_append(etiquetas, 'tutorial')
WHERE id = 1;

-- Unir arrays
SELECT array_cat(ARRAY[1,2], ARRAY[3,4]);
\`\`\``,
      syntax: `columna TIPO_DATO[]`,
      examples: [
        {
          title: "Array de etiquetas",
          description: "Buscar artículos por etiqueta",
          code: "SELECT nombre, etiquetas\nFROM articulos\nWHERE 'postgresql' = ANY(etiquetas)\nORDER BY nombre;",
          result: "| nombre           | etiquetas                         |\n|------------------|-----------------------------------|\n| PostgreSQL Guide | {sql,postgresql,database}         |\n| Advanced SQL     | {sql,postgresql,avanzado}         |"
        },
      ],
    },
    {
      slug: "replicacion",
      title: "Replicación",
      description: "Alta disponibilidad y escalabilidad con replicación",
      content: `La **replicación** en PostgreSQL permite mantener copias de la base de datos en múltiples servidores.

## Tipos de replicación

### Streaming Replication
\`\`\`sql
-- En el primario (postgresql.conf)
wal_level = replica
max_wal_senders = 5

-- En el secundario
primary_conninfo = 'host=192.168.1.10 port=5432 user=replicator password=secret'
\`\`\`

### Logical Replication
\`\`\`sql
-- Crear publicación en el primario
CREATE PUBLICATION mi_publicacion 
FOR TABLE usuarios, pedidos;

-- Crear suscripción en el secundario
CREATE SUBSCRIPTION mi_suscripcion
CONNECTION 'host=192.168.1.10 dbname=mi_bd user=replicator'
PUBLICATION mi_publicacion;
\`\`\`

## Configurar replicación

\`\`\`bash
# Crear usuario de replicación
CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'secret';

# Configurar pg_hba.conf
host replication replicator 192.168.1.0/24 scram-sha-256
\`\`\`

## Monitorear replicación

\`\`\`sql
-- Estado de la replicación
SELECT * FROM pg_stat_replication;

-- Retraso en secundario
SELECT 
    pid,
    application_name,
    state,
    pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) as retraso_bytes
FROM pg_stat_replication;
\`\`\``,
      syntax: `-- Publicación
CREATE PUBLICATION nombre FOR TABLE tabla1, tabla2;

-- Suscripción
CREATE SUBSCRIPTION nombre CONNECTION 'cadena_conexión' PUBLICATION nombre;`,
      examples: [
        {
          title: "Configurar replicación",
          description: "Crear publicación para replicación lógica",
          code: "-- En el servidor primario\nCREATE PUBLICATION ventas_pub \nFOR TABLE ventas, productos, clientes\nWITH (publish = 'insert, update, delete');\n\n-- Verificar publicación\nSELECT * FROM pg_publication_tables \nWHERE pubname = 'ventas_pub';",
          result: "| pubname     | schemaname | tablename |\n|-------------|------------|-----------|\n| ventas_pub  | public     | ventas    |\n| ventas_pub  | public     | productos |\n| ventas_pub  | public     | clientes  |"
        },
      ],
    },
  ],
};
