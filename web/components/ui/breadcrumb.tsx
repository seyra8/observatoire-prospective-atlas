import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string; // absent = page courante
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Contexte foncé (sur fond vert) ou clair (sur fond blanc). */
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Fil d'Ariane accessible : <nav> + <ol> avec aria-current="page" sur le dernier item.
 * Conforme RGAA 10.1 / 10.2 / 12.10.
 */
export function Breadcrumb({ items, variant = "dark", className }: BreadcrumbProps) {
  const textColor = variant === "dark" ? "text-white/55" : "text-muted";
  const linkColor = variant === "dark" ? "text-white/65 hover:text-atlas-green-v" : "text-muted hover:text-atlas-green";
  const currentColor = variant === "dark" ? "text-white/85" : "text-ink font-medium";
  const sepColor = variant === "dark" ? "text-white/35" : "text-border";

  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-[0.82rem]", textColor, className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {!isLast && item.href ? (
                <Link href={item.href} className={cn("transition-colors", linkColor)}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={cn(isLast ? currentColor : textColor)}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className={sepColor}>
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
