import { ArrowRight, BookOpen } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { HeroPill, Pill } from "@/components/ui/pill";
import { SectionHead } from "@/components/ui/card";
import { MetierCard } from "@/components/metier-card";
import { StudyCard } from "@/components/study-card";
import { NewsCarousel } from "@/components/news-carousel";
import {
  actualites,
  branchesDetails,
  heroStats,
  metiersTopTrimestre,
  studiesRecentes,
} from "@/lib/mock-data";

function formatEffectifsShort(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(".", ",")} M`;
  if (n >= 10000) return `${Math.round(n / 1000)} K`;
  return n.toLocaleString("fr-FR");
}

export default function HomePage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden bg-atlas-green px-8 pt-24 pb-0 lg:px-12">
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "44vw" }}>
          O
        </span>
        <div className="relative mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <HeroPill>Édition 2026</HeroPill>
            <span className="text-[0.82rem] text-white/55">·</span>
            <span className="text-[0.82rem] text-white/55">
              Branches professionnelles · OPCO Atlas
            </span>
          </div>

          <h1
            className="mb-6 font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
          >
            OBSER<span className="text-atlas-green-v">VATOIRE</span>
          </h1>

          <p className="mb-12 max-w-[620px] text-[clamp(1.05rem,2vw,1.35rem)] font-light leading-[1.7] text-white/70">
            La cartographie vivante des métiers, compétences et qualifications
            des branches accompagnées par OPCO Atlas. Études, données, fiches métiers,
            tendances prospectives — un point d'entrée unique.
          </p>

          <div className="mb-[4.5rem] flex flex-wrap gap-4">
            <LinkButton href="/metiers" variant="primary">
              Explorer les métiers
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/etudes" variant="ghost-dark">
              <BookOpen className="h-[15px] w-[15px]" />
              Parcourir les études
            </LinkButton>
          </div>

          <div className="grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-6 py-7 ${i < heroStats.length - 1 ? "md:border-r border-white/10" : ""} ${i % 2 === 0 && i < heroStats.length - 1 ? "border-r border-white/10" : ""}`}
              >
                <div
                  className="font-display font-extrabold leading-none text-atlas-green-v"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
                >
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[0.82rem] text-white/55">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MÉTIERS À LA UNE ═══════ */}
      <section className="px-8 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow={<Pill>01 · Référentiel vivant</Pill>}
            meta="Mise à jour mensuelle"
            link={{ href: "/metiers", label: "Voir les 84 fiches" }}
          >
            Fiches métiers —<br />
            <em className="not-italic text-atlas-accent">à la une ce trimestre</em>
          </SectionHead>

          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {metiersTopTrimestre.map((metier) => (
              <MetierCard key={metier.slug} metier={metier} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ÉTUDES RÉCENTES ═══════ */}
      <section className="bg-off px-8 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow={<Pill variant="purple">02 · Bibliothèque documentaire</Pill>}
            meta="36 études · 14 branches"
            link={{ href: "/etudes", label: "Toutes les études" }}
          >
            Études &amp; rapports —<br />
            <em className="not-italic text-atlas-accent">récemment publiés</em>
          </SectionHead>

          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
            {studiesRecentes.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ACTUALITÉS — CARROUSEL ═══════ */}
      <section className="px-8 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow={<Pill>03 · Actualités</Pill>}
            meta="Signaux faibles · Publications · Décisions"
            link={{ href: "#", label: "Toute l'actualité" }}
          >
            Ce qui bouge —<br />
            <em className="not-italic text-atlas-accent">dans nos branches</em>
          </SectionHead>
          <NewsCarousel actualites={actualites} />
        </div>
      </section>

      {/* ═══════ BRANCHES ATLAS ═══════ */}
      <section className="bg-off px-8 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow={<Pill variant="purple">04 · Cartographie</Pill>}
            meta="14 branches · 4 secteurs"
            link={{ href: "/branches", label: "Voir toutes les branches" }}
          >
            Les branches —<br />
            <em className="not-italic text-atlas-accent">accompagnées par Atlas</em>
          </SectionHead>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
          >
            {branchesDetails.slice(0, 8).map((b) => (
              <a
                key={b.code}
                href={`/branches/${b.slug}`}
                className="group flex items-center justify-between gap-3 rounded-md border-[1.5px] border-border bg-white p-4 transition-all hover:border-atlas-green-v hover:shadow-card"
                aria-label={`Découvrir la branche ${b.libelle}`}
              >
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-atlas-accent">
                    {b.idcc ? `IDCC ${b.idcc}` : "Multi-IDCC"}
                  </div>
                  <div className="mt-0.5 truncate font-display text-[0.95rem] font-bold leading-snug text-atlas-green">
                    {b.libelle}
                  </div>
                  <div className="mt-0.5 text-[0.75rem] text-muted">
                    {formatEffectifsShort(b.effectifsSalaries)} salariés
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:text-atlas-green-v group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="/branches"
              className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-atlas-green-v bg-white px-6 py-[0.8rem] font-display text-[0.88rem] font-bold text-atlas-green transition-colors hover:bg-atlas-green-lt"
            >
              Voir les 14 branches
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ DATAVIZ CTA ═══════ */}
      <section className="px-8 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow={<Pill>05 · Les données clés</Pill>}
            meta="Temps quasi-réel · T1 2026"
            link={{ href: "/dataviz", label: "Ouvrir le dashboard" }}
          >
            Les métiers —<br />
            <em className="not-italic text-atlas-accent">les plus en tension</em>
          </SectionHead>

          <div className="rounded-lg border-[1.5px] border-border bg-white p-10">
            <div className="mb-6">
              <Pill>Indice de tension · T1 2026</Pill>
              <h3 className="mt-3 font-display text-[1.4rem] font-extrabold leading-[1.2] text-atlas-green">
                Top 6 des métiers où la demande dépasse l'offre
              </h3>
              <p className="mt-2 max-w-xl text-[0.92rem] leading-[1.65] text-muted">
                Ratio offres d'emploi / candidatures sur les 6 derniers mois. Une valeur &gt; 1 indique un déséquilibre en faveur des candidats.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { name: "Maintenance industrielle", val: "2.4×", width: "92%", color: "bg-atlas-accent" },
                { name: "Tech. énergies ren.", val: "2.1×", width: "85%", color: "bg-atlas-accent" },
                { name: "Intégrateur IA", val: "1.8×", width: "72%", color: "bg-atlas-purple" },
                { name: "Actuaire data", val: "1.7×", width: "66%", color: "bg-atlas-purple" },
                { name: "Data analyst", val: "1.4×", width: "54%", color: "bg-atlas-purple" },
                { name: "Responsable RSE", val: "1.2×", width: "46%", color: "bg-emergent" },
              ].map((row) => (
                <div key={row.name} className="grid grid-cols-[160px_1fr_50px] items-center gap-3">
                  <span className="text-right text-[0.85rem] text-muted">{row.name}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-border-soft">
                    <div
                      className={`bar-fill-animated h-full rounded-full ${row.color}`}
                      style={{ width: row.width }}
                    />
                  </div>
                  <span className="text-right font-mono text-[0.8rem] font-semibold text-atlas-green">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
