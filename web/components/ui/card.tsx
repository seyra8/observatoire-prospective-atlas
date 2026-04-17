import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-md border border-border p-6",
        hover && "transition-all duration-200 hover:border-atlas-green-v hover:shadow-hover hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionTitleProps {
  eyebrow?: ReactNode;
  meta?: ReactNode;
  link?: { href: string; label: string };
  children: ReactNode;
}

export function SectionHead({ eyebrow, meta, link, children }: SectionTitleProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
      <div>
        {(eyebrow || meta) && (
          <div className="flex items-center gap-3 mb-3">
            {eyebrow}
            {meta && <span className="text-sm text-muted">{meta}</span>}
          </div>
        )}
        <h2 className="font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-atlas-green" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          {children}
        </h2>
      </div>
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-atlas-green border-b-2 border-atlas-green-v pb-0.5 hover:text-atlas-accent transition-colors"
        >
          {link.label}
          <span aria-hidden>→</span>
        </a>
      )}
    </div>
  );
}
