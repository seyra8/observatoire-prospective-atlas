import { cn } from "@/lib/utils";
import type { TensionLevel } from "@/lib/types";

export interface MetierTableRow {
  slug: string;
  libelle: string;
  codeRome: string;
  tension: string; // formaté "2.4×"
  tensionLevel: TensionLevel;
  trend: number; // en %
}

const TENSION_COLORS: Record<TensionLevel, string> = {
  tension: "text-tension",
  emergent: "text-emergent",
  stable: "text-atlas-green",
  prospect: "text-atlas-purple",
};

interface Props {
  rows: MetierTableRow[];
}

export function MetiersTable({ rows }: Props) {
  return (
    <div className="-mx-2 max-h-[380px] overflow-y-auto px-2">
      <table className="w-full border-collapse text-[0.83rem]">
        <caption className="sr-only">
          Top métiers classés par tension et évolution sur 12 mois
        </caption>
        <thead>
          <tr className="sticky top-0 grid grid-cols-[1fr_60px_60px] gap-2 border-b border-border bg-white py-2 text-left font-display text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
            <th scope="col" className="font-bold">Métier</th>
            <th scope="col" className="text-right font-bold">Tension</th>
            <th scope="col" className="text-right font-bold">12 mois</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.slug}
              className="grid grid-cols-[1fr_60px_60px] items-center gap-2 border-b border-border-soft py-2.5"
            >
              <th scope="row" className="text-left font-medium text-ink leading-tight">
                {r.libelle}
                <small className="mt-0.5 block font-mono text-[0.72rem] font-normal text-muted">
                  ROME · {r.codeRome}
                </small>
              </th>
              <td className={cn("text-right font-mono font-semibold", TENSION_COLORS[r.tensionLevel])}>
                {r.tension}
              </td>
              <td
                className={cn(
                  "text-right font-mono text-[0.78rem] font-semibold",
                  r.trend > 3 && "text-atlas-green",
                  r.trend < -3 && "text-tension",
                  r.trend >= -3 && r.trend <= 3 && "text-muted"
                )}
              >
                <span className="sr-only">Évolution : </span>
                {r.trend > 0 ? "+" : ""}{r.trend}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
