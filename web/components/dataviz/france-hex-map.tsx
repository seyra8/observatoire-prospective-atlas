import { cn } from "@/lib/utils";

interface RegionData {
  code: string; // 3 lettres (IDF, HDF, etc.)
  label: string;
  value: number; // valeur affichée
  level: 0 | 1 | 2 | 3 | 4 | 5; // intensité de couleur
}

/**
 * Grille hexagonale approximative de la France métropolitaine en 13 régions.
 * Layout 5 colonnes × 5 rangs — position reconstitue la forme hexagonale du territoire.
 * `null` = cellule vide.
 */
const GRID: Array<RegionData | null> = [
  null, null, { code: "HDF", label: "Hauts-de-France", value: 2.3, level: 4 }, null, null,
  null, { code: "NOR", label: "Normandie", value: 1.9, level: 3 }, { code: "IDF", label: "Île-de-France", value: 2.8, level: 5 }, { code: "GES", label: "Grand Est", value: 2.4, level: 4 }, null,
  { code: "BRE", label: "Bretagne", value: 1.6, level: 2 }, { code: "PDL", label: "Pays de la Loire", value: 1.7, level: 2 }, { code: "CVL", label: "Centre-Val de Loire", value: 1.8, level: 3 }, { code: "BFC", label: "Bourgogne-Franche-Comté", value: 1.9, level: 3 }, null,
  null, { code: "NAQ", label: "Nouvelle-Aquitaine", value: 1.5, level: 2 }, { code: "ARA", label: "Auvergne-Rhône-Alpes", value: 2.1, level: 3 }, { code: "PAC", label: "Provence-Alpes-Côte d'Azur", value: 2.2, level: 4 }, null,
  null, null, { code: "OCC", label: "Occitanie", value: 1.4, level: 1 }, { code: "COR", label: "Corse", value: 1.3, level: 1 }, null,
];

const LEVEL_BG: Record<number, string> = {
  0: "bg-atlas-green-lt",
  1: "bg-[#9BD1A8]",
  2: "bg-[#6FBD80]",
  3: "bg-atlas-green-v",
  4: "bg-[#2E8349]",
  5: "bg-atlas-green",
};

const LEVEL_TEXT: Record<number, string> = {
  0: "text-atlas-green",
  1: "text-atlas-green",
  2: "text-white",
  3: "text-white",
  4: "text-white",
  5: "text-white",
};

export function FranceHexMap() {
  const activeRegions = GRID.filter((c): c is RegionData => c !== null);

  return (
    <div>
      <div
        className="mx-auto my-2 grid max-w-[480px] grid-cols-5 gap-2"
        role="group"
        aria-label="Carte de France par régions — indice de tension"
      >
        {GRID.map((cell, i) => {
          if (!cell) return <div key={i} className="aspect-square" aria-hidden="true" />;
          const valueStr = cell.value.toFixed(1).replace(".", ",");
          return (
            <button
              key={cell.code}
              type="button"
              aria-label={`${cell.label}, indice de tension ${valueStr} fois`}
              title={`${cell.label} · ${valueStr}×`}
              className={cn(
                "aspect-square rounded-xl p-2 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 hover:shadow-hover relative",
                LEVEL_BG[cell.level]
              )}
            >
              <span className={cn("font-display text-[0.68rem] font-bold tracking-wide opacity-90", LEVEL_TEXT[cell.level])} aria-hidden="true">
                {cell.code}
              </span>
              <span className={cn("mt-1 font-display text-[1.25rem] font-extrabold leading-none", LEVEL_TEXT[cell.level])} aria-hidden="true">
                {valueStr}
              </span>
            </button>
          );
        })}
      </div>
      {/* Alternative texte pour lecteurs d'écran : liste exhaustive des données */}
      <details className="mx-auto mt-3 max-w-[480px] text-[0.82rem]">
        <summary className="cursor-pointer text-muted hover:text-atlas-green">
          Tableau des valeurs (13 régions)
        </summary>
        <table className="mt-2 w-full border-collapse text-left">
          <caption className="sr-only">Indice de tension par région métropolitaine — T1 2026</caption>
          <thead>
            <tr className="border-b border-border text-[0.72rem] uppercase tracking-wide text-muted">
              <th scope="col" className="py-1 font-semibold">Région</th>
              <th scope="col" className="py-1 font-semibold text-right">Tension</th>
            </tr>
          </thead>
          <tbody>
            {activeRegions.map((r) => (
              <tr key={r.code} className="border-b border-border-soft last:border-b-0">
                <td className="py-1">{r.label}</td>
                <td className="py-1 text-right font-mono font-semibold text-atlas-green">
                  {r.value.toFixed(1).replace(".", ",")}×
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[0.78rem] text-muted">
        <span>Détente</span>
        <div className="flex items-center" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((lvl) => (
            <span key={lvl} className={cn("h-2.5 w-5", LEVEL_BG[lvl])} />
          ))}
        </div>
        <span>Tension forte</span>
        <span className="ml-2 text-muted-2">· valeurs = ratio offres/candidatures</span>
      </div>
    </div>
  );
}
