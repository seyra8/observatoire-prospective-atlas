import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Download,
  FileText,
  Hash,
  Share2,
  Sheet,
  ScrollText,
  Telescope,
  Users,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pill } from "@/components/ui/pill";
import { StudyCard } from "@/components/study-card";
import { allStudies, studyDetailsById } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Object.keys(studyDetailsById).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const study = studyDetailsById[id];
  if (!study) return { title: "Étude introuvable" };
  return {
    title: study.title,
    description: study.chapo,
    keywords: study.keywords,
  };
}

const KIND_LABELS = {
  prospective: "Étude prospective",
  enquete: "Enquête de branche",
  barometre: "Baromètre trimestriel",
  cartographie: "Cartographie métiers",
  note: "Note de synthèse",
} as const;

const KIND_ICONS = {
  prospective: Telescope,
  enquete: Users,
  barometre: ScrollText,
  cartographie: ScrollText,
  note: ScrollText,
} as const;

const FORMAT_ICONS = {
  pdf: FileText,
  excel: Sheet,
  csv: Sheet,
  synthese: ScrollText,
} as const;

const COVER_BG = {
  green: "bg-atlas-green",
  purple: "bg-atlas-purple",
  olive: "bg-[#1F3D15]",
  deep: "bg-[#0d3b24]",
} as const;

export default async function EtudeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const study = studyDetailsById[id];
  if (!study) notFound();

  const KindIcon = KIND_ICONS[study.kind];

  // Études liées : même branche ou tags en commun
  const related = allStudies
    .filter((s) => s.id !== study.id)
    .filter((s) => s.branche === study.branche || s.tags.some((t) => study.tags.includes(t)))
    .slice(0, 3);

  const dateFormatted = new Date(study.datePubli).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Breadcrumb band */}
      <div className="border-b border-border bg-off px-8 py-4 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-4">
          <Link
            href="/etudes"
            className="inline-flex items-center gap-1.5 font-display text-[0.85rem] font-semibold text-muted transition-colors hover:text-atlas-green"
            aria-label="Retour à la bibliothèque d'études"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Retour
          </Link>
          <span className="text-border" aria-hidden="true">·</span>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Bibliothèque d'études", href: "/etudes" },
              { label: study.title },
            ]}
          />
        </div>
      </div>

      {/* HEADER avec cover */}
      <header className={`relative overflow-hidden ${COVER_BG[study.coverVariant]} px-8 py-16 lg:px-12`}>
        <span
          className="ghost-letter"
          style={{ right: "-3rem", top: "-4rem", fontSize: "36vw", color: "rgba(95,182,112,0.1)" }}
          aria-hidden="true"
        >
          {study.coverLetter}
        </span>
        <div className="relative mx-auto max-w-[1100px]">
          <div className="mb-4 inline-flex items-center gap-1.5 font-display text-[0.75rem] font-bold uppercase tracking-[0.1em] text-atlas-green-v">
            <KindIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {KIND_LABELS[study.kind]} · {study.numero}
          </div>
          <h1
            className="mb-5 max-w-[960px] font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            {study.title}
          </h1>
          <p className="mb-7 max-w-[820px] text-[1.1rem] font-light leading-[1.65] text-white/85">
            {study.chapo}
          </p>
          <div className="flex flex-wrap gap-3 border-t border-white/15 pt-5">
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/8 px-[0.9rem] py-2 text-[0.82rem] text-white/90">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Publiée le {dateFormatted}
            </span>
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/8 px-[0.9rem] py-2 text-[0.82rem] text-white/90">
              <Hash className="h-3.5 w-3.5" aria-hidden="true" />
              {study.branche}{study.idcc && ` · IDCC ${study.idcc}`}
            </span>
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/8 px-[0.9rem] py-2 text-[0.82rem] text-white/90">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              {study.nbPages} pages
            </span>
          </div>
        </div>
      </header>

      {/* TÉLÉCHARGEMENTS — floating card */}
      <section className="relative z-10 mx-auto -mt-10 max-w-[1100px] px-8 lg:px-12">
        <div className="rounded-lg border-[1.5px] border-border bg-white p-5 shadow-card md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-1 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted">
                Télécharger cette étude
              </div>
              <div className="font-display text-[1.05rem] font-bold text-atlas-green">
                {study.formats.length} format{study.formats.length > 1 ? "s" : ""} disponible{study.formats.length > 1 ? "s" : ""}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.formats.map((f) => {
                const Icon = FORMAT_ICONS[f.type];
                return (
                  <a
                    key={f.type}
                    href={`#download-${f.type}`}
                    className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-atlas-green-v bg-atlas-green-v px-5 py-[0.7rem] font-display text-[0.88rem] font-bold text-atlas-green transition-opacity hover:opacity-90 hover:-translate-y-px"
                    aria-label={`Télécharger ${f.label}${f.pages ? ` (${f.pages} pages)` : ""}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {f.label}
                    {f.pages && <span className="text-atlas-green/70">· {f.pages} p.</span>}
                  </a>
                );
              })}
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-border bg-white px-5 py-[0.7rem] font-display text-[0.88rem] font-bold text-atlas-green transition-colors hover:border-atlas-green-v hover:bg-atlas-green-lt"
                aria-label="Partager cette étude"
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CORPS 2 colonnes : contenu + sidebar */}
      <div className="mx-auto max-w-[1100px] px-8 py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 lg:px-12">
        {/* COLONNE PRINCIPALE */}
        <article className="space-y-12">
          {/* CONTEXTE */}
          <section>
            <Pill>01 · Contexte</Pill>
            <h2 className="mt-3 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-atlas-green">
              Pourquoi cette étude ?
            </h2>
            <div className="mt-4 space-y-4 text-[1rem] leading-[1.75] text-ink-2">
              {study.contexte.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* MÉTHODOLOGIE */}
          <section>
            <Pill variant="purple">02 · Méthodologie</Pill>
            <h2 className="mt-3 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-atlas-green">
              Comment nous avons procédé
            </h2>
            <ol className="mt-6 space-y-5">
              {study.methodologie.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <div className="shrink-0 font-display text-[2.5rem] font-extrabold leading-none text-atlas-green-tag">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.05rem] font-bold text-atlas-green">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* RÉSULTATS CLÉS */}
          <section>
            <Pill>03 · Résultats clés</Pill>
            <h2 className="mt-3 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-atlas-green">
              Ce qu'il faut retenir — <em className="not-italic text-atlas-accent">en 3 chiffres</em>
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {study.resultatsCles.map((r, i) => (
                <div
                  key={i}
                  className="rounded-md border-[1.5px] border-border bg-white p-6 transition-colors hover:border-atlas-green-v"
                >
                  <div className="mb-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted">
                    {r.label}
                  </div>
                  <div className="font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.02em] text-atlas-green">
                    {r.value}
                  </div>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RECOMMANDATIONS */}
          <section>
            <Pill variant="purple">04 · Recommandations</Pill>
            <h2 className="mt-3 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-atlas-green">
              Nos propositions d'action
            </h2>
            <ol className="mt-6 space-y-3">
              {study.recommandations.map((reco, i) => (
                <li
                  key={i}
                  className="group flex gap-4 rounded-md border-[1.5px] border-border bg-off p-5 transition-colors hover:border-atlas-green-v hover:bg-atlas-green-lt"
                >
                  <span className="shrink-0 font-display text-[1.5rem] font-extrabold text-atlas-accent">
                    →
                  </span>
                  <p className="text-[0.95rem] leading-relaxed text-text-2">{reco}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* SOURCES */}
          <section>
            <Pill>05 · Sources</Pill>
            <h2 className="mt-3 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-atlas-green">
              Références documentaires
            </h2>
            <ul className="mt-4 space-y-2">
              {study.sources.map((src, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 border-b border-border-soft py-2 text-[0.92rem] text-muted last:border-b-0"
                >
                  <span className="shrink-0 font-mono text-[0.78rem] text-atlas-accent">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span>{src}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>

        {/* SIDEBAR */}
        <aside className="mt-12 lg:mt-0">
          <div className="sticky top-[88px] space-y-6">
            {/* Auteurs + métadonnées */}
            <div className="rounded-md border-[1.5px] border-border bg-white p-5">
              <div className="mb-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted">
                Pilotage
              </div>
              <ul className="space-y-1">
                {study.auteurs.map((a, i) => (
                  <li key={i} className="text-[0.88rem] font-medium text-ink">
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="rounded-md border-[1.5px] border-border bg-white p-5">
              <div className="mb-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted">
                Mots-clés
              </div>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-block rounded-pill bg-atlas-green-tag px-3 py-1 font-display text-[0.72rem] font-bold text-atlas-green"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="overflow-hidden rounded-md bg-atlas-green p-5 text-white">
              <div className="mb-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-atlas-green-v">
                Licence
              </div>
              <p className="text-[0.9rem] leading-relaxed text-white/85">
                Données publiées sous <strong>Licence Ouverte Etalab 2.0</strong>.
                Réutilisation libre avec mention de la source.
              </p>
              <a
                href="#download-pdf"
                className="mt-4 inline-flex items-center gap-2 rounded-pill bg-atlas-green-v px-4 py-2 font-display text-[0.82rem] font-bold text-atlas-green transition-opacity hover:opacity-90"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Télécharger le PDF
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* ÉTUDES LIÉES */}
      {related.length > 0 && (
        <section className="bg-off px-8 py-16 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <Pill variant="purple">Aller plus loin</Pill>
                <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-tight tracking-tight text-atlas-green">
                  Études liées
                </h2>
              </div>
              <Link
                href="/etudes"
                className="inline-flex items-center gap-1.5 font-display text-[0.85rem] font-bold text-atlas-green border-b-2 border-atlas-green-v pb-1 hover:text-atlas-accent"
              >
                Toute la bibliothèque →
              </Link>
            </div>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
            >
              {related.map((s) => (
                <StudyCard key={s.id} study={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
