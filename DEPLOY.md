# DEPLOY.md — Mise en ligne pas-à-pas

Guide concret pour déployer l'Observatoire en **préproduction** (puis en production).

**État actuel** : ✅ repo git initialisé localement, ✅ premier commit créé sur `main`, reste à push sur GitHub et connecter Vercel.

---

## 🎯 Étape 1 — Créer le repo sur GitHub (5 min)

### 1.1 Compte GitHub

Si tu n'as pas encore de compte GitHub :
1. Aller sur **[github.com/signup](https://github.com/signup)**
2. Créer un compte avec ton email (perso ou OPCO — peu importe pour démarrer)
3. Confirmer l'email
4. Choisir le plan **Free** (gratuit et largement suffisant)

### 1.2 Créer le repo

1. Connecté sur GitHub → clic sur **le + en haut à droite** → **New repository**
2. Remplir :
   - **Repository name** : `observatoire-prospective-atlas`
   - **Description** : *Observatoire web des métiers, compétences et qualifications des branches OPCO Atlas*
   - **Public** (coché — cohérent avec la licence ouverte des données)
   - ⚠️ **NE PAS** cocher "Add a README file"
   - ⚠️ **NE PAS** cocher "Add .gitignore"
   - ⚠️ **NE PAS** ajouter de licence (on a déjà les nôtres)
3. Clic sur **Create repository**

GitHub t'affiche alors une page avec des commandes à copier. **Ne les utilise pas telles quelles** — utilise les miennes ci-dessous (plus précises).

### 1.3 Connecter et pousser le code local

Dans PowerShell, sur ton poste (ouvre un nouveau terminal dans `Observatoire/`) :

```powershell
cd C:\Users\seb77\OneDrive\Bureau\Observatoire

# Remplacer TON-USERNAME par ton nom d'utilisateur GitHub
git remote add origin https://github.com/TON-USERNAME/observatoire-prospective-atlas.git

# Premier push
git push -u origin main
```

La première fois, GitHub va te demander de t'authentifier. Deux options :

**Option A (recommandé) — GitHub Desktop**
1. Installer [GitHub Desktop](https://desktop.github.com/) → login avec ton compte
2. Ça configure l'authentification globalement, le `git push` marche ensuite sans mot de passe.

**Option B — Token personnel**
1. Sur GitHub : Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic), scopes : `repo` (cocher)
3. Copier le token (il s'affiche une seule fois !)
4. Quand `git push` demande le password, coller le token (pas ton vrai mot de passe)

### 1.4 Vérifier

Rafraîchir la page GitHub → tu devrais voir les 62 fichiers, le README racine s'affiche en bas avec les badges, les sous-dossiers `web/` et `cms/` cliquables.

✅ **Étape 1 OK**.

---

## 🚀 Étape 2 — Déployer sur Vercel (10 min)

Vercel est l'hébergeur créé par les auteurs de Next.js. Le plan **Hobby** est gratuit, avec un CDN mondial et HTTPS automatique. Largement suffisant pour la préprod et même pour les débuts en prod (< 100 k visiteurs/mois).

### 2.1 Créer le compte Vercel

1. Aller sur **[vercel.com](https://vercel.com)**
2. Clic sur **Sign Up**
3. Choisir **Continue with GitHub** (SSO) — utilise le compte GitHub de l'étape 1
4. Autoriser Vercel à lire tes repos
5. Choisir le plan **Hobby** (gratuit)

### 2.2 Importer le repo

1. Sur le dashboard Vercel → clic sur **Add New…** → **Project**
2. Choisir le repo `observatoire-prospective-atlas`
3. Clic sur **Import**

### 2.3 Configurer le projet

Dans l'écran de config avant le premier déploiement, **ceci est critique** car notre Next.js est dans un sous-dossier :

| Champ | Valeur |
|---|---|
| **Framework Preset** | `Next.js` (auto-détecté) |
| **Root Directory** | ⚠️ **cliquer sur "Edit"** → naviguer dans l'arborescence → **sélectionner `web`** |
| **Build Command** | laisser vide (= `npm run build`) |
| **Output Directory** | laisser vide (= `.next`) |
| **Install Command** | laisser vide (= `npm install`) |
| **Node.js Version** | `20.x` ou `22.x` (dernière LTS) |

**Environment Variables** : aucune pour l'instant (on est en mock data). On ajoutera `NEXT_PUBLIC_DIRECTUS_URL` plus tard quand on branchera le CMS.

### 2.4 Déployer

1. Clic sur **Deploy**
2. Le build prend ~2-3 minutes la première fois
3. Tu verras les logs en direct (install, build Next.js, optimisation pages)
4. À la fin, écran **"Congratulations!"** avec un aperçu du site

🎉 Ton URL de préprod est `https://observatoire-prospective-atlas.vercel.app` (ou un variant).

### 2.5 Activer la protection par mot de passe

Puisqu'on est en préproduction et qu'on ne veut pas que Google commence à indexer un site à moitié fini :

1. Sur Vercel, projet → **Settings** → **Deployment Protection**
2. Choisir **Vercel Authentication** (inclus dans Hobby)
3. Scope : **Standard Protection** (production + previews)

Maintenant, pour accéder au site, il faut être connecté à Vercel OU avoir reçu un lien d'invitation. Parfait pour montrer aux partenaires sociaux sans que le monde entier voie.

Pour **partager avec un externe** : Settings → Deployment Protection → onglet **Bypass Token** → générer un token + URL qui bypass le mot de passe.

### 2.6 Vérifier

Ouvre l'URL Vercel dans un navigateur (après t'être connecté à ton compte Vercel). Tu devrais voir :
- La home Observatoire identique à ton `localhost:3000`
- Les polices Outfit + DM Sans bien chargées (pas de FOUT)
- La command palette qui s'ouvre avec ⌘K / Ctrl+K
- Toutes les pages qui naviguent correctement

✅ **Étape 2 OK**.

---

## 🔄 Workflow quotidien après setup

Maintenant, à chaque modification du code :

```powershell
# Tu édites des fichiers dans VS Code, tu vérifies en local avec npm run dev
# Quand c'est prêt :

cd C:\Users\seb77\OneDrive\Bureau\Observatoire
git add .
git commit -m "description courte de ce qui change"
git push
```

Vercel détecte le push en 10 s, lance un build, et met à jour l'URL en ~2 min. Zéro intervention manuelle.

### Branches et previews

Pour tester un changement risqué sans casser la preview principale :

```powershell
git checkout -b nouvelle-fonctionnalite
# ... modifs ...
git add . && git commit -m "test: nouvelle fonctionnalité"
git push -u origin nouvelle-fonctionnalite
```

Sur GitHub, tu crées une **Pull Request**. Vercel génère automatiquement une URL `observatoire-prospective-atlas-git-nouvelle-fonctionnalite-TON-USER.vercel.app` avec cette version à tester. Si ça marche, merge la PR → auto-déploiement sur la main.

---

## 🆘 Problèmes fréquents

### `git push` échoue : "remote rejected"

Tu as probablement mis le mauvais username dans l'URL remote. Corriger :
```powershell
git remote set-url origin https://github.com/TON-VRAI-USERNAME/observatoire-prospective-atlas.git
git push -u origin main
```

### Vercel build échoue : "Cannot find module"

Vérifier que le **Root Directory = `web`** est bien configuré (Settings → General → Root Directory). Sinon, Vercel cherche `package.json` à la racine et ne le trouve pas.

### Page blanche sur Vercel

Ouvrir la console navigateur (F12) pour voir l'erreur. Souvent :
- Une variable d'environnement manquante (mais on n'en utilise pas encore)
- Une erreur React SSR → regarder les logs Vercel : Deployments → le dernier → **Functions** → logs serveur

### Fonts pas chargées

Normal sur le premier accès : Next.js télécharge Outfit/DM Sans via `next/font`. Après, c'est caché par le CDN. Si persistant, vérifier que `layout.tsx` utilise bien la syntaxe `font-outfit.variable`.

---

## ⏭️ Prochaines étapes

Une fois #1 et #2 validés, les prochaines étapes (voir [plan](.claude/plans/witty-fluttering-chipmunk.md) §12) :

- **Étape 3** : déployer Directus sur Clever Cloud Paris
- **Étape 4** : remplacer mock-data.ts par des fetchs Directus
- **Étape 5** : ajouter Plausible + Sentry (analytics + error tracking)
- **Étape 6** : CI GitHub Actions (lint + typecheck + build à chaque PR)
- **Étape 7** : acheter le domaine `.fr` et le brancher

Mais rien ne presse — tu as déjà un site en ligne fonctionnel à partager. 🎉

---

## 📞 Commandes récap (copier-coller)

```powershell
# ─── Une seule fois : pousser sur GitHub ──────────────────
cd C:\Users\seb77\OneDrive\Bureau\Observatoire
git remote add origin https://github.com/TON-USERNAME/observatoire-prospective-atlas.git
git push -u origin main

# ─── Au quotidien : envoyer une modif ─────────────────────
git add .
git commit -m "feat: description courte"
git push

# ─── Voir l'historique ─────────────────────────────────────
git log --oneline -10

# ─── Annuler la dernière modif non committée ───────────────
git checkout -- fichier-a-annuler.tsx

# ─── Annuler le dernier commit (pas encore pushé) ──────────
git reset HEAD~1
```
