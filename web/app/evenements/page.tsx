import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, MapPin, Play, Radio, Users, Video } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pill } from "@/components/ui/pill";
import { evenements } from "@/lib/mock-data";
import type { Evenement, EvenementFormat, EvenementStatut } from "@/lib/types";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Agenda des Matinales Prospective Atlas, colloques, webinaires et replays. Rejoignez la communauté des branches sur l'avenir des métiers et compétences.",
};

const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

const FORMAT_ICONS: Record<EvenementFormat, typeof Radio> = {
  webinaire: Radio,
  presentiel: MapPin,
  hybride: Video,
  replay: Play,
};

const FORMAT_LABELS: Record<EvenementFormat, string> = {
  webinaire: "Webinaire",
  presentiel: "Présentiel",
  hybride: "Hybride",
  replay: "Replay",
};

const STATUT_STYLE: Record<EvenementStatut, { bg: string; text: string; label: string }> = {
  "a-venir": { bg: "bg-atlas-purple-lt", text: "text-atlas-purple", label: "À venir" },
  "inscriptions-ouvertes": { bg: "bg-atlas-green-tag", text: "text-atlas-green", label: "Inscriptions ouvertes" },
  complet: { bg: "bg-tension-bg", text: "text-tension", label: "Complet" },
  passe: { bg: "bg-off", text: "text-muted", label: "Passé" },
  "replay-disponible": { bg: "bg-emergent-bg", text: "text-emergent", label: "Replay disponible" },
};

const COVER_BG = {
  green: "bg-atlas-green",
  purple: "bg-atlas-purple",
  olive: "bg-[#1F3D15]",
  deep: "bg-[#0d3b24]",
} as const;

export default function EvenementsPage() {
  // Trier : à venir d'abord, puis replay, puis passé
  const aVenir = evenements
    .filter((e) => ["a-venir", "inscriptions-ouvertes", "complet"].includes(e.statut))
    .sort((a, b) => a.date.localeCompare(b.date));
  const autres = evenements
    .filter((e) => !["a-venir", "inscriptions-ouvertes", "complet"].includes(e.statut))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* HEADER */}
      <header className="relative overflow-hidden bg-atlas-green px-8 py-16 lg:px-12">
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>
          É
        </span>
        <div className="relative mx-auto max-w-[1400px]">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Événements" },
            ]}
          />
          <div className="mb-5">
            <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              Matinales · Colloques · Webinaires · Replays
            </span>
          </div>
          <h1
            className="mb-5 max-w-[900px] font-display font-extrabold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Événements —<br />
            <em className="not-italic text-atlas-green-v">rencontrons-nous</em>
          </h1>
          <p className="max-w-[720px] text-[1.1rem] font-light leading-[1.7] text-white/75">
            Les Matinales Prospective Atlas réunissent chaque trimestre partenaires sociaux,
            observateurs et experts autour des grands sujets de branche. Un colloque annuel
            complète le rendez-vous. Tous nos événements sont filmés et disponibles en replay.
          </p>
        </div>
      </header>

      {/* ÉVÉNEMENT À LA UNE (premier à venir) */}
      {aVenir[0] && (
        <section className="mx-auto -mt-12 max-w-[1200px] px-8 lg:px-12">
          <EventCardFeatured evenement={aVenir[0]} />
        </section>
      )}

      {/* PROCHAINS ÉVÉNEMENTS */}
      {aVenir.length > 1 && (
        <section className="px-8 py-16 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8">
              <Pill>À vos agendas</Pill>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-atlas-green">
                Prochains rendez-vous —{" "}
                <em className="not-italic text-atlas-accent">inscrivez-vous</em>
              </h2>
            </div>
            <div className="space-y-6">
              {aVenir.slice(1).map((e) => (
                <EventCardInline key={e.id} evenement={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REPLAYS & PASSÉS */}
      {autres.length > 0 && (
        <section className="bg-off px-8 py-16 lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8">
              <Pill variant="purple">Rattraper</Pill>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-atlas-green">
                Replays disponibles —{" "}
                <em className="not-italic text-atlas-accent">nos archives</em>
              </h2>
            </div>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
            >
              {autres.map((e) => (
                <EventCardReplay key={e.id} evenement={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CARD FEATURED — événement phare avec date géante + programme timeline
// Pattern HORIZONS Matinale
// ═══════════════════════════════════════════════════════════════════════════

function EventCardFeatured({ evenement }: { evenement: Evenement }) {
  const d = new Date(evenement.date);
  const day = d.getDate();
  const month = MOIS[d.getMonth()];
  const year = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const endD = new Date(d.getTime() + evenement.dureeMin * 60000);
  const ehh = String(endD.getHours()).padStart(2, "0");
  const emm = String(endD.getMinutes()).padStart(2, "0");
  const statut = STATUT_STYLE[evenement.statut];
  const FormatIcon = FORMAT_ICONS[evenement.format];

  return (
    <article className="overflow-hidden rounded-lg border-[1.5px] border-border bg-white shadow-event">
      <div className="grid gap-0 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Date side (pattern HORIZONS) */}
        <div className={`flex flex-col items-center justify-center gap-3 p-8 text-center ${COVER_BG[evenement.coverVariant]}`}>
          <div className="font-display text-[6rem] font-extrabold leading-none text-white">
            {day}
          </div>
          <div className="font-display text-[0.9rem] font-bold uppercase tracking-[0.12em] text-atlas-green-v">
            {month} {year}
          </div>
          <div className="mt-3 w-full border-t border-white/15 pt-3 text-[0.82rem] text-white/70">
            {hh}h{mm} → {ehh}h{emm}
          </div>
        </div>

        {/* Corps */}
        <div className="p-8 lg:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-display text-[0.7rem] font-bold uppercase tracking-[0.08em] ${statut.bg} ${statut.text}`}>
              {statut.label}
            </span>
            <span className="inline-flex items-center gap-1 rounded-pill border border-border px-3 py-1 font-display text-[0.7rem] font-bold uppercase tracking-[0.08em] text-muted">
              <FormatIcon className="h-3 w-3" aria-hidden="true" />
              {FORMAT_LABELS[evenement.format]}
            </span>
            {evenement.lieu && (
              <span className="inline-flex items-center gap-1 font-display text-[0.72rem] font-semibold text-muted">
                <MapPin className="h-3 w-3" aria-hidden="true" /> {evenement.lieu}
              </span>
            )}
          </div>

          <div className="mb-2 font-display text-[0.75rem] font-bold uppercase tracking-[0.1em] text-atlas-accent">
            {evenement.supertag}
            {evenement.animateur && ` · Animé par ${evenement.animateur.role}`}
          </div>
          <h3
            className="mb-3 font-display font-extrabold leading-[1.1] tracking-tight text-atlas-green"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            {evenement.titre}
          </h3>
          <p className="mb-6 text-[1rem] leading-relaxed text-muted">{evenement.resume}</p>

          {/* Programme timeline */}
          <div className="mb-6">
            <div className="mb-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted">
              Programme
            </div>
            <ol className="space-y-4">
              {evenement.programme.map((p, i, arr) => (
                <li key={i} className="relative grid grid-cols-[56px_minmax(0,1fr)] items-start gap-3">
                  {/* Ligne verticale entre dots */}
                  {i < arr.length - 1 && (
                    <span
                      className="absolute bottom-0 left-[27px] top-[22px] w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex flex-col items-center pt-0.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-atlas-green-v ring-2 ring-white ring-offset-2 ring-offset-white outline outline-[1.5px] outline-atlas-green-v" />
                    <span className="mt-1 font-display text-[0.68rem] font-bold uppercase tracking-wider text-muted">
                      {p.heure}
                    </span>
                  </div>
                  <div>
                    <div className="font-display text-[0.72rem] font-bold uppercase tracking-[0.08em] text-atlas-accent">
                      {p.label}
                    </div>
                    <div className="mt-0.5 text-[0.95rem] font-medium text-text-2">{p.titre}</div>
                    {p.intervenants && (
                      <div className="mt-0.5 text-[0.82rem] italic text-muted">
                        {p.intervenants}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            {evenement.statut === "inscriptions-ouvertes" && (
              <a
                href={`/evenements/${evenement.slug}#inscription`}
                className="inline-flex items-center gap-2 rounded-pill bg-atlas-green-v px-6 py-[0.8rem] font-display text-[0.88rem] font-bold text-atlas-green transition-opacity hover:opacity-90 hover:-translate-y-px"
              >
                S'inscrire
              </a>
            )}
            {evenement.statut === "a-venir" && (
              <span className="inline-flex items-center gap-2 rounded-pill bg-atlas-purple-lt px-6 py-[0.8rem] font-display text-[0.88rem] font-bold text-atlas-purple">
                Ouverture prochaine
              </span>
            )}
            <a
              href="#calendar"
              className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-border bg-white px-6 py-[0.8rem] font-display text-[0.88rem] font-bold text-atlas-green transition-colors hover:border-atlas-green-v hover:bg-atlas-green-lt"
            >
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Ajouter à mon agenda
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CARD INLINE — autre événement à venir (compact)
// ═══════════════════════════════════════════════════════════════════════════

function EventCardInline({ evenement }: { evenement: Evenement }) {
  const d = new Date(evenement.date);
  const day = d.getDate();
  const month = MOIS[d.getMonth()];
  const statut = STATUT_STYLE[evenement.statut];
  const FormatIcon = FORMAT_ICONS[evenement.format];

  return (
    <article className="grid grid-cols-[90px_minmax(0,1fr)_auto] items-center gap-5 overflow-hidden rounded-md border-[1.5px] border-border bg-white p-5 transition-colors hover:border-atlas-green-v md:gap-8">
      <div className={`flex flex-col items-center rounded-md p-4 text-center text-white ${COVER_BG[evenement.coverVariant]}`}>
        <div className="font-display text-[2.25rem] font-extrabold leading-none">{day}</div>
        <div className="mt-1 font-display text-[0.68rem] font-bold uppercase tracking-widest text-atlas-green-v">
          {month}
        </div>
      </div>
      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className={`inline-flex rounded-pill px-2 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-wider ${statut.bg} ${statut.text}`}>
            {statut.label}
          </span>
          <span className="inline-flex items-center gap-1 font-display text-[0.68rem] font-bold uppercase tracking-wider text-muted">
            <FormatIcon className="h-3 w-3" aria-hidden="true" />
            {FORMAT_LABELS[evenement.format]}
          </span>
        </div>
        <h3 className="font-display text-[1.15rem] font-bold leading-snug text-atlas-green">
          {evenement.titre}
        </h3>
        <p className="mt-1 line-clamp-1 text-[0.88rem] text-muted">{evenement.resume}</p>
      </div>
      <a
        href={`/evenements/${evenement.slug}`}
        className="inline-flex items-center gap-1.5 rounded-pill border-[1.5px] border-atlas-green-v bg-white px-4 py-2 font-display text-[0.82rem] font-bold text-atlas-green transition-colors hover:bg-atlas-green-lt"
      >
        Détails
      </a>
    </article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CARD REPLAY
// ═══════════════════════════════════════════════════════════════════════════

function EventCardReplay({ evenement }: { evenement: Evenement }) {
  const d = new Date(evenement.date);
  const day = d.getDate();
  const month = MOIS[d.getMonth()];
  const year = d.getFullYear();
  const statut = STATUT_STYLE[evenement.statut];

  return (
    <article className="group overflow-hidden rounded-md border-[1.5px] border-border bg-white transition-all hover:border-atlas-green-v hover:shadow-hover">
      <div className={`relative flex aspect-video items-center justify-center overflow-hidden ${COVER_BG[evenement.coverVariant]}`}>
        <span
          className="pointer-events-none absolute font-display font-extrabold leading-none"
          style={{
            right: "-2rem",
            bottom: "-3rem",
            fontSize: "14rem",
            color: "rgba(95,182,112,0.12)",
          }}
          aria-hidden="true"
        >
          {evenement.coverLetter}
        </span>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/30 transition-all group-hover:bg-white/20 group-hover:scale-110">
          <Play className="h-6 w-6 text-white" aria-hidden="true" fill="currentColor" />
        </div>
        <div className="absolute bottom-4 left-5 text-white">
          <div className="font-display text-[0.72rem] font-bold uppercase tracking-wider text-atlas-green-v">
            {day} {month} {year}
          </div>
          <div className="mt-0.5 text-[0.75rem] text-white/70">
            <Clock className="inline h-3 w-3" aria-hidden="true" /> {evenement.dureeMin} min
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-2">
          <span className={`inline-flex rounded-pill px-2 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-wider ${statut.bg} ${statut.text}`}>
            {statut.label}
          </span>
        </div>
        <h3 className="mb-2 font-display text-[1.05rem] font-bold leading-snug text-atlas-green">
          {evenement.titre}
        </h3>
        <p className="line-clamp-2 text-[0.85rem] text-muted">{evenement.resume}</p>
        <div className="mt-4 flex gap-3">
          <a
            href={evenement.replayUrl ?? "#"}
            className="inline-flex items-center gap-1.5 rounded-pill bg-atlas-green-v px-4 py-2 font-display text-[0.82rem] font-bold text-atlas-green transition-opacity hover:opacity-90"
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            Voir le replay
          </a>
          <Link
            href={`/evenements/${evenement.slug}`}
            className="inline-flex items-center gap-1 font-display text-[0.82rem] font-bold text-atlas-accent hover:underline"
          >
            Programme complet →
          </Link>
        </div>
      </div>
    </article>
  );
}
