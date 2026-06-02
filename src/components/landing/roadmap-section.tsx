"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Code, Database, Server, Shield, BarChart3 } from "lucide-react";

const roadmap = [
  {
    step: 1,
    title: "Introducción",
    description: "Conceptos básicos de bases de datos y SQL",
    icon: BookOpen,
    href: "/introduction",
    gradient: "from-blue-500/10 to-blue-500/5",
    iconBg: "text-blue-500",
  },
  {
    step: 2,
    title: "Instalación",
    description: "Configura PostgreSQL en tu sistema",
    icon: Server,
    href: "/installation",
    gradient: "from-emerald-500/10 to-emerald-500/5",
    iconBg: "text-emerald-500",
  },
  {
    step: 3,
    title: "SQL Básico",
    description: "SELECT, INSERT, UPDATE, DELETE, WHERE",
    icon: Code,
    href: "/sql-basico",
    gradient: "from-amber-500/10 to-amber-500/5",
    iconBg: "text-amber-500",
  },
  {
    step: 4,
    title: "SQL Intermedio",
    description: "JOINs, subconsultas, funciones agregadas",
    icon: Database,
    href: "/sql-intermedio",
    gradient: "from-orange-500/10 to-orange-500/5",
    iconBg: "text-orange-500",
  },
  {
    step: 5,
    title: "SQL Avanzado",
    description: "CTEs, window functions, procedimientos",
    icon: BarChart3,
    href: "/sql-avanzado",
    gradient: "from-red-500/10 to-red-500/5",
    iconBg: "text-red-500",
  },
  {
    step: 6,
    title: "PostgreSQL",
    description: "Arquitectura, seguridad, optimización",
    icon: Shield,
    href: "/postgresql",
    gradient: "from-purple-500/10 to-purple-500/5",
    iconBg: "text-purple-500",
  },
];

export function RoadmapSection() {
  return (
    <section className="px-6 py-20 sm:py-28" id="roadmap">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Roadmap</Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Tu ruta de aprendizaje
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sigue este camino estructurado para dominar SQL y PostgreSQL
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary/20 via-ring/20 to-transparent hidden sm:block" />
          <div className="space-y-6">
            {roadmap.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={item.href} className="group block">
                  <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 bg-gradient-to-r ${item.gradient}`}>
                    <CardContent className="flex items-start gap-5 p-5 sm:p-6">
                      <div className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm">
                        <item.icon className={`h-5 w-5 sm:h-5.5 w-5.5 ${item.iconBg}`} />
                      </div>
                      <div className="flex-1 min-w-0 relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Paso {item.step}
                          </span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
