"use client";

import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  title: string;
  options: FilterOption[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  years: string[];
  selectedYear: string | null;
  onYearChange: (year: string | null) => void;
  totalActive: number;
  onReset: () => void;
}

export function FilterSidebar({ groups, years, selectedYear, onYearChange, totalActive, onReset }: FilterSidebarProps) {
  return (
    <aside className="flex flex-col gap-7 lg:sticky lg:top-[120px] lg:self-start">
      {/* Header */}
      <div>
        <div className="mb-3 flex items-center gap-2 border-b border-dashed border-border pb-2 font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-atlas-green">
          <SlidersHorizontal className="h-3 w-3" />
          Filtres
          <span className="ml-auto font-medium text-muted">{totalActive} actifs</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-pill border-[1.5px] border-border bg-transparent px-4 py-2.5 font-display text-[0.82rem] font-semibold text-muted transition-colors hover:border-tension hover:bg-tension-bg hover:text-tension"
        >
          <X className="h-3 w-3" />
          Réinitialiser
        </button>
      </div>

      {/* Groupes checkboxes */}
      {groups.map((g) => (
        <div key={g.title}>
          <h4 className="mb-4 flex items-center border-b border-dashed border-border pb-2 font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-atlas-green">
            {g.title}
          </h4>
          <div className="flex flex-col gap-2">
            {g.options.map((opt) => {
              const checked = g.selected.has(opt.id);
              return (
                <label
                  key={opt.id}
                  className="flex cursor-pointer items-center gap-2.5 py-[0.35rem] text-[0.88rem] text-ink-2 transition-colors hover:text-atlas-green"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => g.onToggle(opt.id)}
                    className="h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[5px] border-[1.5px] border-border bg-white transition-all checked:bg-atlas-green-v checked:border-atlas-green-v relative checked:after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[1px] checked:after:h-[10px] checked:after:w-[5px] checked:after:border-white checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45 hover:border-atlas-green-v"
                  />
                  <span className="flex-1">{opt.label}</span>
                  <span className="font-mono text-[0.78rem] text-muted-2">{opt.count}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {/* Années */}
      <div>
        <h4 className="mb-4 flex items-center border-b border-dashed border-border pb-2 font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-atlas-green">
          Année
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {years.map((y) => {
            const active = y === selectedYear;
            return (
              <button
                key={y}
                type="button"
                onClick={() => onYearChange(active ? null : y)}
                className={cn(
                  "rounded-[8px] border-[1.5px] py-[0.45rem] text-center font-display text-[0.82rem] font-semibold transition-colors",
                  active
                    ? "border-atlas-green bg-atlas-green text-white"
                    : "border-border text-muted hover:border-atlas-green-v hover:text-atlas-green"
                )}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
