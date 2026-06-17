import { Navbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { StatsSection } from '@/components/landing/stats-section';
import { FeaturedProjects } from '@/components/landing/featured-projects';
import { CareersSection } from '@/components/landing/careers-section';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedProjects />
        <CareersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
