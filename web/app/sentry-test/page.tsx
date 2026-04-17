"use client";

// ════════════════════════════════════════════════════════════════════════════
// /sentry-test — page de vérification Sentry
// ════════════════════════════════════════════════════════════════════════════
// Utilité : tester que Sentry capture bien les erreurs en production.
// À supprimer (ou protéger) quand la vérif est faite.
// ════════════════════════════════════════════════════════════════════════════

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function SentryTestPage() {
  const [clicked, setClicked] = useState(false);

  const triggerError = () => {
    setClicked(true);
    // Laisse le temps au state de se mettre à jour, puis throw
    setTimeout(() => {
      throw new Error(
        "Test Sentry — cette erreur est volontaire, elle valide que Sentry capture bien les exceptions côté client."
      );
    }, 100);
  };

  const triggerServerError = async () => {
    setClicked(true);
    // Appeler une route API inexistante → erreur 404 gérée côté serveur
    await fetch("/api/sentry-test-nonexistent-endpoint", { method: "POST" }).catch(
      (err) => {
        throw err;
      }
    );
  };

  return (
    <section className="mx-auto max-w-[720px] px-8 py-20 lg:px-12">
      <div className="mb-8 inline-flex items-center gap-2 rounded-pill bg-atlas-purple-lt px-4 py-2 font-display text-[0.75rem] font-bold uppercase tracking-wider text-atlas-purple">
        <AlertTriangle className="h-3.5 w-3.5" />
        Page de vérification Sentry
      </div>

      <h1 className="mb-4 font-display text-[2rem] font-extrabold leading-tight tracking-tight text-atlas-green">
        Tester que Sentry fonctionne
      </h1>

      <p className="mb-8 text-[1rem] leading-relaxed text-ink-2">
        Cette page sert uniquement à vérifier que notre système de monitoring
        d'erreurs capture bien les exceptions. Clique sur le bouton ci-dessous
        pour <strong>déclencher volontairement</strong> une erreur. Elle sera
        envoyée à Sentry en moins de 30 secondes.
      </p>

      <div className="mb-8 rounded-md border-[1.5px] border-atlas-green/20 bg-atlas-green-lt p-5 text-[0.92rem] text-atlas-green">
        <div className="mb-2 flex items-center gap-2 font-display font-bold">
          <CheckCircle2 className="h-4 w-4" />
          Rassure-toi
        </div>
        <ul className="list-disc space-y-1 pl-5">
          <li>Aucun visiteur ne sera affecté — c'est une erreur de test isolée.</li>
          <li>Tu peux cliquer autant de fois que tu veux sans dommage.</li>
          <li>L'erreur s'affichera brièvement puis la page reviendra à la normale.</li>
        </ul>
      </div>

      <button
        type="button"
        onClick={triggerError}
        className="inline-flex items-center gap-2 rounded-pill bg-tension px-8 py-[0.9rem] font-display text-[0.92rem] font-bold text-white transition-opacity hover:opacity-90 hover:-translate-y-px"
      >
        <AlertTriangle className="h-4 w-4" />
        Déclencher une erreur client
      </button>

      <button
        type="button"
        onClick={triggerServerError}
        className="ml-3 inline-flex items-center gap-2 rounded-pill border-[1.5px] border-tension bg-white px-8 py-[0.9rem] font-display text-[0.92rem] font-bold text-tension transition-colors hover:bg-tension-bg"
      >
        <AlertTriangle className="h-4 w-4" />
        Déclencher une erreur serveur
      </button>

      {clicked && (
        <p className="mt-6 rounded-md border-[1.5px] border-atlas-purple/20 bg-atlas-purple-lt px-5 py-4 text-[0.92rem] text-atlas-purple">
          🎯 Erreur déclenchée — va vérifier sur{" "}
          <a
            href="https://sentry.io/issues/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            sentry.io/issues
          </a>{" "}
          dans 30 secondes. L'erreur devrait apparaître dans la liste.
        </p>
      )}

      <div className="mt-12 border-t border-border pt-6 text-[0.88rem] text-muted">
        <p>
          ⚠️ <strong>À supprimer</strong> de <code className="rounded bg-off px-1.5 py-0.5 font-mono text-[0.82rem]">web/app/sentry-test/</code>{" "}
          une fois que tu as validé que Sentry reçoit bien les erreurs (v0.4).
        </p>
        <p className="mt-2">
          <Link href="/" className="font-display font-semibold text-atlas-green underline decoration-atlas-green-v decoration-2 underline-offset-4">
            ← Retour à l'accueil
          </Link>
        </p>
      </div>
    </section>
  );
}
