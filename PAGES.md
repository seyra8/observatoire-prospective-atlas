# PAGES.md — Comment ajouter des pages au site

Guide pratique pour **ajouter, modifier ou supprimer des pages** de l'Observatoire, sans être développeur.
Principe clé : **un dossier = une URL**.

---

## 🚀 Les 3 minutes d'essentiel

### Pour créer une nouvelle page éditoriale

1. Dans VS Code (ou tout éditeur de texte), ouvre le dossier `web/app/`
2. Crée un nouveau **dossier** avec le nom que tu veux voir dans l'URL
   → ex: `web/app/partenaires/` donnera l'URL `/partenaires`
3. Dedans, crée un fichier `page.tsx`
4. Copie-colle le template [`web/templates/page-template.tsx`](web/templates/page-template.tsx) dans ce nouveau fichier
5. Remplace les `TODO` par ton contenu
6. Sauvegarde — Next.js recharge automatiquement, va sur `http://localhost:3000/partenaires`

**C'est tout.** Pas de config, pas de build, pas de routeur à mettre à jour.

---

## 📖 Concept : le routage par fichiers

Next.js App Router utilise la structure de dossiers comme **plan du site** :

```
web/app/
├── page.tsx                        →  /             (accueil)
├── metiers/
│   ├── page.tsx                    →  /metiers      (liste des métiers)
│   └── [slug]/
│       └── page.tsx                →  /metiers/xxx  (fiche d'un métier)
├── etudes/
│   └── page.tsx                    →  /etudes
├── dataviz/
│   └── page.tsx                    →  /dataviz
├── methodologie/
│   └── page.tsx                    →  /methodologie ← créée comme exemple
├── accessibilite/
│   └── page.tsx                    →  /accessibilite
└── not-found.tsx                   →  page 404 globale
```

- Le **nom du dossier** devient l'URL (en minuscules, sans accents, tirets entre les mots)
- Le **fichier `page.tsx`** contient le contenu
- Un dossier entre crochets `[slug]` crée une **route dynamique** (voir plus bas)

---

## 🎨 Les briques disponibles (composants déjà prêts)

Tu n'as pas besoin de CSS pour styler. Utilise les composants existants :

### Titre de page (hero vert)

Reprends le bloc `<header>` du template. La lettre fantôme se change avec l'attribut `style` :

```tsx
<span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>
  P  {/* ← lettre de ton choix, liée au thème de la page */}
</span>
```

### Fil d'Ariane (breadcrumb)

```tsx
import { Breadcrumb } from "@/components/ui/breadcrumb";

<Breadcrumb
  items={[
    { label: "Observatoire", href: "/" },
    { label: "Ressources", href: "/ressources" },  // segment cliquable
    { label: "Ma page" },                           // page courante (pas de href)
  ]}
/>
```

### Pill (étiquette)

```tsx
import { Pill } from "@/components/ui/pill";

<Pill>01 · Introduction</Pill>              {/* vert */}
<Pill variant="purple">Note importante</Pill>  {/* violet */}
```

### Bouton CTA

```tsx
import { LinkButton } from "@/components/ui/button";

<LinkButton href="/etudes" variant="primary">
  Parcourir les études
</LinkButton>
<LinkButton href="/contact" variant="ghost">
  Nous contacter
</LinkButton>
```

### Carte simple

```tsx
import { Card } from "@/components/ui/card";

<Card>
  <h3>Mon titre</h3>
  <p>Mon contenu.</p>
</Card>
```

### Badge de statut

```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="tension" />      {/* "Tension" rouge */}
<Badge variant="emergent" />     {/* "Émergent" orange */}
<Badge variant="stable" />       {/* "Stable" vert */}
<Badge variant="prospect" />     {/* "Prospective" violet */}
```

### Icônes

```tsx
import { BookOpen, Download, Users } from "lucide-react";

<BookOpen className="h-4 w-4" />
```

Liste complète des icônes disponibles : [lucide.dev/icons](https://lucide.dev/icons). On a environ 1400 icônes dispos gratuitement.

---

## 📝 Styles de texte typiques

| Usage | Classes Tailwind |
|---|---|
| Titre H1 héro | `font-display font-extrabold text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-[-0.02em]` |
| Titre H2 section | `font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green` |
| Titre H3 | `font-display text-[1.2rem] font-bold text-ink` |
| Paragraphe normal | (rien de spécial, c'est le défaut) |
| Gras | `<strong>mot</strong>` |
| Italique | `<em>mot</em>` |
| Lien | `<a className="font-semibold text-atlas-green underline decoration-atlas-green-v decoration-2 underline-offset-4 hover:text-atlas-green-v">` |
| Texte discret | `text-muted` |
| Chiffre-clé | `font-display text-4xl font-extrabold text-atlas-green` |

---

## 🏗️ Les 3 types de pages les plus courants

### Type 1 · Page éditoriale statique (le plus simple)

**Exemple concret** : [`web/app/methodologie/page.tsx`](web/app/methodologie/page.tsx) ou [`web/app/accessibilite/page.tsx`](web/app/accessibilite/page.tsx)

Bon pour : À propos, Contact, CGU, Partenaires, Équipe, FAQ, Méthodologie, Mentions légales…

Recette : copier le template [`page-template.tsx`](web/templates/page-template.tsx), renommer, éditer le contenu.

### Type 2 · Page de liste avec données

Bon pour : liste d'événements, galerie, répertoire…

```tsx
// web/app/evenements/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Événements" };

// Données mock temporaires (avant Directus)
const EVENTS = [
  { id: "1", titre: "Matinale RSE", date: "2026-04-24" },
  { id: "2", titre: "Colloque IA", date: "2026-05-15" },
];

export default function EvenementsPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-16">
      <h1 className="font-display text-4xl font-extrabold text-atlas-green">Événements</h1>
      <ul className="mt-8 space-y-4">
        {EVENTS.map(ev => (
          <li key={ev.id} className="rounded-md border border-border p-5">
            <h2 className="font-display text-xl font-bold">{ev.titre}</h2>
            <p className="text-muted">{ev.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### Type 3 · Page dynamique (une URL par élément)

**Exemple concret** : [`web/app/metiers/[slug]/page.tsx`](web/app/metiers/[slug]/page.tsx)

Le dossier `[quelque-chose]` (avec les crochets !) indique un paramètre d'URL.

```tsx
// web/app/evenements/[id]/page.tsx
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EvenementPage({ params }: PageProps) {
  const { id } = await params;
  // Ici : chercher l'événement avec l'id "id"
  return <h1>Événement n° {id}</h1>;
}
```

→ Crée automatiquement les URLs `/evenements/1`, `/evenements/2`, `/evenements/abc`, etc.

---

## 🧭 Afficher la nouvelle page dans la navigation

Ajouter une entrée dans le **menu principal** en haut :
Édite [`web/components/layout/nav.tsx`](web/components/layout/nav.tsx) et complète le tableau `NAV_LINKS` :

```tsx
const NAV_LINKS = [
  { href: "/metiers", label: "Métiers" },
  { href: "/etudes", label: "Études" },
  { href: "/dataviz", label: "Data" },
  { href: "/actualites", label: "Actualités" },
  { href: "/partenaires", label: "Partenaires" },  // ← ton ajout
];
```

Ajouter une entrée dans le **footer** :
Édite [`web/components/layout/footer.tsx`](web/components/layout/footer.tsx), tableau `LINKS` :

```tsx
Ressources: [
  { href: "/methodologie", label: "Méthodologie" },
  { href: "/api", label: "API publique" },
  { href: "/partenaires", label: "Nos partenaires" },  // ← ton ajout
  ...
],
```

---

## 🖼️ Ajouter une image

1. Dépose l'image dans `web/public/images/` (ex: `web/public/images/equipe.jpg`)
2. Dans ton `page.tsx` :

```tsx
import Image from "next/image";

<Image
  src="/images/equipe.jpg"
  alt="L'équipe de la Prospective Atlas réunie en séminaire"
  width={1200}
  height={630}
  className="rounded-md"
/>
```

Next.js optimise automatiquement (WebP/AVIF, lazy-loading, responsive).
L'`alt` est **obligatoire** pour l'accessibilité (décrire le contenu, ou `alt=""` si purement décoratif).

---

## 🔗 Faire un lien vers une autre page

**Toujours** utiliser le composant `<Link>` de Next.js (chargement instantané sans rechargement) :

```tsx
import Link from "next/link";

<Link href="/metiers">Voir les métiers</Link>
<Link href="/metiers/technicien-maintenance">Cette fiche précise</Link>
```

Les liens externes utilisent `<a>` classique avec `target="_blank"` :

```tsx
<a href="https://opco-atlas.fr" target="_blank" rel="noopener noreferrer">
  Site OPCO Atlas
</a>
```

---

## ⚡ Cycle de travail recommandé

1. **Lancer le dev server** (une fois pour toutes) :
   ```
   cd C:\Users\seb77\OneDrive\Bureau\Observatoire\web
   npm run dev
   ```
2. **Garder le navigateur sur** `http://localhost:3000`
3. **Éditer** les fichiers dans VS Code
4. **Sauvegarder** — ta page se recharge automatiquement en 1-2 secondes
5. Erreur affichée à l'écran = Next.js te dit ce qui ne va pas, avec la ligne exacte

### Astuces qui gagnent du temps

- **Copier une page qui marche** plutôt que partir de zéro (ex: dupliquer `methodologie/` en `partenaires/`)
- Toujours commencer par le **template** : header vert + breadcrumb + sections Pill/H2
- Ne pas toucher aux composants (`web/components/`) : ils marchent déjà, tu les appelles juste
- En cas d'erreur : lire le message, souvent c'est une faute de frappe dans le nom d'un composant

---

## 🗺️ Carte mentale : où est quoi

```
web/
├── app/                ← LES PAGES (une par dossier)
│   ├── page.tsx        ← accueil
│   ├── metiers/        ← /metiers (liste + [slug] pour détail)
│   ├── etudes/         ← /etudes
│   ├── dataviz/        ← /dataviz
│   ├── methodologie/   ← EXEMPLE À COPIER
│   └── ...
│
├── components/         ← LES BRIQUES (déjà prêtes, ne pas toucher)
│   ├── ui/             ← Button, Badge, Pill, Card, Breadcrumb
│   ├── layout/         ← Nav, Footer, SkipLink
│   ├── metier-card.tsx
│   ├── study-card.tsx
│   ├── dataviz/        ← toutes les viz SVG
│   └── etudes/         ← filtres bibliothèque
│
├── lib/
│   ├── mock-data.ts    ← DONNÉES DE DÉMO (à remplacer par Directus en v0.4)
│   └── types.ts        ← forme des données
│
├── templates/
│   └── page-template.tsx  ← À COPIER POUR NOUVELLE PAGE
│
└── public/             ← FICHIERS PUBLICS
    └── images/         ← images, PDF à déposer ici
```

---

## 🆘 Quand tu es bloqué

- **La page n'apparaît pas** → vérifie : nom du dossier en minuscules ? fichier bien nommé `page.tsx` ? serveur dev relancé ?
- **Erreur rouge à l'écran** → lis le message, regarde la ligne indiquée, c'est souvent une virgule ou un crochet manquant
- **Ça casse après un copier-coller** → vérifie que les imports en haut du fichier correspondent bien aux composants utilisés
- **Le style est cassé** → classe Tailwind mal écrite, retire-la temporairement pour isoler

Et sinon, tu m'envoies un message — je regarde avec toi.
