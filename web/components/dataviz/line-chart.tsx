interface LineSeries {
  label: string;
  color: string; // hex
  points: number[]; // valeurs en % (0-40), même longueur que labels
}

interface LineChartProps {
  xLabels: string[];
  yMax?: number; // par défaut 40
  series: LineSeries[];
}

export function LineChart({ xLabels, yMax = 40, series }: LineChartProps) {
  const W = 600;
  const H = 240;
  const PAD_L = 40;
  const PAD_B = 20;
  const PAD_T = 30;
  const PAD_R = 60;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;

  // Convertir valeurs en coordonnées
  const toX = (i: number) => PAD_L + 20 + (i / (xLabels.length - 1)) * (plotW - 20);
  const toY = (v: number) => PAD_T + plotH - (v / yMax) * plotH;

  // Grille horizontale (5 lignes)
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((pct) => {
    const y = PAD_T + plotH - pct * plotH;
    return { y, label: `${Math.round(pct * yMax)}%` };
  });

  return (
    <div className="relative w-full">
      <div className="mb-2 flex flex-wrap gap-2 text-[0.78rem] text-muted">
        {series.map((s) => (
          <span
            key={s.label}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-pill px-3 py-1 transition-colors hover:bg-atlas-green-lt hover:text-atlas-green"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: s.color }}
              aria-hidden
            />
            {s.label}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-labelledby="line-chart-title" aria-describedby="line-chart-desc">
        <title id="line-chart-title">Évolution des compétences émergentes</title>
        <desc id="line-chart-desc">
          Courbes représentant la part des offres d'emploi mentionnant {series.map((s) => s.label).join(", ")} entre {xLabels[0]} et {xLabels[xLabels.length - 1]}.
        </desc>
        {/* Grille */}
        <g stroke="#EFEDE7" strokeWidth="1">
          {gridLines.map((g, i) => (
            <line key={i} x1={PAD_L} y1={g.y} x2={W} y2={g.y} />
          ))}
        </g>
        {/* Y labels */}
        <g fontFamily="var(--font-body)" fontSize="10" fill="#9A9794">
          {gridLines.map((g, i) => (
            <text key={i} x={PAD_L - 8} y={g.y + 4} textAnchor="end">
              {g.label}
            </text>
          ))}
        </g>
        {/* X labels */}
        <g fontFamily="var(--font-display)" fontSize="10" fontWeight="700" fill="#6B6868" letterSpacing="0.5">
          {xLabels.map((label, i) => (
            <text key={label} x={toX(i)} y={H - 4} textAnchor="middle">
              {label}
            </text>
          ))}
        </g>
        {/* Series */}
        {series.map((s) => {
          const path = s.points
            .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
            .join(" ");
          return (
            <g key={s.label}>
              <path d={path} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" />
              {s.points.map((v, i) => (
                <circle
                  key={i}
                  cx={toX(i)}
                  cy={toY(v)}
                  r={i === s.points.length - 1 ? 5 : 4}
                  fill={s.color}
                  stroke={i === s.points.length - 1 ? "#fff" : "none"}
                  strokeWidth={i === s.points.length - 1 ? 2 : 0}
                />
              ))}
            </g>
          );
        })}
      </svg>
      {/* Tableau alternatif pour lecteurs d'écran */}
      <details className="mt-3 text-[0.82rem]">
        <summary className="cursor-pointer text-muted hover:text-atlas-green">
          Tableau des valeurs
        </summary>
        <table className="mt-2 w-full border-collapse text-left">
          <caption className="sr-only">Évolution des compétences émergentes dans les offres d'emploi</caption>
          <thead>
            <tr className="border-b border-border text-[0.72rem] uppercase tracking-wide text-muted">
              <th scope="col" className="py-1 font-semibold">Compétence</th>
              {xLabels.map((x) => (
                <th key={x} scope="col" className="py-1 font-semibold text-right">{x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {series.map((s) => (
              <tr key={s.label} className="border-b border-border-soft last:border-b-0">
                <th scope="row" className="py-1 font-normal">{s.label}</th>
                {s.points.map((v, i) => (
                  <td key={i} className="py-1 text-right font-mono">{v}%</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
