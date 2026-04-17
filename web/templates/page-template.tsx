// ════════════════════════════════════════════════════════════════════════════
// TEMPLATE DE PAGE ÉDITORIALE — à copier dans app/<ton-slug>/page.tsx
// ════════════════════════════════════════════════════════════════════════════
// 1. Copier ce fichier dans web/app/<slug>/page.tsx (ex: web/app/ma-page/page.tsx)
// 2. Remplacer les TODO par ton contenu
// 3. (Optionnel) ajouter un lien dans la nav et/ou le footer
// 4. Ouvrir http://localhost:3000/<slug>
// ════════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pill } from "@/components/ui/pill";

// ─── Metadata (SEO + titre d'onglet) ──────────────────────────────────────
export const metadata: Metadata = {
  title: "TODO Titre de la page",
  description: "TODO Description pour Google et les réseaux (150-160 caractères max).",
};

export default function MaPage() {
  return (
    <>
      {/* ─── HEADER VERT SIGNATURE ───────────────────────────── */}
      <header className="relative overflow-hidden bg-atlas-green px-8 py-16 lg:px-12">
        {/* Lettre fantôme décorative (changer la lettre selon le thème) */}
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>
          M
        </span>

        <div className="relative mx-auto max-w-[1000px]">
          {/* Fil d'Ariane */}
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "TODO Titre page" },
            ]}
          />

          {/* Pill eyebrow */}
          <div className="mb-5">
            <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              TODO Étiquette · méta
            </span>
          </div>

          {/* Titre XXL avec accent coloré */}
          <h1
            className="mb-5 max-w-[860px] font-display font-extrabold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
          >
            TODO Titre —<br />
            <em className="not-italic text-atlas-accent">accent éditorial</em>
          </h1>

          {/* Chapeau (lead) */}
          <p className="max-w-[680px] text-[1.05rem] font-light leading-[1.7] text-white/75">
            TODO Résumé de la page en 1-2 phrases. Le contexte, pour qui, pourquoi.
          </p>
        </div>
      </header>

      {/* ─── CORPS DE PAGE ──────────────────────────────────── */}
      <article className="mx-auto max-w-[900px] px-8 py-16 lg:px-12">
        <div className="space-y-10 text-[1rem] leading-[1.8] text-ink-2">

          {/* SECTION 1 */}
          <section>
            <Pill>01 · Première section</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              TODO Titre de section
            </h2>
            <p className="mt-3">
              TODO Votre texte. Vous pouvez mettre des <strong>mots en gras</strong>,
              des <em>mots en italique</em>, ou <a href="#" className="font-semibold text-atlas-green underline decoration-atlas-green-v decoration-2 underline-offset-4 hover:text-atlas-green-v">des liens</a>.
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Point 1</li>
              <li>Point 2</li>
              <li>Point 3</li>
            </ul>
          </section>

          {/* SECTION 2 */}
          <section>
            <Pill variant="purple">02 · Deuxième section (variante violette)</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              TODO Autre section
            </h2>
            <p className="mt-3">
              TODO Contenu.
            </p>
          </section>

          {/* ENCART INFO (fond doux) */}
          <section className="rounded-md border-[1.5px] border-border bg-off p-6 text-[0.92rem]">
            <p>
              <strong>À noter :</strong> utilisez ce genre d'encart pour les informations
              complémentaires, notes de bas de page, crédits, dates.
            </p>
          </section>

        </div>
      </article>
    </>
  );
}
