# Déploiement sur Vercel (sans GitHub)

La CLI Vercel envoie le dossier directement depuis le disque — pas besoin de dépôt Git.

## Une seule fois

Installer la CLI :

```
npm i -g vercel
```

Se connecter (ouvre le navigateur) :

```
vercel login
```

## Déployer

Depuis la racine du projet :

```
vercel
```

Répondre aux questions :

- _Set up and deploy?_ → **Y**
- _Which scope?_ → ton compte
- _Link to existing project?_ → **N**
- _Project name?_ → `safe-space`
- _In which directory is your code located?_ → **./** (Entrée)
- _Want to modify these settings?_ → **N** — `vercel.json` fixe déjà framework,
  build et output

Ce premier `vercel` crée un déploiement de **preview** avec une URL de test.

## Les deux variables d'environnement

`.env.local` n'est pas envoyé (il est dans `.vercelignore`) : la configuration
d'environnement se déclare côté plateforme, pas dans le code. Il faut donc
recréer les deux variables sur Vercel, sinon le site se construit mais aucun
témoignage ne s'affiche.

```
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

Pour chacune : choisir **Production**, **Preview** et **Development** (barre
d'espace pour cocher, Entrée pour valider), puis coller la valeur — elles sont
dans `.env.local`.

Ces deux valeurs finiront dans le bundle JavaScript public. C'est normal et sans
danger : la clé est publiable par conception, ce sont les policies RLS de
`supabase/migrations/` qui protègent les données.

## Mettre en ligne pour de vrai

```
vercel --prod
```

Et à chaque modification du site, relancer cette même commande.

## Après le premier déploiement

Récupérer l'URL de production (ex. `safe-space.vercel.app`) et l'ajouter dans
Supabase → **Authentication** → **URL Configuration** → _Site URL_ et
_Redirect URLs_. Sans ça, la connexion à `/admin` peut échouer depuis le
domaine de production alors qu'elle marche en local.
