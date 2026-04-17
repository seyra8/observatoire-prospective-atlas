"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Download,
  FileText,
  Home,
  Keyboard,
  LucideIcon,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { metiersTopTrimestre, studiesRecentes } from "@/lib/mock-data";

type CommandGroup = "Navigation" | "Métiers" | "Études" | "Actions";

interface CommandItem {
  id: string;
  group: CommandGroup;
  label: string;
  hint?: string;
  icon: LucideIcon;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  /** Contrôlé par le parent (bouton nav, ⌘K global). */
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Construire la liste des commandes depuis les mock data
  const allCommands = useMemo<CommandItem[]>(() => {
    const nav: CommandItem[] = [
      {
        id: "nav-home",
        group: "Navigation",
        label: "Accueil",
        icon: Home,
        action: () => router.push("/"),
        keywords: ["home", "accueil"],
      },
      {
        id: "nav-branches",
        group: "Navigation",
        label: "Branches professionnelles",
        icon: Briefcase,
        action: () => router.push("/branches"),
        keywords: ["branches", "secteurs", "assurance", "banque", "conseil", "comptable"],
      },
      {
        id: "nav-metiers",
        group: "Navigation",
        label: "Fiches métiers",
        icon: Briefcase,
        action: () => router.push("/metiers"),
        keywords: ["métiers", "métier", "jobs"],
      },
      {
        id: "nav-etudes",
        group: "Navigation",
        label: "Bibliothèque d'études",
        icon: FileText,
        action: () => router.push("/etudes"),
        keywords: ["études", "rapports", "pdf", "library"],
      },
      {
        id: "nav-dataviz",
        group: "Navigation",
        label: "Dashboard data",
        icon: TrendingUp,
        action: () => router.push("/dataviz"),
        keywords: ["data", "stats", "tension"],
      },
      {
        id: "nav-evenements",
        group: "Navigation",
        label: "Événements & Matinales",
        icon: Sparkles,
        action: () => router.push("/evenements"),
        keywords: ["événements", "matinale", "webinaire", "agenda", "colloque", "replay"],
      },
    ];

    const metiers: CommandItem[] = metiersTopTrimestre.map((m) => ({
      id: `metier-${m.slug}`,
      group: "Métiers",
      label: m.libelle,
      hint: m.codeRome,
      icon: Briefcase,
      action: () => router.push(`/metiers/${m.slug}`),
      keywords: [m.codeRome, m.famille.libelle, ...m.branches],
    }));

    const etudes: CommandItem[] = studiesRecentes.map((s) => ({
      id: `etude-${s.id}`,
      group: "Études",
      label: s.title,
      hint: `${s.numero} · ${s.kind}`,
      icon: FileText,
      action: () => router.push(`/etudes/${s.id}`),
      keywords: [s.branche, ...s.tags],
    }));

    const actions: CommandItem[] = [
      {
        id: "action-export",
        group: "Actions",
        label: "Exporter les données du trimestre (CSV)",
        hint: "⌘ E",
        icon: Download,
        action: () => console.log("TODO: export CSV"),
        keywords: ["export", "download", "csv", "données"],
      },
      {
        id: "action-signals",
        group: "Actions",
        label: "Voir les signaux faibles T1 2026",
        icon: Sparkles,
        action: () => router.push("/dataviz#signaux"),
        keywords: ["signaux", "faibles", "alerte", "insights"],
      },
    ];

    return [...nav, ...metiers, ...etudes, ...actions];
  }, [router]);

  // Filtrer par query (recherche naïve sur label + keywords)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands.filter((c) => {
      const haystack = [c.label, ...(c.keywords ?? [])].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [allCommands, query]);

  // Grouper pour l'affichage
  const groups = useMemo(() => {
    const map = new Map<CommandGroup, CommandItem[]>();
    for (const c of filtered) {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    }
    return Array.from(map.entries());
  }, [filtered]);

  // Reset index & focus on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      // Attendre le cycle de rendu pour focus l'input
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Clamp activeIdx dans la plage valide quand la liste change
  useEffect(() => {
    if (activeIdx >= filtered.length) setActiveIdx(Math.max(0, filtered.length - 1));
  }, [filtered.length, activeIdx]);

  // Scroller l'item actif en vue
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const executeActive = useCallback(() => {
    const item = filtered[activeIdx];
    if (item) {
      close();
      item.action();
    }
  }, [filtered, activeIdx, close]);

  // Navigation clavier quand la palette est ouverte
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeActive();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered.length, executeActive, close]);

  if (!open) return null;

  // Calculer l'index global de chaque item pour le mapping activeIdx → groupe
  let globalIdx = -1;

  const activeItemId = filtered[activeIdx]?.id ?? undefined;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmdk-title"
      className="fixed inset-0 z-[300] flex items-start justify-center bg-ink/60 pt-[10vh] backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <h2 id="cmdk-title" className="sr-only">Recherche rapide dans l'observatoire</h2>
      <div
        className="w-full max-w-[640px] overflow-hidden rounded-lg border border-atlas-green-v/30 bg-white shadow-[0_24px_80px_rgba(0,68,35,0.25)]"
        style={{ animation: "popIn 280ms cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {/* Input combobox ARIA */}
        <div className="flex items-center gap-3 border-b-[1.5px] border-border px-5 py-4">
          <Search className="h-[18px] w-[18px] shrink-0 text-atlas-green" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            placeholder="Rechercher un métier, une étude, une compétence…"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeItemId ? `cmdk-item-${activeItemId}` : undefined}
            aria-label="Rechercher un métier, une étude, une compétence"
            className="flex-1 bg-transparent font-body text-base text-ink placeholder:text-muted-2 focus:outline-none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <kbd
            aria-hidden="true"
            className="rounded border border-border px-2 py-0.5 font-body text-[0.7rem] font-semibold text-muted"
          >
            Esc
          </kbd>
        </div>

        {/* Annonce live du nombre de résultats */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {query ? `${filtered.length} résultat${filtered.length > 1 ? "s" : ""} pour « ${query} »` : `${filtered.length} commandes disponibles`}
        </div>

        {/* Groupes / résultats */}
        <div
          ref={listRef}
          id="cmdk-listbox"
          role="listbox"
          aria-label="Résultats de recherche"
          className="max-h-[420px] overflow-y-auto py-2"
        >
          {groups.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
              <Keyboard className="h-6 w-6 text-muted-2" aria-hidden="true" />
              <div className="font-display text-sm font-semibold text-ink">Aucun résultat</div>
              <p className="text-[0.82rem] text-muted">
                Essayez un nom de métier, un code ROME, une branche…
              </p>
            </div>
          )}
          {groups.map(([groupName, items]) => (
            <div key={groupName} role="group" aria-label={`${groupName} (${items.length} éléments)`}>
              <div
                className="px-5 pt-3 pb-1 font-display text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted"
                aria-hidden="true"
              >
                {groupName} · {items.length}
              </div>
              {items.map((item) => {
                globalIdx += 1;
                const idx = globalIdx;
                const isActive = idx === activeIdx;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`cmdk-item-${item.id}`}
                    data-idx={idx}
                    role="option"
                    aria-selected={isActive}
                    type="button"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={executeActive}
                    className={cn(
                      "flex w-full items-center gap-3 px-5 py-2.5 text-left text-[0.92rem] text-ink transition-colors",
                      isActive
                        ? "bg-atlas-green-lt border-l-[3px] border-atlas-green-v pl-[calc(1.25rem-3px)]"
                        : "hover:bg-atlas-green-lt/50"
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className={cn("h-4 w-4 shrink-0", isActive ? "text-atlas-accent" : "text-muted")}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.hint && (
                      <span
                        aria-hidden="true"
                        className="ml-auto rounded bg-atlas-green-tag px-2 py-[2px] font-display text-[0.7rem] font-bold tracking-wide text-atlas-green"
                      >
                        {item.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer keybinds */}
        <div className="flex items-center gap-4 border-t border-border bg-off px-5 py-2.5 text-[0.72rem] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-white px-1.5 py-0.5 font-body text-[0.68rem] font-semibold">↑↓</kbd>
            Naviguer
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-white px-1.5 py-0.5 font-body text-[0.68rem] font-semibold">↵</kbd>
            Ouvrir
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-white px-1.5 py-0.5 font-body text-[0.68rem] font-semibold">Esc</kbd>
            Fermer
          </span>
          <span className="ml-auto">Recherche en cours : recherche locale · Meilisearch en v0.4</span>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-in { animation: fade-in 200ms both; }
      `}</style>
    </div>
  );
}
