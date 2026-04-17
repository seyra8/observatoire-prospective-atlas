import { Metadata } from "next";
import { Pill } from "@/components/ui/pill";

export const metadata: Metadata = { title: "Actualités" };

export default function ActualitesPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-atlas-green px-8 py-20 lg:px-12">
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>
          A
        </span>
        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-5">
            <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              Signaux de branche · flux RSS + éditorial
            </span>
          </div>
          <h1
            className="mb-5 max-w-[860px] font-display font-extrabold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Actualités —<br />
            <em className="not-italic text-atlas-green-v">à venir</em>
          </h1>
          <p className="max-w-[680px] text-[1.1rem] font-light leading-[1.7] text-white/75">
            Flux d'actualités sectorielles, newsletters, éditoriaux branches. Page en cours de construction.
          </p>
        </div>
      </header>
      <section className="px-8 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Pill>MVP · à brancher</Pill>
          <p className="mt-6 max-w-2xl text-[1rem] leading-[1.75] text-muted">
            L'agrégation RSS + éditorial sera branchée quand le CMS Directus sera en place.
            Pour le MVP le plus rapide, on peut démarrer avec uniquement les 3 autres sections
            (Métiers, Études, Data) et déployer Actualités en v0.4.
          </p>
        </div>
      </section>
    </>
  );
}
