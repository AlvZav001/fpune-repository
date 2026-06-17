import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'FPUNE Repository - Banco Digital de Proyectos Finales',
  description: 'Repositorio digital de proyectos finales de la Facultad Politécnica de la Universidad Nacional del Este. Busca, explora y descarga proyectos académicos.',
  keywords: ['FPUNE', 'repositorio', 'proyectos finales', 'universidad', 'académico', 'tesis'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
