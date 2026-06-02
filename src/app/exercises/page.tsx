import type { Metadata } from "next";
import { ExercisesClient } from "./client";

export const metadata: Metadata = {
  title: "Ejercicios SQL",
  description: "Practica SQL con 60 ejercicios divididos en niveles: principiante, intermedio y avanzado.",
};

export default function ExercisesPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Ejercicios SQL</h1>
        <p className="mt-2 text-muted-foreground">
          Pon a prueba tus conocimientos con ejercicios prácticos. Cada ejercicio incluye
          descripción, pista y solución explicada.
        </p>
      </div>
      <ExercisesClient />
    </div>
  );
}
