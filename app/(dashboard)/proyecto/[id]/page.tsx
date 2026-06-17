'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Download,
  Eye,
  Calendar,
  User,
  GraduationCap,
  Tag,
  FileText,
  Heart,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { projects } from '@/lib/data';

export default function ProjectDetailPage() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <FileText className="h-16 w-16 text-muted-foreground/50" />
        <h1 className="mt-4 text-xl font-semibold text-foreground">
          Proyecto no encontrado
        </h1>
        <p className="mt-2 text-muted-foreground">
          El proyecto que buscas no existe o ha sido eliminado.
        </p>
        <Link href="/dashboard" className="mt-6">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.career === project.career)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-foreground">
          Proyectos
        </Link>
        <span>/</span>
        <span className="truncate text-foreground">{project.title}</span>
      </div>

      {/* Back Button */}
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <Badge variant="secondary">{project.category}</Badge>
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {project.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Autor</p>
                  <p className="font-medium text-foreground">{project.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Carrera</p>
                  <p className="font-medium text-foreground">{project.career}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Año</p>
                  <p className="font-medium text-foreground">{project.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Tag className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categoría</p>
                  <p className="font-medium text-foreground">{project.category}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{project.views.toLocaleString()} vistas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Download className="h-4 w-4" />
                <span>{project.downloads.toLocaleString()} descargas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Publicado el {new Date(project.createdAt).toLocaleDateString('es-PY')}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="preview">Vista Previa</TabsTrigger>
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="details">Detalles</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <div className="rounded-xl border border-border bg-card">
                {/* PDF Viewer Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPdfPage(Math.max(1, pdfPage - 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Página {pdfPage} de 45
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPdfPage(Math.min(45, pdfPage + 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPdfZoom(Math.max(50, pdfZoom - 25))}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[3rem] text-center text-sm text-muted-foreground">
                      {pdfZoom}%
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPdfZoom(Math.min(200, pdfZoom + 25))}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* PDF Preview Area */}
                <div className="flex min-h-[500px] items-center justify-center bg-muted/30 p-8">
                  <div
                    className="flex aspect-[8.5/11] w-full max-w-lg flex-col items-center justify-center rounded-lg border border-border bg-card shadow-lg"
                    style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'center' }}
                  >
                    <FileText className="h-16 w-16 text-muted-foreground/30" />
                    <p className="mt-4 text-lg font-medium text-foreground">{project.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{project.author}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Página {pdfPage}</p>
                    <div className="mt-6 px-8 text-center text-sm text-muted-foreground">
                      <p>Vista previa del documento PDF</p>
                      <p className="mt-1">Descarga el archivo completo para ver el contenido</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="description" className="mt-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Descripción del Proyecto</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-medium text-foreground">Tecnologías utilizadas</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Información Técnica</h3>
                <dl className="mt-4 space-y-4">
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Formato</dt>
                    <dd className="font-medium text-foreground">PDF</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Tamaño</dt>
                    <dd className="font-medium text-foreground">4.5 MB</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Páginas</dt>
                    <dd className="font-medium text-foreground">45</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Estado</dt>
                    <dd>
                      <Badge variant="default" className="bg-green-600">
                        Aprobado
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Fecha de publicación</dt>
                    <dd className="font-medium text-foreground">
                      {new Date(project.createdAt).toLocaleDateString('es-PY', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Download Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Descargar Proyecto</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Descarga el documento completo en formato PDF
            </p>
            <Button className="mt-4 w-full gap-2">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
            <Button variant="outline" className="mt-2 w-full gap-2">
              <ExternalLink className="h-4 w-4" />
              Abrir en nueva pestaña
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Estadísticas</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Vistas totales</span>
                <span className="font-medium text-foreground">{project.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Descargas totales</span>
                <span className="font-medium text-foreground">{project.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Guardado en favoritos</span>
                <span className="font-medium text-foreground">48 veces</span>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Proyectos Relacionados</h3>
              <div className="mt-4 space-y-3">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.id}
                    href={`/proyecto/${related.id}`}
                    className="block rounded-lg border border-border p-3 transition-colors hover:border-primary/50 hover:bg-secondary/50"
                  >
                    <h4 className="line-clamp-2 text-sm font-medium text-foreground">
                      {related.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">{related.author}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
