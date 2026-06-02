"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Loader2, Play, RotateCcw, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import type { Database as SqlDatabase } from "sql.js";
import { createSimulatorDatabase, executeOnDb } from "@/lib/sql-executor";
import type { QueryResult } from "@/lib/sql-executor";
import { cn } from "@/lib/utils";

type Example = {
  id: string;
  title: string;
  query: string;
  level: "beginner" | "intermediate" | "advanced";
};

const examples: Example[] = [
  // === PRINCIPIANTE ===
  {
    id: "b1", level: "beginner",
    title: "Ver todos los usuarios",
    query: "SELECT * FROM usuarios;",
  },
  {
    id: "b2", level: "beginner",
    title: "Ver todos los productos",
    query: "SELECT * FROM productos;",
  },
  {
    id: "b3", level: "beginner",
    title: "Filtrar por ciudad",
    query: "SELECT nombre, email, edad FROM usuarios WHERE ciudad = 'Madrid';",
  },
  {
    id: "b4", level: "beginner",
    title: "Ordenar por precio (mayor a menor)",
    query: "SELECT nombre, precio FROM productos ORDER BY precio DESC;",
  },
  {
    id: "b5", level: "beginner",
    title: "Productos con stock bajo",
    query: "SELECT nombre, stock FROM productos WHERE stock < 20 ORDER BY stock;",
  },
  {
    id: "b6", level: "beginner",
    title: "Contar usuarios por ciudad",
    query: "SELECT ciudad, COUNT(*) AS total FROM usuarios GROUP BY ciudad;",
  },
  {
    id: "b7", level: "beginner",
    title: "Top 3 productos más caros",
    query: "SELECT nombre, precio FROM productos ORDER BY precio DESC LIMIT 3;",
  },
  {
    id: "b8", level: "beginner",
    title: "Filtrar por rango de edad",
    query: "SELECT nombre, edad FROM usuarios WHERE edad BETWEEN 25 AND 35;",
  },
  {
    id: "b9", level: "beginner",
    title: "Buscar por patrón",
    query: "SELECT * FROM usuarios WHERE nombre LIKE '%Martínez%';",
  },
  {
    id: "b10", level: "beginner",
    title: "Valores únicos",
    query: "SELECT DISTINCT ciudad FROM usuarios;",
  },
  // === INTERMEDIO ===
  {
    id: "i1", level: "intermediate",
    title: "Unir usuarios y pedidos",
    query: `SELECT u.nombre, p.total, p.fecha
FROM usuarios u
JOIN pedidos p ON u.id = p.usuario_id;`,
  },
  {
    id: "i2", level: "intermediate",
    title: "Total gastado por usuario",
    query: `SELECT u.nombre,
       COUNT(p.id)          AS pedidos,
       SUM(p.total)         AS gastado
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.nombre
ORDER BY gastado DESC;`,
  },
  {
    id: "i3", level: "intermediate",
    title: "Productos más caros que el promedio",
    query: `SELECT nombre, precio
FROM productos
WHERE precio > (SELECT AVG(precio) FROM productos)
ORDER BY precio DESC;`,
  },
  {
    id: "i4", level: "intermediate",
    title: "Usuarios sin pedidos",
    query: `SELECT u.nombre, u.email
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
WHERE p.id IS NULL;`,
  },
  {
    id: "i5", level: "intermediate",
    title: "Clasificar productos por precio",
    query: `SELECT nombre, precio,
  CASE
    WHEN precio < 100   THEN 'Barato'
    WHEN precio < 500   THEN 'Normal'
    WHEN precio < 1000  THEN 'Caro'
    ELSE 'Premium'
  END AS categoria
FROM productos
ORDER BY precio;`,
  },
  {
    id: "i6", level: "intermediate",
    title: "Productos nunca vendidos",
    query: `SELECT p.nombre, p.categoria
FROM productos p
LEFT JOIN pedidos pd ON p.id = pd.producto_id
WHERE pd.id IS NULL;`,
  },
  {
    id: "i7", level: "intermediate",
    title: "Promedio de precio por categoría",
    query: `SELECT categoria,
       COUNT(*)            AS productos,
       ROUND(AVG(precio))  AS precio_promedio
FROM productos
GROUP BY categoria;`,
  },
  {
    id: "i8", level: "intermediate",
    title: "Empleados con su jefe",
    query: `SELECT e.nombre AS empleado, e.puesto,
       COALESCE(j.nombre, 'Sin jefe') AS jefe
FROM empleados e
LEFT JOIN empleados j ON e.jefe_id = j.id;`,
  },
  // === AVANZADO ===
  {
    id: "a1", level: "advanced",
    title: "Ventas totales por ciudad",
    query: `SELECT
  u.ciudad,
  COUNT(p.id)              AS ventas,
  ROUND(SUM(p.total), 2)   AS total
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.ciudad
ORDER BY total DESC;`,
  },
  {
    id: "a2", level: "advanced",
    title: "Producto más caro de cada categoría",
    query: `SELECT p.nombre, p.categoria, p.precio
FROM productos p
WHERE p.precio = (
  SELECT MAX(precio) FROM productos WHERE categoria = p.categoria
);`,
  },
  {
    id: "a3", level: "advanced",
    title: "Producto más vendido por categoría (CTE)",
    query: `WITH ventas AS (
  SELECT p.categoria, p.nombre, SUM(pd.cantidad) AS vendidos
  FROM productos p
  JOIN pedidos pd ON p.id = pd.producto_id
  GROUP BY p.categoria, p.nombre
)
SELECT categoria, nombre, MAX(vendidos) AS vendidos
FROM ventas
GROUP BY categoria;`,
  },
  {
    id: "a4", level: "advanced",
    title: "Salario mayor al promedio de su depto",
    query: `SELECT e.nombre, e.puesto, e.depto, e.salario
FROM empleados e
WHERE e.salario > (
  SELECT AVG(salario) FROM empleados WHERE depto = e.depto
);`,
  },
  {
    id: "a5", level: "advanced",
    title: "Resumen completo con JOIN + GROUP BY",
    query: `SELECT
  u.ciudad,
  COUNT(DISTINCT u.id)    AS usuarios,
  COUNT(p.id)             AS pedidos,
  ROUND(SUM(p.total), 2)  AS ventas
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
GROUP BY u.ciudad
ORDER BY ventas DESC;`,
  },
  {
    id: "a6", level: "advanced",
    title: "Segundo producto más caro",
    query: `SELECT nombre, precio
FROM productos
ORDER BY precio DESC
LIMIT 1 OFFSET 1;`,
  },
  {
    id: "a7", level: "advanced",
    title: "Porcentaje de stock por categoría",
    query: `SELECT categoria,
       SUM(stock) AS total_stock,
       ROUND(SUM(stock) * 100.0 / (SELECT SUM(stock) FROM productos), 1) AS porcentaje
FROM productos
GROUP BY categoria
ORDER BY porcentaje DESC;`,
  },
  {
    id: "a8", level: "advanced",
    title: "Categorías con más de 1 producto",
    query: `SELECT categoria, COUNT(*) AS productos
FROM productos
GROUP BY categoria
HAVING COUNT(*) > 1;`,
  },
];

const sampleTables = [
  {
    name: "Usuarios",
    schema: `CREATE TABLE usuarios (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre   TEXT NOT NULL,
  email    TEXT,
  edad     INTEGER,
  ciudad   TEXT
);`,
    data: `INSERT INTO usuarios (nombre, email, edad, ciudad) VALUES
  ('Ana García',     'ana@email.com',    28, 'Madrid'),
  ('Carlos López',   'carlos@email.com', 35, 'Barcelona'),
  ('María Rodríguez','maria@email.com',  25, 'Valencia'),
  ('Pedro Sánchez',  'pedro@email.com',  30, 'Sevilla'),
  ('Laura Martínez', 'laura@email.com',  28, 'Madrid');`,
  },
  {
    name: "Productos",
    schema: `CREATE TABLE productos (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre    TEXT NOT NULL,
  precio    REAL NOT NULL,
  stock     INTEGER DEFAULT 0,
  categoria TEXT
);`,
    data: `INSERT INTO productos (nombre, precio, stock, categoria) VALUES
  ('Laptop Pro',      2999.99, 10,  'Electrónicos'),
  ('Monitor 4K',      899.99,  25,  'Electrónicos'),
  ('Teclado Mecánico',149.99,  50,  'Accesorios'),
  ('Mouse Inalámbrico',79.99, 100,  'Accesorios'),
  ('Webcam HD',       129.99,  30,  'Electrónicos');`,
  },
  {
    name: "Pedidos",
    schema: `CREATE TABLE pedidos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id  INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  cantidad    INTEGER DEFAULT 1,
  total       REAL NOT NULL,
  fecha       TEXT
);`,
    data: `INSERT INTO pedidos (usuario_id, producto_id, cantidad, total, fecha) VALUES
  (1, 1, 1, 2999.99, '2024-01-15'),
  (1, 3, 1, 149.99,  '2024-01-15'),
  (2, 2, 2, 1799.98, '2024-01-14'),
  (3, 4, 3, 239.97,  '2024-01-13'),
  (4, 5, 1, 129.99,  '2024-01-12'),
  (1, 2, 1, 899.99,  '2024-02-01'),
  (2, 1, 1, 2999.99, '2024-02-03'),
  (5, 4, 2, 159.98,  '2024-02-10');`,
  },
  {
    name: "Empleados",
    schema: `CREATE TABLE empleados (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre   TEXT NOT NULL,
  puesto   TEXT,
  salario  REAL,
  depto    TEXT,
  jefe_id  INTEGER
);`,
    data: `INSERT INTO empleados VALUES
  (1, 'Ricardo Gómez', 'CEO',          150000, 'Dirección',  NULL),
  (2, 'Sofía Herrera', 'CTO',          120000, 'Tecnología', 1),
  (3, 'Luis Fernández','Desarrollador', 80000, 'Tecnología', 2),
  (4, 'Elena Ruiz',    'Diseñadora',    70000, 'Tecnología', 2),
  (5, 'Mario Díaz',    'Ventas',        60000, 'Comercial',  1),
  (6, 'Carla Torres',  'Marketing',     55000, 'Comercial',  5);`,
  },
];

type TabInfo = {
  value: "beginner" | "intermediate" | "advanced";
  label: string;
  color: "beginner" | "intermediate" | "advanced";
};

const tabs: TabInfo[] = [
  { value: "beginner", label: "Principiante", color: "beginner" },
  { value: "intermediate", label: "Intermedio", color: "intermediate" },
  { value: "advanced", label: "Avanzado", color: "advanced" },
];

export default function SimulatorClient() {
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedQuery, setSelectedQuery] = React.useState(examples[0].query);
  const [result, setResult] = React.useState<QueryResult | null>(null);
  const [executing, setExecuting] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const dbRef = React.useRef<SqlDatabase | null>(null);

  React.useEffect(() => {
    createSimulatorDatabase()
      .then((db) => {
        dbRef.current = db;
        setReady(true);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Error al inicializar la base de datos");
      });
    return () => {
      if (dbRef.current) {
        try { dbRef.current.close(); } catch { /* ignore */ }
      }
    };
  }, []);

  const handleExecute = async () => {
    if (!dbRef.current || !selectedQuery.trim()) return;
    setExecuting(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 200));
    const res = await executeOnDb(dbRef.current, selectedQuery);
    setResult(res);
    setExecuting(false);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(selectedQuery);
      } else {
        const el = document.createElement("textarea");
        el.value = selectedQuery;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = selectedQuery;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center" role="alert">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center py-20" role="status" aria-label="Inicializando base de datos">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-3 text-sm text-muted-foreground">Inicializando base de datos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Catálogo de ejemplos */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold mb-4">Catálogo de Consultas</h2>
          <Tabs defaultValue="beginner">
            <TabsList className="mb-3">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {examples
                    .filter((ex) => ex.level === tab.value)
                    .map((ex) => (
                      <button
                        key={ex.id}
                        onClick={() => {
                          setSelectedQuery(ex.query);
                          setResult(null);
                        }}
                        className={cn(
                          "text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 border",
                          selectedQuery === ex.query
                            ? "border-primary/40 bg-primary/5 text-foreground font-medium"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        <span className="text-xs font-mono text-primary/60 mr-2">{ex.id.toUpperCase()}</span>
                        {ex.title}
                      </button>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Editor y ejecución */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2.5">
            <span className="text-sm font-medium">Editor SQL</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex h-7 items-center gap-1 rounded-md border border-border/50 px-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Copiar consulta"
              >
                {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
              <button
                onClick={() => { setSelectedQuery(""); setResult(null); }}
                className="flex h-7 items-center gap-1 rounded-md border border-border/50 px-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Limpiar
              </button>
              <Button size="sm" onClick={handleExecute} disabled={executing || !selectedQuery.trim()}>
                {executing ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5 mr-1" />
                )}
                Ejecutar
              </Button>
            </div>
          </div>
          <textarea
            value={selectedQuery}
            onChange={(e) => { setSelectedQuery(e.target.value); setResult(null); }}
            className="w-full min-h-[180px] bg-[#0B1121] text-gray-100 font-mono text-sm p-4 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary/30 resize-y leading-relaxed"
            spellCheck={false}
            aria-label="Editor de consultas SQL"
          />
        </CardContent>
      </Card>

      {/* Resultados */}
      {result && (
        <div className="rounded-xl border border-border/50 overflow-hidden" role="region" aria-label="Resultado">
          {result.error ? (
            <div className="flex items-start gap-2 bg-red-500/10 p-4 text-sm text-red-500" role="alert">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{result.error}</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2.5 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Consulta ejecutada correctamente
                <Badge variant="outline" className="ml-auto text-xs">
                  {result.rowCount} fila(s)
                </Badge>
              </div>
              {result.columns.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/40">
                        {result.columns.map((col) => (
                          <th key={col} className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row, i) => (
                        <tr key={i} className={cn("border-b border-border/50 last:border-0", i % 2 === 0 && "bg-muted/10")}>
                          {result.columns.map((col) => (
                            <td key={col} className="px-4 py-2 font-mono text-xs">
                              {String(row[col] ?? "NULL")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {result.rowCount === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">
                  La consulta se ejecutó pero no devolvió filas.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tablas de ejemplo */}
      <section className="rounded-xl border border-border/50" aria-label="Tablas de ejemplo">
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
          <Database className="h-4 w-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-medium">Estructura de las tablas</h2>
        </div>
        <div className="p-4">
          <Tabs defaultValue="0">
            <TabsList className="mb-4 flex-wrap">
              {sampleTables.map((table, i) => (
                <TabsTrigger key={i} value={String(i)}>{table.name}</TabsTrigger>
              ))}
            </TabsList>
            {sampleTables.map((table, i) => (
              <TabsContent key={i} value={String(i)} className="m-0 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-medium">Esquema</h3>
                    <Badge variant="secondary" className="text-xs">{table.name}</Badge>
                  </div>
                  <pre className="rounded-lg border border-border/50 bg-[#0B1121] p-3 text-sm font-mono overflow-x-auto text-gray-200">
                    {table.schema}
                  </pre>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Datos</h3>
                  <pre className="rounded-lg border border-border/50 bg-[#0B1121] p-3 text-sm font-mono overflow-x-auto text-gray-200">
                    {table.data}
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
