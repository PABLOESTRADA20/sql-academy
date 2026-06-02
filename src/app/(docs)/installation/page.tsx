import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Terminal, Apple, Container } from "lucide-react";

export const metadata: Metadata = {
  title: "Instalación",
  description: "Guías de instalación de PostgreSQL para Windows, Linux, macOS y Docker.",
};

const platforms = [
  {
    title: "Windows",
    description: "Instalador oficial, Winget y Chocolatey",
    icon: Monitor,
    href: "/installation/windows",
    color: "text-blue-500",
  },
  {
    title: "Linux",
    description: "Ubuntu, Debian, Fedora, Arch, OpenSUSE",
    icon: Terminal,
    href: "/installation/linux",
    color: "text-green-500",
  },
  {
    title: "macOS",
    description: "Homebrew e instalador oficial",
    icon: Apple,
    href: "/installation/macos",
    color: "text-gray-500",
  },
  {
    title: "Docker",
    description: "Contenedor oficial de PostgreSQL",
    icon: Container,
    href: "/installation/docker",
    color: "text-blue-400",
  },
];

export default function InstallationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Instalación de PostgreSQL</h1>
      <p className="text-muted-foreground mb-8">
        Elige tu sistema operativo para ver la guía de instalación detallada.
        PostgreSQL está disponible en todas las plataformas principales.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {platforms.map((platform) => (
          <Link key={platform.title} href={platform.href}>
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <platform.icon className={`h-5 w-5 ${platform.color}`} />
                </div>
                <CardTitle className="text-base">{platform.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{platform.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
