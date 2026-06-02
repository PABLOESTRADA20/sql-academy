import type { Metadata } from "next";
import { CodeBlock } from "@/components/sql/code-block";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Instalación en Windows",
  description: "Guía de instalación de PostgreSQL en Windows usando instalador oficial, Winget y Chocolatey.",
};

export default function WindowsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Instalación en Windows</h1>
      <p className="text-muted-foreground mb-8">Elige tu método de instalación preferido para Windows.</p>

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Método 1: Instalador Oficial</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        La forma más sencilla es usar el instalador oficial de EDB:
      </p>
      <ol className="space-y-1 mb-6 list-decimal pl-5 text-muted-foreground">
        <li>Visita <a href="https://www.postgresql.org/download/windows/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">postgresql.org/download/windows</a></li>
        <li>Descarga el instalador para tu versión de Windows</li>
        <li>Ejecuta el instalador y sigue los pasos</li>
        <li>Establece una contraseña para el usuario postgres</li>
        <li>Mantén el puerto predeterminado (5432)</li>
      </ol>

      <CodeBlock
        title="Verificar instalación"
        code={`# Abre PowerShell o CMD
psql -U postgres

# Si funciona, verás:
Password for user postgres:
psql (16.x)
Type "help" for help.

postgres=#`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Método 2: Winget</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Usa el gestor de paquetes integrado de Windows 10/11:</p>
      <CodeBlock
        title="Instalar con Winget"
        code={`# Buscar PostgreSQL
winget search postgresql

# Instalar PostgreSQL
winget install PostgreSQL.PostgreSQL

# Después de instalar, agregar al PATH
$env:Path += ";C:\\Program Files\\PostgreSQL\\16\\bin"`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Método 3: Chocolatey</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Si usas Chocolatey como gestor de paquetes:</p>
      <CodeBlock
        title="Instalar con Chocolatey"
        code={`# Instalar Chocolatey (si no lo tienes)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar PostgreSQL
choco install postgresql --version=16

# Verificar instalación
psql --version`}
      />

      <Card className="mt-8">
        <CardContent className="p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Tip:</strong> Después de instalar, puedes usar <code className="text-primary">pgAdmin</code> (se instala con el instalador oficial)
          o conectarte desde tu editor de código favorito usando las extensiones de PostgreSQL.
        </CardContent>
      </Card>
    </div>
  );
}
