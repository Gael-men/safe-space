-- Témoignages laissés par les visiteurs depuis la section "Ce que disent les jeunes".
-- Écrits et lus directement par le client (clé anon), sans compte utilisateur :
-- toute la validation vit donc dans les contraintes CHECK et les policies RLS
-- ci-dessous, jamais uniquement côté navigateur.

create extension if not exists pgcrypto;

create table public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  quote       text not null check (char_length(btrim(quote)) between 1 and 2000),
  name        text not null default 'Anonyme' check (char_length(name) <= 80),
  age         text check (char_length(age) <= 40),
  created_at  timestamptz not null default now()
);

create index idx_testimonials_created_at on public.testimonials (created_at desc);

alter table public.testimonials enable row level security;

-- Lecture publique : c'est le but, les avis doivent être visibles par tout le monde.
create policy "Témoignages visibles par tous"
  on public.testimonials
  for select
  to anon, authenticated
  using (true);

-- Écriture publique, mais uniquement en insertion. Les contraintes CHECK de la
-- table s'appliquent aussi ici — un client malveillant ne peut pas les contourner.
create policy "Chacun peut laisser un témoignage"
  on public.testimonials
  for insert
  to anon, authenticated
  with check (true);

-- Aucune policy UPDATE ni DELETE : personne ne peut modifier ou effacer un
-- témoignage depuis le client. La modération se fait via le dashboard Supabase.
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
