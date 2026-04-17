// ════════════════════════════════════════════════════════════════════════════
// Sentry — initialisation côté CLIENT (navigateur)
// ════════════════════════════════════════════════════════════════════════════
// Ce fichier est chargé automatiquement par Next.js 15 côté client.
// Il capture les erreurs JavaScript non gérées qui se produisent
// chez les visiteurs (TypeError, ReferenceError, Promise rejections, etc.).
//
// Activation conditionnelle :
//   • Si NEXT_PUBLIC_SENTRY_DSN est vide → Sentry désactivé (pas d'erreur au build)
//   • Si DSN présent → Sentry s'initialise uniquement en production
//
// Pour activer :
//   1. Créer un compte sur https://sentry.io (plan Developer gratuit)
//   2. Créer un projet "Next.js" nommé "observatoire-prospective-atlas"
//   3. Copier le DSN (ressemble à https://xxx@o0.ingest.sentry.io/xxx)
//   4. Ajouter NEXT_PUBLIC_SENTRY_DSN dans Vercel → Project Settings → Environment Variables
//   5. Push le code → Vercel redéploie → Sentry collecte
// ════════════════════════════════════════════════════════════════════════════

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,

    // Identifie l'environnement (production / preview / development)
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",

    // Taux d'échantillonnage des traces de performance (0 = off, 1 = toutes)
    // 10% suffisent largement pour le MVP et préserve le quota
    tracesSampleRate: 0.1,

    // Session Replay : enregistre une vidéo de la session si erreur (0-1)
    // Activé à 10% des sessions, 100% quand il y a une erreur
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Intégrations
    integrations: [
      Sentry.replayIntegration({
        // Masque les champs sensibles par défaut
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Debug en dev uniquement
    debug: false,

    // Ignore les erreurs qui ne viennent pas de notre code
    ignoreErrors: [
      // Erreurs navigateur courantes non actionables
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
      "Non-Error promise rejection captured",
      // Erreurs d'extensions navigateur (Ad-blockers, etc.)
      /^chrome-extension:/,
      /^moz-extension:/,
    ],
  });
}

// Hook Router instrumenté pour tracer les transitions de pages
export const onRouterTransitionStart = dsn
  ? Sentry.captureRouterTransitionStart
  : () => {};
