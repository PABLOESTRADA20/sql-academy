import * as React from "react";
import Link from "next/link";
import { Database, Heart, Globe, MessageCircle } from "lucide-react";

const footerLinks = [
  {
    title: "Aprendizaje",
    links: [
      { label: "Introducción", href: "/introduction" },
      { label: "SQL Básico", href: "/sql-basico" },
      { label: "SQL Intermedio", href: "/sql-intermedio" },
      { label: "SQL Avanzado", href: "/sql-avanzado" },
      { label: "PostgreSQL", href: "/postgresql" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Simulador SQL", href: "/simulator" },
      { label: "Ejercicios", href: "/exercises" },
      { label: "Instalación", href: "/installation" },
      { label: "Roadmap", href: "/#roadmap" },
    ],
  },
  {
    title: "Comunidad",
    links: [
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "Twitter", href: "https://twitter.com", external: true },
      { label: "Admin Panel", href: "/admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                <Database className="h-[18px] w-[18px]" strokeWidth={2} />
              </div>
              <span className="font-semibold text-base tracking-tight">SQL Academy</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Plataforma educativa gratuita y open source para aprender SQL y PostgreSQL.
              Desde consultas básicas hasta administración avanzada de bases de datos.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all"
              >
                <Globe className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Hecho con <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> por SQL Academy
          </p>
          <p>&copy; {new Date().getFullYear()} SQL Academy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
