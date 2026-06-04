import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sql-academy.com";

  const mainRoutes = [
    { url: "", priority: 1, changeFrequency: "weekly" as const },
    { url: "/introduction", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/installation", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/simulator", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/exercises", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  const docRoutes = [
    "/installation/windows",
    "/installation/linux",
    "/installation/macos",
    "/installation/docker",
    "/sql-basico",
    "/sql-basico/select",
    "/sql-basico/insert",
    "/sql-basico/update",
    "/sql-basico/delete",
    "/sql-basico/where",
    "/sql-basico/order-by",
    "/sql-basico/group-by",
    "/sql-basico/having",
    "/sql-basico/limit",
    "/sql-intermedio",
    "/sql-intermedio/join",
    "/sql-intermedio/union",
    "/sql-intermedio/case",
    "/sql-intermedio/subconsultas",
    "/sql-intermedio/funciones-agregadas",
    "/sql-intermedio/vistas",
    "/sql-avanzado",
    "/sql-avanzado/cte",
    "/sql-avanzado/window-functions",
    "/sql-avanzado/triggers",
    "/sql-avanzado/procedures",
    "/sql-avanzado/functions",
    "/sql-avanzado/particiones",
    "/postgresql",
    "/postgresql/arquitectura",
    "/postgresql/roles",
    "/postgresql/usuarios",
    "/postgresql/indices",
    "/postgresql/jsonb",
    "/postgresql/uuid",
    "/postgresql/arrays",
    "/postgresql/replicacion",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [
    ...mainRoutes.map((r) => ({
      url: `${baseUrl}${r.url}`,
      lastModified: new Date(),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...docRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return sitemapEntries;
}
