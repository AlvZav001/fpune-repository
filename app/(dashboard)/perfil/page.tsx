'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  FileText,
  Heart,
  Clock,
  Download,
  Eye,
  Settings,
  Edit,
  Upload,
  Trash2,
} from 'lucide-react';
import { projects, users } from '@/lib/data';

const currentUser = users[0]; // Simulated current user

const userProjects = projects.slice(0, 3);
const favoriteProjects = projects.filter((p) => currentUser.favorites.includes(p.id));
const downloadHistory = [
  { project: projects[0], date: '2024-04-12' },
  { project: projects[1], date: '2024-04-10' },
  { project: projects[3], date: '2024-04-08' },
  { project: projects[5], date: '2024-04-05' },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-semibold text-primary-foreground">
              {currentUser.name.charAt(0)}
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
                <p className="text-muted-foreground">{currentUser.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {currentUser.role === 'student' ? 'Estudiante' : currentUser.role === 'teacher' ? 'Docente' : 'Administrador'}
                  </Badge>
                  <Badge variant="outline">{currentUser.career}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/perfil/configuracion">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Configuración
                  </Button>
                </Link>
                <Link href="/subir">
                  <Button size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Subir Proyecto
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-secondary/50 p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{currentUser.uploadedProjects}</p>
                <p className="text-sm text-muted-foreground">Proyectos</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{currentUser.favorites.length}</p>
                <p className="text-sm text-muted-foreground">Favoritos</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3 text-center">
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Descargas</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3 text-center">
                <p className="text-2xl font-bold text-foreground">2.4K</p>
                <p className="text-sm text-muted-foreground">Vistas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects" className="gap-2">
            <FileText className="h-4 w-4" />
            Mis Proyectos
          </TabsTrigger>
          <TabsTrigger value="favorites" className="gap-2">
            <Heart className="h-4 w-4" />
            Favoritos
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Clock className="h-4 w-4" />
            Historial
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Cuenta
          </TabsTrigger>
        </TabsList>

        {/* My Projects */}
        <TabsContent value="projects" className="mt-6">
          {userProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No has subido proyectos
                </h3>
                <p className="mt-2 text-center text-muted-foreground">
                  Comparte tu proyecto final con la comunidad académica
                </p>
                <Link href="/subir" className="mt-4">
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Subir Proyecto
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <Link
                          href={`/proyecto/${project.id}`}
                          className="font-semibold text-foreground hover:text-primary"
                        >
                          {project.title}
                        </Link>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <Badge
                            variant="default"
                            className={
                              project.status === 'approved'
                                ? 'bg-green-600'
                                : project.status === 'pending'
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                            }
                          >
                            {project.status === 'approved'
                              ? 'Aprobado'
                              : project.status === 'pending'
                              ? 'Pendiente'
                              : 'Rechazado'}
                          </Badge>
                          <span>|</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {project.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {project.downloads}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/proyecto/${project.id}`}>
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Favorites */}
        <TabsContent value="favorites" className="mt-6">
          {favoriteProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No tienes favoritos
                </h3>
                <p className="mt-2 text-center text-muted-foreground">
                  Guarda proyectos que te interesen para acceder a ellos fácilmente
                </p>
                <Link href="/dashboard" className="mt-4">
                  <Button variant="outline">Explorar Proyectos</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/proyecto/${project.id}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <Badge variant="secondary" className="mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.author}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {project.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {project.downloads}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Download History */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Descargas</CardTitle>
              <CardDescription>
                Proyectos que has descargado recientemente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {downloadHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <Link
                          href={`/proyecto/${item.project.id}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {item.project.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {item.project.author}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString('es-PY')}
                      </p>
                      <Button variant="ghost" size="sm" className="mt-1 h-7 gap-1">
                        <Download className="h-3 w-3" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="settings" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tu información de perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      defaultValue={currentUser.name}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      defaultValue={currentUser.email}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="career">Carrera</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="career"
                      defaultValue={currentUser.career}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={() => setIsEditing(false)}>
                        Guardar cambios
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar perfil
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>
                  Gestiona tu contraseña y seguridad de cuenta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-foreground">Cambiar contraseña</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Se recomienda usar una contraseña fuerte que no uses en otros sitios
                  </p>
                  <Button variant="outline" className="mt-4">
                    Cambiar contraseña
                  </Button>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-foreground">Sesiones activas</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Gestiona los dispositivos donde has iniciado sesión
                  </p>
                  <Button variant="outline" className="mt-4">
                    Ver sesiones
                  </Button>
                </div>
                <div className="rounded-lg border border-destructive/50 p-4">
                  <h4 className="font-medium text-destructive">Eliminar cuenta</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Elimina permanentemente tu cuenta y todos tus datos
                  </p>
                  <Button variant="destructive" className="mt-4">
                    Eliminar cuenta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
