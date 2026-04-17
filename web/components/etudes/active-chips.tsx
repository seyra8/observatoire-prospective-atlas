"use client";

import { X } from "lucide-react";

export interface ActiveChip {
  id: string;
  label: string;
  onRemove: () => void;
}

interface ActiveChipsProps {
  chips: ActiveChip[];
}

export function ActiveChips({ chips }: ActiveChipsProps) {
  if (chips.length === 0) return null;
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 rounded-pill bg-atlas-green-tag py-[0.35rem] pl-[0.85rem] pr-[0.35rem] font-display text-[0.78rem] font-semibold text-atlas-green"
        >
          {chip.label}
          <button
            type="button"
            aria-label={`Retirer le filtre ${chip.label}`}
            onClick={chip.onRemove}
            className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-atlas-green text-white transition-opacity hover:opacity-70"
          >
            <X className="h-[11px] w-[11px]" />
          </button>
        </span>
      ))}
    </div>
  );
}
