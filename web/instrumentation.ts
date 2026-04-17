// ════════════════════════════════════════════════════════════════════════════
// Sentry — initialisation côté SERVEUR et EDGE
// ════════════════════════════════════════════════════════════════════════════
// Ce fichier est chargé automatiquement par Next.js 15 au démarrage du serveur.
// Il capture les erreurs qui se produisent :
//   • côté SSR (Server Side Rendering, Server Components, Route Handlers)
//   • côté Edge Runtime (middleware, fonctions edge)
//
// Activation conditionnelle : si SENTRY_DSN est vide → Sentry désactivé.
// ════════════════════════════════════════════════════════════════════════════

export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return; // Sentry désactivé tant que le DSN n'est pas configuré

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn,
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
      tracesSampleRate: 0.1,
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn,
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
      tracesSampleRate: 0.1,
      debug: false,
    });
  }
}

// Hook pour capturer les erreurs des Server Components / Route Handlers / Actions
export async function onRequestError(
  err: unknown,
  request: Request,
  context: { routerKind: string; routePath: string; routeType: string }
) {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(err, request, context);
}
