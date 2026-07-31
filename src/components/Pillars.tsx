import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Users, Target, HeartHandshake } from 'lucide-react';

const pillars = [
  {
    number: '01',
    title: 'Écoute & Expression',
    description: 'Ateliers de parole, journaux intimes guidés, cercles de partage confidentiels. Un espace où la parole est libre et le jugement banni.',
    icon: MessageCircle
  },
  {
    number: '02',
    title: 'Sensibilisation',
    description: 'Campagnes de prévention, animations en milieu scolaire sur la santé mentale, les relations saines et la confiance en soi.',
    icon: Users
  },
  {
    number: '03',
    title: 'Développement Personnel',
    description: 'Coaching collectif, formation aux soft skills, ateliers orientation et projet de vie pour des jeunes de 15 à 25 ans.',
    icon: Target
  },
  {
    number: '04',
    title: 'Accompagnement & Orientation',
    description: "R\u00e9f\u00e9rencement vers des structures sp\u00e9cialis\u00e9es, mentorat, suivi post-atelier et cr\u00e9ation d\u2019un r\u00e9seau de soutien local.",
    icon: HeartHandshake
  }
];

export default function Pillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="piliers" ref={ref} className="py-20 sm:py-32" style={{ backgroundColor: 'var(--brand-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--brand-deep)' }}>
            4 piliers pour un accompagnement global
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all group"
              >
                {/* Number badge */}
                <div 
                  className="absolute -top-4 -left-4 w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg"
                  style={{ 
                    backgroundColor: 'var(--brand-gold)',
                    color: 'var(--brand-deep)'
                  }}
                >
                  {pillar.number}
                </div>

                {/* Icon */}
                <div className="mb-4 pt-6">
                  <Icon 
                    size={40} 
                    className="group-hover:scale-110 transition-transform"
                    style={{ color: 'var(--brand-teal)' }}
                  />
                </div>

                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--brand-deep)' }}>
                  {pillar.title}
                </h3>

                <p className="text-base leading-relaxed" style={{ color: 'var(--brand-ink)', opacity: 0.75 }}>
                  {pillar.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 w-16 h-1 rounded-full group-hover:w-24 transition-all" style={{ backgroundColor: 'var(--brand-gold)' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
