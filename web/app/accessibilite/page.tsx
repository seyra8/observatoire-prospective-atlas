import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pill } from "@/components/ui/pill";

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité",
  description:
    "Déclaration d'accessibilité RGAA 4.1 de l'Observatoire Prospective Atlas. État de conformité, dérogations, moyens de contact, voies de recours.",
};

export default function AccessibilitePage() {
  return (
    <>
      <header className="relative overflow-hidden bg-atlas-green px-8 py-16 lg:px-12">
        <span className="ghost-letter" style={{ right: "-4rem", top: "-6rem", fontSize: "42vw" }}>
          A
        </span>
        <div className="relative mx-auto max-w-[1000px]">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Observatoire", href: "/" },
              { label: "Déclaration d'accessibilité" },
            ]}
          />
          <div className="mb-5">
            <span className="inline-flex items-center rounded-pill border border-[rgba(95,182,112,0.55)] bg-[rgba(95,182,112,0.2)] px-3 py-[0.3rem] font-display text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
              Conformité RGAA 4.1 · WCAG 2.1 AA
            </span>
          </div>
          <h1
            className="mb-5 max-w-[860px] font-display font-extrabold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
          >
            Déclaration —<br />
            <em className="not-italic text-atlas-green-v">d'accessibilité</em>
          </h1>
          <p className="max-w-[680px] text-[1.05rem] font-light leading-[1.7] text-white/75">
            L'Observatoire Prospective Atlas s'engage à rendre ses services accessibles,
            conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-[900px] px-8 py-16 lg:px-12">
        <div className="prose-like space-y-10 text-[1rem] leading-[1.8] text-ink-2">

          <section>
            <Pill>État de conformité</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Niveau actuel
            </h2>
            <p className="mt-3">
              L'Observatoire Prospective Atlas <strong>est en cours de mise en conformité</strong>
              avec le référentiel général d'amélioration de l'accessibilité (<abbr title="Référentiel Général d'Amélioration de l'Accessibilité">RGAA</abbr>) version 4.1.
            </p>
            <p>
              Statut de conformité : <strong className="text-atlas-green">partiellement conforme</strong> ·
              Un audit externe est prévu avant la publication officielle.
            </p>
          </section>

          <section>
            <Pill>Champ d'application</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Pages couvertes
            </h2>
            <p className="mt-3">
              La présente déclaration couvre l'ensemble du site
              <span className="mx-1 rounded bg-off px-2 py-0.5 font-mono text-[0.9rem]">observatoire-atlas.fr</span>
              (nom de domaine prévisionnel), y compris :
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>la page d'accueil</li>
              <li>les fiches métiers (index et pages de détail)</li>
              <li>la bibliothèque d'études avec filtres</li>
              <li>le dashboard data et ses visualisations</li>
              <li>les pages éditoriales (méthodologie, contact, mentions légales)</li>
            </ul>
          </section>

          <section>
            <Pill>Résultats des tests</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Audit de conformité
            </h2>
            <p className="mt-3">
              L'audit automatisé réalisé en interne avec <strong>axe DevTools</strong> et <strong>Lighthouse</strong>
              indique un taux de conformité initial supérieur à 90 % sur les critères testables automatiquement.
              Un audit humain complet (50 critères RGAA) sera commandé à un prestataire certifié
              avant la mise en ligne publique.
            </p>
            <p>
              Les non-conformités identifiées à date sont listées ci-dessous.
            </p>
          </section>

          <section>
            <Pill>Contenus non accessibles</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Dérogations en cours
            </h2>
            <ul className="mt-3 space-y-3">
              <li>
                <strong>Documents PDF historiques</strong> — certaines études antérieures à 2024
                ne sont pas balisées pour les lecteurs d'écran. Une reprise progressive est en cours.
                En attendant, nous fournissons les données Excel associées et pouvons produire
                une version accessible sur demande.
              </li>
              <li>
                <strong>Visualisations de données complexes</strong> — les graphes interactifs du dashboard
                sont accompagnés d'une alternative textuelle sous forme de tableau dépliable,
                mais l'interaction fine (zoom, filtre par clic) reste à améliorer.
              </li>
              <li>
                <strong>Fichiers Excel bruts</strong> — les exports CSV/Excel ne sont pas optimisés
                pour les technologies d'assistance. Une API JSON accessible sera disponible en v0.4.
              </li>
            </ul>
          </section>

          <section>
            <Pill>Technologies</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Environnement testé
            </h2>
            <p className="mt-3">
              La compatibilité est vérifiée sur :
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Firefox (dernière version) + NVDA sous Windows</li>
              <li>Chrome + VoiceOver sous macOS</li>
              <li>Safari + VoiceOver sous iOS</li>
              <li>Chrome + TalkBack sous Android</li>
            </ul>
            <p>
              Le site respecte le thème clair du navigateur, le niveau de zoom jusqu'à 200 %,
              la navigation complète au clavier et la préférence{" "}
              <code className="rounded bg-off px-1.5 py-0.5 font-mono text-[0.88rem]">prefers-reduced-motion</code>.
            </p>
          </section>

          <section>
            <Pill variant="purple">Contact</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Signaler un problème
            </h2>
            <p className="mt-3">
              Si vous rencontrez un défaut d'accessibilité vous empêchant d'accéder à un contenu
              ou une fonctionnalité, merci de nous le signaler :
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>
                Par courriel :{" "}
                <a
                  href="mailto:accessibilite@observatoire-atlas.fr"
                  className="font-semibold text-atlas-green underline decoration-atlas-green-v decoration-2 underline-offset-4 hover:text-atlas-green-v"
                >
                  accessibilite@observatoire-atlas.fr
                </a>
              </li>
              <li>
                Via le formulaire de{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-atlas-green underline decoration-atlas-green-v decoration-2 underline-offset-4 hover:text-atlas-green-v"
                >
                  contact
                </Link>
              </li>
            </ul>
            <p className="mt-3 text-[0.92rem] text-muted">
              Nous nous engageons à vous répondre sous 10 jours ouvrés.
            </p>
          </section>

          <section>
            <Pill variant="purple">Voies de recours</Pill>
            <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-tight text-atlas-green">
              Si votre demande reste sans réponse
            </h2>
            <p className="mt-3">
              Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à un contenu
              ou une fonctionnalité, que vous nous le signalez et que vous ne parvenez pas
              à obtenir une réponse de notre part, vous êtes en droit de faire parvenir vos doléances
              ou une demande de saisine au Défenseur des droits.
            </p>
            <p>Plusieurs moyens sont à votre disposition :</p>
            <ul className="mt-2 list-disc pl-6">
              <li>
                Écrire un message au{" "}
                <a
                  href="https://formulaire.defenseurdesdroits.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-atlas-green underline decoration-atlas-green-v decoration-2 underline-offset-4 hover:text-atlas-green-v"
                >
                  Défenseur des droits
                </a>
              </li>
              <li>Contacter le délégué du Défenseur des droits dans votre région</li>
              <li>
                Envoyer un courrier par la poste (gratuit, ne pas affranchir) :
                <br />
                <address className="not-italic mt-1">
                  Défenseur des droits · Libre réponse 71120 · 75342 Paris CEDEX 07
                </address>
              </li>
            </ul>
          </section>

          <section className="rounded-md border-[1.5px] border-border bg-off p-6 text-[0.92rem]">
            <p>
              <strong>Déclaration établie le</strong> 17 avril 2026.<br />
              <strong>Technologies utilisées pour la réalisation :</strong> HTML5, CSS3, JavaScript,
              React (Next.js), SVG inline.<br />
              <strong>Outils d'évaluation :</strong> axe DevTools, WAVE, Lighthouse, validateur W3C,
              lecteur d'écran NVDA.
            </p>
          </section>

        </div>
      </article>
    </>
  );
}
