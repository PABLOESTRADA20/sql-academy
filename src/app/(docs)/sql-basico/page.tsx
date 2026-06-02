import type { Metadata } from "next";
import Link from "next/link";
import { sqlBasico } from "@/features/lessons/sql-basico";
import { LessonCard } from "@/components/sql/lesson-card";

export const metadata: Metadata = {
  title: "SQL Básico",
  description: "Aprende los fundamentos de SQL: SELECT, INSERT, UPDATE, DELETE y más.",
};

export default function SqlBasicoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{sqlBasico.title}</h1>
        <p className="mt-2 text-muted-foreground">{sqlBasico.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sqlBasico.lessons.map((lesson) => (
          <Link key={lesson.slug} href={`/sql-basico/${lesson.slug}`} className="block">
            <LessonCard
              title={lesson.title}
              description={lesson.description}
              href={`/sql-basico/${lesson.slug}`}
              difficulty="beginner"
              duration="10 min"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
