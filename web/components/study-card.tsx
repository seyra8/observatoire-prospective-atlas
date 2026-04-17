import Link from "next/link";
import {
  FileText,
  RefreshCcw,
  Sheet,
  ScrollText,
  Telescope,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Study } from "@/lib/types";

const KIND_ICONS = {
  prospective: Telescope,
  enquete: Users,
  barometre: TrendingUp,
  cartographie: RefreshCcw,
  note: ScrollText,
} as const;

const KIND_LABELS = {
  prospective: "Prospective",
  enquete: "Enquête",
  barometre: "Baromètre",
  cartographie: "Cartographie",
  note: "Note",
} as const;

const FORMAT_ICONS = {
  pdf: FileText,
  excel: Sheet,
  csv: Sheet,
  synthese: ScrollText,
} as const;

const COVER_BG = {
  green: "bg-atlas-green",
  purple: "bg-atlas-purple",
  // Olive assombri (#1F3D15 au lieu de #3a5a2d) pour passer 4.5:1 sur text-atlas-green-v
  olive: "bg-[#1F3D15]",
  deep: "bg-[#0d3b24]",
} as const;

interface StudyCardProps {
  study: Study;
}

export function StudyCard({ study }: StudyCardProps) {
  const KindIcon = KIND_ICONS[study.kind];

  const formatsLabel = study.formats.map((f) => `${f.label}${f.pages ? ` ${f.pages} pages` : ""}`).join(", ");
  const aria = `${KIND_LABELS[study.kind]} : ${study.title}, publié par ${study.branche}${study.idcc ? ` (IDCC ${study.idcc})` : ""}. Formats disponibles : ${formatsLabel}.`;

  return (
    <Link
      href={`/etudes/${study.id}`}
      aria-label={aria}
      className="group flex flex-col overflow-hidden rounded-md border-[1.5px] border-border bg-white transition-all duration-200 hover:border-atlas-green-v hover:shadow-hover hover:-translate-y-0.5"
    >
      <div className={cn("relative flex aspect-video flex-col justify-between p-6 overflow-hidden", COVER_BG[study.coverVariant])} aria-hidden="true">
        <span
          className="pointer-events-none absolute font-display font-extrabold leading-none"
          style={{
            right: "-2rem",
            bottom: "-4rem",
            fontSize: "14rem",
            color: study.coverVariant === "purple" ? "rgba(95,182,112,0.08)" : "rgba(95,182,112,0.12)",
          }}
        >
          {study.coverLetter}
        </span>
        <div className="font-display text-[0.78rem] font-bold tracking-[0.06em] text-white/75">
          {study.numero} · {new Date(study.datePubli).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
        </div>
        <div className="inline-flex items-center gap-1.5 font-display text-[0.72rem] font-bold uppercase tracking-[0.08em] text-atlas-green-v">
          <KindIcon className="h-3 w-3" />
          {KIND_LABELS[study.kind]}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.1em] text-atlas-green">
          {study.branche}{study.idcc && ` · IDCC ${study.idcc}`}
        </span>
        <h3 className="font-display text-[1.02rem] font-bold leading-[1.35] text-ink">
          {study.title}
        </h3>
        <p className="line-clamp-3 flex-1 text-[0.85rem] leading-[1.6] text-muted">
          {study.abstract}
        </p>
        <ul className="mt-1 flex flex-wrap gap-1.5 list-none" aria-label="Formats disponibles">
          {study.formats.map((f) => {
            const FormatIcon = FORMAT_ICONS[f.type];
            return (
              <li
                key={f.type}
                className="inline-flex items-center gap-1 rounded-pill border border-border px-3 py-1.5 font-body text-[0.75rem] font-medium text-muted transition-colors group-hover:border-atlas-green-v/50"
              >
                <FormatIcon className="h-3 w-3" aria-hidden="true" />
                {f.label}{f.pages && ` · ${f.pages} p.`}
              </li>
            );
          })}
        </ul>
      </div>
    </Link>
  );
}
