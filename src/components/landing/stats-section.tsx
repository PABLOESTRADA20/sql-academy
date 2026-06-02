"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="relative border-y border-border/50 px-6 py-16 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/[0.02] via-transparent to-ring/[0.02]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
