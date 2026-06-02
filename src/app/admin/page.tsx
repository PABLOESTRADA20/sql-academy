import type { Metadata } from "next";
import { AdminDashboard } from "./client";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Panel de administración de SQL Academy.",
};

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <p className="mt-2 text-muted-foreground">
          Gestiona cursos, lecciones, usuarios y estadísticas de la plataforma.
        </p>
      </div>
      <AdminDashboard />
    </div>
  );
}
