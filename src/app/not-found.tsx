import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Database, Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Página no encontrada | SQL Academy",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
        <Database className="h-10 w-10" />
      </div>
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Página no encontrada
      </p>
      <p className="mt-1 text-sm text-muted-foreground max-w-md">
        La lección o página que buscas no existe o ha sido movida a otra ubicación.
      </p>
      <div className="flex items-center gap-3 mt-8">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
        <Button asChild>
          <Link href="/introduction">
            <Home className="mr-2 h-4 w-4" />
            Ir a documentación
          </Link>
        </Button>
      </div>
    </div>
  );
}
