"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommandPalette } from "@/components/command-palette-provider";

const NAV_LINKS = [
  { href: "/metiers", label: "Métiers" },
  { href: "/etudes", label: "Études" },
  { href: "/dataviz", label: "Data" },
  { href: "/actualites", label: "Actualités" },
];

export function Nav() {
  const pathname = usePathname();
  const { openPalette } = useCommandPalette();

  return (
    <nav
      aria-label="Navigation principale"
      className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b-[1.5px] border-border bg-white px-8 lg:px-12"
    >
      <div className="flex items-center gap-5">
        <Link
          href="/"
          aria-label="Observatoire Prospective Atlas — accueil"
          className="font-display text-[1.3rem] font-extrabold leading-none text-atlas-purple tracking-[-0.02em]"
        >
          <span aria-hidden="true">atlas</span>
          <span className="sr-only">Atlas — Observatoire Prospective</span>
        </Link>
        <div className="h-8 w-px bg-border" aria-hidden="true" />
        <span className="font-display text-[0.85rem] font-bold uppercase tracking-[0.04em] text-atlas-green" aria-hidden="true">
          Observatoire · Prospective
        </span>
      </div>

      <ul className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[0.88rem] transition-colors",
                  active ? "text-atlas-green font-semibold" : "text-muted hover:text-atlas-green"
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Ouvrir la recherche globale (raccourci Contrôle K)"
          aria-keyshortcuts="Control+K Meta+K"
          onClick={openPalette}
          className="hidden sm:flex items-center gap-2 min-w-[200px] rounded-pill border border-border bg-off px-4 py-2 text-[0.82rem] text-muted transition-colors hover:border-atlas-green-v hover:bg-white hover:text-atlas-green"
        >
          <Search className="h-[15px] w-[15px]" aria-hidden="true" />
          <span>Rechercher…</span>
          <kbd
            aria-hidden="true"
            className="ml-auto rounded border border-border bg-white px-1.5 py-0.5 font-body text-[0.7rem] font-semibold text-muted"
          >
            ⌘ K
          </kbd>
        </button>
        <span
          className="rounded-pill bg-atlas-green-v px-[0.9rem] py-[0.35rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.06em] text-atlas-green"
          role="status"
          aria-label="Édition courante : 2026"
        >
          Édition 2026
        </span>
      </div>
    </nav>
  );
}
