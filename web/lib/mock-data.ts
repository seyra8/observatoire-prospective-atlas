/**
 * Données mock pour le MVP.
 * À remplacer par des fetch Directus quand le CMS sera branché (voir lib/directus.ts).
 *
 * Source des branches : https://www.opco-atlas.fr/atlas/quelle-branche.html
 * 14 branches organisées en 4 secteurs (Assurance, Banque & Finance, Conseil,
 * Expertise comptable). Les codes IDCC mentionnés sont à valider côté branche.
 */
import type {
  Actualite,
  Branche,
  BrancheDetail,
  Evenement,
  Metier,
  Study,
  StudyDetail,
} from "./types";

// ════════════════════════════════════════════════════════════════════════════
// 14 BRANCHES OPCO ATLAS (officielles)
// ════════════════════════════════════════════════════════════════════════════

export type Secteur = "assurance" | "banque-finance" | "conseil" | "expertise-comptable";

export const SECTEURS: Record<Secteur, { libelle: string; description: string }> = {
  assurance: {
    libelle: "Assurance",
    description: "Sociétés d'assurance, agents généraux, courtage et assistance.",
  },
  "banque-finance": {
    libelle: "Banque & Finance",
    description: "Banques de détail et d'investissement, marchés financiers, sociétés financières.",
  },
  conseil: {
    libelle: "Conseil & Ingénierie",
    description: "Bureaux d'études techniques, conseil, ingénierie, métiers de la construction.",
  },
  "expertise-comptable": {
    libelle: "Expertise comptable",
    description: "Cabinets d'expertise comptable et de commissariat aux comptes.",
  },
};

export const branchesDetails: BrancheDetail[] = [
  // ─── ASSURANCE ──────────────────────────────────────────────
  {
    code: "AGENTS",
    slug: "agents-generaux-assurance",
    idcc: "2335",
    libelle: "Agents généraux d'assurance",
    coverLetter: "A",
    effectifsSalaries: 14800,
    nbEntreprises: 11500,
    resume:
      "Cabinets indépendants mandatés par des compagnies d'assurance, au cœur du maillage territorial français.",
    chapo:
      "Intermédiaires de proximité, les agents généraux conseillent particuliers et professionnels sur l'ensemble des produits d'assurance. Leurs collaborateurs combinent expertise technique et relation client forte.",
    partFemmes: 62,
    ageMedian: 41,
    salaireMedian: 33.5,
    metiersPhares: ["charge-developpement-competences"],
    etudesIds: ["25-03"],
    tendances: [
      { label: "Effectifs 2024", value: "14,8 K", trend: "flat" },
      { label: "Embauches / an", value: "1 900", trend: "up" },
      { label: "Alternance", value: "+12 %", trend: "up" },
    ],
    defisProspectifs: [
      "Renouvellement démographique (30 % de départs en retraite d'ici 2030)",
      "Digitalisation de la relation client sans déshumaniser",
      "Diversification vers la prévention et le conseil patrimonial",
    ],
    gouvernance: "CPNE Agents généraux",
  },
  {
    code: "COURTAGE",
    slug: "courtage-assurance",
    idcc: "2247",
    libelle: "Courtage d'assurances et de réassurances",
    coverLetter: "C",
    effectifsSalaries: 30600,
    nbEntreprises: 22400,
    resume:
      "Intermédiaires indépendants représentant leurs clients face aux compagnies — du risque PME au risque industriel complexe.",
    chapo:
      "Métier en pleine transformation : concentration du marché, montée des risques cyber et climatiques, nouveaux usages (néo-courtiers digitaux). Dialogue social actif via Planète CSCA.",
    partFemmes: 58,
    ageMedian: 39,
    salaireMedian: 40.2,
    metiersPhares: ["data-analyst-branches", "responsable-transition-ecologique"],
    etudesIds: ["25-10"],
    tendances: [
      { label: "Effectifs 2024", value: "30,6 K", trend: "up" },
      { label: "Nouveaux courtiers", value: "+320 / an", trend: "up" },
      { label: "Cyber & climat", value: "+18 %", trend: "up" },
    ],
    defisProspectifs: [
      "Nouveaux risques cyber et climatiques à couvrir",
      "Concentration du marché : intégration de petits cabinets",
      "Compétences data & IA pour la tarification",
    ],
    gouvernance: "CPNE Courtage",
  },
  {
    code: "ASSURANCE",
    slug: "societes-assurance",
    idcc: "1672",
    libelle: "Sociétés d'assurances",
    coverLetter: "S",
    effectifsSalaries: 148000,
    nbEntreprises: 248,
    resume:
      "Compagnies d'assurance de personnes et de biens — mutuelles, sociétés anonymes, groupements paritaires.",
    chapo:
      "Première branche OPCO Atlas en effectifs. L'OEMA — Observatoire de l'évolution des métiers de l'assurance — y produit depuis 30 ans des travaux de référence sur l'évolution des métiers et compétences.",
    partFemmes: 59,
    ageMedian: 42,
    salaireMedian: 48.5,
    metiersPhares: ["data-analyst-branches", "responsable-transition-ecologique"],
    etudesIds: ["25-11", "26-04", "26-03"],
    tendances: [
      { label: "Effectifs 2024", value: "148 K", trend: "flat" },
      { label: "Part alternants", value: "11,2 %", trend: "up" },
      { label: "Femmes cadres", value: "48 %", trend: "up" },
    ],
    defisProspectifs: [
      "Transition vers la prévention (santé, climat, cyber)",
      "Évolution des métiers commerciaux face à la digitalisation",
      "Attractivité auprès des jeunes diplômés",
    ],
    gouvernance: "OEMA — Observatoire de l'évolution des métiers de l'assurance",
  },
  {
    code: "ASSISTANCE",
    slug: "societes-assistance",
    idcc: "1801",
    libelle: "Sociétés d'assistance",
    coverLetter: "A",
    effectifsSalaries: 9400,
    nbEntreprises: 48,
    resume:
      "Assistance voyage, auto, santé, habitation — plateformes 24/7 qui mobilisent chargés d'assistance, médecins conseils, ingénieurs secours.",
    chapo:
      "Branche à forte intensité de main-d'œuvre qualifiée, multilingue, travail en équipes. Au cœur de la chaîne de valeur assurance et mutualiste.",
    partFemmes: 64,
    ageMedian: 36,
    salaireMedian: 34.0,
    metiersPhares: [],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "9,4 K", trend: "flat" },
      { label: "Multilinguisme", value: "72 %", trend: "up" },
      { label: "Télétravail", value: "+40 %", trend: "up" },
    ],
    defisProspectifs: [
      "Montée en compétences médicales (téléconsultation, urgences)",
      "Automatisation partielle des demandes standards par IA",
      "Qualité de vie au travail sur les plateformes 24/7",
    ],
    gouvernance: "CPNE Assistance",
  },

  // ─── BANQUE & FINANCE ───────────────────────────────────────
  {
    code: "BANQUE",
    slug: "banque",
    idcc: "2120",
    libelle: "Banque",
    coverLetter: "B",
    effectifsSalaries: 210000,
    nbEntreprises: 340,
    resume:
      "Banques AFB (Association française des banques) — banque de détail, banque privée, banque d'investissement.",
    chapo:
      "Deuxième branche Atlas par effectifs. L'Observatoire des métiers de la banque suit depuis 1983 l'évolution des 25 familles de métiers, de la conseillance client à l'expertise financière.",
    partFemmes: 57,
    ageMedian: 41,
    salaireMedian: 52.0,
    metiersPhares: ["charge-developpement-competences", "data-analyst-branches"],
    etudesIds: ["26-04"],
    tendances: [
      { label: "Effectifs 2024", value: "210 K", trend: "flat" },
      { label: "Reconversions", value: "+14 %", trend: "up" },
      { label: "IA générative", value: "Phase 2", trend: "up" },
    ],
    defisProspectifs: [
      "Transformation du métier de conseiller clientèle",
      "Essor du banquier privé / gestionnaire de patrimoine",
      "Intégration progressive de l'IA dans les back-offices",
    ],
    gouvernance: "Observatoire des métiers de la banque",
  },
  {
    code: "BANQUE-POP",
    slug: "banque-populaire",
    idcc: "3206",
    libelle: "Banque populaire",
    coverLetter: "B",
    effectifsSalaries: 28500,
    nbEntreprises: 14,
    resume:
      "Banques populaires régionales (BRED, Banques Populaires du Nord, Rives de Paris, etc.) et leurs filiales.",
    chapo:
      "Banque coopérative à ancrage régional, dialogue social actif au sein du groupe BPCE. Mobilités inter-régionales fréquentes dans les parcours.",
    partFemmes: 58,
    ageMedian: 42,
    salaireMedian: 49.5,
    metiersPhares: [],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "28,5 K", trend: "flat" },
      { label: "Mobilité régionale", value: "18 %", trend: "up" },
    ],
    defisProspectifs: [
      "Digitalisation des agences tout en conservant la proximité",
      "Attractivité dans les zones rurales et périurbaines",
    ],
    gouvernance: "Commission paritaire BPCE",
  },
  {
    code: "CAISSE-EPARGNE",
    slug: "caisse-epargne",
    idcc: "3235",
    libelle: "Caisse d'épargne",
    coverLetter: "C",
    effectifsSalaries: 34200,
    nbEntreprises: 15,
    resume:
      "Caisses d'épargne régionales, filiales nationales et Banque postale (partenariat partiel).",
    chapo:
      "Banque coopérative au service des particuliers, professionnels, collectivités locales et économie sociale. Intégrée au groupe BPCE.",
    partFemmes: 60,
    ageMedian: 43,
    salaireMedian: 50.0,
    metiersPhares: [],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "34,2 K", trend: "flat" },
      { label: "Femmes cadres", value: "51 %", trend: "up" },
    ],
    defisProspectifs: [
      "Pilotage de la transition énergétique pour les collectivités locales",
      "Renouvellement générationnel",
    ],
    gouvernance: "Commission paritaire BPCE",
  },
  {
    code: "CREDIT-MUTUEL",
    slug: "credit-mutuel",
    idcc: "1468",
    libelle: "Crédit mutuel",
    coverLetter: "C",
    effectifsSalaries: 27800,
    nbEntreprises: 18,
    resume:
      "Groupe bancaire mutualiste fédéré en régions (CM Alliance Fédérale, Arkéa, etc.), maillage territorial fort.",
    chapo:
      "Mutualisme et technologie : le Crédit mutuel a investi massivement dans l'IA et la formation continue de ses collaborateurs.",
    partFemmes: 56,
    ageMedian: 40,
    salaireMedian: 48.5,
    metiersPhares: [],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "27,8 K", trend: "flat" },
      { label: "IA / assistant virtuel", value: "Phase 3", trend: "up" },
    ],
    defisProspectifs: [
      "Déploiement d'IA générative interne (assistant Watson équivalent)",
      "Formation continue accélérée",
    ],
    gouvernance: "Commission paritaire Crédit Mutuel",
  },
  {
    code: "MARCHES-FI",
    slug: "marches-financiers",
    idcc: "2931",
    libelle: "Marchés financiers",
    coverLetter: "M",
    effectifsSalaries: 16200,
    nbEntreprises: 420,
    resume:
      "Sociétés de bourse, prestataires de services d'investissement, infrastructures de marché (Euronext, LCH, Euroclear).",
    chapo:
      "Branche hautement qualifiée : 78 % de cadres, métiers très techniques (trading, quants, conformité). Fort impact de la réglementation européenne (MiFID II, DORA).",
    partFemmes: 38,
    ageMedian: 38,
    salaireMedian: 72.0,
    metiersPhares: ["data-analyst-branches"],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "16,2 K", trend: "up" },
      { label: "Cadres", value: "78 %", trend: "flat" },
      { label: "Data / quant", value: "+22 %", trend: "up" },
    ],
    defisProspectifs: [
      "Métiers quantitatifs et data science en tension",
      "Conformité cyber renforcée (DORA)",
      "Féminisation des métiers techniques",
    ],
    gouvernance: "CPNEFP Marchés financiers",
  },
  {
    code: "SOC-FIN",
    slug: "societes-financieres",
    idcc: "478",
    libelle: "Sociétés financières",
    coverLetter: "S",
    effectifsSalaries: 32000,
    nbEntreprises: 720,
    resume:
      "Crédit à la consommation, crédit-bail, affacturage, monnaie électronique, établissements de paiement.",
    chapo:
      "Branche en forte recomposition sous l'effet des fintechs et de la régulation (PSD3, DSP). Métiers risque et conformité en tension forte.",
    partFemmes: 54,
    ageMedian: 39,
    salaireMedian: 46.0,
    metiersPhares: [],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "32,0 K", trend: "up" },
      { label: "Fintechs", value: "+28 %", trend: "up" },
      { label: "Conformité", value: "+15 %", trend: "up" },
    ],
    defisProspectifs: [
      "Concurrence des néo-banques et fintechs",
      "Cybersécurité et lutte anti-fraude (IA)",
      "Compétences ESG et finance verte",
    ],
    gouvernance: "CPNE Sociétés financières",
  },

  // ─── CONSEIL & INGÉNIERIE ───────────────────────────────────
  {
    code: "BE",
    slug: "bureaux-etudes",
    idcc: "1486",
    libelle: "Bureaux d'études techniques, ingénieurs-conseils et sociétés de conseils",
    coverLetter: "B",
    effectifsSalaries: 910000,
    nbEntreprises: 82000,
    resume:
      "La plus grande branche Atlas : ingénierie (bâtiment, industrie), conseil en stratégie, numérique, événementiel.",
    chapo:
      "Branche sous convention Syntec, pilotée par l'OPIIEC (Observatoire paritaire des métiers du numérique, de l'ingénierie, du conseil et de l'événementiel). Foyer principal de l'innovation métiers en France.",
    partFemmes: 34,
    ageMedian: 36,
    salaireMedian: 52.5,
    metiersPhares: ["integrateur-ia-operationnelle", "data-analyst-branches", "technicien-energies-renouvelables"],
    etudesIds: ["26-02", "25-09"],
    tendances: [
      { label: "Effectifs 2024", value: "910 K", trend: "up" },
      { label: "Alternance", value: "+19 %", trend: "up" },
      { label: "IA & cyber", value: "Priorité #1", trend: "up" },
    ],
    defisProspectifs: [
      "IA générative dans l'ingénierie et le conseil",
      "Cybersécurité — 4 familles métiers en forte tension",
      "Transition écologique dans les études techniques (RE2020, bas-carbone)",
    ],
    gouvernance: "OPIIEC",
  },
  {
    code: "ECONOMISTES",
    slug: "economistes-construction",
    idcc: "3213",
    libelle: "Économistes de la construction",
    coverLetter: "É",
    effectifsSalaries: 6800,
    nbEntreprises: 2400,
    resume:
      "Expertise en économie du bâtiment : chiffrage, études de prix, pilotage coûts et délais des opérations immobilières.",
    chapo:
      "Branche de niche à haute valeur ajoutée. Métier pivot entre maîtrise d'ouvrage, architectes et entreprises BTP. Fort impact de la RE2020 et du coût carbone.",
    partFemmes: 32,
    ageMedian: 42,
    salaireMedian: 45.0,
    metiersPhares: [],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "6,8 K", trend: "up" },
      { label: "BIM & numérique", value: "Déploiement", trend: "up" },
    ],
    defisProspectifs: [
      "Chiffrage carbone systématique (RE2020)",
      "BIM et outils collaboratifs",
      "Renouvellement démographique",
    ],
    gouvernance: "CPNE Économistes de la construction",
  },
  {
    code: "GEOMETRES",
    slug: "geometres",
    idcc: "2543",
    libelle: "Géomètres-experts",
    coverLetter: "G",
    effectifsSalaries: 12400,
    nbEntreprises: 1600,
    resume:
      "Experts du foncier et de la mesure : bornage, urbanisme, aménagement, copropriété, topographie.",
    chapo:
      "Profession réglementée (Ordre des géomètres-experts). Forte transformation technologique : drones, scanners 3D, SIG, BIM.",
    partFemmes: 29,
    ageMedian: 42,
    salaireMedian: 44.5,
    metiersPhares: [],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "12,4 K", trend: "flat" },
      { label: "Tech 3D / drones", value: "+35 %", trend: "up" },
    ],
    defisProspectifs: [
      "Numérisation complète de la profession (scan 3D, drones)",
      "Attractivité auprès des jeunes",
      "Données SIG et souveraineté",
    ],
    gouvernance: "CPNE Géomètres-experts",
  },

  // ─── EXPERTISE COMPTABLE ────────────────────────────────────
  {
    code: "EC",
    slug: "experts-comptables",
    idcc: "787",
    libelle: "Experts-comptables et commissaires aux comptes",
    coverLetter: "E",
    effectifsSalaries: 158000,
    nbEntreprises: 21000,
    resume:
      "Cabinets d'expertise comptable, commissariat aux comptes, conseil associé (gestion, paie, juridique).",
    chapo:
      "Branche en pleine mutation technologique : facturation électronique obligatoire, dématérialisation, conseil stratégique en complément de la tenue comptable.",
    partFemmes: 66,
    ageMedian: 38,
    salaireMedian: 43.5,
    metiersPhares: [],
    etudesIds: [],
    tendances: [
      { label: "Effectifs 2024", value: "158 K", trend: "up" },
      { label: "Facturation élec.", value: "Obligatoire", trend: "up" },
      { label: "Conseil", value: "+24 %", trend: "up" },
    ],
    defisProspectifs: [
      "Automatisation de la tenue comptable par IA",
      "Montée en gamme vers le conseil et le pilotage",
      "Attractivité des métiers auprès des jeunes diplômés",
    ],
    gouvernance: "CPNEFP Experts-comptables",
  },
];

// Vue simplifiée pour les usages legacy
export const branches: Branche[] = branchesDetails.map((b) => ({
  code: b.code,
  idcc: b.idcc,
  libelle: b.libelle,
  effectifsSalaries: b.effectifsSalaries,
  nbEntreprises: b.nbEntreprises,
}));

/** Groupe les branches par secteur (pour la page /branches). */
export const BRANCHES_BY_SECTEUR: Record<Secteur, BrancheDetail[]> = {
  assurance: branchesDetails.filter((b) =>
    ["AGENTS", "COURTAGE", "ASSURANCE", "ASSISTANCE"].includes(b.code)
  ),
  "banque-finance": branchesDetails.filter((b) =>
    ["BANQUE", "BANQUE-POP", "CAISSE-EPARGNE", "CREDIT-MUTUEL", "MARCHES-FI", "SOC-FIN"].includes(b.code)
  ),
  conseil: branchesDetails.filter((b) => ["BE", "ECONOMISTES", "GEOMETRES"].includes(b.code)),
  "expertise-comptable": branchesDetails.filter((b) => ["EC"].includes(b.code)),
};

// ════════════════════════════════════════════════════════════════════════════
// MÉTIERS (inchangés — structure existante)
// ════════════════════════════════════════════════════════════════════════════

export const metiersTopTrimestre: Metier[] = [
  {
    slug: "technicien-maintenance-industrielle",
    libelle: "Technicien·ne maintenance industrielle",
    codeRome: "I1304",
    famille: { code: "F07", libelle: "Conception & Maintenance", icon: "cog" },
    branches: ["BE"],
    resume:
      "Intervient sur les équipements de production, diagnostique les pannes et planifie la maintenance préventive dans un environnement industriel automatisé.",
    tension: "tension",
    effectifs: 8420,
    salaireMedian: 36.2,
    indiceTension: 2.4,
    nbFormations: 12,
    nbCqp: 3,
    competences: [],
    majLe: "2026-04-12",
  },
  {
    slug: "data-analyst-branches",
    libelle: "Data analyst branches professionnelles",
    codeRome: "M1403",
    famille: { code: "F12", libelle: "Data & Analytics", icon: "bar-chart-3" },
    branches: ["ASSURANCE", "BANQUE"],
    resume:
      "Exploite les données d'emploi et de formation pour éclairer les politiques de branche et produire des tableaux de bord prospectifs.",
    tension: "emergent",
    effectifs: 1200,
    salaireMedian: 42.5,
    indiceTension: 1.3,
    nbFormations: 6,
    nbCqp: 3,
    competences: [],
    majLe: "2026-03-28",
  },
  {
    slug: "responsable-transition-ecologique",
    libelle: "Responsable transition écologique",
    codeRome: "H1302",
    famille: { code: "F18", libelle: "Qualité & RSE", icon: "leaf" },
    branches: ["ASSURANCE", "BE", "BANQUE"],
    resume:
      "Pilote les démarches bas-carbone, accompagne la certification RSE et coordonne l'évolution des compétences environnementales.",
    tension: "prospect",
    effectifs: 3200,
    salaireMedian: 48.0,
    indiceTension: 1.1,
    nbFormations: 8,
    nbCqp: 2,
    competences: [],
    majLe: "2026-04-02",
  },
  {
    slug: "charge-developpement-competences",
    libelle: "Chargé·e de développement des compétences",
    codeRome: "M1502",
    famille: { code: "F15", libelle: "Ressources humaines", icon: "users" },
    branches: ["ASSURANCE", "BANQUE", "COURTAGE"],
    resume:
      "Construit les plans de formation, anime le dialogue social sur les compétences et accompagne les mobilités internes.",
    tension: "stable",
    effectifs: 5600,
    salaireMedian: 44.0,
    indiceTension: 0.9,
    nbFormations: 8,
    nbCqp: 1,
    competences: [],
    majLe: "2026-03-20",
  },
  {
    slug: "technicien-energies-renouvelables",
    libelle: "Technicien·ne énergies renouvelables",
    codeRome: "F1605",
    famille: { code: "F08", libelle: "Énergie & réseaux", icon: "zap" },
    branches: ["BE"],
    resume:
      "Installe, raccorde et maintient les équipements photovoltaïques, éoliens et de stockage d'énergie en milieu industriel et tertiaire.",
    tension: "tension",
    effectifs: 1800,
    salaireMedian: 34.5,
    indiceTension: 2.1,
    nbFormations: 7,
    nbCqp: 2,
    competences: [],
    majLe: "2026-04-08",
  },
  {
    slug: "integrateur-ia-operationnelle",
    libelle: "Intégrateur·trice IA opérationnelle",
    codeRome: "M1805",
    famille: { code: "F21", libelle: "Numérique & IA", icon: "sparkles" },
    branches: ["BE", "BANQUE", "ASSURANCE"],
    resume:
      "Déploie et supervise les outils d'intelligence artificielle dans les process métier, forme les équipes et documente les usages responsables.",
    tension: "emergent",
    effectifs: 850,
    salaireMedian: 52.0,
    indiceTension: 1.8,
    nbFormations: 5,
    nbCqp: 2,
    competences: [],
    majLe: "2026-04-10",
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ÉTUDES — catalogue (existant) + détails (nouveau)
// ════════════════════════════════════════════════════════════════════════════

export const studiesRecentes: Study[] = [
  {
    id: "26-04",
    numero: "N°26.04",
    title: "Métiers de l'industrie et transition écologique — horizon 2035",
    abstract:
      "Cartographie des évolutions des compétences attendues dans les branches face aux enjeux de décarbonation, d'économie circulaire et d'adaptation climatique.",
    kind: "prospective",
    branche: "Transverse Atlas",
    tags: ["Transition écologique", "Compétences", "2035"],
    datePubli: "2026-04-08",
    coverVariant: "green",
    coverLetter: "P",
    formats: [
      { type: "pdf", label: "PDF", pages: 84 },
      { type: "excel", label: "Excel" },
    ],
  },
  {
    id: "25-11",
    numero: "N°25.11",
    title: "Reconversions professionnelles dans la branche : profils et trajectoires",
    abstract:
      "Analyse quantitative et qualitative des parcours de reconversion observés sur 2020-2025. Facteurs de réussite, freins et dispositifs mobilisés.",
    kind: "enquete",
    branche: "Assurance",
    idcc: "1672",
    tags: ["Reconversion", "Mobilité"],
    datePubli: "2025-11-14",
    coverVariant: "purple",
    coverLetter: "R",
    formats: [
      { type: "pdf", label: "PDF", pages: 52 },
      { type: "excel", label: "Données" },
    ],
  },
  {
    id: "26-t1",
    numero: "T1 2026",
    title: "Baromètre trimestriel de l'emploi et de la formation",
    abstract:
      "Chiffres-clés trimestriels : effectifs, tensions, contrats d'alternance, taux d'accès à la formation, évolution des salaires médians par métier.",
    kind: "barometre",
    branche: "Transverse Atlas",
    tags: ["Baromètre", "Emploi", "Formation"],
    datePubli: "2026-03-28",
    coverVariant: "olive",
    coverLetter: "B",
    formats: [
      { type: "pdf", label: "PDF", pages: 28 },
      { type: "excel", label: "Données T1" },
    ],
  },
];

/** Catalogue complet des études (pour la page /etudes avec filtres). */
export const allStudies: Study[] = [
  ...studiesRecentes,
  {
    id: "26-03",
    numero: "N°26.03",
    title: "Les compétences relationnelles dans la vente d'assurance en 2030",
    abstract:
      "Troisième volet de la série IMAGINE : recomposition du métier commercial face à la digitalisation et à la montée des attentes sociétales des clients.",
    kind: "enquete",
    branche: "Assurance",
    idcc: "1672",
    tags: ["Compétences", "Commercial"],
    datePubli: "2026-03-10",
    coverVariant: "purple",
    coverLetter: "E",
    formats: [{ type: "pdf", label: "PDF", pages: 62 }, { type: "excel", label: "Excel" }],
  },
  {
    id: "26-02",
    numero: "N°26.02",
    title: "IA générative et métiers de service — 26 compétences clés en 2030",
    abstract:
      "Étude conjointe avec Colombus Consulting sur l'impact de l'IA générative dans les branches financières et de conseil.",
    kind: "prospective",
    branche: "Transverse Atlas",
    tags: ["IA", "Compétences"],
    datePubli: "2026-02-22",
    coverVariant: "deep",
    coverLetter: "I",
    formats: [{ type: "pdf", label: "PDF", pages: 104 }, { type: "excel", label: "Excel" }],
  },
  {
    id: "25-10",
    numero: "N°25.10",
    title: "Diagnostic handicap : état des lieux dans la branche assurance",
    abstract:
      "Diagnostic branche cofinancé avec l'Agefiph sur l'emploi des personnes en situation de handicap. Plan d'action et recommandations.",
    kind: "enquete",
    branche: "Assurance",
    idcc: "1672",
    tags: ["Handicap", "Diversité"],
    datePubli: "2025-10-18",
    coverVariant: "green",
    coverLetter: "D",
    formats: [{ type: "pdf", label: "PDF", pages: 48 }, { type: "synthese", label: "Synthèse" }],
  },
  {
    id: "25-09",
    numero: "N°25.09",
    title: "Cybersécurité dans les services financiers : compétences 2025-2028",
    abstract:
      "Cadrage Atlas adossé à l'étude OPIIEC. Quatre familles métiers identifiées : détection, audit, pilotage, conception.",
    kind: "prospective",
    branche: "Transverse Atlas",
    tags: ["Cybersécurité", "IA"],
    datePubli: "2025-09-05",
    coverVariant: "purple",
    coverLetter: "C",
    formats: [{ type: "pdf", label: "PDF", pages: 72 }, { type: "excel", label: "Excel" }],
  },
  {
    id: "25-07",
    numero: "N°25.07",
    title: "Les compétences clés des actuaires en 2030",
    abstract:
      "Évolution du métier d'actuaire avec la montée en puissance des data sciences, du climate risk et de l'actuariat non-vie personnalisé.",
    kind: "enquete",
    branche: "Assurance",
    idcc: "1672",
    tags: ["Compétences", "Data"],
    datePubli: "2025-07-12",
    coverVariant: "olive",
    coverLetter: "A",
    formats: [{ type: "pdf", label: "PDF", pages: 68 }, { type: "excel", label: "Excel" }],
  },
  {
    id: "25-05",
    numero: "N°25.05",
    title: "Les jeunes diplômés et l'assurance : baromètre d'attractivité 2025",
    abstract:
      "Enquête auprès de 2 400 étudiants sur la perception du secteur de l'assurance comme employeur. Freins, leviers, recommandations branche.",
    kind: "enquete",
    branche: "Assurance",
    idcc: "1672",
    tags: ["Attractivité", "Démographie"],
    datePubli: "2025-05-20",
    coverVariant: "deep",
    coverLetter: "J",
    formats: [{ type: "pdf", label: "PDF", pages: 40 }, { type: "excel", label: "Excel" }],
  },
  {
    id: "25-03",
    numero: "N°25.03",
    title: "Manager de proximité en assurance : transformation du rôle à horizon 2028",
    abstract:
      "Évolution du management intermédiaire face au travail hybride, à l'automatisation et aux enjeux RSE.",
    kind: "prospective",
    branche: "Assurance",
    idcc: "1672",
    tags: ["Management", "RSE"],
    datePubli: "2025-03-14",
    coverVariant: "green",
    coverLetter: "M",
    formats: [{ type: "pdf", label: "PDF", pages: 58 }, { type: "synthese", label: "Synthèse" }],
  },
  {
    id: "25-02",
    numero: "N°25.02",
    title: "Cartographie des métiers des bureaux d'études",
    abstract:
      "Cartographie interbranche des bureaux d'études, ingénierie, conseil, numérique et événementiel.",
    kind: "cartographie",
    branche: "Bureaux d'études",
    idcc: "1486",
    tags: ["Cartographie"],
    datePubli: "2025-02-08",
    coverVariant: "purple",
    coverLetter: "C",
    formats: [{ type: "pdf", label: "PDF", pages: 96 }, { type: "excel", label: "Excel" }, { type: "csv", label: "CSV" }],
  },
];

/** Détail éditorial complet pour les 3 études vedettes (pour /etudes/[id]). */
export const studyDetailsById: Record<string, StudyDetail> = {
  "26-04": {
    ...studiesRecentes[0],
    chapo:
      "À horizon 2035, la transition écologique ne sera plus un compartiment de la RH : elle irriguera chaque métier. Cette étude prospective trace les trajectoires probables des 84 métiers Atlas à cet horizon, secteur par secteur.",
    contexte: [
      "Le Plan de Programmation de l'Emploi et des Compétences (PPEC) national, publié en 2023, fixait un cap : +150 000 emplois verts d'ici 2030 dans les branches accompagnées par les OPCO.",
      "Deux ans plus tard, le rythme réel observé dans nos branches est 38 % en-deçà de l'objectif — malgré une progression nette de +14 % en 2024-2025.",
      "Cette étude cherche à comprendre où sont les freins et quelles compétences, exactement, manqueront en 2030 et 2035 pour tenir la trajectoire bas-carbone.",
    ],
    methodologie: [
      {
        title: "Analyse documentaire (mars-juin 2025)",
        body:
          "Revue de 142 sources : rapports ADEME, études France Stratégie, publications sectorielles OEMA / OPIIEC / Observatoire banque, littérature académique (CEREQ, DARES).",
      },
      {
        title: "Entretiens qualitatifs (juin-octobre 2025)",
        body:
          "34 entretiens semi-directifs avec : DRH de grands groupes (12), responsables formation branches (8), prospectivistes ADEME/France Stratégie (4), partenaires sociaux (6), experts métier (4).",
      },
      {
        title: "Enquête quantitative (novembre 2025)",
        body:
          "Panel de 1 820 salariés interrogés par questionnaire en ligne, représentatif par secteur, âge, genre, région. Marge d'erreur ±2,3 %.",
      },
      {
        title: "Atelier de mise en forme prospective (janvier 2026)",
        body:
          "Deux journées de travail collectif avec 18 experts métier pour construire les trois scénarios prospectifs à horizon 2035 présentés dans l'étude.",
      },
    ],
    resultatsCles: [
      { label: "Métiers impactés par 2035", value: "84/84", desc: "Tous les métiers Atlas voient au moins une compétence reconfigurée" },
      { label: "Nouvelles compétences à injecter", value: "42", desc: "Dont 17 dites 'critiques' pour tenir l'objectif bas-carbone" },
      { label: "Formation continue requise", value: "+28 %", desc: "Heures de formation à prévoir par salarié entre 2026 et 2035" },
    ],
    recommandations: [
      "Créer un référentiel compétences bas-carbone commun aux 14 branches Atlas (2026-2027).",
      "Négocier un accord cadre interbranche sur la montée en compétences écologique, avec cofinancement OPCO renforcé.",
      "Lancer 3 CQP prioritaires : « Chargé bilan carbone PME », « Éco-conception industrielle », « Conseil patrimonial climat ».",
      "Mutualiser un fonds formation bas-carbone entre branches pour les TPE/PME (modèle inspiré de l'AGEFIPH pour le handicap).",
      "Intégrer des critères ESG dans la certification qualité Qualiopi des organismes de formation branches.",
    ],
    sources: [
      "ADEME — Plan de Programmation de l'Emploi et des Compétences (2023)",
      "France Stratégie — Rapport « Emplois et compétences de la transition écologique » (2024)",
      "CEREQ — Enquête Génération 2022 (parue 2025)",
      "OPCO Atlas — Données DSN consolidées 2022-2024",
      "OIT — Global Green Jobs Report (2024)",
    ],
    auteurs: ["Équipe Prospective Atlas", "En collaboration avec France Stratégie"],
    nbPages: 84,
    keywords: ["transition écologique", "compétences vertes", "emplois", "prospective 2035", "bas-carbone"],
  },
  "25-11": {
    ...allStudies.find((s) => s.id === "25-11")!,
    chapo:
      "2 845 parcours de reconversion analysés sur cinq ans dans la branche assurance. Qui se reconvertit ? Pour quels métiers ? Avec quels dispositifs ? Et qu'est-ce qui marche vraiment ?",
    contexte: [
      "La reconversion professionnelle est devenue un sujet central post-pandémie : les salariés aspirent à plus de sens, les branches font face à des tensions sur certains métiers.",
      "La branche assurance, historiquement stable, observe depuis 2020 une augmentation de 32 % des demandes de reconversion interne ou externe.",
      "Cette étude croise les données DSN, les bilans CEP et 68 entretiens biographiques pour dresser le premier panorama consolidé.",
    ],
    methodologie: [
      {
        title: "Analyse de cohorte DSN (2020-2025)",
        body:
          "Suivi longitudinal de 14 200 salariés ayant quitté la branche assurance entre 2020 et 2022, avec trajectoire à 3 ans.",
      },
      {
        title: "Entretiens biographiques (2024-2025)",
        body:
          "68 entretiens semi-directifs de 90 min chacun, transcrits et codés selon la grille d'analyse qualitative Atlas.",
      },
      {
        title: "Enquête auprès des employeurs (2025)",
        body:
          "412 DRH et responsables recrutement interrogés sur leur perception des candidats en reconversion.",
      },
    ],
    resultatsCles: [
      { label: "Reconversions internes réussies", value: "72 %", desc: "Maintien dans le même métier cible 3 ans après" },
      { label: "Reconversions externes réussies", value: "54 %", desc: "Plus faible hors branche, freins cités : culture d'entreprise" },
      { label: "Profil type", value: "38 ans", desc: "Femme, cadre, en poste depuis 10+ ans, déclencheur : perte de sens" },
    ],
    recommandations: [
      "Créer un dispositif « Passerelle Atlas » pour faciliter les reconversions interbranches (assurance ↔ banque ↔ conseil).",
      "Développer le CEP interne dans les entreprises de plus de 500 salariés.",
      "Reconnaître la VAE comme voie principale pour les métiers émergents (IA, RSE, data).",
      "Renforcer l'accompagnement psychosocial des transitions longues (>6 mois).",
    ],
    sources: [
      "OPCO Atlas — Données DSN consolidées 2020-2025",
      "France Compétences — Panorama CEP 2024",
      "ANACT — Étude sur les transitions professionnelles (2023)",
    ],
    auteurs: ["Équipe Prospective Atlas"],
    nbPages: 52,
    keywords: ["reconversion", "mobilité", "assurance", "parcours", "CEP"],
  },
  "26-t1": {
    ...studiesRecentes[2],
    chapo:
      "Les indicateurs trimestriels consolidés sur les 14 branches Atlas : effectifs, tensions, alternance, accès à la formation, évolution des salaires médians. Un panorama en un coup d'œil.",
    contexte: [
      "Le baromètre est publié chaque trimestre depuis 2022. Il consolide les données DSN, France Travail et les enquêtes rapides de branche.",
      "Ce numéro T1 2026 intègre pour la première fois les données des 14 branches complètes (avant : 11).",
    ],
    methodologie: [
      {
        title: "Consolidation DSN trimestrielle",
        body:
          "Traitement statistique standard : effectifs salariés au 31 mars, évolution YoY et sur 3 ans glissants.",
      },
      {
        title: "Indices de tension France Travail",
        body:
          "Ratio offres d'emploi / candidatures sur les 6 derniers mois, par métier ROME rattaché aux branches Atlas.",
      },
      {
        title: "Enquête rapide entreprises (flash Atlas)",
        body:
          "Panel de 2 100 entreprises interrogées chaque trimestre sur leurs intentions de recrutement à 6 mois.",
      },
    ],
    resultatsCles: [
      { label: "Effectifs périmètre Atlas T1 2026", value: "1,95 M", desc: "+1,1 % vs T1 2025" },
      { label: "Métiers en tension forte (≥2×)", value: "24", desc: "+5 nouveaux depuis T4 2025" },
      { label: "Alternants en intégration", value: "4 820", desc: "+8,7 % sur 12 mois glissants" },
    ],
    recommandations: [
      "Communication mensuelle vers les employeurs sur les métiers en tension critique.",
      "Ouverture de 3 nouveaux CQP en T2 2026 pour répondre aux tensions IA/cyber/climat.",
    ],
    sources: ["DSN consolidée", "France Travail", "Enquête flash Atlas T1 2026"],
    auteurs: ["Équipe Prospective Atlas"],
    nbPages: 28,
    keywords: ["baromètre", "emploi", "formation", "tension", "T1 2026"],
  },
};

// ════════════════════════════════════════════════════════════════════════════
// ÉVÉNEMENTS (4 — passés, à venir, replay)
// ════════════════════════════════════════════════════════════════════════════

export const evenements: Evenement[] = [
  {
    id: "matinale-rse-handicap-avril-2026",
    slug: "matinale-rse-handicap-avril-2026",
    titre: "RSE : comment passer du diagnostic à l'action ?",
    supertag: "Matinale Prospective Atlas",
    resume:
      "Inclusion, diversité, compétences. Focus branches banque commerciale et courtage d'assurances. Diagnostic handicap, QVCT, référentiels EDI.",
    date: "2026-04-24T10:30:00+02:00",
    dureeMin: 90,
    format: "webinaire",
    statut: "inscriptions-ouvertes",
    branches: ["BANQUE", "COURTAGE"],
    animateur: { nom: "Animateur presse spécialisé", role: "Journaliste emploi-formation" },
    programme: [
      { heure: "10:30", label: "Ouverture", titre: "Lancement de la Matinale et présentation des 4 séquences", intervenants: "Direction Prospective Atlas" },
      { heure: "10:33", label: "Séquence 01", titre: "Une stratégie RSE, des pistes d'action", intervenants: "Partenaires sociaux branche courtage, Direction Atlas" },
      { heure: "10:55", label: "Séquence 02", titre: "Handicap : quels leviers dans nos branches ?", intervenants: "Référents Atlas, Agefiph" },
      { heure: "11:15", label: "Séquence 03", titre: "L'impact de la RSE sur les compétences bancaires", intervenants: "Observatoire des métiers de la banque, cabinet partenaire" },
      { heure: "11:35", label: "Séquence 04", titre: "Diversité et inclusion — référentiels EDI", intervenants: "Direction Atlas, AFMD" },
      { heure: "11:58", label: "Conclusion", titre: "Ressources et prochaine Matinale (3 juillet 2026)" },
    ],
    coverVariant: "green",
    coverLetter: "R",
  },
  {
    id: "matinale-ia-juillet-2026",
    slug: "matinale-ia-juillet-2026",
    titre: "IA générative dans les métiers de service : où en sommes-nous ?",
    supertag: "Matinale Prospective Atlas",
    resume:
      "Un an après nos premières études IA, bilan d'étape sur le déploiement réel dans les entreprises et nouveaux enjeux compétences.",
    date: "2026-07-03T10:30:00+02:00",
    dureeMin: 90,
    format: "webinaire",
    statut: "a-venir",
    branches: ["BANQUE", "ASSURANCE", "BE", "EC"],
    animateur: { nom: "Animateur presse spécialisé", role: "Journaliste emploi-formation" },
    programme: [
      { heure: "10:30", label: "Ouverture", titre: "Bilan d'étape à un an" },
      { heure: "10:45", label: "Séquence 01", titre: "Observations terrain : cas d'usage concrets" },
      { heure: "11:05", label: "Séquence 02", titre: "Impact sur les référentiels métiers" },
      { heure: "11:25", label: "Séquence 03", titre: "Dialogue social et IA : positions branches" },
      { heure: "11:50", label: "Conclusion", titre: "Prochaines études et ressources Atlas" },
    ],
    coverVariant: "purple",
    coverLetter: "I",
  },
  {
    id: "colloque-prospective-2026",
    slug: "colloque-prospective-2026",
    titre: "Colloque annuel Prospective Atlas — Horizon 2035",
    supertag: "Grand rendez-vous",
    resume:
      "Une journée complète pour explorer les transformations à horizon 2035 : 6 tables-rondes, 18 intervenants, restitution des études phares 2026.",
    date: "2026-10-15T09:00:00+02:00",
    dureeMin: 480,
    format: "hybride",
    lieu: "Maison de la Chimie, Paris 7e",
    statut: "a-venir",
    branches: ["AGENTS", "COURTAGE", "ASSURANCE", "ASSISTANCE", "BANQUE", "BE", "EC"],
    animateur: { nom: "Duo presse institutionnelle", role: "Co-animation" },
    programme: [
      { heure: "09:00", label: "Accueil café", titre: "Accueil des participants" },
      { heure: "09:30", label: "Plénière 1", titre: "Prospective 2035 : 3 scénarios pour les branches Atlas" },
      { heure: "11:00", label: "Table ronde 1", titre: "Transition écologique : le grand chantier compétences" },
      { heure: "12:30", label: "Déjeuner", titre: "Networking avec les partenaires sociaux" },
      { heure: "14:00", label: "Ateliers", titre: "6 ateliers parallèles par branche (au choix)" },
      { heure: "16:00", label: "Plénière 2", titre: "Regards croisés partenaires sociaux" },
      { heure: "17:30", label: "Conclusion", titre: "Annonces Atlas 2027" },
    ],
    coverVariant: "deep",
    coverLetter: "C",
  },
  {
    id: "matinale-cyber-janvier-2026",
    slug: "matinale-cyber-janvier-2026",
    titre: "Cybersécurité dans les services financiers : état des lieux",
    supertag: "Matinale Prospective Atlas",
    resume:
      "Replay de notre Matinale de janvier 2026 sur les 4 familles métiers cyber identifiées par l'OPIIEC et leur impact branches financières.",
    date: "2026-01-30T10:30:00+01:00",
    dureeMin: 90,
    format: "replay",
    statut: "replay-disponible",
    branches: ["BANQUE", "ASSURANCE", "MARCHES-FI", "BE"],
    replayUrl: "#replay-cyber",
    programme: [
      { heure: "10:30", label: "Ouverture", titre: "Cadrage : 4 familles métiers cyber" },
      { heure: "10:45", label: "Séquence 01", titre: "Détection : SOC analystes, threat intelligence" },
      { heure: "11:05", label: "Séquence 02", titre: "Audit et conformité : DORA et NIS2" },
      { heure: "11:25", label: "Séquence 03", titre: "Pilotage : CISO et gouvernance cyber" },
      { heure: "11:45", label: "Séquence 04", titre: "Conception : architectes sécurité" },
      { heure: "11:55", label: "Conclusion", titre: "Ressources et prochaine Matinale" },
    ],
    coverVariant: "olive",
    coverLetter: "C",
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ACTUALITÉS (8 — pour le carrousel home)
// ════════════════════════════════════════════════════════════════════════════

export const actualites: Actualite[] = [
  {
    id: "act-1",
    titre: "L'OEMA publie sa 20ᵉ édition du ROMA : carte des métiers de l'assurance",
    chapo: "Le Référentiel des métiers de l'assurance fête ses 20 ans. Une édition 2026 totalement repensée, intégrant 14 nouveaux métiers liés à la data, la cybersécurité et la RSE.",
    source: { nom: "OEMA", url: "https://www.metiers-assurance.org" },
    categorie: "publication",
    datePubli: "2026-04-14",
    branche: "ASSURANCE",
    coverVariant: "green",
    url: "#act-1",
    duree: "4 min",
  },
  {
    id: "act-2",
    titre: "IA agentique : premier signal faible d'accélération dans les bureaux d'études",
    chapo: "La compétence « IA agentique » passe de 3 % à 9 % des offres d'emploi en un an dans les branches OPIIEC. Seuil de décollage franchi.",
    source: { nom: "Signaux faibles Atlas T1 2026" },
    categorie: "signal-faible",
    datePubli: "2026-04-10",
    branche: "BE",
    coverVariant: "purple",
    url: "#act-2",
    duree: "2 min",
  },
  {
    id: "act-3",
    titre: "Matinale du 24 avril : RSE, du diagnostic à l'action",
    chapo: "Inscriptions ouvertes pour la prochaine Matinale Prospective Atlas — focus branches banque commerciale et courtage.",
    source: { nom: "Agenda Atlas" },
    categorie: "agenda",
    datePubli: "2026-04-08",
    coverVariant: "deep",
    url: "/evenements/matinale-rse-handicap-avril-2026",
    duree: "1 min",
  },
  {
    id: "act-4",
    titre: "+8,7 % d'alternants intégrés en 12 mois dans le périmètre Atlas",
    chapo: "Le baromètre trimestriel T1 2026 confirme la dynamique alternance. Particulièrement marquée dans les bureaux d'études (+19 %) et la banque (+12 %).",
    source: { nom: "Baromètre Atlas T1 2026" },
    categorie: "chiffres",
    datePubli: "2026-03-28",
    coverVariant: "olive",
    url: "/etudes/26-t1",
    duree: "3 min",
  },
  {
    id: "act-5",
    titre: "Accord cadre national sur la transition écologique des compétences",
    chapo: "Les partenaires sociaux de la branche bureaux d'études signent le premier accord interentreprises sur les compétences bas-carbone.",
    source: { nom: "OPIIEC", url: "https://www.opiiec.fr" },
    categorie: "decision",
    datePubli: "2026-03-15",
    branche: "BE",
    coverVariant: "green",
    url: "#act-5",
    duree: "3 min",
  },
  {
    id: "act-6",
    titre: "Reconversions vers les métiers cyber : doublement en assurance",
    chapo: "280 parcours de reconversion vers les métiers cyber en 2025 dans l'assurance, contre 140 en 2024. Une dynamique portée par les dispositifs Atlas et l'Agefiph.",
    source: { nom: "Signaux faibles Atlas T1 2026" },
    categorie: "signal-faible",
    datePubli: "2026-03-12",
    branche: "ASSURANCE",
    coverVariant: "blue",
    url: "#act-6",
    duree: "4 min",
  },
  {
    id: "act-7",
    titre: "Étude OPIIEC 2026 : chiffres et tendances des métiers du numérique",
    chapo: "Photographie actualisée des effectifs, recrutements, métiers en tension et besoins de formation pour les quatre secteurs couverts par l'OPIIEC.",
    source: { nom: "OPIIEC" },
    categorie: "publication",
    datePubli: "2026-03-02",
    branche: "BE",
    coverVariant: "purple",
    url: "#act-7",
    duree: "5 min",
  },
  {
    id: "act-8",
    titre: "Facturation électronique : impact métiers experts-comptables",
    chapo: "L'obligation progressive de facturation électronique redessine les métiers de la tenue comptable. Une étude Atlas/CNOEC est lancée.",
    source: { nom: "Atlas × CNOEC" },
    categorie: "publication",
    datePubli: "2026-02-20",
    branche: "EC",
    coverVariant: "deep",
    url: "#act-8",
    duree: "3 min",
  },
];

// ════════════════════════════════════════════════════════════════════════════
// HERO STATS (inchangés)
// ════════════════════════════════════════════════════════════════════════════

export const heroStats = [
  { label: "Branches couvertes", value: "14" },
  { label: "Salariés dans le périmètre", value: "1,95 M" },
  { label: "Fiches métiers vivantes", value: "84" },
  { label: "Études publiées", value: "36" },
];
