import type { Metadata } from "next";
import SimulatorClient from "./client";

export const metadata: Metadata = {
  title: "Simulador SQL",
  description: "Editor SQL interactivo para escribir y probar consultas en vivo con PostgreSQL.",
};

export default function SimulatorPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Simulador SQL</h1>
        <p className="mt-2 text-muted-foreground">
          Escribe y ejecuta consultas SQL en vivo. Usa las tablas de ejemplo para practicar.
        </p>
      </div>
      <SimulatorClient />
    </div>
  );
}
