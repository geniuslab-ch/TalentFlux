# Migration CRA → Next.js 14 App Router

## Ce qui a été fait automatiquement

### Adaptations des composants
Tous les composants existants ont été migrés dans `components/pages/` avec :
- `"use client"` ajouté en première ligne (requis pour hooks React)
- `import { Link } from "react-router-dom"` → `import Link from "next/link"`
- `<Link to="/path">` → `<Link href="/path">`
- Imports supabase : `"../supabase"` → `"@/lib/supabase"`
- Imports responsive : `"../utils/responsive"` → `"@/utils/responsive"`

### Variables d'environnement
Renommer `.env` → `.env.local` et changer les préfixes :
```bash
# Ancien (CRA)
REACT_APP_SUPABASE_URL=...
REACT_APP_SUPABASE_ANON_KEY=...

# Nouveau (Next.js)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Vercel : variables d'environnement
Dans Vercel Dashboard → Settings → Environment Variables :
- Ajouter `NEXT_PUBLIC_SUPABASE_URL`
- Ajouter `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Ajouter `ADMIN_PASSWORD` (non public — sans préfixe NEXT_PUBLIC_)
- Supprimer les anciennes variables `REACT_APP_*`

## Installation

```bash
npm install
npm run dev        # dev server sur localhost:3000
npm run build      # build + génération sitemap automatique
```

## Structure des fichiers

```
app/
  layout.tsx           ← Root layout (polices, metadata globale)
  page.tsx             ← Homepage /
  it/page.tsx          ← /it avec metadata SEO + JSON-LD
  finance/page.tsx     ← /finance
  ingenierie/page.tsx  ← /ingenierie
  paysagisme/page.tsx  ← /paysagisme
  telecom/page.tsx     ← /telecom
  pharma/page.tsx      ← /pharma
  candidature/
    {sector}/page.tsx  ← /candidature/* (noindex)
  admin/page.tsx       ← /admin (noindex)
  contact/page.tsx
  privacy/page.tsx
  cgu/page.tsx

components/
  JsonLd.tsx           ← Composant schema.org EmploymentAgency
  CandidatureForm.jsx  ← Formulaire candidature (client)
  pages/               ← Tous les composants pages migrés

lib/
  supabase.ts          ← Client Supabase (NEXT_PUBLIC_ vars)

utils/
  responsive.ts        ← Hook useMobile adapté (SSR-safe)
```

## SEO : ce qui est indexable maintenant

Chaque page `/it`, `/finance`, etc. :
1. **Title unique** via `export const metadata`
2. **Meta description unique** via `export const metadata`
3. **JSON-LD schema.org** `EmploymentAgency` dans le HTML initial
4. **H1 caché** dans le DOM (visible Google, invisible visuellement)
5. **Maillage interne** via `<nav>` caché (silotage SEO)
6. **Sitemap.xml** généré automatiquement au build via `next-sitemap`
7. **Canonical URL** déclarée par page

## Note sur output:'export'

Le `next.config.js` utilise `output: "export"` (site 100% statique).
Cela signifie que **les Server Actions ne fonctionnent pas**.
Les formulaires appellent Supabase directement depuis le navigateur → comportement identique à l'ancienne SPA.

Pour activer le rendu serveur complet (Server Actions, middleware) :
1. Retirer `output: "export"` du `next.config.js`
2. Retirer `images: { unoptimized: true }`
3. Changer `output: "standalone"` pour Vercel avec Docker, ou ne rien mettre pour Vercel natif
