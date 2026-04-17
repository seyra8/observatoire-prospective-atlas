import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase, Building2, FileText, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pill } from "@/components/ui/pill";
import { MetierCard } from "@/components/metier-card";
import { StudyCard } from "@/components/study-card";
import {
  allStudies,
  branchesDetails,
  metiersTopTrimestre,
} from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return branchesDetails.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const branche = branchesDetails.find((b) => b.slug === slug);
  if (!branche) return { title: "Branche introuvable" };
  return {
    title: branche.libelle,
    description: `${branche.resume} ${branche.effectifsSalaries.toLocaleString("fr-FR")} salariés dans ${branche.nbEntreprises.toLocaleString("fr-FR")} entreprises.`,
  };
}

export default async function BrancheDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const branche = branchesDetails.find((b) => b.slug === slug);
  if (!branche) notFound();

  // Métiers liés (en croisant les codes)
  const metiersLies = metiersTopTrimestre
    .filter((m) => branche.metiersPhares.includes(m.slug) || m.branches.includes(branche.code))
    .slice(0, 6);

  // Études liées (par id)
  const etudesLiees = allStudies.filter((s) => branche.etudesIds.includes(s.id)).slice(0, 6);

  return (
    <>
      {/* Breadcrumb band */}
      <div className="border-b border-border bg-off px-8 py-4 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-4">
          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 font-display text-[0.85rem] font-semibold text-muted transition-colors hover:text-atlas-green"
            aria-label="Retour à la liste des branches"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Retour
          </Link>
          <span className="text-border" aria-hidden="true">·</span>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Branches", href: "/branches" },
              { label: branche.libelle },
            ]}
          />
        </div>
      </div>

      {/* HEADER */}
      <header className="relative overflow-hidden bg-atlas-green px-8 pt-16 pb-20 lg:px-12">
        <span
          className="ghost-letter"
          style={{ right: "-3rem", top: "-4rem", fontSize: "34vw" }}
          aria-hidden="true"
        >
          {branche.coverLetter}
        </span>
        <div className="relative mx-auto max-w-[1200px]">
          <div className="mb-4 inline-flex items-center gap-1.5 font-display text-[0.75rem] font-bold uppercase tracking-[0.1em] text-atlas-green-v">
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            Branche professionnelle {branche.idcc ? `· IDCC ${branche.idcc}` : ""}
          </div>
          <h1
            className="mb-5 max-w-[900px] font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {branche.libelle}
          </h1>
          <p className="mb-6 max-w-[820px] text-[1.1rem] font-light leading-[1.65] text-white/85">
            {branche.chapo}
          </p>
          <div className="flex flex-wrap gap-3 border-t border-white/12 pt-5">
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/14 bg-white/8 px-[0.9rem] py-2 text-[0.82rem] text-white/90">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              {branche.effectifsSalaries.toLocaleString("fr-FR")} salariés
            </span>
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/14 bg-white/8 px-[0.9rem] py-2 text-[0.82rem] text-white/90">
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              {branche.nbEntreprises.toLocaleString("fr-FR")} entreprises
            </span>
            <span className="inline-flex items-center gap-2 rounded-pill border border-atlas-green-v/50 bg-atlas-green-v/15 px-[0.9rem] py-2 text-[0.82rem] text-atlas-green-v">
              Gouvernance · {branche.gouvernance}
            </span>
          </div>
        </div>
      </header>

      {/* KEY STATS OVERLAY */}
      <section className="relative z-10 mx-auto -mt-12 max-w-[1200px] px-8 lg:px-12">
        <div className="grid grid-cols-2 overflow-hidden rounded-lg border-[1.5px] border-border bg-white shadow-card md:grid-cols-4">
          <StatCell label="Part des femmes" value={`${branche.partFemmes} %`} hint="dans la branche" isLast={false} />
          <StatCell label="Âge médian" value={String(branche.ageMedian)} hint="ans" isLast={false} />
          <StatCell label="Salaire médian" value={`${branche.salaireMedian}`} unit="k€" hint="annuel brut" isLast={false} />
          <StatCell label="Secteur" value={branche.code} hint={branche.idcc ? `IDCC ${branche.idcc}` : ""} isLast />
        </div>
      </section>

      {/* TENDANCES */}
      <section className="px-8 py-16 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Pill>01 · Tendances</Pill>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-atlas-green">
                La branche — <em className="not-italic text-atlas-accent">en mouvement</em>
              </h2>
            </div>
            <Link
              href="/dataviz"
              className="inline-flex items-center gap-1.5 font-display text-[0.85rem] font-bold text-atlas-green border-b-2 border-atlas-green-v pb-1 transition-colors hover:text-atlas-accent"
            >
              Dashboard data <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {branche.tendances.map((t) => (
              <div key={t.label} className="rounded-md border-[1.5px] border-border bg-white p-6">
                <div className="mb-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted">
                  {t.label}
                </div>
                <div className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.02em] text-atlas-green">
                  {t.value}
                </div>
                <div
                  className={`mt-2 inline-flex items-center gap-1 font-mono text-[0.78rem] font-semibold ${
                    t.trend === "up"
                      ? "text-atlas-accent"
                      : t.trend === "down"
                        ? "text-tension"
                        : "text-muted"
                  }`}
                >
                  {t.trend === "up" && <TrendingUp className="h-3 w-3" aria-hidden="true" />}
                  {t.trend === "down" && <TrendingDown className="h-3 w-3" aria-hidden="true" />}
                  {t.trend === "flat" && <span aria-hidden="true">—</span>}
                  {t.trend === "up" ? "En progression" : t.trend === "down" ? "En recul" : "Stable"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DÉFIS PROSPECTIFS */}
      <section className="bg-off px-8 py-16 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8">
            <Pill variant="purple">02 · Défis prospectifs</Pill>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-atlas-green">
              Les enjeux — <em className="not-italic text-atlas-accent">à 3-5 ans</em>
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {branche.defisProspectifs.map((defi, i) => (
              <li key={i} className="group relative rounded-md border-[1.5px] border-border bg-white p-6 transition-all hover:border-atlas-green-v hover:shadow-hover">
                <div className="mb-3 font-display text-[3rem] font-extrabold leading-none text-atlas-green-tag">
                  0{i + 1}
                </div>
                <p className="text-[0.95rem] leading-relaxed text-text-2">{defi}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MÉTIERS LIÉS */}
      {metiersLies.length > 0 && (
        <section className="px-8 py-16 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Pill>03 · Référentiel métier</Pill>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-atlas-green">
                  Les métiers — <em className="not-italic text-atlas-accent">phares de la branche</em>
                </h2>
              </div>
              <Link
                href="/metiers"
                className="inline-flex items-center gap-1.5 font-display text-[0.85rem] font-bold text-atlas-green border-b-2 border-atlas-green-v pb-1 transition-colors hover:text-atlas-accent"
              >
                Tous les métiers <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
            >
              {metiersLies.map((m) => (
                <MetierCard key={m.slug} metier={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ÉTUDES LIÉES */}
      {etudesLiees.length > 0 && (
        <section className="bg-off px-8 py-16 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Pill variant="purple">04 · Publications</Pill>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-atlas-green">
                  Études de la branche — <em className="not-italic text-atlas-accent">à télécharger</em>
                </h2>
              </div>
              <Link
                href="/etudes"
                className="inline-flex items-center gap-1.5 font-display text-[0.85rem] font-bold text-atlas-green border-b-2 border-atlas-green-v pb-1 transition-colors hover:text-atlas-accent"
              >
                Toutes les études <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
            >
              {etudesLiees.map((s) => (
                <StudyCard key={s.id} study={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Autres branches du même secteur (navigation latérale) */}
      <section className="px-8 py-14 lg:px-12">
        <div className="mx-auto max-w-[1200px] rounded-lg border-[1.5px] border-border bg-white p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-1 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted">
                Explorer
              </div>
              <div className="font-display text-[1.25rem] font-bold text-atlas-green">
                Toutes les branches OPCO Atlas
              </div>
              <p className="mt-1 text-[0.92rem] text-muted">
                14 branches en 4 secteurs · 1,95 M de salariés
              </p>
            </div>
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 rounded-pill bg-atlas-green-v px-6 py-[0.8rem] font-display text-[0.88rem] font-bold text-atlas-green transition-opacity hover:opacity-90 hover:-translate-y-px"
            >
              Voir la cartographie
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

function StatCell({
  label,
  value,
  unit,
  hint,
  isLast,
}: {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  isLast: boolean;
}) {
  return (
    <div className={isLast ? "p-7" : "p-7 md:border-r border-border"}>
      <div className="mb-2 font-display text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
        {label}
      </div>
      <div className="font-display text-[2.25rem] font-extrabold leading-none tracking-[-0.02em] text-atlas-green">
        {value}
        {unit && <span className="ml-0.5 text-[1rem] font-semibold text-atlas-accent">{unit}</span>}
      </div>
      {hint && <div className="mt-1.5 text-[0.78rem] text-muted">{hint}</div>}
    </div>
  );
}
