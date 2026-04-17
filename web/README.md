# Observatoire Prospective Atlas — Web app (Next.js)

Application web de l'Observatoire des métiers, compétences et qualifications des branches OPCO Atlas.

**Stack** : Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons.

---

## 🚀 Démarrage

### Prérequis

- **Node.js ≥ 20** (tester avec `node -v`) — télécharger [nodejs.org](https://nodejs.org) si besoin
- **npm** (livré avec Node) ou **pnpm** (plus rapide, `npm i -g pnpm`)

### Installation + lancement

Ouvre un terminal dans ce dossier (`web/`) puis :

```bash
# 1. Installer les dépendances (1 seule fois)
npm install

# 2. Lancer le serveur de dev
npm run dev
```

Le site tourne sur **http://localhost:3000** avec hot-reload.

### Autres commandes

```bash
npm run build      # build de production
npm start          # sert le build de prod
npm run lint       # ESLint
npm run typecheck  # vérif TypeScript
```

---

## 📁 Structure

```
web/
├── app/                          # routes Next.js (App Router)
│   ├── layout.tsx                # layout racine : fonts + nav + footer
│   ├── globals.css               # Tailwind + tokens DESIGN.md (@theme)
│   ├── page.tsx                  # / — accueil
│   ├── not-found.tsx             # 404
│   ├── metiers/
│   │   ├── page.tsx              # /metiers — liste
│   │   └── [slug]/page.tsx       # /metiers/[slug] — fiche détail
│   ├── etudes/page.tsx           # /etudes — bibliothèque
│   ├── dataviz/page.tsx          # /dataviz — dashboard data
│   └── actualites/page.tsx       # /actualites (stub)
├── components/
│   ├── layout/
│   │   ├── nav.tsx               # nav sticky
│   │   └── footer.tsx            # footer vert profond
│   ├── ui/
│   │   ├── button.tsx            # Button + LinkButton
│   │   ├── badge.tsx             # badges sémantiques (tension, émergent…)
│   │   ├── pill.tsx              # eyebrow/section tags
│   │   └── card.tsx              # Card + SectionHead
│   ├── metier-card.tsx           # card d'un métier
│   └── study-card.tsx            # card d'une étude
├── lib/
│   ├── utils.ts                  # cn() helper (clsx + tw-merge)
│   ├── types.ts                  # types métier
│   └── mock-data.ts              # données de démo (remplacer par Directus)
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## 🎨 Design tokens

Tous les tokens de la charte sont dans **`app/globals.css`** sous la directive `@theme` de Tailwind v4.
La référence complète est dans **`../DESIGN.md`** (au niveau `Observatoire/`).

Exemples d'utilisation :

```tsx
<div className="bg-atlas-green text-white">  {/* vert profond */}
<div className="bg-atlas-green-v text-white"> {/* vert vif */}
<div className="bg-atlas-purple-lt text-atlas-purple"> {/* encart violet */}
<div className="font-display font-extrabold"> {/* Outfit 800 */}
<div className="font-body">                   {/* DM Sans */}
<div className="font-mono">                   {/* JetBrains Mono */}
<div className="rounded-md shadow-card">      {/* 16px + shadow verte douce */}
<div className="rounded-pill">                {/* 2rem (pill) */}
```

### Changer Outfit pour Circular Std

Quand vous achèterez une licence Circular Std :
1. Déposer les fichiers `.woff2` dans `public/fonts/`
2. Remplacer l'import `Outfit` de `next/font/google` par un `localFont` dans `app/layout.tsx`
3. La CSS restera identique — seule la variable `--font-outfit` change de source

---

## 🔌 Prochaines étapes (v0.4+)

- [ ] Command palette ⌘K (port du composant `index.html` racine)
- [ ] Filtres bibliothèque études (branche, thématique, année, format)
- [ ] Tabs fiche métier (Présentation / Compétences / Formations / Chiffres / Tendances / Ressources)
- [ ] Dashboard dataviz complet en composants React + SVG
- [ ] Client Directus (`lib/directus.ts`) + fetch réel remplaçant `mock-data.ts`
- [ ] Scripts Python ETL pour ingestion Excel (dossier `../etl/`)
- [ ] Docker compose pour Directus local (dossier `../cms/`)
- [ ] Tests Playwright sur les 4 pages principales
- [ ] CI GitHub Actions (lint + typecheck + build)
- [ ] Déploiement Vercel (front) + Scaleway Paris (CMS)

---

## 🔗 Références

- Maquettes HTML originales : `../index.html`, `../metier.html`, `../etudes.html`, `../dataviz.html`
- Charte graphique complète : `../DESIGN.md`
- Plan projet : `C:\Users\seb77\.claude\plans\witty-fluttering-chipmunk.md`
