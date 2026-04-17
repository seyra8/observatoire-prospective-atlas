"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StudyCard } from "@/components/study-card";
import { FilterSidebar, type FilterOption } from "@/components/etudes/filter-sidebar";
import { ActiveChips } from "@/components/etudes/active-chips";
import { SearchBar } from "@/components/etudes/search-bar";
import { allStudies } from "@/lib/mock-data";
import type { StudyKind } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCommandPalette } from "@/components/command-palette-provider";

const KIND_OPTIONS: { id: StudyKind; label: string }[] = [
  { id: "prospective", label: "Étude prospective" },
  { id: "enquete", label: "Enquête de branche" },
  { id: "barometre", label: "Baromètre trimestriel" },
  { id: "cartographie", label: "Cartographie métiers" },
  { id: "note", label: "Note de synthèse" },
];

const BRANCHE_OPTIONS: string[] = [
  "Bureaux d'études",
  "Banque",
  "Assurance",
  "Courtage",
  "Agents généraux",
  "Experts-comptables",
  "Transverse Atlas",
];

const THEME_OPTIONS = [
  "Compétences",
  "RSE",
  "Diversité",
  "IA",
  "Démographie",
  "Commercial",
  "Attractivité",
  "Management",
  "Handicap",
  "Cybersécurité",
  "Data",
  "Cartographie",
];

const FORMAT_OPTIONS = [
  { id: "pdf", label: "PDF" },
  { id: "excel", label: "Données Excel" },
  { id: "csv", label: "Données CSV / API" },
  { id: "synthese", label: "Synthèse 2 pages" },
];

const YEARS = ["2026", "2025", "2024", "2023", "2022", "+ anc."];

export default function EtudesPage() {
  const { openPalette } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedKinds, setSelectedKinds] = useState<Set<string>>(new Set());
  const [selectedBranches, setSelectedBranches] = useState<Set<string>>(new Set());
  const [selectedThemes, setSelectedThemes] = useState<Set<string>>(new Set());
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(new Set());
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void) => (id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
    setPage(1);
  };

  const reset = () => {
    setSelectedKinds(new Set());
    setSelectedBranches(new Set());
    setSelectedThemes(new Set());
    setSelectedFormats(new Set());
    setSelectedYear(null);
    setQuery("");
    setPage(1);
  };

  // Compteurs pour les options
  const counts = useMemo(() => {
    const c = { kind: {} as Record<string, number>, branche: {} as Record<string, number>, theme: {} as Record<string, number>, format: {} as Record<string, number> };
    for (const s of allStudies) {
      c.kind[s.kind] = (c.kind[s.kind] ?? 0) + 1;
      c.branche[s.branche] = (c.branche[s.branche] ?? 0) + 1;
      for (const t of s.tags) c.theme[t] = (c.theme[t] ?? 0) + 1;
      for (const f of s.formats) c.format[f.type] = (c.format[f.type] ?? 0) + 1;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    return allStudies.filter((s) => {
      if (selectedKinds.size && !selectedKinds.has(s.kind)) return false;
      if (selectedBranches.size && !selectedBranches.has(s.branche)) return false;
      if (selectedThemes.size && !s.tags.some((t) => selectedThemes.has(t))) return false;
      if (selectedFormats.size && !s.formats.some((f) => selectedFormats.has(f.type))) return false;
      if (selectedYear && selectedYear !== "+ anc." && !s.datePubli.startsWith(selectedYear)) return false;
      if (selectedYear === "+ anc." && parseInt(s.datePubli.slice(0, 4)) >= 2022) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = [s.title, s.abstract, s.branche, ...s.tags].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [selectedKinds, selectedBranches, selectedThemes, selectedFormats, selectedYear, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "old":
        return arr.sort((a, b) => a.datePubli.localeCompare(b.datePubli));
      case "az":
        return arr.sort((a, b) => a.title.localeCompare(b.title, "fr"));
      case "recent":
      default:
        return arr.sort((a, b) => b.datePubli.localeCompare(a.datePubli));
    }
  }, [filtered, sort]);

  // Pagination simple (9 par page)
  const PAGE_SIZE = 9;
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageResults = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const totalActive =
    selectedKinds.size + selectedBranches.size + selectedThemes.size + selectedFormats.size + (selectedYear ? 1 : 0);

  // Chips actifs
  const chips = [
    ...[...selectedKinds].map((id) => ({
      id: `kind-${id}`,
      label: KIND_OPTIONS.find((o) => o.id === id)?.label ?? id,
      onRemove: () => toggle(selectedKinds, setSelectedKinds)(id),
    })),
    ...[...selectedBranches].map((id) => ({ id: `branche-${id}`, label: id, onRemove: () => toggle(selectedBranches, setSelectedBranches)(id) })),
    ...[...selectedThemes].map((id) => ({ id: `theme-${id}`, label: id, onRemove: () => toggle(selectedThemes, setSelectedThemes)(id) })),
    ...[...selectedFormats].map((id) => ({
      id: `fmt-${id}`,
      label: FORMAT_OPTIONS.find((o) => o.id === id)?.label ?? id,
      onRemove: () => toggle(selectedFormats, setSelectedFormats)(id),
    })),
    ...(selectedYear ? [{ id: "year", label: `Année ${selectedYear}`, onRemove: () => setSelectedYear(null) }] : []),
    ...(query ? [{ id: "query", label: `« ${query} »`, onRemove: () => setQuery("") }] : []),
  ];

  const filterGroups = [
    {
      title: "Type de publication",
      selected: selectedKinds,
      onToggle: toggle(selectedKinds, setSelectedKinds),
      options: KIND_OPTIONS.map<FilterOption>((o) => ({ id: o.id, label: o.label, count: counts.kind[o.id] ?? 0 })),
    },
    {
      title: "Branche professionnelle",
      selected: selectedBranches,
      onToggle: toggle(selectedBranches, setSelectedBranches),
      options: BRANCHE_OPTIONS.map<FilterOption>((id) => ({ id, label: id, count: counts.branche[id] ?? 0 })),
    },
    {
      title: "Thématique",
      selected: selectedThemes,
      onToggle: toggle(selectedThemes, setSelectedThemes),
      options: THEME_OPTIONS.map<FilterOption>((id) => ({ id, label: id, count: counts.theme[id] ?? 0 })),
    },
    {
      title: "Format disponible",
      selected: selectedFormats,
      onToggle: toggle(selectedFormats, setSelectedFormats),
      options: FORMAT_OPTIONS.map<FilterOption>((o) => ({ id: o.id, label: o.label, count: counts.format[o.id] ?? 0 })),
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="relative overflow-hidden bg-atlas-green px-8 py-16 lg:px-12">
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>B</span>
        <div className="relative mx-auto max-w-[1400px]">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Bibliothèque d'études" },
            ]}
          />
          <div className="mb-5">
            <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              Bibliothèque documentaire · {allStudies.length} publications
            </span>
          </div>
          <h1
            className="mb-5 max-w-[860px] font-display font-extrabold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Études &amp; rapports —<br />
            <em className="not-italic text-atlas-green-v">toute la production Atlas</em>
          </h1>
          <p className="max-w-[680px] text-[1.1rem] font-light leading-[1.7] text-white/75">
            Études prospectives, enquêtes de branche, baromètres trimestriels, cartographies métiers :
            l'ensemble des publications de la Prospective Atlas, consultables, filtrables et téléchargeables.
          </p>
        </div>
      </header>

      {/* Search band sticky */}
      <SearchBar
        query={query}
        onQueryChange={(q) => { setQuery(q); setPage(1); }}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
        onOpenPalette={openPalette}
      />

      {/* Layout filtres + résultats */}
      <div className="mx-auto grid max-w-[1400px] gap-10 px-8 py-10 pb-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-12 lg:py-10">
        <FilterSidebar
          groups={filterGroups}
          years={YEARS}
          selectedYear={selectedYear}
          onYearChange={(y) => { setSelectedYear(y); setPage(1); }}
          totalActive={totalActive}
          onReset={reset}
        />

        <main>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Pill>Résultats</Pill>
              <span className="font-display text-[1rem] font-semibold text-ink">
                <strong className="font-extrabold text-atlas-green">{sorted.length} étude{sorted.length > 1 ? "s" : ""}</strong>{" "}
                {totalActive > 0 ? "correspondent à vos critères" : "disponibles"}
              </span>
            </div>
          </div>

          <ActiveChips chips={chips} />

          {pageResults.length === 0 ? (
            <div className="rounded-md border-[1.5px] border-dashed border-border bg-off p-12 text-center">
              <div className="mx-auto mb-3 inline-block font-display text-[3rem] font-extrabold leading-none text-atlas-green/30">
                0
              </div>
              <h3 className="font-display text-[1.1rem] font-bold text-ink">Aucune étude ne correspond</h3>
              <p className="mt-2 text-[0.9rem] text-muted">
                Essayez de retirer un filtre ou d'élargir la recherche.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-5 inline-flex items-center gap-1.5 rounded-pill border-[1.5px] border-atlas-green-v bg-transparent px-5 py-2 font-display text-[0.85rem] font-semibold text-atlas-green transition-colors hover:bg-atlas-green-lt"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid gap-6" style={{ gridTemplateColumns: view === "grid" ? "repeat(auto-fill, minmax(340px, 1fr))" : "1fr" }}>
              {pageResults.map((study) => (
                <StudyCard key={study.id} study={study} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-10 items-center justify-center gap-1 rounded-pill border-[1.5px] border-border bg-white px-4 font-display text-[0.85rem] font-semibold text-ink transition-colors enabled:hover:border-atlas-green-v enabled:hover:text-atlas-green disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Préc.
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={
                    p === currentPage
                      ? "inline-flex h-10 min-w-[40px] items-center justify-center rounded-pill border-[1.5px] border-atlas-green bg-atlas-green px-3 font-display text-[0.85rem] font-semibold text-white"
                      : "inline-flex h-10 min-w-[40px] items-center justify-center rounded-pill border-[1.5px] border-border bg-white px-3 font-display text-[0.85rem] font-semibold text-ink transition-colors hover:border-atlas-green-v hover:text-atlas-green"
                  }
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex h-10 items-center justify-center gap-1 rounded-pill border-[1.5px] border-border bg-white px-4 font-display text-[0.85rem] font-semibold text-ink transition-colors enabled:hover:border-atlas-green-v enabled:hover:text-atlas-green disabled:cursor-not-allowed disabled:opacity-40"
              >
                Suiv. <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </nav>
          )}
        </main>
      </div>
    </>
  );
}
