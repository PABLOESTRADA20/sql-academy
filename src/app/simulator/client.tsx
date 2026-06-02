"use client";

import * as React from "react";
import { SqlEditor } from "@/components/sql/sql-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Loader2 } from "lucide-react";
import type { Database as SqlDatabase } from "sql.js";
import { createSimulatorDatabase, executeOnDb } from "@/lib/sql-executor";
import type { QueryResult } from "@/lib/sql-executor";

const sampleTables = [
  {
    name: "Usuarios",
    schema: "CREATE TABLE usuarios (\n  id SERIAL PRIMARY KEY,\n  nombre VARCHAR(100),\n  email VARCHAR(255),\n  edad INTEGER,\n  ciudad VARCHAR(100)\n);",
    data: "INSERT INTO usuarios (nombre, email, edad, ciudad) VALUES\n  ('Ana García', 'ana@email.com', 28, 'Madrid'),\n  ('Carlos López', 'carlos@email.com', 32, 'Barcelona'),\n  ('María Rodríguez', 'maria@email.com', 25, 'Valencia'),\n  ('Pedro Sánchez', 'pedro@email.com', 35, 'Sevilla'),\n  ('Laura Martínez', 'laura@email.com', 30, 'Madrid');",
  },
  {
    name: "Productos",
    schema: "CREATE TABLE productos (\n  id SERIAL PRIMARY KEY,\n  nombre VARCHAR(200),\n  precio DECIMAL(10,2),\n  stock INTEGER,\n  categoria VARCHAR(100)\n);",
    data: "INSERT INTO productos (nombre, precio, stock, categoria) VALUES\n  ('Laptop Pro', 2999.99, 10, 'Electrónicos'),\n  ('Monitor 4K', 899.99, 25, 'Electrónicos'),\n  ('Teclado Mecánico', 149.99, 50, 'Accesorios'),\n  ('Mouse Inalámbrico', 79.99, 100, 'Accesorios'),\n  ('Webcam HD', 129.99, 30, 'Electrónicos');",
  },
  {
    name: "Pedidos",
    schema: "CREATE TABLE pedidos (\n  id SERIAL PRIMARY KEY,\n  usuario_id INTEGER REFERENCES usuarios(id),\n  producto_id INTEGER REFERENCES productos(id),\n  cantidad INTEGER,\n  total DECIMAL(10,2),\n  fecha DATE DEFAULT CURRENT_DATE\n);",
    data: "INSERT INTO pedidos (usuario_id, producto_id, cantidad, total, fecha) VALUES\n  (1, 1, 1, 2999.99, '2024-01-15'),\n  (1, 3, 1, 149.99, '2024-01-15'),\n  (2, 2, 2, 1799.98, '2024-01-14'),\n  (3, 4, 3, 239.97, '2024-01-13'),\n  (4, 5, 1, 129.99, '2024-01-12');",
  },
];

export default function SimulatorClient() {
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
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

  const handleExecute = React.useCallback(
    async (query: string): Promise<QueryResult> => {
      if (!dbRef.current) {
        return {
          columns: [],
          rows: [],
          error: "Base de datos no inicializada",
        };
      }
      await new Promise((r) => setTimeout(r, 200));
      return executeOnDb(dbRef.current, query);
    },
    []
  );

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-3 text-sm text-muted-foreground">
          Inicializando base de datos...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SqlEditor
        onExecute={handleExecute}
        initialQuery="-- Selecciona todos los usuarios\nSELECT * FROM usuarios;\n\n-- Prueba otras consultas:\n-- SELECT nombre, email FROM usuarios WHERE ciudad = 'Madrid';\n-- SELECT * FROM productos ORDER BY precio DESC;\n-- SELECT u.nombre, p.total FROM usuarios u JOIN pedidos p ON u.id = p.usuario_id;"
      />

      <div className="rounded-xl border border-border/50">
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
          <Database className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-medium">Tablas de ejemplo</h2>
        </div>
        <div className="p-4">
          <Tabs defaultValue="0">
            <TabsList className="mb-4">
              {sampleTables.map((table, i) => (
                <TabsTrigger key={i} value={String(i)}>
                  {table.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {sampleTables.map((table, i) => (
              <TabsContent key={i} value={String(i)} className="m-0 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-medium">Esquema</h3>
                    <Badge variant="secondary" className="text-xs">
                      {table.name}
                    </Badge>
                  </div>
                  <pre className="rounded-lg border border-border/50 bg-[#0B1121] p-3 text-sm font-mono overflow-x-auto text-gray-200">
                    {table.schema}
                  </pre>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Datos de ejemplo</h3>
                  <pre className="rounded-lg border border-border/50 bg-[#0B1121] p-3 text-sm font-mono overflow-x-auto text-gray-200">
                    {table.data}
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
