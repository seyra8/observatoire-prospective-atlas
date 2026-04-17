/**
 * Types métier de l'Observatoire Prospective Atlas.
 * Ces types seront alignés avec le schéma Directus quand le CMS sera branché.
 */

export type TensionLevel = "tension" | "emergent" | "stable" | "prospect";

export interface Famille {
  code: string;
  libelle: string;
  icon: string; // lucide-react icon name
}

export interface Metier {
  slug: string;
  libelle: string;
  codeRome: string;
  famille: Famille;
  branches: string[];
  resume: string;
  tension: TensionLevel;
  effectifs: number;
  salaireMedian: number; // k€ annuel brut
  indiceTension: number; // ratio offres/candidatures
  nbFormations: number;
  nbCqp: number;
  competences: Competence[];
  majLe: string; // ISO date
}

export interface Competence {
  code: string;
  libelle: string;
  type: "technique" | "comportementale" | "transverse";
  niveau: "emergent" | "intermediaire" | "confirme" | "expert";
  niveauValue: number; // 0-100 pour la barre
}

export type StudyKind =
  | "prospective"
  | "enquete"
  | "barometre"
  | "cartographie"
  | "note";

export interface Study {
  id: string;
  numero: string; // "N°26.04"
  title: string;
  abstract: string;
  kind: StudyKind;
  branche: string;
  idcc?: string;
  tags: string[];
  datePubli: string; // ISO
  coverVariant: "green" | "purple" | "olive" | "deep";
  coverLetter: string; // 1 char pour filigrane
  formats: Array<{ type: "pdf" | "excel" | "csv" | "synthese"; label: string; pages?: number }>;
}

export interface Branche {
  code: string;
  idcc?: string;
  libelle: string;
  effectifsSalaries: number;
  nbEntreprises: number;
}
