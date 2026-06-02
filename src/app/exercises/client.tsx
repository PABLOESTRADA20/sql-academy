"use client";

import type { Database as SqlDatabase } from "sql.js";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/sql/code-block";
import { beginnerExercises, intermediateExercises, advancedExercises } from "@/features/exercises";
import { createExerciseDatabase, executeOnDb } from "@/lib/exercise-executor";
import { Lightbulb, Eye, CheckCircle2, Play, Loader2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { value: "beginner", label: "Principiante", count: beginnerExercises.length, color: "beginner" as const },
  { value: "intermediate", label: "Intermedio", count: intermediateExercises.length, color: "intermediate" as const },
  { value: "advanced", label: "Avanzado", count: advancedExercises.length, color: "advanced" as const },
];

function ExerciseEditor({ exercise }: { exercise: { id: string; tableSchema?: string; initialData?: string } }) {
  const [query, setQuery] = React.useState("");
  const [result, setResult] = React.useState<{ columns: string[]; rows: Record<string, unknown>[]; error?: string; rowCount?: number } | null>(null);
  const [executing, setExecuting] = React.useState(false);
  const [initializing, setInitializing] = React.useState(false);
  const dbRef = React.useRef<SqlDatabase | null>(null);

  React.useEffect(() => {
    return () => {
      if (dbRef.current) {
        try { dbRef.current.close(); } catch { /* ignore */ }
        dbRef.current = null;
      }
    };
  }, [exercise.id]);

  const getOrCreateDb = async () => {
    if (dbRef.current) return dbRef.current;
    if (!exercise.tableSchema || !exercise.initialData) return null;
    setInitializing(true);
    try {
      const db = await createExerciseDatabase(exercise.tableSchema, exercise.initialData);
      dbRef.current = db;
      return db;
    } finally {
      setInitializing(false);
    }
  };

  const handleExecute = async () => {
    if (!exercise.tableSchema || !exercise.initialData) return;

    const db = await getOrCreateDb();
    if (!db) return;

    setExecuting(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 200));

    const res = await executeOnDb(db, query);
    setResult(res);
    setExecuting(false);
  };

  if (!exercise.tableSchema) return null;

  return (
    <div className="mt-4 space-y-3">
      <div className="rounded-lg border border-border/50 bg-muted/20">
        <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">Editor SQL</span>
          <Button size="sm" className="h-7 text-xs" onClick={handleExecute} disabled={executing || initializing}>
            {executing ? (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <Play className="h-3 w-3 mr-1" />
            )}
            {initializing ? "Iniciando..." : "Ejecutar"}
          </Button>
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe tu consulta SQL aquí..."
          className="w-full min-h-[100px] bg-[#0B1121] text-gray-100 font-mono text-sm p-3 focus:outline-none resize-y leading-relaxed"
          spellCheck={false}
        />
      </div>

      {result && (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          {result.error ? (
            <div className="flex items-start gap-2 bg-red-500/10 p-3 text-sm text-red-500">
              <span>{result.error}</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 text-xs text-green-500">
                <CheckCircle2 className="h-3 w-3" />
                {result.rowCount} fila(s) devueltas
              </div>
              {result.columns.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/30">
                        {result.columns.map((col) => (
                          <th key={col} className="px-3 py-1.5 text-left font-medium text-muted-foreground text-xs">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row, i) => (
                        <tr key={i} className={cn("border-b border-border/50 last:border-0", i % 2 === 0 && "bg-muted/10")}>
                          {result.columns.map((col) => (
                            <td key={col} className="px-3 py-1.5 font-mono text-xs">
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
      )}
    </div>
  );
}

export function ExercisesClient() {
  const [showSolution, setShowSolution] = React.useState<string | null>(null);
  const [completed, setCompleted] = React.useState<Set<string>>(new Set());
  const [showEditor, setShowEditor] = React.useState<Set<string>>(new Set());

  const allExercises = [...beginnerExercises, ...intermediateExercises, ...advancedExercises];

  const filteredExercises = (level: string) => {
    switch (level) {
      case "beginner": return beginnerExercises;
      case "intermediate": return intermediateExercises;
      case "advanced": return advancedExercises;
      default: return allExercises;
    }
  };

  const handleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleEditor = (id: string) => {
    setShowEditor((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Tabs defaultValue="beginner">
      <TabsList className="mb-6">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
            {tab.label}
            <Badge variant={tab.color} className="text-xs">{tab.count}</Badge>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="m-0">
          <div className="space-y-4">
            {filteredExercises(tab.value).map((exercise, idx) => (
              <Card key={exercise.id} className={completed.has(exercise.id) ? "border-green-500/50" : "border-border/50"}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {idx + 1}
                      </span>
                      <div>
                        <CardTitle className="text-base">{exercise.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{exercise.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8"
                        onClick={() => handleComplete(exercise.id)}
                      >
                        {completed.has(exercise.id) ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm mb-3">{exercise.instructions}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {exercise.hint && (
                      <details className="group">
                        <summary className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                          <Lightbulb className="h-3 w-3" />
                          Mostrar pista
                        </summary>
                        <p className="mt-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                          {exercise.hint}
                        </p>
                      </details>
                    )}

                    {(exercise.tableSchema || exercise.initialData) && (
                      <details className="group">
                        <summary className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                          <Eye className="h-3 w-3" />
                          Ver esquema
                        </summary>
                        <div className="mt-2 rounded-lg border border-border/50 p-3">
                          {exercise.tableSchema && (
                            <pre className="text-sm font-mono text-muted-foreground mb-3">
                              {exercise.tableSchema}
                            </pre>
                          )}
                          {exercise.initialData && (
                            <pre className="text-sm font-mono text-muted-foreground">
                              {exercise.initialData}
                            </pre>
                          )}
                        </div>
                      </details>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => setShowSolution(showSolution === exercise.id ? null : exercise.id)}
                    >
                      {showSolution === exercise.id ? "Ocultar solución" : "Mostrar solución"}
                    </Button>

                    {exercise.tableSchema && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => toggleEditor(exercise.id)}
                      >
                        <Terminal className="h-3 w-3 mr-1" />
                        {showEditor.has(exercise.id) ? "Cerrar editor" : "Probar SQL"}
                      </Button>
                    )}
                  </div>

                  {showEditor.has(exercise.id) && (
                    <ExerciseEditor exercise={exercise} />
                  )}

                  {showSolution === exercise.id && (
                    <div className="mt-3 space-y-3">
                      <CodeBlock code={exercise.solution} title="Solución" />
                      <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Explicación:</strong> {exercise.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
