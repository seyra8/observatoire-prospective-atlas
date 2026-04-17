import Link from "next/link";
import { BarChart3, Cog, Leaf, Sparkles, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Metier } from "@/lib/types";

// Map lucide-react icons (statique pour le bundling)
const ICONS = {
  cog: Cog,
  "bar-chart-3": BarChart3,
  leaf: Leaf,
  users: Users,
  zap: Zap,
  sparkles: Sparkles,
} as const;

type IconKey = keyof typeof ICONS;

const TENSION_LABEL = {
  tension: "métier en tension",
  emergent: "métier émergent",
  stable: "métier stable",
  prospect: "métier prospectif",
} as const;

interface MetierCardProps {
  metier: Metier;
}

export function MetierCard({ metier }: MetierCardProps) {
  const Icon = ICONS[metier.famille.icon as IconKey] ?? Cog;
  const aria = `${metier.libelle}, ${metier.famille.libelle}, ${TENSION_LABEL[metier.tension]}, ${metier.nbFormations} formations, code ROME ${metier.codeRome}`;

  return (
    <Link
      href={`/metiers/${metier.slug}`}
      aria-label={aria}
      className="group relative flex flex-col gap-4 rounded-md border-[1.5px] border-border bg-white p-7 transition-all duration-200 hover:border-atlas-green-v hover:shadow-hover hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.1em] text-muted">
        <Icon className="h-3 w-3" aria-hidden="true" />
        <span>{metier.famille.libelle}</span>
        <span className="ml-auto" aria-hidden="true">
          <Badge variant={metier.tension} />
        </span>
      </div>

      <h3 className="font-display text-[1.15rem] font-bold leading-[1.3] text-ink">
        {metier.libelle}
      </h3>

      <p className="line-clamp-3 text-[0.9rem] leading-[1.6] text-muted">
        {metier.resume}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-dashed border-border pt-4" aria-hidden="true">
        <span className="font-display text-[0.72rem] font-bold tracking-[0.06em] text-atlas-green">
          ROME · {metier.codeRome}
        </span>
        <Badge variant="data">
          {metier.nbFormations} formations
        </Badge>
      </div>
    </Link>
  );
}
