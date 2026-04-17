# Observatoire Prospective Atlas

> Observatoire web des **métiers, compétences et qualifications** des branches professionnelles accompagnées par **OPCO Atlas**. Open source, licence [MIT](LICENSE) pour le code, [Etalab 2.0](LICENSE-DATA) pour les données.

**Statut** : v0.3 — maquette fonctionnelle avec mock data, prête pour déploiement en préproduction.

🧩 Cartographie vivante des métiers · 📊 Études et dataviz · 🔍 Recherche globale ⌘K · ♿ RGAA 4.1 / WCAG 2.1 AA.

---

## 📂 Structure du projet

```
Observatoire/
├── web/       Application Next.js 15 (App Router + TS + Tailwind 4)
├── cms/       Stack Docker Directus 11 + Postgres + Meilisearch (headless CMS)
└── docs racine :
    ├── DESIGN.md    Charte graphique complète (tokens, composants, règles)
    ├── A11Y.md      Guide accessibilité (check-list RGAA + contrastes vérifiés)
    ├── PAGES.md     Guide "comment ajouter une page" pour rédacteurs
    └── DEPLOY.md    Pas-à-pas de mise en ligne (GitHub, Vercel, Clever Cloud)
```

## 🚀 Démarrage rapide

### Développement local

```bash
# Front Next.js (sur http://localhost:3000)
cd web
npm install
npm run dev
```

### CMS Directus (optionnel — pour injecter des vraies données)

```bash
cd cms
cp .env.example .env
# éditer .env avec des secrets forts
docker compose up -d
# admin sur http://localhost:8055
```

Détails complets dans [`web/README.md`](web/README.md) et [`cms/README.md`](cms/README.md).

## 🎨 Direction artistique

Charte **Prospective Atlas** : palette vert profond (#004423) + vert vif (#5FB670) + violet (#2D0F64), typographie Outfit (display) + DM Sans (corps) + JetBrains Mono (data). Éditorial épuré, inspiré de la newsletter HORIZONS et des codes Superhuman (⌘K, halos, typo forte). Voir [DESIGN.md](DESIGN.md).

## ♿ Accessibilité

RGAA 4.1 / WCAG 2.1 AA visé. Audit axe DevTools interne passé ✓. Audit humain externe à planifier avant publication publique. Déclaration sur [/accessibilite](web/app/accessibilite/page.tsx) et détails dans [A11Y.md](A11Y.md).

## 📦 Stack technique

- **Frontend** — Next.js 15, React 19, TypeScript, Tailwind CSS 4, Lucide icons
- **CMS** — Directus 11 (API REST + GraphQL), PostgreSQL 16 (+ PostGIS), Redis
- **Recherche** — Meilisearch (indexation plein-texte française)
- **Stockage** — S3-compatible (fichiers PDF, Excel, médias)
- **Dataviz** — SVG inline (pas de dépendance lourde, accessible)

## 📖 Documentation

| Document | Pour qui |
|---|---|
| [`DESIGN.md`](DESIGN.md) | Designers, développeurs frontend |
| [`A11Y.md`](A11Y.md) | Développeurs, auditeurs RGAA |
| [`PAGES.md`](PAGES.md) | Rédacteurs, éditeurs contenu |
| [`DEPLOY.md`](DEPLOY.md) | Opérations, mise en ligne |
| [`web/README.md`](web/README.md) | Développement front |
| [`cms/README.md`](cms/README.md) | Ops CMS |

## 📄 Licences

- **Code** : [MIT](LICENSE) — réutilisable librement y compris commercialement, avec mention.
- **Données publiées via le CMS** : [Licence Ouverte Etalab 2.0](https://www.etalab.gouv.fr/licence-ouverte-open-licence/) — réutilisation libre avec mention de la source *« Observatoire Prospective Atlas — OPCO Atlas »*.

## 🤝 Contact

Observatoire Prospective Atlas · Direction des Politiques de Branches · OPCO Atlas.
