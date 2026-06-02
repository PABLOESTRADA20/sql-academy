"use client";

import initSqlJs, { type Database as SqlDatabase, type SqlJsStatic } from "sql.js";

let sqlPromise: Promise<SqlJsStatic> | null = null;

async function fetchWasmBinary(): Promise<ArrayBuffer> {
  const res = await fetch("/sql-wasm.wasm");
  if (!res.ok) throw new Error(`Failed to load wasm: ${res.status}`);
  return res.arrayBuffer();
}

function getSql(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      try {
        const wasmBinary = await fetchWasmBinary();
        return await initSqlJs({ wasmBinary });
      } catch (err) {
        console.warn("Local wasm failed, falling back to CDN", err);
        return initSqlJs({
          locateFile: (file: string) =>
            `https://sql.js.org/dist/${file}`,
        });
      }
    })();
  }
  return sqlPromise;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  error?: string;
  rowCount?: number;
}

function queryToResult(db: SqlDatabase, sql: string): QueryResult {
  const trimmed = sql.trim();
  if (!trimmed) {
    return { columns: [], rows: [], error: "No hay consulta para ejecutar" };
  }

  const isSelect =
    /^\s*SELECT/i.test(trimmed) ||
    /^\s*PRAGMA/i.test(trimmed) ||
    /^\s*SHOW/i.test(trimmed) ||
    /^\s*WITH/i.test(trimmed) ||
    /^\s*EXPLAIN/i.test(trimmed);

  try {
    if (isSelect) {
      const results = db.exec(trimmed);
      if (!results || results.length === 0) {
        return { columns: [], rows: [], rowCount: 0 };
      }
      const { columns, values } = results[0];
      if (!values || values.length === 0) {
        return { columns, rows: [], rowCount: 0 };
      }
      const rows = values.map((row: unknown[]) => {
        const obj: Record<string, unknown> = {};
        columns.forEach((col: string, i: number) => {
          obj[col] = row[i];
        });
        return obj;
      });
      return { columns, rows, rowCount: rows.length };
    } else {
      db.run(trimmed);
      return { columns: [], rows: [], rowCount: 0 };
    }
  } catch (err: unknown) {
    return {
      columns: [],
      rows: [],
      error: err instanceof Error ? err.message : "Error al ejecutar la consulta",
    };
  }
}

function populateSimulatorData(db: SqlDatabase): void {
  db.run(
    "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, email TEXT, edad INTEGER, ciudad TEXT)"
  );
  db.run(
    "INSERT INTO usuarios VALUES (1, 'Ana García', 'ana@email.com', 28, 'Madrid')"
  );
  db.run(
    "INSERT INTO usuarios VALUES (2, 'Carlos López', 'carlos@email.com', 32, 'Barcelona')"
  );
  db.run(
    "INSERT INTO usuarios VALUES (3, 'María Rodríguez', 'maria@email.com', 25, 'Valencia')"
  );
  db.run(
    "INSERT INTO usuarios VALUES (4, 'Pedro Sánchez', 'pedro@email.com', 35, 'Sevilla')"
  );
  db.run(
    "INSERT INTO usuarios VALUES (5, 'Laura Martínez', 'laura@email.com', 30, 'Madrid')"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, precio REAL, stock INTEGER, categoria TEXT)"
  );
  db.run("INSERT INTO productos VALUES (1, 'Laptop Pro', 2999.99, 10, 'Electrónicos')");
  db.run("INSERT INTO productos VALUES (2, 'Monitor 4K', 899.99, 25, 'Electrónicos')");
  db.run("INSERT INTO productos VALUES (3, 'Teclado Mecánico', 149.99, 50, 'Accesorios')");
  db.run("INSERT INTO productos VALUES (4, 'Mouse Inalámbrico', 79.99, 100, 'Accesorios')");
  db.run("INSERT INTO productos VALUES (5, 'Webcam HD', 129.99, 30, 'Electrónicos')");

  db.run(
    "CREATE TABLE IF NOT EXISTS pedidos (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER, producto_id INTEGER, cantidad INTEGER, total REAL, fecha TEXT)"
  );
  db.run("INSERT INTO pedidos VALUES (1, 1, 1, 1, 2999.99, '2024-01-15')");
  db.run("INSERT INTO pedidos VALUES (2, 1, 3, 1, 149.99, '2024-01-15')");
  db.run("INSERT INTO pedidos VALUES (3, 2, 2, 2, 1799.98, '2024-01-14')");
  db.run("INSERT INTO pedidos VALUES (4, 3, 4, 3, 239.97, '2024-01-13')");
  db.run("INSERT INTO pedidos VALUES (5, 4, 5, 1, 129.99, '2024-01-12')");
  db.run("INSERT INTO pedidos VALUES (6, 1, 2, 1, 899.99, '2024-02-01')");
  db.run("INSERT INTO pedidos VALUES (7, 2, 1, 1, 2999.99, '2024-02-03')");
  db.run("INSERT INTO pedidos VALUES (8, 5, 4, 2, 159.98, '2024-02-10')");

  db.run(
    "CREATE TABLE IF NOT EXISTS empleados (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, puesto TEXT, salario REAL, depto TEXT, jefe_id INTEGER)"
  );
  db.run("INSERT INTO empleados VALUES (1, 'Ricardo Gómez', 'CEO', 150000, 'Dirección', NULL)");
  db.run("INSERT INTO empleados VALUES (2, 'Sofía Herrera', 'CTO', 120000, 'Tecnología', 1)");
  db.run("INSERT INTO empleados VALUES (3, 'Luis Fernández', 'Desarrollador', 80000, 'Tecnología', 2)");
  db.run("INSERT INTO empleados VALUES (4, 'Elena Ruiz', 'Diseñadora', 70000, 'Tecnología', 2)");
  db.run("INSERT INTO empleados VALUES (5, 'Mario Díaz', 'Ventas', 60000, 'Comercial', 1)");
  db.run("INSERT INTO empleados VALUES (6, 'Carla Torres', 'Marketing', 55000, 'Comercial', 5)");
}

export async function createSimulatorDatabase(): Promise<SqlDatabase> {
  const SQL = await getSql();
  const db = new SQL.Database();
  populateSimulatorData(db);
  return db;
}

export async function executeOnDb(
  db: SqlDatabase,
  query: string
): Promise<QueryResult> {
  return queryToResult(db, query);
}
