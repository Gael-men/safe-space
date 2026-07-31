-- Espace administrateur : modération des témoignages.
--
-- Les comptes admin sont créés à la main dans Supabase (Authentication > Users),
-- puis leur user_id est ajouté ici. Il n'existe volontairement aucun parcours
-- d'inscription public : sans ligne dans cette table, un compte authentifié n'a
-- aucun pouvoir de plus qu'un visiteur anonyme.

create table public.admins (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  email       text,
  created_at  timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Un admin peut vérifier qu'il en est un (l'espace admin s'en sert pour décider
-- quoi afficher). Personne ne peut lire la liste des autres admins.
create policy "Un admin voit sa propre ligne"
  on public.admins
  for select
  to authenticated
  using (user_id = auth.uid());

-- Fonction utilitaire : évite de dupliquer le sous-select dans chaque policy.
-- SECURITY DEFINER pour que le test ne dépende pas des policies de public.admins.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- Seuls les admins peuvent supprimer un témoignage. Toujours aucune policy
-- UPDATE : un avis se supprime, il ne se réécrit pas.
create policy "Un admin peut supprimer un témoignage"
  on public.testimonials
  for delete
  to authenticated
  using (public.is_admin());
