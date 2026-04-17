# DESIGN.md — Observatoire Prospective Atlas

Direction artistique **éditoriale, claire, épurée**, alignée sur la charte **Prospective Atlas** (identité HORIZONS).

---

## 1. Philosophie

- **Clair par défaut, sérieux, respirant** : on est dans l'éditorial institutionnel, pas dans le dashboard tech.
- **Le vert Atlas comme ancre narrative** : vert profond pour les titres et sections héro, vert vif pour les accents et CTA.
- **Le violet comme second plan** : identité Atlas historique, réservé aux marqueurs secondaires et aux fonds d'encart.
- **Typographie comme architecture** : Outfit (Black 800) pour les titres, DM Sans (300-500) pour le corps. Hiérarchie très contrastée.
- **Formes douces** : cards 16-20 px, pills 2rem, boutons ronds. Zéro arêtes vives inutiles.
- **L'air compte autant que la matière** : padding généreux, respiration entre sections, max-width 1200 px.
- **Anti-gadget** : pas de glows, pas de dégradés criards, pas de 3D, pas d'emoji UI. On reste une publication officielle de branche.

---

## 2. Tokens de couleur

```css
:root {
  /* ─── Marque Atlas ───────────────────────────────── */
  --purple:       #2D0F64;   /* identitaire Atlas historique */
  --purple-lt:    #EEE8FA;   /* fond d'encart violet */
  --green:        #004423;   /* vert profond — titres, hero */
  --green-v:      #5FB670;   /* vert vif — fonds/CTA bg, accents SUR FOND SOMBRE uniquement */
  --green-accent: #2E8349;   /* vert accent — TEXTE sur fond blanc (AA 4.82:1) */
  --green-lt:     #EAF5ED;   /* fond doux */
  --green-tag:    #E8F7EC;   /* pill tag */

  /* ─── Neutres ────────────────────────────────────── */
  --white:        #FFFFFF;
  --off:          #F7F6F3;   /* fond page alterné (off-white crème) */
  --border:       #E2E0DB;
  --border-soft:  #EFEDE7;
  --text:         #1A1A1A;   /* corps principal */
  --text-2:       #3A3A3A;   /* sous-titres */
  --muted:        #6B6868;   /* secondaire */
  --muted-2:      #9A9794;   /* discret */

  /* ─── Couleurs sémantiques secondaires (teintes AA) ─ */
  --tag-bg:       #E8F7EC;   /* badge stable / info branche */
  --tension:      #A52E1F;   /* badge tension — 6.3:1 sur tension-bg (AA) */
  --tension-bg:   #FBEDEB;
  --emergent:     #8F5117;   /* badge émergent — 5.75:1 sur emergent-bg (AA) */
  --emergent-bg:  #FBF1E4;
  --prospect:     #2D0F64;   /* badge prospective */
  --prospect-bg:  #EEE8FA;

  /* ─── Structure ──────────────────────────────────── */
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-pill: 2rem;

  /* ─── Ombres ─────────────────────────────────────── */
  --shadow-card: 0 4px 20px rgba(0, 68, 35, 0.06);
  --shadow-event: 0 4px 24px rgba(0, 68, 35, 0.08);
  --shadow-hover: 0 12px 40px rgba(0, 68, 35, 0.12);

  /* ─── Transitions ────────────────────────────────── */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur: 200ms;
}
```

### Usage sémantique

| Rôle | Couleur |
|---|---|
| Fond page par défaut | `--white` |
| Fond section alternée | `--off` |
| Fond hero / footer | `--green` (vert profond) |
| Titres sections sur fond clair | `--green` |
| Accent éditorial (em sur blanc) | **`--green-accent`** (#2E8349) |
| Accent éditorial (em sur fond sombre / chiffres hero) | `--green-v` (#5FB670) |
| CTA principal | `--green-v` sur blanc OU `--green` sur vert vif |
| Pills / tags contenu | `--green-tag` + texte `--green` |
| Marqueur "prospective" / badge numéro | `--purple` |
| Corps texte | `--text` (#1A1A1A) |
| Métadonnées, descriptions | `--muted` |

---

## 3. Typographie

### Familles

```css
--font-display: 'Outfit', 'Circular Std', 'Helvetica Neue', sans-serif; /* titres Black 800-900 */
--font-body:    'DM Sans', -apple-system, 'Helvetica Neue', sans-serif; /* corps, UI */
```

> **Note Circular Std** : **Outfit** (Google Fonts, gratuit) est le meilleur substitut open source de Circular Std — même ADN géométrique, mêmes courbes rondes friendly, poids 900 disponible. Si tu achètes une licence Circular Std, remplace `'Outfit'` par `'Circular Std'` dans le CSS, rien d'autre ne change.

### Échelle responsive

| Usage | Taille | Font | Poids | Line-height |
|---|---|---|---|---|
| Hero XL | `clamp(4rem, 12vw, 10rem)` | Outfit | 800 | 0.95 |
| H1 section | `clamp(2rem, 4vw, 3rem)` | Outfit | 800 | 1.1 |
| H2 card | `1.05-1.4rem` | Outfit | 700-800 | 1.2-1.35 |
| Eyebrow / badge | `0.7-0.72rem` | Outfit | 700 | 1 — **UPPERCASE**, letter-spacing 0.1em |
| Lead paragraphe | `1.15rem` | DM Sans | 500 | 1.7 |
| Corps texte | `1rem` | DM Sans | 400 | 1.65-1.8 |
| Corps secondaire | `0.88rem` | DM Sans | 400 | 1.65 |
| Métadonnée | `0.82rem` | DM Sans | 400 | 1.55 |
| Chiffres-clés | `clamp(2.2rem, 4.5vw, 3.8rem)` | Outfit | 800 | 1 |

### Style signatures

```css
.h-hero     { font: 800 clamp(4rem,12vw,10rem)/0.95 var(--font-display); letter-spacing: -0.02em; color: var(--white); }
.h-hero em  { font-style: normal; color: var(--green-v); } /* accent coloré */
.h-section  { font: 800 clamp(2rem,4vw,3rem)/1.1 var(--font-display); letter-spacing: -0.02em; color: var(--green); }
.h-section em { font-style: normal; color: var(--green-v); }
.h-card     { font: 700 1.05rem/1.35 var(--font-display); color: var(--text); }
.eyebrow    { font: 700 0.7rem/1 var(--font-display); letter-spacing: 0.1em; text-transform: uppercase; color: var(--green); }
.lead       { font: 500 1.15rem/1.7 var(--font-body); color: var(--text); }
.body       { font: 400 1rem/1.8 var(--font-body); color: var(--muted); }
.meta       { font: 400 0.82rem/1.55 var(--font-body); color: var(--muted); }
.stat-num   { font: 800 clamp(2.2rem,4.5vw,3.8rem)/1 var(--font-display); color: var(--green-v); letter-spacing: -0.02em; }
```

---

## 4. Espacements & grille

- **Container** : max-width `1200px`, padding `3rem` desktop / `1.5rem` mobile.
- **Section** : padding vertical `5rem` desktop / `3.5rem` mobile.
- **Gap cards** : `1.5rem` à `2.5rem` selon densité.
- **Section alternée** : `body > section:nth-child(even) { background: var(--off); }`

---

## 5. Composants signatures

### 5.1 CTA principal (pill vert vif)

```css
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: var(--green-v);
  color: var(--white);
  font: 700 0.92rem/1 var(--font-display);
  padding: 0.9rem 2rem;
  border-radius: var(--radius-pill);
  text-decoration: none;
  transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease);
}
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
```

### 5.2 Eyebrow + Tag (pill discret avant un titre)

```css
.section-tag {
  display: inline-block;
  background: var(--tag-bg);
  color: var(--green);
  font: 700 0.7rem/1 var(--font-display);
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-pill);
}
```

### 5.3 Hero avec lettre fantôme

Sur fond vert profond, une énorme lettre (souvent la première du mot-clé) est placée en absolu à droite avec `color: rgba(255,255,255,.04)`. Effet signature HORIZONS réutilisé pour les bandeaux éditoriaux.

### 5.4 Card "métier"

```css
.card-metier {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.75rem;
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease);
}
.card-metier:hover {
  border-color: var(--green-v);
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}
```

Pas de halo doré, pas d'ombre colorée — juste une bordure qui passe au vert vif et une ombre verte très douce.

### 5.5 Chips / pills de compétences

```css
.chip {
  display: inline-block;
  background: var(--green-lt);
  color: var(--green);
  font: 500 0.82rem/1.4 var(--font-body);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
}
```

### 5.6 Barres de données (dataviz minimale)

```css
.bar-track { height: 7px; background: var(--border); border-radius: 4px; overflow: hidden; }
.bar-fill  { height: 100%; background: var(--green-v); border-radius: 4px; animation: growBar 1s var(--ease) both; }
@keyframes growBar { from { transform: scaleX(0); transform-origin: left } to { transform: scaleX(1) } }
```

Couleurs séries dataviz : `--green-v` (principal), `--purple` (secondaire), `--emergent` (tertiaire), jamais 6 couleurs à la fois.

### 5.7 Event card (date géante + programme à timeline)

Pattern HORIZONS : colonne date vert foncé avec jour en Outfit 6rem + colonne programme avec dots verts reliés par une ligne verticale `var(--border)`.

### 5.8 Nav sticky claire

Fond blanc, bordure basse 1.5px `var(--border)`, hauteur 72 px, logo Atlas à gauche + séparateur 1px 32px + mot "Prospective" en Outfit 700 vert. Liens DM Sans 0.88rem gris → vert au hover.

---

## 6. Iconographie

- **Lucide icons**, stroke 1.75 px, taille 14-18 px.
- Toujours accompagnées de texte, jamais seules (accessibilité).
- Pas d'illustrations 3D ni isométriques.
- Les séparateurs textuels utilisent un point médian décoratif : `·`.

---

## 7. Animations

- Fade-up au scroll (IntersectionObserver, seuil 8%, durée 650 ms).
- Hover buttons : `translateY(-1px)` + `opacity:.88`.
- Hover cards : `translateY(-2px)` + bordure verte.
- Barres dataviz : `scaleX` 0→1 sur 1s easeOut.
- `prefers-reduced-motion` respecté partout (suppression des transforms).

---

## 8. Accessibilité

- Contraste `--text` (#1A1A1A) sur `--white` : **17.6:1** (AAA).
- Contraste `--green` (#004423) sur `--white` : **11.8:1** (AAA).
- Contraste `--green-accent` (#2E8349) sur `--white` : **4.82:1** (AA) — utilisé pour texte em, liens, unités KPI.
- ⚠️ `--green-v` (#5FB670) ne passe pas sur blanc (2.49:1). **Réservé aux fonds et aux accents sur fond sombre.**
- Contraste `--tension` (#A52E1F) sur `--tension-bg` : **6.3:1** (AA).
- Contraste `--emergent` (#8F5117) sur `--emergent-bg` : **5.75:1** (AA).
- CTA primary = `bg-green-v` + `text-green` (ratio **5.39:1** AA).
- Focus ring : `outline: 2px solid var(--green-v); outline-offset: 2px; border-radius: 4px;`
- Touch targets min 44 × 44 px.
- RGAA 4.1 / WCAG 2.1 AA visé — vérifié via axe DevTools le 17/04/2026.
- Voir [`A11Y.md`](A11Y.md) pour le tableau de contrastes exhaustif.

---

## 9. Anti-patterns

- ❌ Pas de dark mode (la marque Atlas est clairement claire)
- ❌ Pas de fonds colorés hors hero/footer vert ou encart violet
- ❌ Pas de dégradés multicolores
- ❌ Pas de bordures > 1.5 px (sauf focus ring)
- ❌ Pas d'emoji dans l'UI (icônes Lucide uniquement)
- ❌ Pas de shadow colorée autre que verte
- ❌ Pas de texte en orange ou rose (anti-branding)
- ❌ Pas de serif (Outfit/DM Sans/Circular sont toutes sans-serif)

---

## 10. Inspirations & cohérence

- **Source principale** : HORIZONS N°01 (Prospective Atlas, newsletter avril 2026) — la maquette de l'observatoire reprend littéralement sa palette, ses pills, ses cards, sa hiérarchie typo.
- Mission : un observatoire **visuellement indissociable** du reste des productions Atlas, afin qu'un lecteur de HORIZONS retrouve immédiatement ses repères.
