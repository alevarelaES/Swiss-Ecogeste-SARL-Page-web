/**
 * Met à jour le document aProposPage dans Sanity
 * avec le contenu correct depuis public/locales/
 *
 * Usage : cd studio && npx sanity exec scripts/seed-apropos.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

function loc(fr: string, en: string, de: string) {
  return { fr, en, de }
}

function locArr(fr: string[], en: string[], de: string[]) {
  return { fr, en, de }
}

async function main() {
  console.log('Mise à jour aProposPage...')

  await client.createOrReplace({
    _id: 'aProposPage',
    _type: 'aProposPage',

    heroLabel: loc('À propos de nous', 'About us', 'Über uns'),

    heroTitle: loc(
      'Une approche concrète de la transition énergétique',
      'A concrete approach to energy transition',
      'Ein konkreter Ansatz zur Energiewende'
    ),

    heroIntro: loc(
      "Chez Swiss Ecogestes, nous sommes convaincus que la transition énergétique passe par des actions concrètes, mesurables et rentables. Nous accompagnons propriétaires, régies, entreprises et collectivités avec une approche pragmatique : réduire les consommations, optimiser les installations et générer un impact réel.",
      "At Swiss Ecogestes, we believe energy transition happens through concrete, measurable and profitable actions. We support property owners, agencies, businesses and municipalities with a pragmatic approach: reducing consumption, optimising installations and generating real impact.",
      "Bei Swiss Ecogestes sind wir überzeugt, dass die Energiewende durch konkrete, messbare und rentable Maßnahmen gelingt. Wir begleiten Eigentümer, Verwaltungen, Unternehmen und Gemeinden mit einem pragmatischen Ansatz: Verbrauch senken, Anlagen optimieren und echte Wirkung erzielen."
    ),

    missionTitle: loc(
      'Votre intérêt, notre seule priorité.',
      'Your interest, our only priority.',
      'Ihr Interesse, unsere einzige Priorität.'
    ),

    missionText: loc(
      "Pas de matériel à vendre, pas de marges cachées. Swiss Ecogestes est un conseil indépendant : nous analysons votre situation, identifions les économies réalisables et maximisons vos subventions — sans conflit d'intérêt.",
      "No equipment to sell, no hidden margins. Swiss Ecogestes is an independent advisory firm: we analyse your situation, identify achievable savings and maximise your subsidies — with no conflict of interest.",
      "Kein Material zu verkaufen, keine versteckten Margen. Swiss Ecogestes ist eine unabhängige Beratungsfirma: Wir analysieren Ihre Situation, identifizieren erreichbare Einsparungen und maximieren Ihre Fördergelder — ohne Interessenkonflikt."
    ),

    missionText2: loc(
      "Notre approche combine expertise terrain, maîtrise des programmes cantonaux (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) et accompagnement humain à chaque étape de votre projet.",
      "Our approach combines field expertise, mastery of cantonal programmes (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) and personal support at every stage of your project.",
      "Unser Ansatz kombiniert Felderfahrung, Kenntnisse kantonaler Programme (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) und persönliche Begleitung in jeder Phase Ihres Projekts."
    ),

    presenceTitle: loc(
      'Actifs en Vaud et à Genève',
      'Active in Vaud and Geneva',
      'Tätig in Waadt und Genf'
    ),

    presenceText: loc(
      "Nous intervenons principalement dans les cantons de Vaud et de Genève, avec une connaissance approfondie des exigences locales, des programmes de subvention cantonaux et des acteurs institutionnels.",
      "We operate primarily in the cantons of Vaud and Geneva, with in-depth knowledge of local requirements, cantonal subsidy programmes and institutional stakeholders.",
      "Wir sind hauptsächlich in den Kantonen Waadt und Genf tätig, mit fundiertem Wissen über lokale Anforderungen, kantonale Förderprogramme und institutionelle Akteure."
    ),

    companyStats: [
      { _key: 'stat-1', value: '5',    label: loc('Experts dédiés',             'Dedicated experts',        'Dedizierte Experten') },
      { _key: 'stat-2', value: '2',    label: loc('Cantons couverts',            'Cantons covered',          'Abgedeckte Kantone') },
      { _key: 'stat-3', value: '6',    label: loc('Partenaires institutionnels', 'Institutional partners',   'Institutionelle Partner') },
      { _key: 'stat-4', value: '100%', label: loc('Neutre & indépendant',        'Neutral & independent',    'Neutral & unabhängig') },
    ],

    qualityTitle: loc(
      'Un processus rigoureux, du début à la fin',
      'A rigorous process, from start to finish',
      'Ein rigoroser Prozess von Anfang bis Ende'
    ),

    qualityText: loc(
      "Chaque audit suit un processus qualité rigoureux, de la première visite jusqu'à la remise du rapport et des recommandations personnalisées.",
      "Every audit follows a rigorous quality process, from the first visit to the delivery of the report and personalised recommendations.",
      "Jede Prüfung folgt einem strengen Qualitätsprozess, vom ersten Besuch bis zur Übergabe des Berichts und der personalisierten Empfehlungen."
    ),

    qualitySteps: locArr(
      ['Visite terrain', 'Analyse technique', 'Rapport détaillé', 'Recommandations', 'Suivi personnalisé'],
      ['Site visit', 'Technical analysis', 'Detailed report', 'Recommendations', 'Personalised follow-up'],
      ['Vor-Ort-Besuch', 'Technische Analyse', 'Detaillierter Bericht', 'Empfehlungen', 'Persönliches Follow-up']
    ),

    photoTitle: loc(
      'Des experts engagés sur le terrain',
      'Committed experts in the field',
      'Engagierte Experten vor Ort'
    ),

    photoSubtitle: loc(
      'Ensemble, nous accompagnons chaque client vers des solutions concrètes et durables.',
      'Together, we guide every client towards concrete and sustainable solutions.',
      'Gemeinsam begleiten wir jeden Kunden zu konkreten und nachhaltigen Lösungen.'
    ),
  })

  console.log('✅ aProposPage mis à jour avec le contenu correct !')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
