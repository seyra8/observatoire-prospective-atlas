import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // optimizePackageImports: ["lucide-react"],
  },
};

// ════════════════════════════════════════════════════════════════════════════
// Wrap avec Sentry pour :
//   • upload auto des source maps (stack traces lisibles au lieu de minifiées)
//   • tunnelisation des requêtes Sentry (contourne les ad-blockers)
//
// L'upload de source maps ne se fait que si SENTRY_AUTH_TOKEN est défini
// (côté CI / Vercel build). Sinon no-op, le build passe.
// ════════════════════════════════════════════════════════════════════════════

export default withSentryConfig(nextConfig, {
  // Organisation et projet Sentry (à configurer une fois le compte créé)
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Silence les logs Sentry pendant le build (sauf si debug)
  silent: !process.env.CI,

  // Upload de source maps : activé seulement si le token est fourni
  // Sinon, pas d'upload (le site marche quand même, juste stack traces minifiées)
  widenClientFileUpload: true,

  // Tunnel les requêtes Sentry à travers /monitoring pour contourner les ad-blockers
  tunnelRoute: "/monitoring",

  // Désactive la télémétrie Sentry elle-même
  telemetry: false,

  // Cache les logs de debug SDK en production
  disableLogger: true,

  // Active les logs Sentry pour Vercel Cron Jobs (pas utilisé pour l'instant)
  automaticVercelMonitors: true,
});
