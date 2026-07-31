import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

// Des cibles, pas un bilan : les libellés sont volontairement au futur pour
// qu'aucun visiteur ne les lise comme des résultats déjà atteints.
const objectives = [
  { value: '500+', label: 'jeunes à toucher / première phase' },
  { value: '12', label: 'écoles et lycées à mobiliser' },
  { value: '30+', label: 'ateliers à organiser' },
  { value: '3', label: 'communes visées au Togo' },
  { value: '85%', label: 'de satisfaction visée' },
  { value: '100%', label: 'bénévoles & engagés' }
];

export default function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="impact" ref={ref} className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--brand-deep)' }}>
            Nos objectifs
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'var(--brand-ink)', opacity: 0.75 }}>
            Les cibles que nous nous sommes fixées pour la première phase du projet.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {objectives.map((objective, index) => (
            <motion.div
              key={objective.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-[var(--brand-paper)] to-white border hover:shadow-lg transition-all"
              style={{ borderColor: 'rgba(217, 164, 65, 0.2)' }}
            >
              <div 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2"
                style={{ color: 'var(--brand-gold)' }}
              >
                {objective.value}
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: 'var(--brand-ink)', opacity: 0.7 }}>
                {objective.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div 
            className="rounded-2xl p-8 sm:p-12 relative overflow-hidden"
            style={{ backgroundColor: 'var(--brand-deep)' }}
          >
            {/* Ambient glow */}
            <div className="ambient-glow-gold" style={{ top: '-80px', right: '-40px' }} />

            <div className="relative z-10">
              <Quote size={48} className="mb-6 opacity-50" style={{ color: 'var(--brand-gold)' }} />
              
              <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--brand-gold)' }}>
                Notre vision
              </h3>

              <p className="text-xl sm:text-2xl leading-relaxed font-serif" style={{ color: 'var(--brand-paper)' }}>
                Faire de Safe Space un mouvement national pour le bien-être des jeunes togolais — de l'école à l'université, du quartier au pays entier.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
