# Safe Space

Site vitrine de Safe Space — développement personnel pour les jeunes.
React + Vite + Tailwind, témoignages stockés dans Supabase, déployé sur Vercel.

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs du projet Supabase
npm run dev
```

## Supabase

Le formulaire « Partagez votre avis » écrit dans la table `testimonials` et la
relit à chaque chargement — les avis sont donc visibles par tous les visiteurs,
partout dans le monde.

Pour initialiser la base : ouvrir le SQL Editor du projet Supabase et exécuter
les migrations de `supabase/migrations/` **dans l'ordre**.

La table `testimonials` est protégée par RLS : lecture et insertion publiques,
suppression réservée aux administrateurs, aucune policy UPDATE — un avis se
supprime, il ne se réécrit pas.

## Espace administrateur

Accessible sur `/admin`. Il liste tous les témoignages et permet de les
supprimer (avec confirmation).

Pour créer un compte admin :

1. Supabase > Authentication > Users > **Add user**, avec un email et un mot de
   passe. Il n'existe aucune inscription publique.
2. Récupérer son `user_id` et l'ajouter à la table `admins` :

```sql
insert into public.admins (user_id, email)
values ('<user_id>', '<email>');
```

Un compte authentifié absent de `admins` peut se connecter mais ne peut rien
supprimer — la policy RLS le bloque côté base, pas seulement dans l'interface.

## Déploiement Vercel

Build command `npm run build`, output `dist`. Renseigner les deux variables
d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans les
réglages du projet Vercel (elles sont incluses dans le bundle client, c'est
attendu : la clé anon est publique et protégée par RLS).
