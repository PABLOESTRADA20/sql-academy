"use client";

import initSqlJs, { type Database as SqlDatabase, type SqlJsStatic } from "sql.js";
import { executeOnDb, type QueryResult } from "@/lib/sql-executor";

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
          locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
        });
      }
    })();
  }
  return sqlPromise;
}

function parseSchemaToCreate(schema: string): string {
  const match = schema.match(/^(\w+)\s*\(([\s\S]+)\)$/);
  if (!match) return schema;
  const tableName = match[1];
  const columns = match[2]
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const colDefs = columns
    .map((col) => {
      const parts = col.trim().split(/\s+/);
      if (parts.length < 2) return col.trim();
      const colName = parts[0];
      let colType = parts[1].toUpperCase();
      if (colType === "DECIMAL") colType = "REAL";
      if (colType === "BOOLEAN") colType = "INT";
      if (
        colType === "TEXT" ||
        colType === "VARCHAR" ||
        colType === "STRING"
      )
        return `${colName} TEXT`;
      return `${colName} ${colType}`;
    })
    .join(", ");
  return `CREATE TABLE ${tableName} (${colDefs})`;
}

function splitStatements(sql: string): string[] {
  return sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export async function createExerciseDatabase(
  schema: string,
  data: string
): Promise<SqlDatabase> {
  const SQL = await getSql();
  const db = new SQL.Database();

  const schemaLines = schema.split("\n").filter((s) => s.trim().length > 0);
  for (const line of schemaLines) {
    const ddl = parseSchemaToCreate(line.trim());
    try {
      db.run(ddl);
    } catch (e: unknown) {
      console.warn("Failed to create table:", ddl, e instanceof Error ? e.message : e);
    }
  }

  const stmts = splitStatements(data);
  for (const stmt of stmts) {
    try {
      db.run(stmt);
    } catch (e: unknown) {
      console.warn("Failed to insert data:", stmt, e instanceof Error ? e.message : e);
    }
  }

  return db;
}

export { executeOnDb, type QueryResult };
