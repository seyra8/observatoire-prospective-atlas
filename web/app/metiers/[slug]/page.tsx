import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Cog, Download, Flame, Hash, Share2 } from "lucide-react";
import { Pill } from "@/components/ui/pill";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { metiersTopTrimestre } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const metier = metiersTopTrimestre.find((m) => m.slug === slug);
  return { title: metier?.libelle ?? "Fiche métier" };
}

export default async function MetierDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const metier = metiersTopTrimestre.find((m) => m.slug === slug);
  if (!metier) notFound();

  return (
    <>
      {/* Breadcrumb band */}
      <div className="border-b border-border bg-off px-8 py-4 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-4">
          <Link
            href="/metiers"
            className="inline-flex items-center gap-1.5 font-display text-[0.85rem] font-semibold text-muted transition-colors hover:text-atlas-green"
            aria-label="Retour à la liste des fiches métiers"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Retour
          </Link>
          <span className="text-border" aria-hidden="true">·</span>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Fiches métiers", href: "/metiers" },
              { label: metier.libelle },
            ]}
          />
        </div>
      </div>

      {/* Header fiche */}
      <header className="relative overflow-hidden bg-atlas-green px-8 pt-16 pb-20 lg:px-12">
        <span className="ghost-letter" style={{ right: "-3rem", top: "-4rem", fontSize: "34vw" }}>
          M
        </span>
        <div className="relative mx-auto max-w-[1200px]">
          <div className="mb-4 inline-flex items-center gap-1.5 font-display text-[0.75rem] font-bold uppercase tracking-[0.1em] text-atlas-green-v">
            <Cog className="h-3.5 w-3.5" />
            {metier.famille.libelle} · Famille {metier.famille.code}
          </div>
          <div className="mb-6 flex flex-wrap items-start justify-between gap-8">
            <h1
              className="max-w-[780px] font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              {metier.libelle}
            </h1>
            <div className="flex flex-wrap items-start gap-2.5">
              <button
                type="button"
                aria-label={`Télécharger la fiche ${metier.libelle} au format PDF`}
                className="inline-flex items-center gap-2 rounded-pill border border-atlas-green-v bg-atlas-green-v px-[1.4rem] py-[0.7rem] font-display text-[0.88rem] font-bold text-white transition-all hover:opacity-90 hover:-translate-y-px"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" /> Fiche PDF
              </button>
              <button
                type="button"
                aria-label={`Partager la fiche ${metier.libelle}`}
                className="inline-flex items-center gap-2 rounded-pill border border-white/25 bg-transparent px-[1.4rem] py-[0.7rem] font-display text-[0.88rem] font-bold text-white transition-all hover:bg-white/10"
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" /> Partager
              </button>
            </div>
          </div>
          <p className="mb-8 max-w-[820px] text-[1.15rem] font-light leading-[1.65] text-white/80">
            {metier.resume}
          </p>
          <div className="flex flex-wrap gap-4 border-t border-white/12 pt-6">
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/14 bg-white/7 px-[0.9rem] py-2 text-[0.82rem] text-white/85">
              <Hash className="h-3 w-3" />
              <span className="font-display font-bold tracking-[0.05em] text-atlas-green-v">
                ROME · {metier.codeRome}
              </span>
            </span>
            {metier.tension === "tension" && (
              <span className="inline-flex items-center gap-2 rounded-pill border border-tension/40 bg-tension/15 px-[0.9rem] py-2 text-[0.82rem] text-[#FCD9D4]">
                <Flame className="h-3 w-3" /> Métier en tension forte
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Key stats overlay */}
      <section className="-mt-12 mx-auto max-w-[1200px] px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-lg border-[1.5px] border-border bg-white shadow-card">
          {[
            { label: "Effectifs branche", value: metier.effectifs.toLocaleString("fr-FR"), hint: "+3,2 % an" },
            { label: "Salaire médian", value: `${metier.salaireMedian}`, unit: "k€", hint: "annuel brut" },
            { label: "Indice de tension", value: String(metier.indiceTension).replace(".", ","), unit: "×", hint: "T1 2026" },
            { label: "Formations", value: String(metier.nbFormations), hint: `dont ${metier.nbCqp} CQP` },
          ].map((stat, i, arr) => (
            <div key={stat.label} className={`p-7 ${i < arr.length - 1 ? "md:border-r border-border" : ""} ${i % 2 === 0 && i < arr.length - 1 ? "border-r border-border" : ""}`}>
              <div className="mb-2 font-display text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
                {stat.label}
              </div>
              <div className="font-display text-[2.25rem] font-extrabold leading-none tracking-[-0.02em] text-atlas-green">
                {stat.value}
                {stat.unit && <span className="ml-0.5 text-[1rem] font-semibold text-atlas-accent">{stat.unit}</span>}
              </div>
              <div className="mt-1.5 text-[0.78rem] text-muted">{stat.hint}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contenu simplifié MVP — tabs et compétences à porter dans v0.4 */}
      <section className="px-8 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Pill>01 · Présentation</Pill>
          <h2 className="mt-4 mb-6 font-display text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.01em] text-atlas-green">
            Le métier — <em className="not-italic text-atlas-accent">en un coup d'œil</em>
          </h2>
          <div className="max-w-3xl space-y-4 text-[1rem] leading-[1.75] text-ink-2">
            <p>
              {metier.resume} Son intervention couvre la maintenance <strong>corrective</strong> (dépannage),
              <strong> préventive</strong> (planification, contrôles) et de plus en plus <strong>prédictive</strong>
              (analyse de données capteurs, intelligence artificielle).
            </p>
            <p className="text-muted">
              Les sections <em>Compétences</em>, <em>Formations</em>, <em>Chiffres-clés</em> et
              <em> Tendances</em> seront disponibles dès le branchement du CMS Directus.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
