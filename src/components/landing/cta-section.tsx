"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/[0.03] via-primary/[0.02] to-ring/[0.03] p-10 sm:p-14 text-center"
      >
        <div className="absolute top-0 right-0 -z-10 h-48 w-48 translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-36 w-36 -translate-x-1/4 translate-y-1/4 rounded-full bg-ring/[0.04] blur-3xl" />

        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-muted-foreground">Completamente gratuito</span>
        </div>

        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          ¿Listo para empezar?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Únete a miles de estudiantes que ya están aprendiendo SQL y PostgreSQL.
          Todo el contenido es gratuito y open source.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
            <Link href="/introduction">
              Empezar ahora
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/simulator">
              Probar simulador
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
