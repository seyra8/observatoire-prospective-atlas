import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PillProps {
  variant?: "green" | "purple";
  children: ReactNode;
  className?: string;
}

/**
 * Pill signature : eyebrow/tag uppercase utilisé avant les titres de section.
 */
export function Pill({ variant = "green", children, className }: PillProps) {
  const styles =
    variant === "purple"
      ? "bg-atlas-purple-lt text-atlas-purple"
      : "bg-atlas-green-tag text-atlas-green";

  return (
    <span
      className={cn(
        "inline-block rounded-pill px-3 py-[0.3rem] font-display text-[0.7rem] font-bold uppercase tracking-[0.1em]",
        styles,
        className
      )}
    >
      {children}
    </span>
  );
}

interface HeroPillProps {
  children: ReactNode;
}

/**
 * Pill posée sur le fond vert profond du hero — fond vert vif translucide.
 * Texte blanc : sur compositing (#135b32 environ) → contraste 8:1 (AAA).
 */
export function HeroPill({ children }: HeroPillProps) {
  return (
    <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
      {children}
    </span>
  );
}
