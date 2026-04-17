import { Metadata } from "next";
import { Pill } from "@/components/ui/pill";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MetierCard } from "@/components/metier-card";
import { metiersTopTrimestre } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Fiches métiers",
  description: "84 fiches métiers vivantes des branches accompagnées par OPCO Atlas.",
};

export default function MetiersPage() {
  return (
    <>
      {/* Header band vert profond */}
      <header className="relative overflow-hidden bg-atlas-green px-8 py-20 lg:px-12">
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>
          M
        </span>
        <div className="relative mx-auto max-w-[1400px]">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Fiches métiers" },
            ]}
          />
          <div className="mb-5">
            <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              Référentiel vivant · 84 fiches
            </span>
          </div>
          <h1
            className="mb-5 max-w-[860px] font-display font-extrabold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Fiches métiers —<br />
            <em className="not-italic text-atlas-green-v">branches Atlas</em>
          </h1>
          <p className="max-w-[680px] text-[1.1rem] font-light leading-[1.7] text-white/75">
            Description, compétences, formations, tendances : le référentiel des métiers
            des branches accompagnées par OPCO Atlas, mis à jour en continu.
          </p>
        </div>
      </header>

      {/* Grille */}
      <section className="px-8 py-16 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Pill>Résultats</Pill>
              <span className="font-display text-[1rem] font-semibold text-ink">
                <strong className="font-extrabold text-atlas-green">6 métiers</strong> affichés · filtres bientôt disponibles
              </span>
            </div>
          </div>
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
          >
            {metiersTopTrimestre.map((metier) => (
              <MetierCard key={metier.slug} metier={metier} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
