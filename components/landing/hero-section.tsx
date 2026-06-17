'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, FileText, Users, GraduationCap } from 'lucide-react';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
      
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            Plataforma activa con más de 800 proyectos
          </div>
          
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Banco Digital de{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proyectos Finales
            </span>{' '}
            FPUNE
          </h1>
          
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Explora, comparte y descubre proyectos de graduación de la Facultad Politécnica 
            de la Universidad Nacional del Este. Tu conocimiento, al alcance de todos.
          </p>

          <form onSubmit={handleSearch} className="mt-10">
            <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar proyectos por título, autor o tema..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-11 pr-4 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                Buscar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span>Búsquedas populares:</span>
            <button 
              onClick={() => router.push('/dashboard?q=inteligencia artificial')}
              className="rounded-full border border-border bg-background px-3 py-1 transition-colors hover:bg-secondary"
            >
              Inteligencia Artificial
            </button>
            <button 
              onClick={() => router.push('/dashboard?q=desarrollo web')}
              className="rounded-full border border-border bg-background px-3 py-1 transition-colors hover:bg-secondary"
            >
              Desarrollo Web
            </button>
            <button 
              onClick={() => router.push('/dashboard?q=automatización')}
              className="rounded-full border border-border bg-background px-3 py-1 transition-colors hover:bg-secondary"
            >
              Automatización
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Proyectos Verificados</h3>
              <p className="text-sm text-muted-foreground">Todos los trabajos son revisados por docentes</p>
            </div>
          </div>
          
          <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Múltiples Carreras</h3>
              <p className="text-sm text-muted-foreground">6 carreras de ingeniería disponibles</p>
            </div>
          </div>
          
          <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Comunidad Activa</h3>
              <p className="text-sm text-muted-foreground">Miles de estudiantes y docentes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
