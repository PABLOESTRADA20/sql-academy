"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SqlEditorProps {
  initialQuery?: string;
  tableSchema?: string;
  onExecute?: (query: string) => Promise<{ columns: string[]; rows: Record<string, unknown>[]; error?: string; rowCount?: number }>;
}

export function SqlEditor({
  initialQuery = "-- Escribe tu consulta SQL aquí\nSELECT * FROM users;",
  tableSchema,
  onExecute,
}: SqlEditorProps) {
  const [query, setQuery] = React.useState(initialQuery);
  const [result, setResult] = React.useState<{ columns: string[]; rows: Record<string, unknown>[]; error?: string; rowCount?: number } | null>(null);
  const [executing, setExecuting] = React.useState(false);

  const handleExecute = async () => {
    if (!onExecute) return;
    setExecuting(true);
    setResult(null);
    try {
      const res = await onExecute(query);
      setResult(res);
    } catch {
      setResult({ columns: [], rows: [], error: "Error al ejecutar la consulta" });
    } finally {
      setExecuting(false);
    }
  };

  const handleReset = () => {
    setQuery(initialQuery);
    setResult(null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border/50">
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm font-medium ml-2">Editor SQL</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
          <Button size="sm" onClick={handleExecute} disabled={executing}>
            {executing ? (
              <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 mr-1" />
            )}
            Ejecutar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor">
        <TabsList className="w-full justify-start rounded-none border-b border-border/50 bg-muted/20 px-3">
          <TabsTrigger value="editor" className="text-xs">Editor</TabsTrigger>
          <TabsTrigger value="result" className="text-xs">Resultado</TabsTrigger>
          {tableSchema && <TabsTrigger value="schema" className="text-xs">Esquema</TabsTrigger>}
        </TabsList>

        <TabsContent value="editor" className="m-0">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full min-h-[220px] bg-[#0B1121] text-gray-100 font-mono text-sm p-4 focus:outline-none resize-y leading-relaxed"
            spellCheck={false}
          />
        </TabsContent>

        <TabsContent value="result" className="m-0">
          <div className="p-4">
            {!result && !executing && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Ejecuta una consulta para ver los resultados
              </p>
            )}
            {executing && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
            {result?.error && (
              <div className="flex items-start gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{result.error}</span>
              </div>
            )}
            {result && !result.error && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">
                    {result.rowCount} fila(s) devueltas
                  </span>
                </div>
                {result.columns.length > 0 && (
                  <div className="overflow-x-auto rounded-lg border border-border/50">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50 bg-muted/50">
                          {result.columns.map((col) => (
                            <th key={col} className="px-3 py-2 text-left font-medium text-muted-foreground">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.map((row, i) => (
                          <tr key={i} className={cn("border-b border-border/50 last:border-0", i % 2 === 0 && "bg-muted/20")}>
                            {result.columns.map((col) => (
                              <td key={col} className="px-3 py-2 font-mono">
                                {String(row[col] ?? "NULL")}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {tableSchema && (
          <TabsContent value="schema" className="m-0">
            <div className="p-4">
              <pre className="text-sm font-mono text-muted-foreground bg-[#0B1121] rounded-lg p-4 overflow-x-auto">
                {tableSchema}
              </pre>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
