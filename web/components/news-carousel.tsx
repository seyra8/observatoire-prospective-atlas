"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Gavel,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Actualite } from "@/lib/types";

// ════════════════════════════════════════════════════════════════════════════
// Carrousel d'actualités — composant client avec :
//   • scroll horizontal natif (scroll-snap-x)
//   • boutons précédent/suivant + dots
//   • navigation clavier ← → (quand focus)
//   • auto-play doux (pausé au hover + respects prefers-reduced-motion)
//   • drag-to-scroll sur mobile (natif via overflow-x)
// ════════════════════════════════════════════════════════════════════════════

const CATEGORIE_META: Record<
  Actualite["categorie"],
  { label: string; icon: LucideIcon; color: string }
> = {
  publication: { label: "Publication", icon: FileText, color: "text-atlas-accent" },
  "signal-faible": { label: "Signal faible", icon: Sparkles, color: "text-atlas-purple" },
  agenda: { label: "Agenda", icon: Calendar, color: "text-atlas-green" },
  decision: { label: "Décision", icon: Gavel, color: "text-emergent" },
  chiffres: { label: "Chiffres-clés", icon: TrendingUp, color: "text-atlas-accent" },
};

const COVER_BG: Record<Actualite["coverVariant"], string> = {
  green: "bg-atlas-green",
  purple: "bg-atlas-purple",
  olive: "bg-[#1F3D15]",
  deep: "bg-[#0d3b24]",
  blue: "bg-[#1e4d7c]",
};

interface NewsCarouselProps {
  actualites: Actualite[];
  /** Auto-avance toutes les N ms (défaut 6000). 0 = désactivé. */
  autoplayMs?: number;
}

export function NewsCarousel({ actualites, autoplayMs = 6000 }: NewsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIdx = useCallback((idx: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.children[idx] as HTMLElement | undefined;
    if (card) {
      scroller.scrollTo({ left: card.offsetLeft - scroller.offsetLeft, behavior: "smooth" });
    }
  }, []);

  const goNext = useCallback(() => {
    setActiveIdx((prev) => {
      const next = (prev + 1) % actualites.length;
      scrollToIdx(next);
      return next;
    });
  }, [actualites.length, scrollToIdx]);

  const goPrev = useCallback(() => {
    setActiveIdx((prev) => {
      const next = (prev - 1 + actualites.length) % actualites.length;
      scrollToIdx(next);
      return next;
    });
  }, [actualites.length, scrollToIdx]);

  // Auto-play doux (pausé au hover / focus / prefers-reduced-motion)
  useEffect(() => {
    if (!autoplayMs || isPaused) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const interval = setInterval(goNext, autoplayMs);
    return () => clearInterval(interval);
  }, [autoplayMs, isPaused, goNext]);

  // Observer le scroll pour synchroniser les dots
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const cards = Array.from(scroller.children) as HTMLElement[];
      const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft - scroller.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - scrollerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIdx(closest);
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  return (
    <section
      className="relative"
      aria-roledescription="carrousel"
      aria-label="Actualités récentes de l'Observatoire Prospective Atlas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Contrôles flèches (desktop) */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div
          aria-live="polite"
          className="font-display text-[0.82rem] font-semibold text-muted"
        >
          {activeIdx + 1} <span className="text-muted-2">sur</span> {actualites.length}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Actualité précédente"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-border bg-white text-atlas-green transition-colors hover:border-atlas-green-v hover:bg-atlas-green-lt focus-visible:border-atlas-green-v focus-visible:outline-2"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Actualité suivante"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-atlas-green-v bg-atlas-green-v text-atlas-green transition-opacity hover:opacity-90"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Scroller horizontal */}
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 focus:outline-none"
        tabIndex={0}
        role="group"
        aria-label="Défilement des actualités — utilisez les flèches gauche et droite"
        onKeyDown={onKey}
      >
        {actualites.map((a, i) => (
          <NewsCard key={a.id} actualite={a} isActive={i === activeIdx} />
        ))}
      </div>

      {/* Dots */}
      <div
        className="mt-2 flex justify-center gap-1.5"
        role="tablist"
        aria-label="Pagination du carrousel"
      >
        {actualites.map((a, i) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={i === activeIdx}
            aria-label={`Aller à l'actualité ${i + 1}`}
            onClick={() => {
              setActiveIdx(i);
              scrollToIdx(i);
            }}
            className={cn(
              "h-2 rounded-full transition-all",
              i === activeIdx
                ? "w-8 bg-atlas-green-v"
                : "w-2 bg-border hover:bg-muted-2"
            )}
          />
        ))}
      </div>

      {/* Masquer la scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Card actualité (dans le carrousel)
// ═══════════════════════════════════════════════════════════════════════════

function NewsCard({ actualite, isActive }: { actualite: Actualite; isActive: boolean }) {
  const meta = CATEGORIE_META[actualite.categorie];
  const CatIcon = meta.icon;
  const dateFormatted = new Date(actualite.datePubli).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const isInternal = actualite.url.startsWith("/") && !actualite.url.startsWith("/#");

  const CardWrapper = (props: { children: React.ReactNode }) =>
    isInternal ? (
      <Link
        href={actualite.url}
        className="group block h-full snap-center scroll-ml-6"
        aria-label={`Lire l'actualité : ${actualite.titre}`}
      >
        {props.children}
      </Link>
    ) : (
      <a
        href={actualite.url}
        className="group block h-full snap-center scroll-ml-6"
        aria-label={`Lire l'actualité : ${actualite.titre}`}
      >
        {props.children}
      </a>
    );

  return (
    <div
      className="flex w-[360px] shrink-0 snap-center scroll-ml-6 md:w-[420px]"
      aria-roledescription="diapositive"
      aria-hidden={!isActive}
    >
      <CardWrapper>
        <article
          className={cn(
            "flex h-full flex-col overflow-hidden rounded-md border-[1.5px] bg-white transition-all duration-300",
            isActive
              ? "border-atlas-green-v shadow-hover"
              : "border-border opacity-85 hover:opacity-100 hover:border-atlas-green-v/60"
          )}
        >
          {/* Cover */}
          <div className={cn("relative flex aspect-[16/9] items-end overflow-hidden p-5", COVER_BG[actualite.coverVariant])}>
            <span
              className="pointer-events-none absolute font-display font-extrabold leading-none"
              style={{
                right: "-2rem",
                bottom: "-3rem",
                fontSize: "12rem",
                color: "rgba(95,182,112,0.12)",
              }}
              aria-hidden="true"
            >
              {actualite.categorie === "signal-faible" ? "!" : "#"}
            </span>
            <div className="relative flex items-center justify-between w-full">
              <span className={cn("inline-flex items-center gap-1.5 rounded-pill bg-white/10 px-3 py-1 font-display text-[0.7rem] font-bold uppercase tracking-wider text-white")}>
                <CatIcon className="h-3 w-3" aria-hidden="true" />
                {meta.label}
              </span>
              <span className="font-display text-[0.7rem] font-bold tracking-wider text-white/70">
                {dateFormatted}
              </span>
            </div>
          </div>

          {/* Corps */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="font-display text-[1.1rem] font-bold leading-snug text-atlas-green group-hover:text-atlas-accent transition-colors">
              {actualite.titre}
            </h3>
            <p className="line-clamp-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
              {actualite.chapo}
            </p>
            <div className="mt-1 flex items-center justify-between border-t border-dashed border-border pt-3">
              <span className="font-display text-[0.72rem] font-bold uppercase tracking-wider text-muted">
                {actualite.source.nom}
              </span>
              {actualite.duree && (
                <span className="inline-flex items-center gap-1 font-mono text-[0.72rem] text-muted">
                  {actualite.duree}
                </span>
              )}
              {!isInternal && (
                <ExternalLink className="h-3 w-3 text-muted" aria-hidden="true" />
              )}
            </div>
          </div>
        </article>
      </CardWrapper>
    </div>
  );
}
