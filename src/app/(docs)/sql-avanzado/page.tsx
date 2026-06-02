import type { Metadata } from "next";
import Link from "next/link";
import { sqlAvanzado } from "@/features/lessons/sql-avanzado";
import { LessonCard } from "@/components/sql/lesson-card";

export const metadata: Metadata = {
  title: "SQL Avanzado",
  description: "Técnicas avanzadas: CTEs, Window Functions, Triggers, Procedures y más.",
};

export default function SqlAvanzadoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{sqlAvanzado.title}</h1>
        <p className="mt-2 text-muted-foreground">{sqlAvanzado.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sqlAvanzado.lessons.map((lesson) => (
          <Link key={lesson.slug} href={`/sql-avanzado/${lesson.slug}`} className="block">
            <LessonCard
              title={lesson.title}
              description={lesson.description}
              href={`/sql-avanzado/${lesson.slug}`}
              difficulty="advanced"
              duration="20 min"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
