import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface Testimonial {
  key: string;
  quote: string;
  name: string;
  age?: string;
}

interface StoredTestimonial {
  id: string;
  quote: string;
  name: string;
  age: string | null;
  created_at: string;
}

// Citations de cadrage, reprises de la maquette d'origine. Ce ne sont pas des
// témoignages de participants — personne n'a encore suivi le programme — et
// chacune est attribuée pour que la distinction reste évidente à la lecture.
const visionQuotes = [
  {
    key: 'vision-1',
    quote: 'Être écouté sans jugement peut déjà être le début d’un changement.',
    source: 'Vision Safe Space'
  },
  {
    key: 'vision-2',
    quote:
      'Un espace où l’on peut parler librement est un espace dont beaucoup de jeunes ont besoin.',
    source: 'Témoignage à venir'
  },
  {
    key: 'vision-3',
    quote:
      'La voix des jeunes doit participer à la construction des solutions qui les concernent.',
    source: 'Born From School'
  }
];

const ageRanges = ['15–17 ans', '18–21 ans', '22–25 ans', 'Plus de 25 ans'];

const TESTIMONIALS_KEY = ['testimonials'] as const;

async function fetchTestimonials(): Promise<StoredTestimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, quote, name, age, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

async function postTestimonial(input: {
  quote: string;
  name?: string;
  age?: string;
}): Promise<void> {
  const { error } = await supabase.from('testimonials').insert({
    quote: input.quote,
    // la colonne vaut "Anonyme" par défaut quand aucun prénom n'est donné
    ...(input.name ? { name: input.name } : {}),
    age: input.age ?? null
  });

  if (error) throw error;
}

export default function Voices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const queryClient = useQueryClient();

  const { data: saved = [], isLoading, isError } = useQuery({
    queryKey: TESTIMONIALS_KEY,
    queryFn: fetchTestimonials,
    // Supabase injoignable : mieux vaut afficher vite l'état d'erreur que
    // laisser un « Chargement… » tourner pendant des dizaines de secondes.
    retry: 1
  });

  const [formData, setFormData] = useState({ name: '', age: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: postTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIALS_KEY });
      setFormData({ name: '', age: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  });

  // Les messages les plus récents en premier.
  const testimonials: Testimonial[] = saved.map((t) => ({
    key: t.id,
    quote: t.quote,
    name: t.name,
    age: t.age ?? undefined
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quote = formData.message.trim();
    if (!quote || mutation.isPending) return;

    mutation.mutate({
      quote,
      name: formData.name.trim() || undefined,
      age: formData.age.trim() || undefined
    });
  };

  return (
    <section id="voix" ref={ref} className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--brand-deep)' }}>
            Votre voix compte.
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: 'var(--brand-ink)', opacity: 0.75 }}>
            Safe Space ne veut pas seulement parler aux jeunes. Le projet veut aussi les
            écouter. Partagez votre point de vue, vos besoins ou une idée.
          </p>
        </motion.div>

        {isLoading && (
          <p className="text-center mb-8" style={{ color: 'var(--brand-ink)', opacity: 0.6 }}>
            Chargement des messages…
          </p>
        )}

        {isError && (
          <p className="text-center mb-8" style={{ color: 'var(--brand-ink)', opacity: 0.6 }}>
            Les messages partagés ne sont pas accessibles pour le moment.
          </p>
        )}

        {/* Citations de cadrage */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visionQuotes.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--brand-paper)',
                borderColor: 'rgba(29, 102, 100, 0.12)'
              }}
            >
              <p className="text-base leading-relaxed mb-4 italic" style={{ color: 'var(--brand-ink)' }}>
                «&nbsp;{item.quote}&nbsp;»
              </p>
              <div className="text-sm" style={{ color: 'var(--brand-ink)', opacity: 0.55 }}>
                — {item.source}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Messages laissés par les visiteurs */}
        {testimonials.length > 0 && (
          <p
            className="text-center text-sm uppercase tracking-wide mb-6"
            style={{ color: 'var(--brand-gold)' }}
          >
            {testimonials.length === 1
              ? '1 personne s’est déjà exprimée'
              : `${testimonials.length} personnes se sont déjà exprimées`}
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index < 3 ? index * 0.1 : 0 }}
                layout
                className="bg-gradient-to-br from-[var(--brand-paper)] to-white p-6 rounded-xl border hover:shadow-lg transition-all"
                style={{ borderColor: 'rgba(217, 164, 65, 0.2)' }}
              >
                <div className="mb-4">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                    <path d="M0 24V12C0 5.33333 2.66667 1.33333 8 0L9.6 2.4C6.93333 3.73333 5.06667 5.6 4 8C2.93333 10.4 2.53333 12.9333 2.8 15.6H11.2V24H0ZM20.8 24V12C20.8 5.33333 23.4667 1.33333 28.8 0L30.4 2.4C27.7333 3.73333 25.8667 5.6 24.8 8C23.7333 10.4 23.3333 12.9333 23.6 15.6H32V24H20.8Z" fill="var(--brand-gold)" opacity="0.3"/>
                  </svg>
                </div>

                <p className="text-base leading-relaxed mb-4 italic" style={{ color: 'var(--brand-ink)' }}>
                  {testimonial.quote}
                </p>

                <div className="pt-3 border-t" style={{ borderColor: 'rgba(29, 102, 100, 0.1)' }}>
                  <div className="font-semibold" style={{ color: 'var(--brand-teal)' }}>
                    {testimonial.name}
                    {testimonial.age && <span className="font-normal text-sm ml-2" style={{ color: 'var(--brand-ink)', opacity: 0.6 }}>
                      {testimonial.age}
                    </span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Testimonial form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="rounded-2xl p-8 sm:p-10 border-2"
            style={{
              backgroundColor: 'var(--brand-paper)',
              borderColor: 'var(--brand-gold)'
            }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: 'var(--brand-deep)' }}>
              Partagez votre point de vue
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-ink)' }}>
                    Prénom ou pseudonyme (facultatif)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Anonyme si vous préférez"
                    maxLength={80}
                    className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: 'rgba(29, 102, 100, 0.2)',
                      color: 'var(--brand-ink)'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-ink)' }}>
                    Tranche d’âge (facultatif)
                  </label>
                  <select
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: 'rgba(29, 102, 100, 0.2)',
                      color: 'var(--brand-ink)'
                    }}
                  >
                    <option value="">Tranche d’âge (facultatif)</option>
                    {ageRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-ink)' }}>
                  Message <span style={{ color: 'var(--brand-gold)' }}>*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Que pensez-vous de Safe Space ? Qu’aimeriez-vous trouver dans un espace comme celui-ci ?"
                  required
                  rows={4}
                  maxLength={2000}
                  className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    borderColor: 'rgba(29, 102, 100, 0.2)',
                    color: 'var(--brand-ink)'
                  }}
                />
              </div>

              {mutation.isError && (
                <p className="text-sm text-center" style={{ color: '#b3261e' }}>
                  Votre message n’a pas pu être enregistré. Réessayez dans un instant.
                </p>
              )}

              {submitted ? (
                <div
                  className="w-full px-6 py-4 rounded-lg font-semibold text-center transition-all"
                  style={{ backgroundColor: 'rgba(29, 102, 100, 0.1)', color: 'var(--brand-teal)' }}
                >
                  ✓ Merci ! Votre point de vue est maintenant visible sur cette page.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={mutation.isPending || !formData.message.trim()}
                  className="w-full px-6 py-4 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'var(--brand-teal)' }}
                >
                  {mutation.isPending ? 'Envoi en cours…' : 'Partager mon point de vue'}
                  <Send size={18} />
                </button>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
