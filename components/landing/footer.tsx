import Link from 'next/link';
import { BookOpen, Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  plataforma: [
    { label: 'Explorar Proyectos', href: '/dashboard' },
    { label: 'Subir Proyecto', href: '/subir' },
    { label: 'Estadísticas', href: '/estadisticas' },
    { label: 'Categorías', href: '/dashboard' },
  ],
  carreras: [
    { label: 'Ing. en Informática', href: '/dashboard?career=Ingeniería en Informática' },
    { label: 'Ing. Eléctrica', href: '/dashboard?career=Ingeniería Eléctrica' },
    { label: 'Ing. Civil', href: '/dashboard?career=Ingeniería Civil' },
    { label: 'Ing. Mecánica', href: '/dashboard?career=Ingeniería Mecánica' },
  ],
  universidad: [
    { label: 'Sitio Oficial FPUNE', href: 'https://www.fpune.edu.py', external: true },
    { label: 'Universidad Nacional del Este', href: 'https://www.une.edu.py', external: true },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Política de Privacidad', href: '/privacidad' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">FPUNE Repository</span>
                <span className="text-xs text-muted-foreground">Banco Digital de Proyectos</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Repositorio digital de proyectos finales de la Facultad Politécnica 
              de la Universidad Nacional del Este.
            </p>
            
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Ciudad del Este, Paraguay</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+595 61 500 159</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>repositorio@fpune.edu.py</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Plataforma</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.plataforma.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Carreras</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.carreras.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Universidad</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.universidad.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com/fpune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/fpune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/fpune"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} FPUNE Repository. Facultad Politécnica - Universidad Nacional del Este.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
