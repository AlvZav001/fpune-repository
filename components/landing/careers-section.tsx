import Link from 'next/link';
import { ArrowRight, Cpu, Zap, Building2, Cog, Factory, Code } from 'lucide-react';
import { careers } from '@/lib/data';

const careerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  INF: Cpu,
  ELE: Zap,
  CIV: Building2,
  MEC: Cog,
  IND: Factory,
  LAS: Code,
};

export function CareersSection() {
  return (
    <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Explora por Carrera
          </h2>
          <p className="mt-2 text-muted-foreground">
            Encuentra proyectos específicos de tu área de estudio
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => {
            const Icon = careerIcons[career.shortName] || Cpu;
            return (
              <Link
                key={career.id}
                href={`/dashboard?career=${encodeURIComponent(career.name)}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-foreground">{career.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {career.projectCount} proyectos
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
