"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Database, ArrowRight, Play, BookOpen, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 sm:pt-36 sm:pb-28" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-ring/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03] pointer-events-none" />

      <motion.div
        className="mx-auto max-w-5xl text-center relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm backdrop-blur-sm" role="status">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="text-muted-foreground">
              Plataforma educativa gratuita
            </span>
          </div>
        </motion.div>

        <motion.h1
          id="hero-title"
          variants={itemVariants}
          className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          Domina{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-ring bg-clip-text text-transparent">
            SQL y PostgreSQL
          </span>
          <br />
          desde cero
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed"
        >
          Aprende SQL y PostgreSQL con lecciones interactivas, ejercicios prácticos
          y un simulador en vivo. Desde consultas básicas hasta administración
          avanzada de bases de datos.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
            <Link href="/introduction">
              Comenzar a aprender
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/simulator">
              <Play className="mr-2 h-4 w-4" aria-hidden="true" />
              Probar Simulador
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-14 flex items-center justify-center gap-8 sm:gap-12 text-sm text-muted-foreground"
        >
          {[
            { icon: BookOpen, label: "30+ Lecciones" },
            { icon: Database, label: "60+ Ejercicios" },
            { icon: Play, label: "Editor en vivo" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary">
                <item.icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-medium text-foreground/80">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
