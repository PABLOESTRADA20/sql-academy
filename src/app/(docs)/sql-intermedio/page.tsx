import type { Metadata } from "next";
import Link from "next/link";
import { sqlIntermedio } from "@/features/lessons/sql-intermedio";
import { LessonCard } from "@/components/sql/lesson-card";

export const metadata: Metadata = {
  title: "SQL Intermedio",
  description: "Consultas más complejas: JOINs, subconsultas, funciones agregadas y vistas.",
};

export default function SqlIntermedioPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{sqlIntermedio.title}</h1>
        <p className="mt-2 text-muted-foreground">{sqlIntermedio.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sqlIntermedio.lessons.map((lesson) => (
          <Link key={lesson.slug} href={`/sql-intermedio/${lesson.slug}`} className="block">
            <LessonCard
              title={lesson.title}
              description={lesson.description}
              href={`/sql-intermedio/${lesson.slug}`}
              difficulty="intermediate"
              duration="15 min"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
