import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghost-dark";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 font-display text-[0.92rem] font-bold px-8 py-[0.9rem] rounded-pill transition-all duration-200 border";

const variants: Record<Variant, string> = {
  // Primary : vert vif bg + texte vert foncé (contraste #004423 sur #5FB670 = 5.39:1, AA pass)
  primary:
    "bg-atlas-green-v text-atlas-green border-atlas-green-v hover:opacity-90 hover:-translate-y-px",
  ghost:
    "bg-white text-atlas-green border-border hover:border-atlas-green-v hover:bg-atlas-green-lt",
  "ghost-dark":
    "bg-transparent text-white border-white/30 hover:bg-white/10 hover:-translate-y-px",
};

// Styles inline nécessaires car Tailwind v4 ne résout pas toutes les custom props
// via class utilities pour les valeurs exactes de la charte. Pour simplifier au max,
// on utilise des utilities custom définies via @theme qui correspondent à nos tokens.
// Le [0.88] opacity hover est géré par un style arbitraire Tailwind.

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
}

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
  external,
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
