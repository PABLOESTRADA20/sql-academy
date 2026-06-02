export const SITE_CONFIG = {
  name: "SQL Academy",
  description: "Aprende SQL y PostgreSQL desde cero hasta nivel avanzado. Lecciones interactivas, ejercicios prácticos y editor SQL en vivo.",
  url: "https://sql-academy.com",
  ogImage: "/og.png",
  author: "SQL Academy",
  links: {
    twitter: "https://twitter.com/sqlacademy",
    github: "https://github.com/sqlacademy",
  },
};

export const NAV_ITEMS = [
  { title: "Introducción", href: "/introduction" },
  {
    title: "Instalación",
    href: "/installation",
    items: [
      { title: "Windows", href: "/installation/windows" },
      { title: "Linux", href: "/installation/linux" },
      { title: "macOS", href: "/installation/macos" },
      { title: "Docker", href: "/installation/docker" },
    ],
  },
  {
    title: "SQL Básico",
    href: "/sql-basico",
    items: [
      { title: "SELECT", href: "/sql-basico/select" },
      { title: "INSERT", href: "/sql-basico/insert" },
      { title: "UPDATE", href: "/sql-basico/update" },
      { title: "DELETE", href: "/sql-basico/delete" },
      { title: "WHERE", href: "/sql-basico/where" },
      { title: "ORDER BY", href: "/sql-basico/order-by" },
      { title: "GROUP BY", href: "/sql-basico/group-by" },
      { title: "HAVING", href: "/sql-basico/having" },
      { title: "LIMIT", href: "/sql-basico/limit" },
    ],
  },
  {
    title: "SQL Intermedio",
    href: "/sql-intermedio",
    items: [
      { title: "JOIN", href: "/sql-intermedio/join" },
      { title: "UNION", href: "/sql-intermedio/union" },
      { title: "CASE", href: "/sql-intermedio/case" },
      { title: "Subconsultas", href: "/sql-intermedio/subconsultas" },
      { title: "Funciones Agregadas", href: "/sql-intermedio/funciones-agregadas" },
      { title: "Vistas", href: "/sql-intermedio/vistas" },
    ],
  },
  {
    title: "SQL Avanzado",
    href: "/sql-avanzado",
    items: [
      { title: "CTE", href: "/sql-avanzado/cte" },
      { title: "Window Functions", href: "/sql-avanzado/window-functions" },
      { title: "Triggers", href: "/sql-avanzado/triggers" },
      { title: "Procedures", href: "/sql-avanzado/procedures" },
      { title: "Functions", href: "/sql-avanzado/functions" },
      { title: "Particiones", href: "/sql-avanzado/particiones" },
    ],
  },
  {
    title: "PostgreSQL",
    href: "/postgresql",
    items: [
      { title: "Arquitectura", href: "/postgresql/arquitectura" },
      { title: "Roles", href: "/postgresql/roles" },
      { title: "Usuarios", href: "/postgresql/usuarios" },
      { title: "Índices", href: "/postgresql/indices" },
      { title: "JSONB", href: "/postgresql/jsonb" },
      { title: "UUID", href: "/postgresql/uuid" },
      { title: "Arrays", href: "/postgresql/arrays" },
      { title: "Replicación", href: "/postgresql/replicacion" },
    ],
  },
  { title: "Simulador SQL", href: "/simulator" },
  { title: "Ejercicios", href: "/exercises" },
];

export const STATS = [
  { label: "Lecciones", value: "30+" },
  { label: "Ejercicios", value: "60+" },
  { label: "Horas de contenido", value: "40+" },
  { label: "Estudiantes", value: "10,000+" },
];

export const BENEFITS = [
  {
    title: "Aprendizaje Práctico",
    description: "Escribe y ejecuta SQL en tiempo real con nuestro simulador interactivo.",
    icon: "Zap",
  },
  {
    title: "Progresión Natural",
    description: "Desde básico hasta avanzado, con ejercicios en cada nivel.",
    icon: "TrendingUp",
  },
  {
    title: "Contenido Actualizado",
    description: "Basado en las últimas características de PostgreSQL 16+.",
    icon: "RefreshCw",
  },
  {
    title: "Certificación",
    description: "Obtén certificados al completar cada módulo del curso.",
    icon: "Award",
  },
  {
    title: "100% Gratuito",
    description: "Todo el contenido educativo es libre y abierto.",
    icon: "Sparkles",
  },
  {
    title: "Comunidad Activa",
    description: "Foros, discusiones y proyectos colaborativos.",
    icon: "Users",
  },
];
