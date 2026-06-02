import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/sql/code-block";
import { ArrowRight, Database, FileJson, Shield, Server } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Introducción",
  description: "Aprende qué es SQL, PostgreSQL y cómo funcionan las bases de datos relacionales.",
};

export default function IntroductionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Introducción a SQL y PostgreSQL</h1>
      <p className="text-muted-foreground mb-8">
        Aprende los fundamentos de las bases de datos relacionales y por qué SQL es el lenguaje más usado del mundo.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Database className="h-5 w-5" />
            </div>
            <CardTitle className="text-sm">¿Qué es SQL?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lenguaje estándar para gestionar bases de datos relacionales.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Server className="h-5 w-5" />
            </div>
            <CardTitle className="text-sm">¿Qué es PostgreSQL?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sistema de base de datos relacional open source más avanzado del mundo.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <CardTitle className="text-sm">¿Por qué PostgreSQL?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ACID compliant, extensible, seguro y con 30+ años de desarrollo.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileJson className="h-5 w-5" />
            </div>
            <CardTitle className="text-sm">Características clave</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              JSONB, índices avanzados, replicación, particionamiento y más.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold tracking-tight mb-3">¿Qué es una base de datos relacional?</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Una base de datos relacional organiza datos en tablas (relaciones) que se conectan
        entre sí mediante claves. Cada tabla tiene filas (registros) y columnas (campos).
      </p>

      <CodeBlock
        title="Ejemplo de tabla relacional"
        code={`CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    edad INTEGER,
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    total DECIMAL(10,2) NOT NULL,
    fecha DATE DEFAULT CURRENT_DATE
);`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">¿Por qué aprender SQL?</h2>
      <ul className="space-y-2 mb-8">
        <li className="ml-5 list-disc text-muted-foreground">Es el lenguaje más demandado en bases de datos</li>
        <li className="ml-5 list-disc text-muted-foreground">Presente en el 90% de las aplicaciones modernas</li>
        <li className="ml-5 list-disc text-muted-foreground">Habilidad fundamental para desarrolladores y analistas</li>
        <li className="ml-5 list-disc text-muted-foreground">Altamente valorado en el mercado laboral</li>
      </ul>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/installation">
            Comenzar con la instalación
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/sql-basico/select">Ir a SELECT</Link>
        </Button>
      </div>
    </div>
  );
}
