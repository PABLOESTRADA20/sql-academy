import type { Metadata } from "next";
import { CodeBlock } from "@/components/sql/code-block";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Instalación con Docker",
  description: "Guía para ejecutar PostgreSQL en Docker con configuración básica y avanzada.",
};

export default function DockerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">PostgreSQL con Docker</h1>
      <p className="text-muted-foreground mb-8">
        Usar Docker es la forma más rápida y limpia de tener PostgreSQL funcionando.
        No contamina tu sistema y es fácil de eliminar cuando no lo necesites.
      </p>

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Requisitos previos</h2>
      <ul className="space-y-1 mb-6 list-disc pl-5 text-muted-foreground">
        <li>Docker instalado en tu sistema</li>
        <li>Docker Compose (opcional, recomendado)</li>
      </ul>

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Inicio rápido</h2>
      <CodeBlock
        title="Ejecutar PostgreSQL en Docker"
        language="bash"
        code={`# Descargar la imagen oficial
docker pull postgres:16-alpine

# Ejecutar el contenedor
docker run --name postgres \\
    -e POSTGRES_PASSWORD=mysecretpassword \\
    -p 5432:5432 \\
    -d postgres:16-alpine

# Conectarse al contenedor
docker exec -it postgres psql -U postgres`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Configuración avanzada</h2>
      <CodeBlock
        title="Con volúmenes persistentes"
        language="bash"
        code={`# Crear directorio para datos persistentes
mkdir -p ~/postgres-data

# Ejecutar con volumen persistente
docker run --name postgres \\
    -e POSTGRES_USER=myuser \\
    -e POSTGRES_PASSWORD=mypassword \\
    -e POSTGRES_DB=mydatabase \\
    -v ~/postgres-data:/var/lib/postgresql/data \\
    -p 5432:5432 \\
    -d postgres:16-alpine`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Usando Docker Compose</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Crea un archivo <code className="text-primary">docker-compose.yml</code>:</p>
      <CodeBlock
        title="docker-compose.yml"
        language="yaml"
        code={`version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: postgres
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:`}
      />

      <CodeBlock
        title="Iniciar con Docker Compose"
        language="bash"
        code={`# Iniciar los servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Detener servicios
docker compose down

# Detener y eliminar volúmenes
docker compose down -v`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Comandos útiles de Docker</h2>
      <CodeBlock
        title="Gestión del contenedor"
        language="bash"
        code={`# Listar contenedores activos
docker ps

# Ver logs de PostgreSQL
docker logs postgres

# Detener el contenedor
docker stop postgres

# Iniciar el contenedor
docker start postgres

# Eliminar el contenedor
docker rm postgres

# Conectarse con psql desde fuera
psql -h localhost -U myuser -d mydatabase`}
      />

      <Card className="mt-8">
        <CardContent className="p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Importante:</strong> Por defecto, Docker asigna una IP dinámica al contenedor.
          Si tienes problemas de conexión, verifica que el puerto 5432 no esté en uso y que el
          contenedor esté corriendo con <code className="text-primary">docker ps</code>.
        </CardContent>
      </Card>
    </div>
  );
}
