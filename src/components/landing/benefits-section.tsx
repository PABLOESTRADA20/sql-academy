"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BENEFITS } from "@/lib/constants";
import { Zap, TrendingUp, RefreshCw, Award, Sparkles, Users } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  RefreshCw: <RefreshCw className="h-5 w-5" />,
  Award: <Award className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
};

export function BenefitsSection() {
  return (
    <section className="relative px-6 py-20 sm:py-28" aria-labelledby="benefits-title">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]" />
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <h2 id="benefits-title" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Por qué aprender con nosotros?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para convertirte en un experto en SQL
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20">
                <CardHeader>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors duration-300">
                    {iconMap[benefit.icon]}
                  </div>
                  <CardTitle className="text-base">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
