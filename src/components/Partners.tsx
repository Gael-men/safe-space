import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { School, HandHeart, Briefcase, MapPin, Mail, Phone } from 'lucide-react';

const partnerTypes = [
  {
    icon: School,
    title: 'Établissements scolaires',
    description: 'Intégrez Safe Space dans votre établissement et offrez à vos élèves un espace de parole encadré et bienveillant.'
  },
  {
    icon: HandHeart,
    title: 'ONG & Associations',
    description: "Amplifiez votre impact en co-portant des sessions Safe Space dans vos zones d\u2019intervention."
  },
  {
    icon: Briefcase,
    title: 'Entreprises & Bailleurs',
    description: 'Soutenez financièrement ou matériellement le projet et contribuez au développement de la jeunesse togolaise.'
  }
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="partenaires" ref={ref} className="py-20 sm:py-32" style={{ backgroundColor: 'var(--brand-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--brand-deep)' }}>
            Rejoignez le mouvement
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'var(--brand-ink)', opacity: 0.75 }}>
            Vous êtes une école, une entreprise, une ONG ou un bailleur de fonds ? Ensemble, nous pouvons changer la vie de milliers de jeunes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Partner types */}
          {partnerTypes.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border hover:shadow-lg transition-all"
                style={{ borderColor: 'rgba(29, 102, 100, 0.1)' }}
              >
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(217, 164, 65, 0.15)' }}
                >
                  <Icon size={28} style={{ color: 'var(--brand-gold)' }} />
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--brand-deep)' }}>
                  {partner.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-ink)', opacity: 0.7 }}>
                  {partner.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div 
            className="rounded-2xl p-6 sm:p-10 relative overflow-hidden"
            style={{ backgroundColor: 'var(--brand-deep)' }}
          >
            {/* Ambient glow */}
            <div className="ambient-glow-gold" style={{ top: '-60px', right: '-30px' }} />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: 'var(--brand-gold)' }}>
                Nous contacter
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="flex-shrink-0 mt-1" style={{ color: 'var(--brand-gold)' }} />
                  <span className="text-lg" style={{ color: 'var(--brand-paper)' }}>
                    Lomé, Togo
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={24} className="flex-shrink-0 mt-1" style={{ color: 'var(--brand-gold)' }} />
                  <a
                    href="mailto:bornfromschool.hrm@gmail.com"
                    // L'adresse est le plus long mot insécable de la page.
                    // min-w-0 lève la largeur minimale implicite que flex donne
                    // à ses enfants ; break-words l'autorise à se couper plutôt
                    // qu'à déborder si l'écran est vraiment étroit.
                    className="text-base sm:text-lg min-w-0 break-words hover:underline transition-all"
                    style={{ color: 'var(--brand-paper)' }}
                  >
                    bornfromschool.hrm@gmail.com
                  </a>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={24} className="flex-shrink-0 mt-1" style={{ color: 'var(--brand-gold)' }} />
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+22890175639"
                      className="text-lg hover:underline transition-all"
                      style={{ color: 'var(--brand-paper)' }}
                    >
                      +228 90 17 56 39
                    </a>
                    <a
                      href="tel:+22893783083"
                      className="text-lg hover:underline transition-all"
                      style={{ color: 'var(--brand-paper)' }}
                    >
                      +228 93 78 30 83
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
