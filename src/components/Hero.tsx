import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20" style={{ backgroundColor: 'var(--brand-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium border" style={{ 
              borderColor: 'var(--brand-gold)',
              color: 'var(--brand-ink)',
              backgroundColor: 'rgba(217, 164, 65, 0.1)'
            }}>
              Projet Social & Éducatif · Togo 2026
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="block" style={{ color: 'var(--brand-ink)' }}>Un espace pour</span>
              <span className="block bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-gold)] bg-clip-text text-transparent">
                parler.
              </span>
              <span className="block" style={{ color: 'var(--brand-ink)' }}>Grandir.</span>
              <span className="block" style={{ color: 'var(--brand-ink)' }}>Se construire.</span>
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ color: 'var(--brand-ink)', opacity: 0.8 }}>
              Safe Space est un projet social et éducatif conçu pour offrir aux jeunes togolais un espace sécurisé, bienveillant et accessible dédié à l'écoute, à la sensibilisation et au développement personnel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('#projet')}
                className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
                style={{ backgroundColor: 'var(--brand-teal)' }}
              >
                Découvrir le projet
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('#voix')}
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-md border-2"
                style={{ 
                  borderColor: 'var(--brand-teal)',
                  color: 'var(--brand-teal)'
                }}
              >
                Donner son avis
              </button>
            </div>
          </motion.div>

          {/* Right: Featured card with ambient glows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div 
              className="relative rounded-2xl p-8 sm:p-10 overflow-hidden shadow-2xl"
              style={{ backgroundColor: 'var(--brand-deep)' }}
            >
              {/* Ambient glows */}
              <div className="ambient-glow-gold" style={{ top: '-100px', right: '-50px' }} />
              <div className="ambient-glow-teal" style={{ bottom: '-80px', left: '-60px' }} />

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide" style={{
                  backgroundColor: 'rgba(217, 164, 65, 0.2)',
                  color: 'var(--brand-gold)'
                }}>
                  SAFE SPACE
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--brand-paper)' }}>
                  Bien dans sa tête, bien dans son corps, maître de son avenir.
                </h2>

                <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--brand-paper)', opacity: 0.85 }}>
                  Un projet holistique d'accompagnement de la jeunesse de 15 à 25 ans.
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <div className="w-12 h-1 rounded-full" style={{ backgroundColor: 'var(--brand-gold)' }} />
                  <div className="w-8 h-1 rounded-full" style={{ backgroundColor: 'var(--brand-teal)' }} />
                  <div className="w-4 h-1 rounded-full" style={{ backgroundColor: 'var(--brand-gold)', opacity: 0.5 }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
