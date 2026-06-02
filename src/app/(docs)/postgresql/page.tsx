import type { Metadata } from "next";
import Link from "next/link";
import { postgresqlLessons } from "@/features/lessons/postgresql";
import { LessonCard } from "@/components/sql/lesson-card";

export const metadata: Metadata = {
  title: "PostgreSQL",
  description: "Características específicas de PostgreSQL: arquitectura, roles, índices, JSONB, replicación.",
};

export default function PostgresqlPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{postgresqlLessons.title}</h1>
        <p className="mt-2 text-muted-foreground">{postgresqlLessons.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {postgresqlLessons.lessons.map((lesson) => (
          <Link key={lesson.slug} href={`/postgresql/${lesson.slug}`} className="block">
            <LessonCard
              title={lesson.title}
              description={lesson.description}
              href={`/postgresql/${lesson.slug}`}
              difficulty="advanced"
              duration="20 min"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
