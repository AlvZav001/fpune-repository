import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Upload, Search } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)]" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl lg:text-4xl">
              Comparte tu conocimiento con la comunidad académica
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Sube tu proyecto final y contribuye al banco de conocimientos de la FPUNE. 
              Tu trabajo puede inspirar a futuras generaciones.
            </p>
            
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/subir">
                <Button size="lg" variant="secondary" className="w-full gap-2 sm:w-auto">
                  <Upload className="h-4 w-4" />
                  Subir Proyecto
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                  <Search className="h-4 w-4" />
                  Explorar Proyectos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
