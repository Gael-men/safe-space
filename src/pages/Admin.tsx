import { useState } from 'react';
import { Link } from 'wouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LogOut, Trash2, ShieldAlert, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@/hooks/useSession';

interface StoredTestimonial {
  id: string;
  quote: string;
  name: string;
  age: string | null;
  created_at: string;
}

const TESTIMONIALS_KEY = ['testimonials'] as const;

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short',
});

async function fetchAllTestimonials(): Promise<StoredTestimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, quote, name, age, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

async function checkIsAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_admin');
  if (error) throw error;
  return data === true;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError('Email ou mot de passe incorrect.');
      setPending(false);
    }
    // En cas de succès, onAuthStateChange remonte la session et démonte ce formulaire.
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--brand-paper)' }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl p-8 border-2"
        style={{ borderColor: 'var(--brand-gold)' }}
      >
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--brand-deep)' }}>
          Espace administrateur
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--brand-ink)', opacity: 0.7 }}>
          Modération des témoignages Safe Space.
        </p>

        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-ink)' }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          className="w-full px-4 py-3 mb-4 rounded-lg border bg-white focus:outline-none focus:ring-2"
          style={{ borderColor: 'rgba(29, 102, 100, 0.2)', color: 'var(--brand-ink)' }}
        />

        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-ink)' }}>
          Mot de passe
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 mb-6 rounded-lg border bg-white focus:outline-none focus:ring-2"
          style={{ borderColor: 'rgba(29, 102, 100, 0.2)', color: 'var(--brand-ink)' }}
        />

        {error && (
          <p className="text-sm mb-4" style={{ color: '#b3261e' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full px-6 py-3 rounded-lg font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: 'var(--brand-teal)' }}
        >
          {pending ? 'Connexion…' : 'Se connecter'}
        </button>

        <Link
          href="/"
          className="mt-6 text-sm inline-flex items-center gap-1 hover:underline"
          style={{ color: 'var(--brand-teal)' }}
        >
          <ArrowLeft size={14} /> Retour au site
        </Link>
      </form>
    </div>
  );
}

function Moderation({ email }: { email: string | undefined }) {
  const queryClient = useQueryClient();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { data: testimonials = [], isLoading, isError } = useQuery({
    queryKey: TESTIMONIALS_KEY,
    queryFn: fetchAllTestimonials,
    retry: 1,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIALS_KEY });
      setPendingDeleteId(null);
    },
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-paper)' }}>
      <header className="bg-white border-b" style={{ borderColor: 'rgba(29, 102, 100, 0.15)' }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--brand-deep)' }}>
              Modération des témoignages
            </h1>
            {email && (
              <p className="text-sm" style={{ color: 'var(--brand-ink)', opacity: 0.6 }}>
                Connecté en tant que {email}
              </p>
            )}
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border hover:bg-gray-50"
            style={{ borderColor: 'rgba(29, 102, 100, 0.2)', color: 'var(--brand-teal)' }}
          >
            <LogOut size={15} /> Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="text-sm inline-flex items-center gap-1 mb-6 hover:underline"
          style={{ color: 'var(--brand-teal)' }}
        >
          <ArrowLeft size={14} /> Retour au site
        </Link>

        {isLoading && (
          <p style={{ color: 'var(--brand-ink)', opacity: 0.6 }}>Chargement…</p>
        )}

        {isError && (
          <p style={{ color: '#b3261e' }}>
            Impossible de charger les témoignages.
          </p>
        )}

        {!isLoading && !isError && testimonials.length === 0 && (
          <p style={{ color: 'var(--brand-ink)', opacity: 0.6 }}>
            Aucun témoignage n'a encore été laissé sur le site.
          </p>
        )}

        {deleteMutation.isError && (
          <p className="mb-4 text-sm" style={{ color: '#b3261e' }}>
            La suppression a échoué. Vérifie que ton compte est bien administrateur.
          </p>
        )}

        <ul className="space-y-4">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="bg-white rounded-xl p-5 border"
              style={{ borderColor: 'rgba(217, 164, 65, 0.3)' }}
            >
              <p className="italic mb-3" style={{ color: 'var(--brand-ink)' }}>
                {testimonial.quote}
              </p>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-sm">
                  <span className="font-semibold" style={{ color: 'var(--brand-teal)' }}>
                    {testimonial.name}
                  </span>
                  {testimonial.age && (
                    <span style={{ color: 'var(--brand-ink)', opacity: 0.6 }}> · {testimonial.age}</span>
                  )}
                  <span style={{ color: 'var(--brand-ink)', opacity: 0.5 }}>
                    {' · '}
                    {dateFormatter.format(new Date(testimonial.created_at))}
                  </span>
                </div>

                {pendingDeleteId === testimonial.id ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: 'var(--brand-ink)' }}>Supprimer définitivement ?</span>
                    <button
                      onClick={() => deleteMutation.mutate(testimonial.id)}
                      disabled={deleteMutation.isPending}
                      className="px-3 py-1.5 rounded-lg font-medium text-white disabled:opacity-50"
                      style={{ backgroundColor: '#b3261e' }}
                    >
                      {deleteMutation.isPending ? 'Suppression…' : 'Oui, supprimer'}
                    </button>
                    <button
                      onClick={() => setPendingDeleteId(null)}
                      className="px-3 py-1.5 rounded-lg border"
                      style={{ borderColor: 'rgba(29, 102, 100, 0.2)', color: 'var(--brand-ink)' }}
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setPendingDeleteId(testimonial.id)}
                    className="text-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-red-50"
                    style={{ borderColor: 'rgba(179, 38, 30, 0.3)', color: '#b3261e' }}
                  >
                    <Trash2 size={15} /> Supprimer
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--brand-paper)' }}>
      <div className="max-w-md text-center">
        <ShieldAlert size={40} className="mx-auto mb-4" style={{ color: 'var(--brand-gold)' }} />
        <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--brand-deep)' }}>
          Compte non autorisé
        </h1>
        <p className="mb-6" style={{ color: 'var(--brand-ink)', opacity: 0.75 }}>
          Ce compte est connecté mais ne fait pas partie des administrateurs Safe Space.
        </p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="px-5 py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: 'var(--brand-teal)' }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const { session, loading } = useSession();

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['is-admin', session?.user.id],
    queryFn: checkIsAdmin,
    enabled: Boolean(session),
    retry: 1,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--brand-paper)' }}>
        <p style={{ color: 'var(--brand-ink)', opacity: 0.6 }}>Chargement…</p>
      </div>
    );
  }

  if (!session) return <LoginForm />;

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--brand-paper)' }}>
        <p style={{ color: 'var(--brand-ink)', opacity: 0.6 }}>Vérification du compte…</p>
      </div>
    );
  }

  if (!isAdmin) return <NotAuthorized />;

  return <Moderation email={session.user.email} />;
}
