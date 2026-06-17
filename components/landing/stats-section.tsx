import { FileText, GraduationCap, Download, Users } from 'lucide-react';
import { statistics } from '@/lib/data';

const stats = [
  {
    label: 'Proyectos Totales',
    value: statistics.totalProjects.toLocaleString(),
    icon: FileText,
    description: 'Trabajos finales publicados',
  },
  {
    label: 'Carreras',
    value: statistics.totalCareers.toString(),
    icon: GraduationCap,
    description: 'Programas académicos',
  },
  {
    label: 'Descargas',
    value: statistics.totalDownloads.toLocaleString(),
    icon: Download,
    description: 'Documentos descargados',
  },
  {
    label: 'Usuarios Activos',
    value: statistics.activeUsers.toLocaleString(),
    icon: Users,
    description: 'Estudiantes y docentes',
  },
];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Una plataforma en constante crecimiento
          </h2>
          <p className="mt-3 text-muted-foreground">
            Números que reflejan el compromiso académico de nuestra comunidad
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
