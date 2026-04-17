"use client";

// ════════════════════════════════════════════════════════════════════════════
// global-error.tsx — écran d'erreur ultime du App Router
// ════════════════════════════════════════════════════════════════════════════
// Se déclenche si une erreur échappe à tous les error.tsx plus spécifiques.
// ════════════════════════════════════════════════════════════════════════════

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#F7F6F3",
          color: "#1A1A1A",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <main style={{ maxWidth: 560, textAlign: "center" }}>
          <div
            style={{
              fontSize: "clamp(5rem, 14vw, 10rem)",
              fontWeight: 800,
              color: "#004423",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            :(
          </div>
          <h1
            style={{
              marginTop: "1rem",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            Une erreur inattendue s'est produite
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#6B6868", lineHeight: 1.65 }}>
            Désolé pour la gêne occasionnée. Vous pouvez réessayer ou revenir à l'accueil.
          </p>

          {error.digest && (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.8rem",
                color: "#9A9794",
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
              }}
            >
              Référence : {error.digest}
            </p>
          )}

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#5FB670",
                color: "#004423",
                border: "1px solid #5FB670",
                padding: "0.9rem 2rem",
                borderRadius: "2rem",
                fontWeight: 700,
                fontSize: "0.92rem",
                cursor: "pointer",
              }}
            >
              Réessayer
            </button>
            <Link
              href="/"
              style={{
                background: "white",
                color: "#004423",
                border: "1.5px solid #E2E0DB",
                padding: "0.9rem 2rem",
                borderRadius: "2rem",
                fontWeight: 700,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              Retour à l'accueil
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
