export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  content: string;
  syntax?: string;
  examples: Example[];
  exercises?: Exercise[];
}

export interface Example {
  title: string;
  description: string;
  code: string;
  result?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  instructions: string;
  hint?: string;
  solution: string;
  explanation: string;
  tableSchema?: string;
  initialData?: string;
}

export interface LessonCategory {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface SqlResult {
  columns: string[];
  rows: Record<string, unknown>[];
  error?: string;
  rowCount: number;
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
}
