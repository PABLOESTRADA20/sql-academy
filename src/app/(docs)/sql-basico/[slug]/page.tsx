import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sqlBasico } from "@/features/lessons/sql-basico";
import { CodeBlock } from "@/components/sql/code-block";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return sqlBasico.lessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = sqlBasico.lessons.find((l) => l.slug === slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function SqlBasicoLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = sqlBasico.lessons.find((l) => l.slug === slug);
  if (!lesson) notFound();

  const currentIndex = sqlBasico.lessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? sqlBasico.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sqlBasico.lessons.length - 1 ? sqlBasico.lessons[currentIndex + 1] : null;

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith("```")) {
        const match = part.match(/```(\w*)\n([\s\S]*?)```/);
        if (match) {
          const [, lang, code] = match;
          return <CodeBlock key={i} code={code.trim()} language={lang || "sql"} />;
        }
        return <CodeBlock key={i} code={part.replace(/```\w*\n?/, "").replace(/```$/, "").trim()} />;
      }
      const htmlContent = part
        .replace(/## (.+)/g, '<h2 class="text-xl font-semibold mt-8 mb-3 tracking-tight">$1</h2>')
        .replace(/### (.+)/g, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/- (.+)/g, '<li class="ml-5 list-disc text-muted-foreground mb-1">$1</li>')
        .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">');
      return (
        <div key={i} className="max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      );
    });
  };

  return (
    <article className="max-w-none">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="beginner">Básico</Badge>
          <span className="text-sm text-muted-foreground">10 min de lectura</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{lesson.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{lesson.description}</p>
      </div>

      <div className="max-w-none">
        {renderContent(lesson.content)}
      </div>

      {lesson.syntax && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Sintaxis</h2>
          <CodeBlock code={lesson.syntax} title="Sintaxis" />
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Ejemplos</h2>
        <div className="space-y-5">
          {lesson.examples.map((example, i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="text-base font-semibold mb-2">{example.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
              <CodeBlock code={example.code} title="Ejemplo" />
              {example.result && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2 text-muted-foreground">Resultado:</p>
                  <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                    <pre className="text-sm font-mono overflow-x-auto text-muted-foreground">
                      {example.result}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-border/50 pt-6">
        <div>
          {prevLesson && (
            <Link
              href={`/sql-basico/${prevLesson.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {prevLesson.title}
            </Link>
          )}
        </div>
        <div>
          {nextLesson && (
            <Link
              href={`/sql-basico/${nextLesson.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {nextLesson.title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
