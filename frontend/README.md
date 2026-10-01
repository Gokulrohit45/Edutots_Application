# EDUTOTS Frontend

Responsive React + TypeScript storefront built with Vite and Tailwind CSS.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Source structure

```text
src/
  app/         Application shell and providers
  assets/      Local images and visual assets
  components/  Reusable common, home, and layout UI
  config/      Public site configuration
  context/     Cart and toast state
  data/        Temporary mock data (replaced by Flask API later)
  pages/       Route-level pages such as the product catalogue
  types/       Shared TypeScript models
```

## Environment

Copy `.env.example` to `.env.local` only when environment values are needed. Only public `VITE_` browser variables may be placed there.

## Deployment

The repository root contains `netlify.toml`. Netlify builds this directory and serves `dist/`. `public/_redirects` preserves SPA routes such as `/shop` on refresh.