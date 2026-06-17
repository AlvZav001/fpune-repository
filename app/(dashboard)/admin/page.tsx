'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  MoreHorizontal,
  Check,
  X,
  Eye,
  Trash2,
  Users,
  FileText,
  Clock,
  Shield,
  TrendingUp,
  Download,
  AlertTriangle,
  UserCheck,
  UserX,
} from 'lucide-react';
import { projects, pendingProjects, users, statistics } from '@/lib/data';

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof pendingProjects[0] | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    type: 'approve' | 'reject' | 'delete' | null;
    item: typeof pendingProjects[0] | typeof users[0] | null;
  }>({ type: null, item: null });

  const allProjects = [...projects, ...pendingProjects];
  
  const filteredProjects = allProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = () => {
    // Simulate approve action
    setActionDialog({ type: null, item: null });
  };

  const handleReject = () => {
    // Simulate reject action
    setActionDialog({ type: null, item: null });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Panel de Administración
          </h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Gestiona usuarios, proyectos y contenido de la plataforma
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Proyectos</p>
              <p className="text-2xl font-bold text-foreground">{statistics.totalProjects}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
              <p className="text-2xl font-bold text-foreground">{pendingProjects.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Usuarios</p>
              <p className="text-2xl font-bold text-foreground">{statistics.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10 text-chart-3">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Descargas</p>
              <p className="text-2xl font-bold text-foreground">{statistics.totalDownloads.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {pendingProjects.length > 0 && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                Proyectos pendientes de revisión
              </h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                Hay {pendingProjects.length} proyectos esperando aprobación
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
              >
                Revisar ahora
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pendientes
            {pendingProjects.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {pendingProjects.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-2">
            <FileText className="h-4 w-4" />
            Proyectos
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
        </TabsList>

        {/* Pending Projects Tab */}
        <TabsContent value="pending" className="mt-6">
          {pendingProjects.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <Check className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No hay proyectos pendientes
              </h3>
              <p className="mt-2 text-muted-foreground">
                Todos los proyectos han sido revisados
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {project.author} - {project.career}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {project.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 lg:shrink-0">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        Ver PDF
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1 bg-green-600 hover:bg-green-700"
                        onClick={() => setActionDialog({ type: 'approve', item: project })}
                      >
                        <Check className="h-4 w-4" />
                        Aprobar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-1"
                        onClick={() => setActionDialog({ type: 'reject', item: project })}
                      >
                        <X className="h-4 w-4" />
                        Rechazar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* All Projects Tab */}
        <TabsContent value="projects" className="mt-6">
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border p-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar proyectos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proyecto</TableHead>
                  <TableHead className="hidden md:table-cell">Autor</TableHead>
                  <TableHead className="hidden lg:table-cell">Carrera</TableHead>
                  <TableHead className="hidden sm:table-cell">Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.slice(0, 10).map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="max-w-[200px] sm:max-w-[300px]">
                        <p className="truncate font-medium text-foreground">
                          {project.title}
                        </p>
                        <p className="text-sm text-muted-foreground md:hidden">
                          {project.author}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {project.author}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="truncate">{project.career}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={
                          project.status === 'approved'
                            ? 'default'
                            : project.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className={
                          project.status === 'approved'
                            ? 'bg-green-600'
                            : ''
                        }
                      >
                        {project.status === 'approved'
                          ? 'Aprobado'
                          : project.status === 'pending'
                          ? 'Pendiente'
                          : 'Rechazado'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/proyecto/${project.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Ver PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-6">
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border p-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar usuarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Rol</TableHead>
                  <TableHead className="hidden lg:table-cell">Proyectos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="text-sm font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground sm:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          user.role === 'admin'
                            ? 'default'
                            : user.role === 'teacher'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {user.role === 'admin'
                          ? 'Administrador'
                          : user.role === 'teacher'
                          ? 'Docente'
                          : 'Estudiante'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.uploadedProjects}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Cambiar rol
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <UserX className="mr-2 h-4 w-4" />
                            Suspender usuario
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialogs */}
      <Dialog
        open={actionDialog.type !== null}
        onOpenChange={() => setActionDialog({ type: null, item: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === 'approve' && 'Aprobar proyecto'}
              {actionDialog.type === 'reject' && 'Rechazar proyecto'}
              {actionDialog.type === 'delete' && 'Eliminar proyecto'}
            </DialogTitle>
            <DialogDescription>
              {actionDialog.type === 'approve' &&
                '¿Estás seguro de que deseas aprobar este proyecto? Será visible públicamente.'}
              {actionDialog.type === 'reject' &&
                '¿Estás seguro de que deseas rechazar este proyecto? El autor será notificado.'}
              {actionDialog.type === 'delete' &&
                'Esta acción no se puede deshacer. El proyecto será eliminado permanentemente.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setActionDialog({ type: null, item: null })}
            >
              Cancelar
            </Button>
            {actionDialog.type === 'approve' && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
              >
                Aprobar
              </Button>
            )}
            {actionDialog.type === 'reject' && (
              <Button variant="destructive" onClick={handleReject}>
                Rechazar
              </Button>
            )}
            {actionDialog.type === 'delete' && (
              <Button variant="destructive" onClick={handleReject}>
                Eliminar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
