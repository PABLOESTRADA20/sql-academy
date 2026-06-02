import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de datos...");

  // Crear categorías
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "sql-basico" },
      update: {},
      create: {
        name: "SQL Básico",
        slug: "sql-basico",
        description: "Fundamentos de SQL: consultas esenciales",
      },
    }),
    prisma.category.upsert({
      where: { slug: "sql-intermedio" },
      update: {},
      create: {
        name: "SQL Intermedio",
        slug: "sql-intermedio",
        description: "Consultas más complejas: JOINs, subconsultas",
      },
    }),
    prisma.category.upsert({
      where: { slug: "sql-avanzado" },
      update: {},
      create: {
        name: "SQL Avanzado",
        slug: "sql-avanzado",
        description: "CTEs, window functions, triggers, procedures",
      },
    }),
    prisma.category.upsert({
      where: { slug: "postgresql" },
      update: {},
      create: {
        name: "PostgreSQL",
        slug: "postgresql",
        description: "Características específicas de PostgreSQL",
      },
    }),
  ]);

  console.log(`✅ Categorías creadas: ${categories.length}`);

  // Crear usuario admin por defecto
  const admin = await prisma.user.upsert({
    where: { email: "admin@sqlacademy.com" },
    update: {},
    create: {
      email: "admin@sqlacademy.com",
      name: "Admin SQL Academy",
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin creado: ${admin.email}`);

  // Crear ejercicios de ejemplo
  const exercises = [
    {
      title: "SELECT básico",
      description: "Obtén todos los usuarios",
      difficulty: "beginner" as const,
      instructions: "Escribe una consulta SELECT que devuelva todas las columnas de la tabla usuarios.",
      hint: "Usa SELECT * FROM usuarios",
      solution: "SELECT * FROM usuarios;",
      explanation: "SELECT * selecciona todas las columnas de la tabla especificada.",
      order: 1,
      published: true,
    },
    {
      title: "SELECT con columnas específicas",
      description: "Obtén solo nombres y emails",
      difficulty: "beginner" as const,
      instructions: "Escribe una consulta que devuelva solo las columnas nombre y email de la tabla usuarios.",
      hint: "Especifica los nombres de las columnas separados por comas",
      solution: "SELECT nombre, email FROM usuarios;",
      explanation: "Seleccionar columnas específicas es más eficiente que SELECT *.",
      order: 2,
      published: true,
    },
    {
      title: "INNER JOIN",
      description: "Combina usuarios con sus pedidos",
      difficulty: "intermediate" as const,
      instructions: "Obtén el nombre del usuario y el total de cada pedido usando INNER JOIN.",
      hint: "SELECT u.nombre, p.total FROM usuarios u INNER JOIN pedidos p ON u.id = p.usuario_id",
      solution: "SELECT u.nombre, p.total FROM usuarios u INNER JOIN pedidos p ON u.id = p.usuario_id;",
      explanation: "INNER JOIN devuelve solo filas con coincidencia en ambas tablas.",
      order: 1,
      published: true,
    },
    {
      title: "CTE simple",
      description: "Usa WITH para crear una consulta temporal",
      difficulty: "advanced" as const,
      instructions: "Usa un CTE para obtener usuarios con más de 1 pedido.",
      hint: "WITH resumen AS (SELECT usuario_id, COUNT(*) as total FROM pedidos GROUP BY usuario_id)",
      solution: "WITH resumen AS (SELECT usuario_id, COUNT(*) as total FROM pedidos GROUP BY usuario_id) SELECT u.nombre, r.total FROM usuarios u JOIN resumen r ON u.id = r.usuario_id WHERE r.total > 1;",
      explanation: "CTE mejora la legibilidad de consultas complejas.",
      order: 1,
      published: true,
    },
  ];

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { id: `seed-${exercise.title.toLowerCase().replace(/\s+/g, "-")}` },
      update: {},
      create: {
        id: `seed-${exercise.title.toLowerCase().replace(/\s+/g, "-")}`,
        ...exercise,
      },
    });
  }

  console.log(`✅ Ejercicios creados: ${exercises.length}`);
  console.log("🎉 Seed completado exitosamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
