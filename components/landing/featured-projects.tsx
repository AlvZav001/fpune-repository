import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download, Eye, Calendar } from 'lucide-react';
import { projects } from '@/lib/data';

export function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Proyectos Destacados
            </h2>
            <p className="mt-2 text-muted-foreground">
              Descubre los trabajos finales más relevantes y descargados de nuestra comunidad
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/proyecto/${project.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    {project.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{project.career}</p>
                </div>
              </div>
              
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.author}</p>
                
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
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
                    <Calendar className="h-3.5 w-3.5" />
                    {project.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {project.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" />
                    {project.downloads.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
