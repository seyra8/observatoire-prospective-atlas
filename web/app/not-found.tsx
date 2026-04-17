import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-8 py-20">
      <div className="max-w-xl text-center">
        <div className="font-display font-extrabold leading-none text-atlas-green" style={{ fontSize: "clamp(6rem, 18vw, 14rem)" }}>
          404
        </div>
        <h1 className="mt-4 font-display text-[1.5rem] font-bold text-ink">
          Page introuvable
        </h1>
        <p className="mt-2 text-muted">
          La ressource demandée n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-pill bg-atlas-green-v px-8 py-[0.9rem] font-display text-[0.92rem] font-bold text-white transition-all hover:opacity-88 hover:-translate-y-px"
        >
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
