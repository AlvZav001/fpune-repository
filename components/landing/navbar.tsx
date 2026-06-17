'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, Search } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">FPUNE Repository</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Banco Digital de Proyectos</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/" className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Inicio
          </Link>
          <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Explorar
          </Link>
          <Link href="/estadisticas" className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Estadísticas
          </Link>
          <Link href="/sobre-nosotros" className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Acerca de
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">
              Registrarse
            </Button>
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="flex flex-col px-4 py-4">
            <Link href="/" className="py-2 text-sm font-medium text-foreground/80" onClick={() => setIsOpen(false)}>
              Inicio
            </Link>
            <Link href="/dashboard" className="py-2 text-sm font-medium text-foreground/80" onClick={() => setIsOpen(false)}>
              Explorar
            </Link>
            <Link href="/estadisticas" className="py-2 text-sm font-medium text-foreground/80" onClick={() => setIsOpen(false)}>
              Estadísticas
            </Link>
            <Link href="/sobre-nosotros" className="py-2 text-sm font-medium text-foreground/80" onClick={() => setIsOpen(false)}>
              Acerca de
            </Link>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full">
                  Registrarse
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
