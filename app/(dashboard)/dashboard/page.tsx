'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  ArrowRight,
  FileText,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react';
import { projects, careers, categories, statistics } from '@/lib/data';

const years = ['2024', '2023', '2022', '2021', '2020'];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCareer =
      selectedCareer === 'all' || project.career === selectedCareer;
    const matchesYear =
      selectedYear === 'all' || project.year.toString() === selectedYear;
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;

    return matchesSearch && matchesCareer && matchesYear && matchesCategory;
  });

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const popularProjects = [...projects]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Bienvenida, María
          </h1>
          <p className="mt-1 text-muted-foreground">
            Explora los proyectos finales de la comunidad FPUNE
          </p>
        </div>
        <Link href="/subir">
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Subir Proyecto
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Este Mes</p>
              <p className="text-2xl font-bold text-foreground">+{statistics.projectsThisMonth}</p>
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
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10 text-chart-4">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mis Favoritos</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar proyectos por título, autor o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtrar por:</span>
            </div>
            
            <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
              <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                <SelectTrigger>
                  <SelectValue placeholder="Carrera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las carreras</SelectItem>
                  {careers.map((career) => (
                    <SelectItem key={career.id} value={career.name}>
                      {career.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los años</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results or Recent/Popular */}
      {searchQuery || selectedCareer !== 'all' || selectedYear !== 'all' || selectedCategory !== 'all' ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Resultados ({filteredProjects.length})
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No se encontraron proyectos
              </h3>
              <p className="mt-2 text-muted-foreground">
                Intenta ajustar los filtros o buscar con otras palabras clave.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Projects */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Proyectos Recientes
                </h2>
              </div>
              <Link href="/dashboard/explorar?sort=recent">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Popular Projects */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-chart-2" />
                <h2 className="text-lg font-semibold text-foreground">
                  Más Populares
                </h2>
              </div>
              <Link href="/dashboard/explorar?sort=popular">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {popularProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Link
      href={`/proyecto/${project.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <div className="flex h-28 items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4">
        <Badge variant="secondary">{project.category}</Badge>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-medium text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.author}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {project.year}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {project.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {project.downloads.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProjectListItem({ project }: { project: typeof projects[0] }) {
  return (
    <Link
      href={`/proyecto/${project.id}`}
      className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground">{project.author}</p>
      </div>
      <div className="hidden text-right text-xs text-muted-foreground sm:block">
        <p className="flex items-center justify-end gap-1">
          <Download className="h-3 w-3" />
          {project.downloads}
        </p>
        <p>{project.year}</p>
      </div>
    </Link>
  );
}
