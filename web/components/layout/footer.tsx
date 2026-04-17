import Link from "next/link";

const LINKS = {
  Explorer: [
    { href: "/metiers", label: "Fiches métiers" },
    { href: "/etudes", label: "Études & rapports" },
    { href: "/dataviz", label: "Données" },
    { href: "/actualites", label: "Actualités" },
  ],
  Ressources: [
    { href: "/methodologie", label: "Méthodologie" },
    { href: "/api", label: "API publique" },
    { href: "/rss", label: "Flux RSS · Atom" },
    { href: "/contribuer", label: "Contribuer" },
  ],
  Légal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/accessibilite", label: "Accessibilité — partiellement conforme" },
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-atlas-green px-8 py-14 lg:px-12">
      <span className="ghost-letter" style={{ left: "-3rem", bottom: "-8rem", fontSize: "22rem" }}>
        A
      </span>
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div
            className="font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.02em] text-white mb-3"
          >
            OBSER<span className="text-atlas-green-v">VATOIRE</span>
          </div>
          <p className="max-w-[360px] text-[0.85rem] leading-[1.7] text-white/55">
            Observatoire prospectif des métiers et des qualifications
            des branches accompagnées par OPCO Atlas ·
            Direction des Politiques de Branches.
          </p>
        </div>

        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title}>
            <h4 className="mb-4 font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              {title}
            </h4>
            <ul className="flex flex-col gap-[0.65rem]">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.88rem] text-white/65 transition-colors hover:text-atlas-green-v"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-[0.8rem] text-white/75">
        <span>© 2026 Observatoire Prospective Atlas · OPCO Atlas</span>
        <span>Licence ouverte Etalab 2.0 · v0.3</span>
      </div>
    </footer>
  );
}
