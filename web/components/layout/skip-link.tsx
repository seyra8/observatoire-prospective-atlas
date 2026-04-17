/**
 * Skip link RGAA : permet aux utilisateurs clavier/lecteurs d'écran
 * de passer directement au contenu principal sans parcourir la nav.
 * Visible uniquement au focus.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only
        focus-visible:not-sr-only
        focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[999]
        focus-visible:rounded-pill focus-visible:bg-atlas-green focus-visible:px-6 focus-visible:py-3
        focus-visible:font-display focus-visible:text-[0.9rem] focus-visible:font-bold
        focus-visible:text-white focus-visible:shadow-hover
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-atlas-green-v
      "
    >
      Aller au contenu principal
    </a>
  );
}
