import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, GraduationCap, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Diagnostic',
    description: 'Identification des besoins via enquêtes dans les établissements',
    icon: Search
  },
  {
    number: 2,
    title: 'Formation',
    description: 'Préparation des animateurs et volontaires Safe Space',
    icon: GraduationCap
  },
  {
    number: 3,
    title: 'Déploiement',
    description: "Ateliers, sessions d\u2019\u00e9coute et animations dans les \u00e9coles",
    icon: Rocket
  },
  {
    number: 4,
    title: 'Suivi',
    description: 'Évaluation des impacts et ajustement du programme en continu',
    icon: BarChart3
  }
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 sm:py-32" style={{ backgroundColor: 'var(--brand-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--brand-deep)' }}>
            Comment ça marche ?
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2" style={{ backgroundColor: 'rgba(29, 102, 100, 0.2)' }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all text-center">
                    {/* Icon circle */}
                    <div 
                      className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: 'var(--brand-teal)' }}
                    >
                      <Icon size={32} color="white" />
                    </div>

                    {/* Step number */}
                    <div className="text-sm font-bold mb-2 tracking-wider" style={{ color: 'var(--brand-gold)' }}>
                      ÉTAPE {step.number}
                    </div>

                    <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--brand-deep)' }}>
                      {step.title}
                    </h3>

                    <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-ink)', opacity: 0.7 }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
