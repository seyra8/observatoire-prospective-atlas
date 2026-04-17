"use client";

import { LayoutGrid, List, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  sort: string;
  onSortChange: (s: string) => void;
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
  onOpenPalette?: () => void;
}

const SORTS = [
  { id: "recent", label: "Plus récent" },
  { id: "old", label: "Plus ancien" },
  { id: "pertinence", label: "Pertinence" },
  { id: "az", label: "Titre A-Z" },
  { id: "popular", label: "Plus téléchargé" },
];

export function SearchBar({ query, onQueryChange, sort, onSortChange, view, onViewChange, onOpenPalette }: SearchBarProps) {
  return (
    <div className="sticky top-[72px] z-40 border-b-[1.5px] border-border bg-white px-8 py-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4">
        <label className="flex min-w-[280px] flex-1 items-center gap-3 rounded-pill border-[1.5px] border-border bg-off px-5 py-3 transition-all focus-within:border-atlas-green-v focus-within:bg-white focus-within:shadow-[0_0_0_3px_var(--color-atlas-green-lt)]">
          <Search className="h-[18px] w-[18px] text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Rechercher par titre, thématique, branche, auteur…"
            className="flex-1 border-0 bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-muted-2"
          />
          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Recherche avancée"
              className="rounded border border-border bg-white px-1.5 py-0.5 font-body text-[0.7rem] font-semibold text-muted transition-colors hover:border-atlas-green-v hover:text-atlas-green"
            >
              ⌘ K
            </button>
          )}
        </label>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Trier"
          className="appearance-none rounded-pill border-[1.5px] border-border bg-white py-[0.55rem] pl-4 pr-10 font-display text-[0.85rem] font-semibold text-ink transition-colors hover:border-atlas-green-v"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6868' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.9rem center",
          }}
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>

        <div className="flex gap-0 rounded-pill border-[1.5px] border-border bg-off p-[3px]">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-pill px-4 py-2 font-display text-[0.82rem] font-semibold transition-all",
              view === "grid" ? "bg-white text-atlas-green shadow-card" : "text-muted"
            )}
          >
            <LayoutGrid className="h-[14px] w-[14px]" />
            Grille
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-pill px-4 py-2 font-display text-[0.82rem] font-semibold transition-all",
              view === "list" ? "bg-white text-atlas-green shadow-card" : "text-muted"
            )}
          >
            <List className="h-[14px] w-[14px]" />
            Liste
          </button>
        </div>
      </div>
    </div>
  );
}
