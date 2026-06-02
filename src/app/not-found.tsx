import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Database className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Página no encontrada
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        La lección o página que buscas no existe o ha sido movida.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
      </Button>
    </div>
  );
}
