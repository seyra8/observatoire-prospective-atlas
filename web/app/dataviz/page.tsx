import type { Metadata } from "next";
import {
  ArrowUpRight,
  BookOpen,
  Download,
  Flame,
  GraduationCap,
  List,
  MapPin,
  PieChart,
  RefreshCcw,
  Scan,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { KpiCard } from "@/components/dataviz/kpi-card";
import { FranceHexMap } from "@/components/dataviz/france-hex-map";
import { TensionBars } from "@/components/dataviz/tension-bars";
import { LineChart } from "@/components/dataviz/line-chart";
import { DonutChart } from "@/components/dataviz/donut-chart";
import { ScatterMatrix } from "@/components/dataviz/scatter-matrix";
import { MetiersTable, type MetierTableRow } from "@/components/dataviz/metiers-table";
import { Pill } from "@/components/ui/pill";

export const metadata: Metadata = {
  title: "Dashboard data",
  description: "Dashboard analytique des métiers et compétences des branches Atlas. Carte de France, tension, évolution des compétences, matrice prospective.",
};

const TOP_TENSION_DATA = [
  { name: "Maintenance industrielle", value: "2.4×", widthPct: 95, color: "green" as const },
  { name: "Tech. énergies ren.", value: "2.1×", widthPct: 86, color: "green" as const },
  { name: "Intégrateur IA", value: "1.8×", widthPct: 72, color: "purple" as const },
  { name: "Actuaire data", value: "1.7×", widthPct: 66, color: "purple" as const },
  { name: "Cyber analyst SOC", value: "1.6×", widthPct: 62, color: "purple" as const },
  { name: "Data analyst branche", value: "1.4×", widthPct: 54, color: "purple" as const },
  { name: "Responsable RSE", value: "1.2×", widthPct: 46, color: "emergent" as const },
  { name: "Gestionnaire patrimoine", value: "1.1×", widthPct: 42, color: "emergent" as const },
  { name: "Conseiller clientèle pro", value: "1.0×", widthPct: 38, color: "emergent" as const },
  { name: "Assistant commercial", value: "0.9×", widthPct: 32, color: "emergent" as const },
];

const LINE_CHART_SERIES = [
  { label: "IA opérationnelle", color: "#2E8349", points: [4, 8, 18, 30, 39] },
  { label: "Cybersécurité OT", color: "#2D0F64", points: [3, 5, 11, 18, 26] },
  { label: "RSE / bas-carbone", color: "#8F5117", points: [5, 10, 14, 20, 27] },
  { label: "Data literacy", color: "#2D6BAA", points: [10, 14, 18, 22, 26] },
];

const DONUT_SLICES = [
  { label: "Commercial", value: 21, color: "#2E8349" },
  { label: "Data / IA", value: 17, color: "#2D0F64" },
  { label: "Maintenance", value: 13, color: "#8F5117" },
  { label: "RH / dialogue", value: 17, color: "#2D6BAA" },
  { label: "RSE / Qualité", value: 16, color: "#004423" },
];

const SCATTER_POINTS = [
  // Stratégiques (gauche haut)
  { label: "Intégr. IA", x: 8, y: 85, size: 14, color: "#2E8349" },
  { label: "Cyber OT", x: 18, y: 72, size: 10, color: "#2E8349" },
  { label: "Resp. RSE", x: 13, y: 62, size: 11, color: "#8F5117" },
  { label: "Data analyst", x: 28, y: 78, size: 9, color: "#2D6BAA" },
  // Brûlants (droite haut)
  { label: "Maint. indus.", x: 62, y: 88, size: 22, color: "#8F5117" },
  { label: "Tech. ENR", x: 74, y: 78, size: 16, color: "#8F5117" },
  { label: "Actuaire", x: 58, y: 66, size: 12, color: "#2D0F64" },
  // À surveiller (bas gauche)
  { label: "Éco-concept.", x: 12, y: 32, size: 8, color: "#2E8349" },
  { label: "IA agentique", x: 30, y: 22, size: 9, color: "#2D0F64" },
  // Stables matures (bas droite)
  { label: "Chargé RH", x: 64, y: 28, size: 18, color: "#2D6BAA" },
  { label: "Conseiller pro", x: 76, y: 18, size: 14, color: "#2D6BAA" },
  { label: "Gest. patrim.", x: 56, y: 14, size: 16, color: "#2D0F64" },
  { label: "Qualité", x: 82, y: 32, size: 10, color: "#004423" },
];

const TABLE_ROWS: MetierTableRow[] = [
  { slug: "maint-indus", libelle: "Technicien maintenance industrielle", codeRome: "I1304", tension: "2.4×", tensionLevel: "tension", trend: 18 },
  { slug: "tech-enr", libelle: "Technicien énergies renouvelables", codeRome: "F1605", tension: "2.1×", tensionLevel: "tension", trend: 24 },
  { slug: "ia-ops", libelle: "Intégrateur IA opérationnelle", codeRome: "M1805", tension: "1.8×", tensionLevel: "emergent", trend: 42 },
  { slug: "actuaire-data", libelle: "Actuaire data", codeRome: "M1403", tension: "1.7×", tensionLevel: "emergent", trend: 14 },
  { slug: "cyber-soc", libelle: "Analyst cybersécurité SOC", codeRome: "M1802", tension: "1.6×", tensionLevel: "emergent", trend: 28 },
  { slug: "data-analyst", libelle: "Data analyst branche", codeRome: "M1403", tension: "1.4×", tensionLevel: "emergent", trend: 19 },
  { slug: "rse", libelle: "Responsable RSE", codeRome: "H1302", tension: "1.2×", tensionLevel: "stable", trend: 11 },
  { slug: "patrim", libelle: "Gestionnaire de patrimoine", codeRome: "C1204", tension: "1.1×", tensionLevel: "stable", trend: 2 },
  { slug: "conseiller-pro", libelle: "Conseiller clientèle pro", codeRome: "C1206", tension: "1.0×", tensionLevel: "stable", trend: 1 },
  { slug: "charge-dev", libelle: "Chargé de dév. compétences", codeRome: "M1502", tension: "0.9×", tensionLevel: "stable", trend: 0 },
  { slug: "mgr-banque", libelle: "Manager de proximité banque", codeRome: "M1301", tension: "0.9×", tensionLevel: "stable", trend: -3 },
  { slug: "assist-com", libelle: "Assistant commercial", codeRome: "D1401", tension: "0.8×", tensionLevel: "stable", trend: -6 },
];

const INSIGHTS = [
  {
    label: "Accélération",
    icon: ArrowUpRight,
    text: (
      <>
        La compétence <strong>« IA agentique »</strong> passe de 3 % à 9 % des offres en 1 an dans les bureaux d'études.
        Premier seuil de décollage franchi.
      </>
    ),
  },
  {
    label: "Alerte tension",
    icon: Flame,
    text: (
      <>
        Les métiers de <strong>maintenance industrielle</strong> en Île-de-France passent à 2.8× —
        niveau historique depuis l'ouverture de l'observatoire.
      </>
    ),
  },
  {
    label: "Mobilité",
    icon: RefreshCcw,
    text: (
      <>
        Les <strong>reconversions vers les métiers cyber</strong> doublent en assurance : 280 parcours en 2025 vs 140 en 2024.
      </>
    ),
  },
];

export default function DatavizPage() {
  return (
    <>
      {/* Head compact */}
      <div className="border-b border-border bg-white px-8 pt-10 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
                <span className="live-dot" />
                Données temps quasi-réel · T1 2026
              </div>
              <h1
                className="font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-atlas-green"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                Dashboard data — <em className="not-italic text-atlas-accent">branches Atlas</em>
              </h1>
              <p className="mt-1 text-[0.92rem] text-muted">
                Tensions, évolutions, compétences émergentes · Sources France Travail, INSEE, déclaratif branche · Dernière synchro : il y a 4 minutes
              </p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-white px-4 py-2 font-display text-[0.8rem] font-semibold text-ink transition-colors hover:border-atlas-green-v hover:text-atlas-green">
                <Share2 className="h-[13px] w-[13px]" />
                Partager
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-pill bg-atlas-green-v px-4 py-2 font-display text-[0.8rem] font-semibold text-white transition-opacity hover:opacity-90">
                <Download className="h-[13px] w-[13px]" />
                Exporter CSV
              </button>
            </div>
          </div>

          {/* Filter bar (démo, sans interaction) */}
          <div className="mb-0 flex flex-wrap items-center gap-2 border-b border-border py-5">
            <span className="font-display text-[0.72rem] font-bold uppercase tracking-[0.08em] text-muted mr-1">
              Branche
            </span>
            <select
              className="rounded-pill border-[1.5px] border-border bg-white px-4 py-2 pr-10 font-display text-[0.82rem] font-semibold text-ink"
              defaultValue="all"
            >
              <option value="all">Toutes les branches (11)</option>
              <option>Banque</option>
              <option>Assurance</option>
              <option>Courtage</option>
              <option>Bureaux d'études</option>
            </select>
            <span className="mx-1 h-5 w-px bg-border" />
            <span className="font-display text-[0.72rem] font-bold uppercase tracking-[0.08em] text-muted mr-1">
              Famille
            </span>
            {["Toutes", "Commercial", "Maintenance", "Data / IA", "RSE", "RH"].map((f, i) => (
              <button
                key={f}
                className={
                  i === 0
                    ? "rounded-pill border-[1.5px] border-atlas-green bg-atlas-green px-4 py-2 font-display text-[0.82rem] font-semibold text-white"
                    : "rounded-pill border-[1.5px] border-border bg-white px-4 py-2 font-display text-[0.82rem] font-semibold text-ink-2 transition-colors hover:border-atlas-green-v hover:text-atlas-green"
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille dashboard */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-5 px-8 py-6 pb-12 lg:px-12">
        {/* KPIs */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <KpiCard
            icon={Users}
            label="Salariés dans le périmètre"
            value="187K"
            deltaValue="+1,1 %"
            deltaLabel="vs T1 2025"
            trend="up"
            sparkline={[0.2, 0.28, 0.25, 0.38, 0.35, 0.55, 0.52, 0.68, 0.65, 0.8, 0.88]}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <KpiCard
            icon={Flame}
            label="Métiers en tension"
            value="24"
            unit="/84"
            deltaValue="+5"
            deltaLabel="nouveaux en 2026"
            trend="up"
            sparkline={[0.2, 0.3, 0.42, 0.5, 0.58, 0.72, 0.85, 0.95]}
            sparkColor="tension"
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <KpiCard
            icon={GraduationCap}
            label="Alternants intégrés"
            value="4 820"
            deltaValue="+8,7 %"
            deltaLabel="12 mois glissants"
            trend="up"
            sparkline={[0.25, 0.2, 0.3, 0.4, 0.3, 0.5, 0.55, 0.65, 0.58, 0.78, 0.9]}
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <KpiCard
            icon={BookOpen}
            label="Taux d'accès formation"
            value="58"
            unit="%"
            deltaValue="-0,2 pts"
            deltaLabel="stable"
            trend="neutral"
            sparkline={[0.5, 0.48, 0.52, 0.5, 0.52, 0.5, 0.52, 0.5, 0.52, 0.5, 0.52]}
            sparkColor="muted"
          />
        </div>

        {/* Map + Top tension */}
        <div className="col-span-12 lg:col-span-7">
          <div className="flex h-full flex-col gap-4 rounded-md border-[1.5px] border-border bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[0.95rem] font-bold text-ink">
                  Tension par région · indice pondéré
                </h3>
                <p className="mt-1 text-[0.8rem] text-muted">
                  Offres d'emploi rapportées au bassin d'emploi local — 13 régions métropolitaines
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-pill bg-atlas-green-tag px-2.5 py-1 font-display text-[0.68rem] font-bold tracking-wide text-atlas-green">
                <MapPin className="h-3 w-3" />
                T1 2026
              </span>
            </div>
            <FranceHexMap />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="flex h-full flex-col gap-4 rounded-md border-[1.5px] border-border bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[0.95rem] font-bold text-ink">Top 10 · métiers en tension</h3>
                <p className="mt-1 text-[0.8rem] text-muted">Ratio offres/candidatures · 6 derniers mois</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-pill bg-atlas-green-tag px-2.5 py-1 font-display text-[0.68rem] font-bold tracking-wide text-atlas-green">
                <TrendingUp className="h-3 w-3" />
                +3 entrées
              </span>
            </div>
            <TensionBars data={TOP_TENSION_DATA} />
          </div>
        </div>

        {/* Line chart + Donut */}
        <div className="col-span-12 lg:col-span-7">
          <div className="flex h-full flex-col gap-4 rounded-md border-[1.5px] border-border bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[0.95rem] font-bold text-ink">
                  Compétences émergentes — évolution 2022-2026
                </h3>
                <p className="mt-1 text-[0.8rem] text-muted">
                  Part des offres d'emploi mentionnant ces compétences dans le périmètre Atlas
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-pill bg-atlas-purple-lt px-2.5 py-1 font-display text-[0.68rem] font-bold tracking-wide text-atlas-purple">
                <TrendingUp className="h-3 w-3" />
                Série longue
              </span>
            </div>
            <LineChart
              xLabels={["2022", "2023", "2024", "2025", "2026"]}
              yMax={40}
              series={LINE_CHART_SERIES}
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="flex h-full flex-col gap-4 rounded-md border-[1.5px] border-border bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[0.95rem] font-bold text-ink">Répartition par famille</h3>
                <p className="mt-1 text-[0.8rem] text-muted">Sur les 84 fiches métiers actives</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-pill bg-atlas-green-tag px-2.5 py-1 font-display text-[0.68rem] font-bold tracking-wide text-atlas-green">
                <PieChart className="h-3 w-3" />
                84 métiers
              </span>
            </div>
            <DonutChart slices={DONUT_SLICES} centerLabel="MÉTIERS" centerValue={84} />
          </div>
        </div>

        {/* Scatter + Table */}
        <div className="col-span-12 lg:col-span-7">
          <div className="flex h-full flex-col gap-4 rounded-md border-[1.5px] border-border bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[0.95rem] font-bold text-ink">Matrice tension × émergence</h3>
                <p className="mt-1 text-[0.8rem] text-muted">
                  Chaque bulle = un métier · taille = effectifs · couleur = famille
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-pill bg-atlas-purple-lt px-2.5 py-1 font-display text-[0.68rem] font-bold tracking-wide text-atlas-purple">
                <Scan className="h-3 w-3" />
                Analyse croisée
              </span>
            </div>
            <ScatterMatrix points={SCATTER_POINTS} />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="flex h-full flex-col gap-4 rounded-md border-[1.5px] border-border bg-white p-6 max-h-[460px] overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[0.95rem] font-bold text-ink">Top 20 métiers · classement</h3>
                <p className="mt-1 text-[0.8rem] text-muted">Triable · effectifs, tension, évolution</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-pill bg-atlas-green-tag px-2.5 py-1 font-display text-[0.68rem] font-bold tracking-wide text-atlas-green">
                <List className="h-3 w-3" />
                Détail
              </span>
            </div>
            <MetiersTable rows={TABLE_ROWS} />
          </div>
        </div>

        {/* Signaux faibles */}
        <div
          id="signaux"
          className="col-span-12 relative overflow-hidden rounded-md border-[1.5px] border-atlas-green bg-atlas-green p-6 text-white"
        >
          <span
            className="ghost-letter"
            style={{ right: "-1rem", top: "-2.5rem", fontSize: "12rem", color: "rgba(95,182,112,0.12)" }}
          >
            !
          </span>
          <div className="relative flex items-start justify-between gap-4">
            <h3 className="inline-flex items-center gap-2 font-display text-[1.1rem] font-bold text-white">
              <Sparkles className="h-[15px] w-[15px] text-atlas-green-v" />
              Signaux faibles T1 2026 — détectés automatiquement
            </h3>
            <Pill variant="purple">3 alertes</Pill>
          </div>
          <div className="relative mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
            {INSIGHTS.map((ins) => (
              <div key={ins.label} className="rounded-sm border border-white/14 bg-white/6 p-5">
                <div className="mb-2 inline-flex items-center gap-1 font-display text-[0.68rem] font-bold uppercase tracking-[0.1em] text-atlas-green-v">
                  <ins.icon className="h-3 w-3" />
                  {ins.label}
                </div>
                <p className="text-[0.92rem] leading-[1.55] text-white/90">{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
