import { cn } from "@/lib/utils";

interface BarData {
  name: string;
  value: string;
  widthPct: number; // 0-100
  color?: "green" | "purple" | "emergent";
}

// Palette assombrie pour contraste 3:1 minimum sur fond clair (graphics WCAG)
const COLOR_CLASSES = {
  green: "bg-atlas-accent",  // #2E8349 sur bg-border-soft = 4.22:1
  purple: "bg-atlas-purple", // #2D0F64 = 9:1
  emergent: "bg-emergent",   // #8F5117 = 5.5:1
} as const;

interface TensionBarsProps {
  data: BarData[];
}

export function TensionBars({ data }: TensionBarsProps) {
  return (
    <div>
      {data.map((row) => (
        <div
          key={row.name}
          className="grid grid-cols-[180px_1fr_60px] items-center gap-3 border-b border-border-soft py-[0.6rem] last:border-b-0"
        >
          <span className="text-right text-[0.85rem] font-medium text-ink-2 leading-tight">{row.name}</span>
          <div className="h-2.5 overflow-hidden rounded-full bg-border-soft">
            <div
              className={cn("bar-fill-animated h-full rounded-full", COLOR_CLASSES[row.color ?? "green"])}
              style={{ width: `${row.widthPct}%` }}
            />
          </div>
          <span className="text-right font-mono text-[0.8rem] font-semibold text-atlas-green">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
