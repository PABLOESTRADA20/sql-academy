import type { Metadata } from "next";
import { CodeBlock } from "@/components/sql/code-block";

export const metadata: Metadata = {
  title: "Instalación en macOS",
  description: "Guía de instalación de PostgreSQL en macOS usando Homebrew y el instalador oficial.",
};

export default function MacosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Instalación en macOS</h1>
      <p className="text-muted-foreground mb-8">En macOS tienes dos opciones principales: Homebrew o el instalador oficial.</p>

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Método 1: Homebrew (Recomendado)</h2>
      <CodeBlock
        title="Instalar con Homebrew"
        code={`# Instalar PostgreSQL
brew install postgresql@16

# Iniciar el servicio
brew services start postgresql@16

# Verificar instalación
psql --version

# Conectarse
psql postgres`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Método 2: Instalador Oficial</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Descarga el instalador desde <a href="https://www.postgresql.org/download/macos/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">postgresql.org/download/macos</a>.
      </p>

      <CodeBlock
        title="Verificar y configurar"
        code={`# Verificar que PostgreSQL está corriendo
brew services list

# Si no está corriendo:
brew services start postgresql@16

# Conectarse al servidor
psql -U postgres

# También puedes usar pgAdmin que tiene interfaz gráfica`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Comandos útiles</h2>
      <CodeBlock
        title="Gestión del servicio"
        code={`# Detener PostgreSQL
brew services stop postgresql@16

# Reiniciar PostgreSQL
brew services restart postgresql@16

# Ver logs
brew services logs postgresql@16

# Actualizar PostgreSQL
brew upgrade postgresql@16`}
      />
    </div>
  );
}
