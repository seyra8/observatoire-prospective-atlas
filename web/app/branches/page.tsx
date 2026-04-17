import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, Building2, Compass, Shield } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pill } from "@/components/ui/pill";
import { BRANCHES_BY_SECTEUR, SECTEURS, type Secteur } from "@/lib/mock-data";
import type { BrancheDetail } from "@/lib/types";

export const metadata: Metadata = {
  title: "Branches professionnelles",
  description:
    "Les 14 branches professionnelles accompagnées par OPCO Atlas : assurance, banque & finance, conseil, expertise comptable. 1,95 million de salariés, 198 000 entreprises.",
};

const SECTEUR_ICONS = {
  assurance: Shield,
  "banque-finance": Banknote,
  conseil: Compass,
  "expertise-comptable": Building2,
} as const;

const SECTEUR_COLORS: Record<Secteur, { bg: string; letter: string; accent: string }> = {
  assurance: { bg: "bg-atlas-green", letter: "A", accent: "text-atlas-green-v" },
  "banque-finance": { bg: "bg-atlas-purple", letter: "B", accent: "text-atlas-green-v" },
  conseil: { bg: "bg-[#1F3D15]", letter: "C", accent: "text-atlas-green-v" },
  "expertise-comptable": { bg: "bg-[#0d3b24]", letter: "E", accent: "text-atlas-green-v" },
};

export default function BranchesPage() {
  return (
    <>
      {/* HERO */}
      <header className="relative overflow-hidden bg-atlas-green px-8 py-20 lg:px-12">
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>
          B
        </span>
        <div className="relative mx-auto max-w-[1400px]">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Branches professionnelles" },
            ]}
          />
          <div className="mb-5">
            <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              14 branches · 4 secteurs · 1,95 M salariés
            </span>
          </div>
          <h1
            className="mb-5 max-w-[1000px] font-display font-extrabold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Les branches —<br />
            <em className="not-italic text-atlas-green-v">accompagnées par Atlas</em>
          </h1>
          <p className="max-w-[760px] text-[1.1rem] font-light leading-[1.7] text-white/75">
            OPCO Atlas accompagne 198 000 entreprises et près de 2 millions de salariés dans
            les branches de l'assurance, de la banque & finance, du conseil et de l'expertise
            comptable. Chaque branche a sa gouvernance, ses enjeux, ses tendances — cette
            page les cartographie toutes.
          </p>
        </div>
      </header>

      {/* KPIs globaux */}
      <section className="mx-auto max-w-[1400px] px-8 py-12 lg:px-12">
        <div className="grid grid-cols-2 gap-[1.5px] overflow-hidden rounded-lg border-[1.5px] border-border bg-border md:grid-cols-4">
          {[
            { label: "Branches", value: "14", hint: "4 secteurs" },
            { label: "Entreprises", value: "198 K", hint: "TPE / ETI / grands groupes" },
            { label: "Salariés", value: "1,95 M", hint: "dont ~50 % cadres" },
            { label: "Études publiées", value: "36", hint: "prospectives, enquêtes, baromètres" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white p-7">
              <div className="mb-2 font-display text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
                {kpi.label}
              </div>
              <div className="font-display text-[2.25rem] font-extrabold leading-none tracking-[-0.02em] text-atlas-green">
                {kpi.value}
              </div>
              <div className="mt-1.5 text-[0.78rem] text-muted">{kpi.hint}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Par secteur */}
      {(Object.keys(SECTEURS) as Secteur[]).map((secteur, idx) => {
        const info = SECTEURS[secteur];
        const branches = BRANCHES_BY_SECTEUR[secteur];
        const Icon = SECTEUR_ICONS[secteur];
        const oddSection = idx % 2 === 1;

        return (
          <section
            key={secteur}
            className={oddSection ? "bg-off px-8 py-16 lg:px-12" : "px-8 py-16 lg:px-12"}
          >
            <div className="mx-auto max-w-[1400px]">
              {/* Secteur header */}
              <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <Pill variant={idx % 2 === 0 ? "green" : "purple"}>
                      0{idx + 1} · Secteur
                    </Pill>
                    <span className="text-sm text-muted">{branches.length} branches</span>
                  </div>
                  <h2 className="flex items-center gap-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-atlas-green">
                    <Icon className="h-8 w-8 shrink-0 text-atlas-accent" aria-hidden="true" />
                    {info.libelle}
                  </h2>
                  <p className="mt-2 max-w-[680px] text-[1rem] leading-relaxed text-muted">
                    {info.description}
                  </p>
                </div>
              </div>

              {/* Grid de branches */}
              <div
                className="grid gap-5"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
              >
                {branches.map((b) => (
                  <BrancheCard key={b.code} branche={b} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CARD BRANCHE
// ═══════════════════════════════════════════════════════════════════════════

function BrancheCard({ branche }: { branche: BrancheDetail }) {
  return (
    <Link
      href={`/branches/${branche.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border-[1.5px] border-border bg-white transition-all duration-200 hover:border-atlas-green-v hover:shadow-hover hover:-translate-y-0.5"
      aria-label={`Fiche de la branche ${branche.libelle} : ${branche.effectifsSalaries.toLocaleString("fr-FR")} salariés, ${branche.nbEntreprises.toLocaleString("fr-FR")} entreprises`}
    >
      {/* Cover avec lettre fantôme */}
      <div className="relative flex aspect-[16/7] items-end overflow-hidden bg-atlas-green p-5">
        <span
          className="pointer-events-none absolute font-display font-extrabold leading-none"
          style={{
            right: "-2rem",
            bottom: "-3rem",
            fontSize: "11rem",
            color: "rgba(95,182,112,0.14)",
          }}
          aria-hidden="true"
        >
          {branche.coverLetter}
        </span>
        <div className="relative">
          <div className="font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-atlas-green-v">
            {branche.idcc ? `IDCC ${branche.idcc}` : "Multi-convention"}
          </div>
          <div className="mt-1 font-display text-[1.35rem] font-extrabold leading-tight text-white">
            {branche.libelle}
          </div>
        </div>
      </div>

      {/* Corps card */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="line-clamp-3 text-[0.9rem] leading-[1.55] text-muted">{branche.resume}</p>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2 rounded-sm bg-off p-3 text-center">
          <div>
            <div className="font-display text-[1.05rem] font-extrabold leading-none text-atlas-green">
              {formatEffectifs(branche.effectifsSalaries)}
            </div>
            <div className="mt-1 text-[0.68rem] font-medium text-muted">salariés</div>
          </div>
          <div className="border-x border-border">
            <div className="font-display text-[1.05rem] font-extrabold leading-none text-atlas-green">
              {formatEffectifs(branche.nbEntreprises)}
            </div>
            <div className="mt-1 text-[0.68rem] font-medium text-muted">entreprises</div>
          </div>
          <div>
            <div className="font-display text-[1.05rem] font-extrabold leading-none text-atlas-green">
              {branche.salaireMedian} k€
            </div>
            <div className="mt-1 text-[0.68rem] font-medium text-muted">salaire médian</div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-dashed border-border pt-3">
          <span className="font-display text-[0.7rem] font-bold uppercase tracking-[0.08em] text-muted">
            {branche.gouvernance}
          </span>
          <span className="inline-flex items-center gap-1 font-display text-[0.82rem] font-bold text-atlas-accent transition-all group-hover:gap-2">
            Découvrir
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatEffectifs(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(".", ",")} M`;
  if (n >= 10000) return `${Math.round(n / 1000)} K`;
  return n.toLocaleString("fr-FR");
}
