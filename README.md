# EDUTOTS

EDUTOTS is a responsive learning-products storefront. The repository is organized as a full-stack project so the approved frontend can be deployed independently while the Flask API and Supabase schema are developed.

## Project structure

```text
frontend/   React + TypeScript + Vite customer website
backend/    Python + Flask API (next phase)
supabase/   PostgreSQL migrations and seed data (next phase)
docs/       Architecture, API, database, and deployment documentation
```

## Frontend development

```bash
cd frontend
npm install
npm run dev
```

The local site runs at `http://localhost:3000`.

## Frontend production build

```bash
cd frontend
npm run lint
npm run build
```

The output is generated in `frontend/dist/`.

## Netlify deployment

Connect this repository to Netlify. The root `netlify.toml` configures the frontend base directory, build command, publish directory, and SPA fallback for `/shop` routes.

Never place a Supabase service-role key, Brevo password, or backend secret in the frontend environment.