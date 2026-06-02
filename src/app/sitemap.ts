import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sql-academy.com";

  const routes = [
    "",
    "/introduction",
    "/installation",
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
    "/simulator",
    "/exercises",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
