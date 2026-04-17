import { cn } from "@/lib/utils";
import { LucideIcon, Minus, TrendingUp } from "lucide-react";

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  deltaValue: string;
  deltaLabel: string;
  trend: "up" | "down" | "neutral";
  sparkline: number[]; // 8-12 valeurs normalisées entre 0 et 1
  sparkColor?: "green" | "tension" | "muted";
}

const TREND_COLORS = {
  up: "text-atlas-green",
  down: "text-tension",
  neutral: "text-muted",
} as const;

// Stroke plus foncé que atlas-green-v pour contraste sur fond blanc (3:1 minimum non-text)
const SPARK_STROKE = {
  green: "#2E8349",   // atlas-accent : 4.82:1 sur blanc (AA)
  tension: "#A52E1F", // tension foncé : 6.3:1 sur blanc (AA)
  muted: "#6B6868",   // muted : 5.4:1 sur blanc (AA)
} as const;

const SPARK_FILL = {
  green: "rgba(46, 131, 73, 0.18)",
  tension: "rgba(165, 46, 31, 0.12)",
  muted: "transparent",
} as const;

export function KpiCard({
  icon: Icon,
  label,
  value,
  unit,
  deltaValue,
  deltaLabel,
  trend,
  sparkline,
  sparkColor = "green",
}: KpiCardProps) {
  // Construire les points SVG à partir des valeurs normalisées
  const points = sparkline
    .map((v, i) => {
      const x = (i / (sparkline.length - 1)) * 100;
      const y = 26 - v * 22; // marge top 4, hauteur 22
      return `${x},${y}`;
    })
    .join(" ");
  const areaPoints = `${points} 100,28 0,28`;

  const TrendIcon = trend === "neutral" ? Minus : TrendingUp;

  return (
    <div className="rounded-md border-[1.5px] border-border bg-white p-6">
      <div className="mb-2 flex items-center gap-1.5 font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.02em] text-atlas-green">
        {value}
        {unit && <span className="ml-0.5 text-[1.1rem] font-semibold text-atlas-accent">{unit}</span>}
      </div>
      <div
        className={cn(
          "mt-2.5 inline-flex items-center gap-1 font-mono text-[0.8rem] font-semibold",
          TREND_COLORS[trend]
        )}
      >
        <TrendIcon className="h-3 w-3" />
        {deltaValue}
        <span className="mx-1 text-muted-2">·</span>
        <span className="text-muted">{deltaLabel}</span>
      </div>
      <svg
        className="mt-3 w-full"
        viewBox="0 0 100 28"
        height="36"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Tendance ${label.toLowerCase()} sur la période : ${deltaValue} ${deltaLabel}`}
      >
        <title>{`Évolution de ${label}`}</title>
        <desc>{`Courbe de tendance sur ${sparkline.length} points · ${deltaValue} ${deltaLabel}`}</desc>
        <polyline
          points={areaPoints}
          fill={SPARK_FILL[sparkColor]}
          stroke="none"
        />
        <polyline
          points={points}
          fill="none"
          stroke={SPARK_STROKE[sparkColor]}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
