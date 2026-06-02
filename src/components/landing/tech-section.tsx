"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";

const technologies = [
  { name: "Next.js 15", icon: SiNextdotjs },
  { name: "React 19", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Prisma", icon: SiPrisma },
];

export function TechSection() {
  return (
    <section className="border-t border-border/50 bg-muted/20 px-6 py-16 sm:py-20" aria-labelledby="tech-title">
      <div className="mx-auto max-w-7xl text-center">
        <h2 id="tech-title" className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
          Tecnología moderna
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
          Construido con las mejores herramientas del ecosistema web
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-2.5 group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border/50 bg-background shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                <tech.icon className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
