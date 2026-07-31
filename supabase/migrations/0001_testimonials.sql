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
