import type { Metadata } from "next";
import { CodeBlock } from "@/components/sql/code-block";

export const metadata: Metadata = {
  title: "Instalación en Linux",
  description: "Guía de instalación de PostgreSQL en distribuciones Linux: Ubuntu, Debian, Fedora, Arch y OpenSUSE.",
};

export default function LinuxPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Instalación en Linux</h1>
      <p className="text-muted-foreground mb-8">PostgreSQL está disponible en los repositorios oficiales de todas las distribuciones principales.</p>

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Ubuntu / Debian</h2>
      <CodeBlock
        title="Instalar en Ubuntu/Debian"
        code={`# Actualizar repositorios
sudo apt update

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Iniciar el servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verificar estado
sudo systemctl status postgresql

# Conectarse
sudo -u postgres psql`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Fedora / RHEL / CentOS</h2>
      <CodeBlock
        title="Instalar en Fedora"
        code={`# Instalar PostgreSQL
sudo dnf install postgresql-server postgresql-contrib

# Inicializar la base de datos
sudo postgresql-setup --initdb

# Iniciar el servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verificar instalación
systemctl status postgresql`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Arch Linux</h2>
      <CodeBlock
        title="Instalar en Arch Linux"
        code={`# Instalar PostgreSQL
sudo pacman -S postgresql

# Crear usuario de base de datos
sudo -iu postgres
initdb --locale $LANG -E UTF8 -D '/var/lib/postgres/data'

# Iniciar y habilitar
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Salir del usuario postgres
exit`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">OpenSUSE</h2>
      <CodeBlock
        title="Instalar en OpenSUSE"
        code={`# Instalar PostgreSQL
sudo zypper install postgresql16 postgresql16-server

# Inicializar
sudo postgresql-init

# Iniciar servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql`}
      />

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3">Configuración post-instalación</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Después de instalar, configura la contraseña del usuario postgres:</p>
      <CodeBlock
        title="Configurar contraseña"
        code={`# Conectarse como postgres
sudo -u postgres psql

# Establecer contraseña
ALTER USER postgres PASSWORD 'tu_contraseña';

# Salir
\\q`}
      />
    </div>
  );
}
