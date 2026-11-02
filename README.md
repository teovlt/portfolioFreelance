# Téo Villet — site freelance

Site de [teovillet.fr](https://www.teovillet.fr) : présentation, tarifs, projets, avis clients, prise de rendez-vous et formulaire de contact, avec un back-office (`/admin`) pour gérer tout le contenu.

## Stack

- **Front** (`/`) : React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, i18next (FR / EN)
- **API** (`/server`) : Express, MongoDB (Mongoose), JWT pour l'admin, Multer + sharp pour les images
- **Prod** : Docker Compose déployé avec Dokploy. Le conteneur `portfolio` (nginx) sert le front et relaie `/api` vers le conteneur `api`.

## Lancer en local

Prérequis : Node 20, pnpm 10 et une base MongoDB.

```bash
# API
cd server
cp .env.example .env   # renseigner MONGODB_URI et JWT_SECRET
pnpm install
pnpm seed:user         # crée le compte admin (interactif)
pnpm seed:content      # optionnel : contenu de départ
pnpm seed:projects     # optionnel : projets de départ
pnpm dev               # http://localhost:4000

# Front, dans un autre terminal
cp .env.example .env   # VITE_API_URL=http://localhost:4000/api
pnpm install
pnpm dev               # http://localhost:5173
```

## Scripts du front

| Script           | Rôle                                         |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | serveur de développement                     |
| `pnpm build`     | type-check (`tsc`) puis build dans `dist/`   |
| `pnpm typecheck` | type-check seul                              |
| `pnpm format`    | Prettier sur tout le projet                  |

## Structure

```
src/
├── components/   # composants partagés, ui/ (shadcn), admin/, customs/
├── hooks/        # accès à l'API (contenu public, collections admin)
├── locales/      # traductions fr.json / en.json
├── pages/        # sections de l'accueil, pages, admin/
├── providers/    # thème, auth admin, forfait choisi
└── routes/       # routeur (garder nginx.conf en phase avec ses routes)
server/src/
├── models/       # schémas Mongoose
├── routes/       # endpoints, dont un CRUD générique (utils/crudRouter.ts)
└── seed/         # scripts d'initialisation
```

## Déploiement

`docker-compose.yml` lit `MONGODB_URI`, `JWT_SECRET` et, en option, `FRONTEND_URL` et `FORMSPREE_ENDPOINT` (notifications par email des messages, rendez-vous et avis). Les images envoyées depuis l'admin sont stockées dans le volume `uploads`.
