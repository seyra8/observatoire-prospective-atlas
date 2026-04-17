# CMS — Directus stack

Stack CMS pour l'Observatoire Prospective Atlas : **Directus 11** + **PostgreSQL 16** + **Redis** + **Meilisearch**.

---

## 🚀 Démarrage

### Prérequis
- Docker Desktop installé ([docker.com/get-started](https://www.docker.com/get-started))

### Lancement (5 minutes)

```bash
# 1. Copier et éditer l'env
cp .env.example .env
# éditer .env : générer des secrets forts (openssl rand -hex 32 si dispo, sinon longue chaîne aléatoire)

# 2. Lancer la stack
docker compose up -d

# 3. Attendre ~30 secondes que Directus s'initialise
docker compose logs -f directus
# Une fois le message "Server started" affiché, tout est prêt

# 4. Ouvrir l'admin
# → http://localhost:8055
# → login : l'ADMIN_EMAIL et ADMIN_PASSWORD du .env
```

### Arrêt / redémarrage

```bash
docker compose stop                # arrêt sans perte de données
docker compose start               # reprise
docker compose down                # arrêt + suppression des conteneurs (volumes préservés)
docker compose down -v             # ⚠️ arrêt + SUPPRESSION DES VOLUMES (toutes les données perdues)
```

---

## 📦 Services

| Service | Image | URL | Rôle |
|---|---|---|---|
| **Directus** | `directus/directus:11` | http://localhost:8055 | Admin UI + API REST/GraphQL |
| **Postgres** | `postgis/postgis:16-3.4` | localhost:5432 | Base de données (avec extension PostGIS pour données géo) |
| **Redis** | `redis:7-alpine` | localhost:6379 | Cache Directus |
| **Meilisearch** | `getmeili/meilisearch:v1.12` | http://localhost:7700 | Recherche plein-texte FR |

---

## 🗂️ Prochaines étapes

### 1. Créer le schéma initial
Une fois Directus accessible, importer le snapshot de schéma initial (à générer en v0.4) :

```bash
# Depuis ce dossier (cms/)
docker compose exec directus npx directus schema apply /directus/snapshots/initial.yaml
```

Le schéma couvre :
- `metier` (fiche métier)
- `competence` (référentiel de compétences)
- `metier_competence` (association M2M avec niveau requis)
- `etude` (publication)
- `branche` (branche professionnelle)
- `actualite`
- `dataset` (jeu de données pour dataviz)

### 2. Ingérer les premières données
Via l'admin UI (copier-coller depuis les Excel branches) OU via un script Python (voir `../etl/`).

### 3. Connecter le front Next.js
Configurer dans `../web/.env.local` :

```env
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_STATIC_TOKEN=xxx   # token d'accès statique, créé dans Directus > Users > Access Tokens
```

Puis créer `../web/lib/directus.ts` (SDK Directus) et remplacer progressivement les imports de `mock-data.ts` par des fetchs.

---

## 🔒 Sécurité

- ❌ **Jamais de `.env` committé** (déjà dans `.gitignore`)
- ✅ Mots de passe forts (≥ 32 caractères aléatoires pour les clés)
- ✅ `REFRESH_TOKEN_COOKIE_SECURE=true` en production HTTPS
- ✅ `CORS_ORIGIN` restreint au domaine du front en production
- ✅ Rate limiting activé par défaut
- ✅ 2FA TOTP obligatoire pour les admins (à activer dans Directus > Settings > Security)

---

## 💾 Sauvegardes

Sauvegarde simple Postgres (à automatiser en cron sur le serveur prod) :

```bash
docker compose exec postgres pg_dump -U observatoire observatoire > backup-$(date +%Y%m%d).sql
```

Restauration :

```bash
docker compose exec -T postgres psql -U observatoire observatoire < backup-YYYYMMDD.sql
```

En production : backups automatiques quotidiens via Scaleway Managed Database (7 jours rétention inclus).
