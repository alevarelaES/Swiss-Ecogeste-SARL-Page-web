// Liens demandés par le client (PDF « Texte_Site ») pour les prestations des pages services.
// Ils s'affichent par défaut ; un lien saisi dans Sanity (champ « Lien vers le programme ») les remplace.
// Utilisé aussi par scripts/apply-client-pdf.ts pour les recopier dans Sanity.

export const LINKS = {
  ecologement:
    'https://www.vd.ch/environnement/energie/subventions-des-energies-renouvelables-et-des-economies-denergie-pour-proprietaires-communes-et-entreprises/subvention-eco-logement',
  chauffezRenouvelable: 'https://www.suisseenergie.ch/renover/conseil-incitatif-chauffezrenouvelable/',
  idc: 'https://www.ge.ch/connaitre-consommation-energie-batiment-idc',
  // Lien confirmé par le client (octobre 2026) : même page SIG que l'AMO
  amu: 'https://ww2.sig-ge.ch/immobilier/optimisation-energetique-et-environnementale/eco21-immobilier/renovation-batiments',
  amo: 'https://ww2.sig-ge.ch/immobilier/optimisation-energetique-et-environnementale/eco21-immobilier/renovation-batiments',
  visiteConseil:
    'https://ww2.sig-ge.ch/entreprises/optimisation-energetique-et-environnementale/eco21-entreprises/accompagnement-SIG-eco21',
  visiteExpertise:
    'https://ww2.sig-ge.ch/artisans_independants/optimisation-energetique-et-environnementale/eco21-professionnels/visite_expertise',
  peik: 'https://www.suisseenergie.ch/entreprises/se-faire-conseiller/peik/',
  // GED : page SIG éco21 « optimisation des installations » (bouton de la carte, demandé par le client)
  sigOptimisationInstallations:
    'https://ww2.sig-ge.ch/immobilier/optimisation-energetique-et-environnementale/eco21-immobilier/optimisation-installations',
  cecb: 'https://www.cecb.ch',
  visiteVilla:
    'https://ww2.sig-ge.ch/particuliers/demarches-et-factures/solutions-proprietaires-villas/diagnostic-energetique-environnemental',
}

export type ServiceLinkRule = {
  match: RegExp
  link?: string
  featureLinks?: string[]
  /** Lien d'un point clé précis, retrouvé par son texte français */
  featureLink?: { match: RegExp; href: string }
}

export const SERVICE_LINK_RULES: Record<string, ServiceLinkRule[]> = {
  gerance: [
    // Lien en bas de la carte comme les autres (et non plus sur le point « Audit éclairage ») ;
    // featureLinks vide efface l'ancien lien enregistré dans Sanity
    { match: /\bGED\b/, link: LINKS.sigOptimisationInstallations, featureLinks: [] },
    { match: /écologement/i, link: LINKS.ecologement },
    { match: /audit chauffage/i, link: LINKS.chauffezRenouvelable },
    { match: /calcul idc/i, link: LINKS.idc },
    { match: /\bAMU\b/, link: LINKS.amu },
    { match: /\bAMO\b|maîtrise d.ouvrage/i, link: LINKS.amo },
  ],
  entreprise: [
    { match: /visite conseil/i, link: LINKS.visiteConseil },
    { match: /visite expertise/i, link: LINKS.visiteExpertise },
    { match: /PEIK/, link: LINKS.peik },
    { match: /audit chauffage/i, link: LINKS.chauffezRenouvelable },
    { match: /calcul idc/i, link: LINKS.idc },
  ],
  villa: [
    { match: /visite villa/i, link: LINKS.visiteVilla },
    { match: /CECB/, link: LINKS.cecb },
    { match: /audit chauffage/i, link: LINKS.chauffezRenouvelable },
    { match: /calcul idc/i, link: LINKS.idc },
    { match: /\bAMO\b|maîtrise d.ouvrage/i, link: LINKS.amo },
  ],
  communes: [
    {
      // Bâtiments communaux, Immeubles et régies, Villas et maisons, Entreprises locales
      match: /mesures concr[èe]tes/i,
      featureLinks: ['/services/gerance', '/services/gerance', '/services/villa', '/services/entreprise'],
    },
  ],
}

/**
 * Liens par défaut d'un service, retrouvé par son titre et ses points clés en français.
 */
export function defaultServiceLinks(
    pageSlug: string,
    titleFr: string | undefined,
    featuresFr: string[] | undefined
): { link?: string; featureLinks?: string[] } {
    const rule = (SERVICE_LINK_RULES[pageSlug] || []).find((r) => titleFr && r.match.test(titleFr));
    if (!rule) return {};
    let featureLinks = rule.featureLinks;
    if (rule.featureLink && featuresFr) {
        const index = featuresFr.findIndex((f) => rule.featureLink!.match.test(f));
        if (index >= 0) featureLinks = featuresFr.map((_, i) => (i === index ? rule.featureLink!.href : ''));
    }
    return { link: rule.link, featureLinks };
}
