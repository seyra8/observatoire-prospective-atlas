interface DonutSlice {
  label: string;
  value: number;
  color: string; // hex
}

interface DonutChartProps {
  slices: DonutSlice[];
  centerLabel: string;
  centerValue: string | number;
}

export function DonutChart({ slices, centerLabel, centerValue }: DonutChartProps) {
  const R = 72;
  const CIRC = 2 * Math.PI * R;
  const total = slices.reduce((acc, s) => acc + s.value, 0);

  let offset = 0;
  const arcs = slices.map((s) => {
    const arcLen = (s.value / total) * CIRC;
    const arc = { ...s, arcLen, offset };
    offset += arcLen;
    return arc;
  });

  return (
    <div className="grid grid-cols-[1fr_1fr] items-center gap-5">
      <svg viewBox="0 0 200 200" className="h-auto w-full" role="img" aria-labelledby="donut-title" aria-describedby="donut-desc">
        <title id="donut-title">Répartition des métiers par famille</title>
        <desc id="donut-desc">
          {centerValue} {centerLabel.toLowerCase()} répartis entre {slices.map((s) => `${s.label} : ${s.value}`).join(", ")}.
        </desc>
        <circle cx="100" cy="100" r={R} fill="none" stroke="#EFEDE7" strokeWidth="30" />
        {arcs.map((a) => (
          <circle
            key={a.label}
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke={a.color}
            strokeWidth="30"
            strokeDasharray={`${a.arcLen} ${CIRC}`}
            strokeDashoffset={-a.offset}
            transform="rotate(-90 100 100)"
          />
        ))}
        <text
          x="100"
          y="94"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="28"
          fontWeight="800"
          fill="#004423"
          letterSpacing="-1"
        >
          {centerValue}
        </text>
        <text
          x="100"
          y="114"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#6B6868"
        >
          {centerLabel}
        </text>
      </svg>
      <div className="flex flex-col gap-2 text-[0.82rem]">
        {slices.map((s) => (
          <div
            key={s.label}
            className="flex cursor-pointer items-center gap-2 rounded-sm p-2 transition-colors hover:bg-off"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} aria-hidden />
            <span className="flex-1">{s.label}</span>
            <span className="font-mono font-semibold text-ink">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
