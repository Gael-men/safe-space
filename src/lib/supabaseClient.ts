import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Deliberately does not throw when unset: the whole landing page must still
// render even before a Supabase project is wired up. Only the testimonials
// section talks to Supabase, and it surfaces its own error state.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Copy .env.example to .env.local and fill in your Supabase project values — les témoignages ne seront ni chargés ni enregistrés.',
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
);
