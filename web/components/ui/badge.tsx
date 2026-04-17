import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "tension" | "emergent" | "stable" | "prospect" | "data" | "mobilite";

const variants: Record<BadgeVariant, string> = {
  tension: "bg-tension-bg text-tension",
  emergent: "bg-emergent-bg text-emergent",
  stable: "bg-atlas-green-tag text-atlas-green",
  prospect: "bg-atlas-purple-lt text-atlas-purple",
  data: "bg-atlas-green-lt text-atlas-green",
  mobilite: "bg-atlas-green-lt text-atlas-green",
};

const labels: Record<BadgeVariant, string> = {
  tension: "Tension",
  emergent: "Émergent",
  stable: "Stable",
  prospect: "Prospective",
  data: "Data",
  mobilite: "Mobilité",
};

interface BadgeProps {
  variant: BadgeVariant;
  children?: ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-[0.7rem] py-[0.25rem] font-display text-[0.68rem] font-bold uppercase tracking-[0.06em]",
        variants[variant],
        className
      )}
    >
      {children ?? labels[variant]}
    </span>
  );
}
