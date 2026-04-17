import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pill } from "@/components/ui/pill";

export const metadata: Metadata = {
  title: "Méthodologie",
  description:
    "Comment sont construits les indicateurs, les fiches métiers et les études de l'Observatoire Prospective Atlas. Sources, fréquence de mise à jour, limites.",
};

export default function MethodologiePage() {
  return (
    <>
      <header className="relative overflow-hidden bg-atlas-green px-8 py-16 lg:px-12">
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>
          M
        </span>
        <div className="relative mx-auto max-w-[1000px]">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Méthodologie" },
            ]}
          />
          <div className="mb-5">
            <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              Sources · traitements · limites
            </span>
          </div>
          <h1
            className="mb-5 max-w-[860px] font-display font-extrabold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
          >
            Méthodologie —<br />
            <em className="not-italic text-atlas-green-v">comment nous produisons l'observatoire</em>
          </h1>
          <p className="max-w-[680px] text-[1.05rem] font-light leading-[1.7] text-white/75">
            Transparence sur les sources mobilisées, les traitements appliqués et les limites
            de lecture. Une question reste ? Écrivez-nous.
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-[900px] px-8 py-16 lg:px-12">
        <div className="space-y-10 text-[1rem] leading-[1.8] text-ink-2">

          <section>
            <Pill>01 · Fiches métiers</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Référentiel vivant
            </h2>
            <p className="mt-3">
              Chaque fiche métier de l'Observatoire est adossée au
              <strong> Répertoire Opérationnel des Métiers et des Emplois (ROME v4)</strong>
              maintenu par France Travail, et enrichie des données spécifiques
              à nos <strong>11 branches professionnelles</strong> accompagnées.
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Code ROME : clé technique de correspondance inter-branches</li>
              <li>Libellé : validé par les partenaires sociaux de la branche concernée</li>
              <li>Description & missions : rédigées à partir d'entretiens et de référentiels de formation</li>
              <li>Compétences : agrégation de 3 sources (GPEC branche · offres d'emploi 12 mois · RNCP France Compétences)</li>
              <li>Tension : calcul INSEE+France Travail, revalidé avec les entreprises via enquêtes Atlas</li>
            </ul>
          </section>

          <section>
            <Pill>02 · Indicateurs chiffrés</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Sources et fréquences
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-[0.92rem]">
                <caption className="sr-only">Sources de données et fréquence de mise à jour</caption>
                <thead>
                  <tr className="border-b-[1.5px] border-border text-left font-display text-[0.72rem] uppercase tracking-wide text-muted">
                    <th scope="col" className="py-2 font-bold">Indicateur</th>
                    <th scope="col" className="py-2 font-bold">Source</th>
                    <th scope="col" className="py-2 font-bold">Fréquence</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Effectifs salariés", "DADS / DSN (INSEE)", "Annuelle"],
                    ["Indice de tension", "France Travail + déclaratif branche", "Trimestrielle"],
                    ["Salaire médian", "Enquête Atlas branches", "Annuelle"],
                    ["Alternants intégrés", "Déclarations OPCO Atlas", "Trimestrielle"],
                    ["Taux d'accès formation", "OPCO Atlas + CPF (Caisse des dépôts)", "Semestrielle"],
                    ["Compétences émergentes", "Analyse NLP offres d'emploi (corpus 12 mois)", "Trimestrielle"],
                  ].map(([i, s, f]) => (
                    <tr key={i} className="border-b border-border-soft">
                      <th scope="row" className="py-2 text-left font-medium text-ink">{i}</th>
                      <td className="py-2">{s}</td>
                      <td className="py-2 text-muted">{f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <Pill variant="purple">03 · Études prospectives</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Notre processus éditorial
            </h2>
            <p className="mt-3">
              Chaque étude suit un processus en 5 étapes, co-piloté avec la Commission Paritaire
              Nationale Emploi Formation (CPNEF) de la branche concernée :
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-6">
              <li><strong>Cadrage</strong> — question de recherche, périmètre, livrables</li>
              <li><strong>Collecte</strong> — entretiens, enquête en ligne, analyse documentaire</li>
              <li><strong>Analyse</strong> — triangulation des sources, validation partenaires sociaux</li>
              <li><strong>Rédaction</strong> — relecture CPNEF, mise en forme Prospective Atlas</li>
              <li><strong>Diffusion</strong> — publication multi-formats (PDF, Excel, synthèse, dataviz)</li>
            </ol>
          </section>

          <section>
            <Pill>04 · Limites de lecture</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Ce que nos chiffres <em className="not-italic text-atlas-accent">ne disent pas</em>
            </h2>
            <p className="mt-3">
              Nous croyons à une transparence complète, y compris sur les limites. Gardez à l'esprit que :
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Les <strong>petits effectifs</strong> (&lt; 50 salariés sur un métier) doivent être lus avec prudence.</li>
              <li>L'<strong>indice de tension</strong> capture le court terme (6 mois) — les mutations structurelles demandent des séries plus longues.</li>
              <li>Les <strong>compétences émergentes</strong> sont détectées par analyse d'offres d'emploi : elles reflètent la <strong>demande</strong>, pas encore l'offre de formation ni l'évolution réelle des postes.</li>
              <li>Les données DADS/DSN accusent un <strong>délai de 12 à 18 mois</strong> avant consolidation.</li>
            </ul>
          </section>

          <section>
            <Pill variant="purple">05 · Licence et réutilisation</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Données ouvertes
            </h2>
            <p className="mt-3">
              Sauf mention contraire sur une étude précise, l'ensemble des données produites
              par l'Observatoire est publié sous
              <strong> Licence Ouverte Etalab 2.0</strong>. Vous êtes libre de les réutiliser,
              y compris commercialement, sous réserve de mentionner la source :
              <em> « Observatoire Prospective Atlas — OPCO Atlas »</em>.
            </p>
            <p>
              Une <strong>API publique</strong> JSON permettra en v0.4 la réutilisation programmatique
              directe, sans téléchargement intermédiaire.
            </p>
          </section>

          <section className="rounded-md border-[1.5px] border-border bg-off p-6 text-[0.92rem]">
            <p>
              <strong>Dernière mise à jour de la méthodologie :</strong> 17 avril 2026.<br />
              <strong>Contact méthodologique :</strong>{" "}
              <a
                href="mailto:methodologie@observatoire-atlas.fr"
                className="font-semibold text-atlas-green underline decoration-atlas-green-v decoration-2 underline-offset-4 hover:text-atlas-green-v"
              >
                methodologie@observatoire-atlas.fr
              </a>
            </p>
          </section>

        </div>
      </article>
    </>
  );
}
