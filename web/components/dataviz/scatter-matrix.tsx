interface ScatterPoint {
  label: string;
  /** position x 0-100 (émergence faible → ancrage fort) */
  x: number;
  /** position y 0-100 (tension faible en bas → forte en haut) */
  y: number;
  size: number; // rayon bulle en px
  color: string; // hex
}

interface ScatterMatrixProps {
  points: ScatterPoint[];
}

const W = 600;
const H = 300;
const PAD_L = 60;
const PAD_R = 20;
const PAD_T = 20;
const PAD_B = 40;

export function ScatterMatrix({ points }: ScatterMatrixProps) {
  const toX = (x: number) => PAD_L + (x / 100) * (W - PAD_L - PAD_R);
  const toY = (y: number) => PAD_T + (H - PAD_T - PAD_B) - (y / 100) * (H - PAD_T - PAD_B);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="scatter-title" aria-describedby="scatter-desc">
      <title id="scatter-title">Matrice tension × émergence</title>
      <desc id="scatter-desc">
        Positionnement de {points.length} métiers en quatre quadrants : stratégiques, brûlants, à surveiller, stables matures. La taille des bulles représente les effectifs.
      </desc>
      {/* Axes */}
      <g stroke="#EFEDE7" strokeWidth="1">
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} />
        <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} />
      </g>
      {/* Divisions quadrants */}
      <g stroke="#EFEDE7" strokeWidth="1" strokeDasharray="2 3">
        <line x1={(PAD_L + W - PAD_R) / 2} y1={PAD_T} x2={(PAD_L + W - PAD_R) / 2} y2={H - PAD_B} />
        <line x1={PAD_L} y1={(PAD_T + H - PAD_B) / 2} x2={W - PAD_R} y2={(PAD_T + H - PAD_B) / 2} />
      </g>
      {/* Labels quadrants */}
      <g fontFamily="var(--font-display)" fontSize="9" fontWeight="700" letterSpacing="1" fill="#9A9794">
        <text x={PAD_L + 5} y={PAD_T + 12}>STRATÉGIQUES</text>
        <text x={(PAD_L + W - PAD_R) / 2 + 5} y={PAD_T + 12}>BRÛLANTS</text>
        <text x={PAD_L + 5} y={H - PAD_B + 16}>À SURVEILLER</text>
        <text x={(PAD_L + W - PAD_R) / 2 + 5} y={H - PAD_B + 16}>STABLES MATURES</text>
      </g>
      {/* Titres axes */}
      <text
        x={(PAD_L + W - PAD_R) / 2}
        y={H - 5}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.8"
        fill="#6B6868"
      >
        ← ÉMERGENCE · ANCRAGE →
      </text>
      <text
        x={20}
        y={(PAD_T + H - PAD_B) / 2}
        transform={`rotate(-90 20 ${(PAD_T + H - PAD_B) / 2})`}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.8"
        fill="#6B6868"
      >
        TENSION →
      </text>
      {/* Bulles */}
      {points.map((p) => (
        <g key={p.label}>
          <circle cx={toX(p.x)} cy={toY(p.y)} r={p.size} fill={p.color} opacity="0.82" />
          <text
            x={toX(p.x) + p.size + 4}
            y={toY(p.y) + 3}
            fontFamily="var(--font-body)"
            fontSize="10"
            fill="#004423"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
