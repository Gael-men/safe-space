import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const problems = [
  {
    emoji: '🧠',
    title: 'Bien-être psychologique',
    description: "Les jeunes peuvent traverser anxi\u00e9t\u00e9, solitude, stress et mal-\u00eatre sans disposer d\u2019un espace adapt\u00e9 pour en parler."
  },
  {
    emoji: '🤝',
    title: 'Isolement émotionnel',
    description: "La connexion num\u00e9rique ne remplace pas toujours le lien humain, l\u2019\u00e9coute et le sentiment d\u2019appartenance."
  },
  {
    emoji: '🗣️',
    title: 'Le poids des tabous',
    description: "La sant\u00e9 mentale, les \u00e9motions et la sexualit\u00e9 restent parfois difficiles \u00e0 aborder librement."
  },
  {
    emoji: '🧭',
    title: 'Besoin de repères',
    description: "Les jeunes ont besoin d\u2019informations fiables, d\u2019\u00e9coute et d\u2019accompagnement adapt\u00e9s \u00e0 leurs r\u00e9alit\u00e9s."
  }
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projet" ref={ref} className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'var(--brand-deep)' }}>
            Une crise silencieuse.
            <br />
            Une réponse humaine.
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--brand-ink)', opacity: 0.75 }}>
            Derrière les sourires affichés sur les réseaux sociaux se cachent parfois la peur du jugement, les relations toxiques, le manque de confiance en soi, la pression sociale ou encore l'absence d'écoute et de soutien.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-[var(--brand-paper)] p-6 rounded-xl border hover:shadow-lg transition-all group"
              style={{ borderColor: 'rgba(29, 102, 100, 0.1)' }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {problem.emoji}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--brand-deep)' }}>
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-ink)', opacity: 0.7 }}>
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
