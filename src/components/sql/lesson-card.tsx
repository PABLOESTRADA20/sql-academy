"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface LessonCardProps {
  title: string;
  description: string;
  href: string;
  duration?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export function LessonCard({
  title,
  description,
  duration,
  difficulty,
}: LessonCardProps) {
  return (
    <div className="group relative h-full rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
          {title}
        </h3>
        {difficulty && (
          <Badge
            variant={
              difficulty === "beginner"
                ? "beginner"
                : difficulty === "intermediate"
                ? "intermediate"
                : "advanced"
            }
            className="shrink-0"
          >
            {difficulty === "beginner"
              ? "Básico"
              : difficulty === "intermediate"
              ? "Intermedio"
              : "Avanzado"}
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {description}
      </p>
      {duration && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{duration}</span>
        </div>
      )}
    </div>
  );
}
