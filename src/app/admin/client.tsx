"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  BarChart3,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Database,
  FileText,
  Award,
  Activity,
} from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">30+</span>
              <span className="text-xs text-muted-foreground">Lecciones</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Database className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">60+</span>
              <span className="text-xs text-muted-foreground">Ejercicios</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">10K+</span>
              <span className="text-xs text-muted-foreground">Estudiantes</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">92%</span>
              <span className="text-xs text-muted-foreground">Satisfacción</span>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Cursos
          </TabsTrigger>
          <TabsTrigger value="lessons" className="gap-2">
            <FileText className="h-4 w-4" />
            Lecciones
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Estadísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="m-0 mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Cursos</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Nuevo curso
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["SQL Básico", "SQL Intermedio", "SQL Avanzado", "PostgreSQL"].map((course) => (
                  <div key={course} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{course}</p>
                        <p className="text-xs text-muted-foreground">Publicado</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lessons" className="m-0 mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Lecciones recientes</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Nueva lección
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "SELECT", course: "SQL Básico", status: "Publicado" },
                  { title: "JOIN", course: "SQL Intermedio", status: "Publicado" },
                  { title: "CTE", course: "SQL Avanzado", status: "Borrador" },
                  { title: "Índices", course: "PostgreSQL", status: "Publicado" },
                ].map((lesson) => (
                  <div key={lesson.title} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lesson.status === "Publicado"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {lesson.status}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="m-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/50">
                      <th className="px-4 py-2.5 text-left font-medium">Nombre</th>
                      <th className="px-4 py-2.5 text-left font-medium">Email</th>
                      <th className="px-4 py-2.5 text-left font-medium">Rol</th>
                      <th className="px-4 py-2.5 text-left font-medium">Progreso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Ana García", email: "ana@email.com", role: "Admin", progress: "85%" },
                      { name: "Carlos López", email: "carlos@email.com", role: "Student", progress: "60%" },
                      { name: "María Rodríguez", email: "maria@email.com", role: "Student", progress: "45%" },
                    ].map((user) => (
                      <tr key={user.email} className="border-b border-border/50 last:border-0">
                        <td className="px-4 py-2.5">{user.name}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{user.email}</td>
                        <td className="px-4 py-2.5">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.role === "Admin"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">{user.progress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="m-0 mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Actividad reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Nuevo usuario registrado", time: "Hace 5 min" },
                    { action: "Ejercicio completado: SELECT", time: "Hace 15 min" },
                    { action: "Lección actualizada: JOIN", time: "Hace 1 hora" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.action}</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  Logros populares
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { achievement: "Primer SELECT", earned: "2,450 estudiantes" },
                    { achievement: "Maestro de JOINs", earned: "1,200 estudiantes" },
                    { achievement: "Experto en CTEs", earned: "850 estudiantes" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.achievement}</span>
                      <span className="text-xs text-muted-foreground">{item.earned}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
