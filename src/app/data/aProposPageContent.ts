export interface AProposValeurItem {
    title: string;
    description: string;
}

export interface AProposCompanyStat {
    value: string;
    label: string;
}

export interface AProposPageContent {
    seo: { title: string; description: string };
    heroLabel: string;
    heroTitle: string;
    heroIntro: string;
    missionLabel: string;
    missionTitle: string;
    missionText: string;
    missionText2: string;
    presenceLabel: string;
    presenceTitle: string;
    presenceText: string;
    companyStats: AProposCompanyStat[];
    qualityLabel: string;
    qualityTitle: string;
    qualityText: string;
    qualitySteps: string[];
    groupPhotoUrl: string;
    photoLabel: string;
    photoTitle: string;
    photoSubtitle: string;
    teamTitle: string;
    teamSubtitle: string;
    valeursTitle: string;
    valeursIntro: string;
    valeursItems: AProposValeurItem[];
}

const GROUP_PHOTO_PLACEHOLDER = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop';

const aProposPageContentFr: AProposPageContent = {
    seo: {
        title: 'À propos de Swiss Ecogestes | Notre équipe & mission',
        description: "Découvrez Swiss Ecogestes : notre mission, notre équipe d'experts et notre engagement pour la transition énergétique en Suisse romande.",
    },
    heroLabel: 'À propos de nous',
    heroTitle: 'Une approche concrète de la transition énergétique',
    heroIntro: "Chez Swiss Ecogestes, nous sommes convaincus que la transition énergétique passe par des actions concrètes, mesurables et rentables. Nous accompagnons propriétaires, régies, entreprises et collectivités avec une approche pragmatique : réduire les consommations, optimiser les installations et générer un impact réel.",
    missionLabel: 'Notre mission',
    missionTitle: 'Votre intérêt, notre seule priorité.',
    missionText: "Pas de matériel à vendre, pas de marges cachées. Swiss Ecogestes est un conseil indépendant : nous analysons votre situation, identifions les économies réalisables et maximisons vos subventions — sans conflit d'intérêt.",
    missionText2: "Notre approche combine expertise terrain, maîtrise des programmes cantonaux (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) et accompagnement humain à chaque étape de votre projet.",
    presenceLabel: 'Notre présence',
    presenceTitle: 'Actifs en Vaud et à Genève',
    presenceText: "Nous intervenons principalement dans les cantons de Vaud et de Genève, avec une connaissance approfondie des exigences locales, des programmes de subvention cantonaux et des acteurs institutionnels.",
    companyStats: [
        { value: '5',    label: 'Experts dédiés' },
        { value: '2',    label: 'Cantons couverts' },
        { value: '6',    label: 'Partenaires institutionnels' },
        { value: '100%', label: 'Neutre & indépendant' },
    ],
    qualityLabel: 'Processus qualité',
    qualityTitle: 'Un processus rigoureux, du début à la fin',
    qualityText: "Chaque audit suit un processus qualité rigoureux, de la première visite jusqu'à la remise du rapport et des recommandations personnalisées.",
    qualitySteps: ['Visite terrain', 'Analyse technique', 'Rapport détaillé', 'Recommandations', 'Suivi personnalisé'],
    groupPhotoUrl: GROUP_PHOTO_PLACEHOLDER,
    photoLabel: 'Notre équipe',
    photoTitle: 'Des experts engagés sur le terrain',
    photoSubtitle: 'Ensemble, nous accompagnons chaque client vers des solutions concrètes et durables.',
    teamTitle: 'Notre Équipe',
    teamSubtitle: 'Cinq experts passionnés par la transition énergétique, à votre service en Suisse romande.',
    valeursTitle: 'Nos Engagements & Valeurs',
    valeursIntro: "Au-delà de l'expertise technique, nous apportons une sécurité et une tranquillité d'esprit à tous nos partenaires.",
    valeursItems: [
        { title: 'Partenaire de confiance',  description: "Nous collaborons étroitement avec la DIREN (Direction de l'énergie), les SIG et les programmes cantonaux pour garantir la conformité de chaque projet." },
        { title: 'Neutralité Commerciale',   description: "Nous ne vendons pas de matériel. Nos recommandations sont basées uniquement sur VOTRE intérêt et la performance technique, sans conflit d'intérêt." },
        { title: 'Protection des Données',   description: 'Vos données énergétiques sont sensibles. Nous les traitons avec la plus stricte confidentialité, hébergées en Suisse et sécurisées.' },
        { title: 'Respect du Cadre Légal',   description: 'Une veille juridique constante pour vous assurer que toutes les installations respectent les dernières normes fédérales et cantonales (MoPEC, IDC, etc.).' },
        { title: 'Processus Qualité',        description: "Chaque audit et chaque chantier suit un processus qualité rigoureux, de la première visite jusqu'à la réception finale des travaux." },
        { title: 'Approche Humaine',         description: "Parce que la transition énergétique est avant tout une aventure humaine, nous privilégions l'écoute, la pédagogie et l'accompagnement personnalisé." },
    ],
};

const aProposPageContentEn: AProposPageContent = {
    seo: {
        title: 'About Swiss Ecogestes | Our team & mission',
        description: 'Discover Swiss Ecogestes: our mission, our team of experts and our commitment to energy transition in French-speaking Switzerland.',
    },
    heroLabel: 'About us',
    heroTitle: 'A concrete approach to energy transition',
    heroIntro: "At Swiss Ecogestes, we believe energy transition happens through concrete, measurable and profitable actions. We support property owners, agencies, businesses and municipalities with a pragmatic approach: reducing consumption, optimising installations and generating real impact.",
    missionLabel: 'Our mission',
    missionTitle: 'Your interest, our only priority.',
    missionText: "No equipment to sell, no hidden margins. Swiss Ecogestes is an independent advisory firm: we analyse your situation, identify achievable savings and maximise your subsidies — with no conflict of interest.",
    missionText2: "Our approach combines field expertise, mastery of cantonal programmes (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) and personal support at every stage of your project.",
    presenceLabel: 'Our presence',
    presenceTitle: 'Active in Vaud and Geneva',
    presenceText: "We operate primarily in the cantons of Vaud and Geneva, with in-depth knowledge of local requirements, cantonal subsidy programmes and institutional stakeholders.",
    companyStats: [
        { value: '5',    label: 'Dedicated experts' },
        { value: '2',    label: 'Cantons covered' },
        { value: '6',    label: 'Institutional partners' },
        { value: '100%', label: 'Neutral & independent' },
    ],
    qualityLabel: 'Quality process',
    qualityTitle: 'A rigorous process, from start to finish',
    qualityText: "Every audit follows a rigorous quality process, from the first visit to the delivery of the report and personalised recommendations.",
    qualitySteps: ['Site visit', 'Technical analysis', 'Detailed report', 'Recommendations', 'Personalised follow-up'],
    groupPhotoUrl: GROUP_PHOTO_PLACEHOLDER,
    photoLabel: 'Our team',
    photoTitle: 'Committed experts in the field',
    photoSubtitle: 'Together, we guide every client towards concrete and sustainable solutions.',
    teamTitle: 'Our Team',
    teamSubtitle: 'Five experts passionate about energy transition, at your service in French-speaking Switzerland.',
    valeursTitle: 'Our Commitments & Values',
    valeursIntro: 'Beyond technical expertise, we provide security and peace of mind to all our partners.',
    valeursItems: [
        { title: 'Trusted Partner',       description: 'We work closely with DIREN (Energy Department), SIG and cantonal programmes to ensure compliance of every project.' },
        { title: 'Commercial Neutrality', description: 'We do not sell equipment. Our recommendations are based solely on YOUR interest and technical performance, with no conflict of interest.' },
        { title: 'Data Protection',       description: 'Your energy data is sensitive. We handle it with the strictest confidentiality, hosted in Switzerland and secured.' },
        { title: 'Legal Compliance',      description: 'Constant legal monitoring to ensure all installations comply with the latest federal and cantonal standards (MoPEC, IDC, etc.).' },
        { title: 'Quality Process',       description: 'Every audit and every project follows a rigorous quality process, from the first visit to the final handover.' },
        { title: 'Human Approach',        description: 'Because energy transition is above all a human journey, we prioritise listening, education and personalised support.' },
    ],
};

const aProposPageContentDe: AProposPageContent = {
    seo: {
        title: 'Über Swiss Ecogestes | Unser Team & Mission',
        description: 'Entdecken Sie Swiss Ecogestes: unsere Mission, unser Expertenteam und unser Engagement für die Energiewende in der Westschweiz.',
    },
    heroLabel: 'Über uns',
    heroTitle: 'Ein konkreter Ansatz zur Energiewende',
    heroIntro: "Bei Swiss Ecogestes sind wir überzeugt, dass die Energiewende durch konkrete, messbare und rentable Maßnahmen gelingt. Wir begleiten Eigentümer, Verwaltungen, Unternehmen und Gemeinden mit einem pragmatischen Ansatz: Verbrauch senken, Anlagen optimieren und echte Wirkung erzielen.",
    missionLabel: 'Unsere Mission',
    missionTitle: 'Ihr Interesse, unsere einzige Priorität.',
    missionText: "Kein Material zu verkaufen, keine versteckten Margen. Swiss Ecogestes ist eine unabhängige Beratungsfirma: Wir analysieren Ihre Situation, identifizieren erreichbare Einsparungen und maximieren Ihre Fördergelder — ohne Interessenkonflikt.",
    missionText2: "Unser Ansatz kombiniert Felderfahrung, Kenntnisse kantonaler Programme (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) und persönliche Begleitung in jeder Phase Ihres Projekts.",
    presenceLabel: 'Unsere Präsenz',
    presenceTitle: 'Tätig in Waadt und Genf',
    presenceText: "Wir sind hauptsächlich in den Kantonen Waadt und Genf tätig, mit fundiertem Wissen über lokale Anforderungen, kantonale Förderprogramme und institutionelle Akteure.",
    companyStats: [
        { value: '5',    label: 'Dedizierte Experten' },
        { value: '2',    label: 'Abgedeckte Kantone' },
        { value: '6',    label: 'Institutionelle Partner' },
        { value: '100%', label: 'Neutral & unabhängig' },
    ],
    qualityLabel: 'Qualitätsprozess',
    qualityTitle: 'Ein rigoroser Prozess von Anfang bis Ende',
    qualityText: "Jede Prüfung folgt einem strengen Qualitätsprozess, vom ersten Besuch bis zur Übergabe des Berichts und der personalisierten Empfehlungen.",
    qualitySteps: ['Vor-Ort-Besuch', 'Technische Analyse', 'Detaillierter Bericht', 'Empfehlungen', 'Persönliches Follow-up'],
    groupPhotoUrl: GROUP_PHOTO_PLACEHOLDER,
    photoLabel: 'Unser Team',
    photoTitle: 'Engagierte Experten vor Ort',
    photoSubtitle: 'Gemeinsam begleiten wir jeden Kunden zu konkreten und nachhaltigen Lösungen.',
    teamTitle: 'Unser Team',
    teamSubtitle: 'Fünf Experten mit Leidenschaft für die Energiewende, zu Ihren Diensten in der Westschweiz.',
    valeursTitle: 'Unsere Verpflichtungen & Werte',
    valeursIntro: 'Über die technische Expertise hinaus bieten wir all unseren Partnern Sicherheit und Seelenfrieden.',
    valeursItems: [
        { title: 'Vertrauenspartner',        description: 'Wir arbeiten eng mit DIREN (Energiedirektion), SIG und kantonalen Programmen zusammen, um die Konformität jedes Projekts zu gewährleisten.' },
        { title: 'Kommerzielle Neutralität', description: 'Wir verkaufen kein Material. Unsere Empfehlungen basieren ausschließlich auf IHREM Interesse und der technischen Leistung, ohne Interessenkonflikt.' },
        { title: 'Datenschutz',              description: 'Ihre Energiedaten sind sensibel. Wir behandeln sie mit strengster Vertraulichkeit, in der Schweiz gehostet und gesichert.' },
        { title: 'Rechtliche Konformität',   description: 'Ständige Rechtsüberwachung, um sicherzustellen, dass alle Anlagen den neuesten eidgenössischen und kantonalen Normen entsprechen (MoPEC, IDC, usw.).' },
        { title: 'Qualitätsprozess',         description: 'Jede Prüfung und jedes Projekt folgt einem strengen Qualitätsprozess, vom ersten Besuch bis zur endgültigen Abnahme.' },
        { title: 'Menschlicher Ansatz',      description: 'Weil die Energiewende vor allem ein menschliches Abenteuer ist, legen wir Wert auf Zuhören, Pädagogik und persönliche Begleitung.' },
    ],
};

export const getAProposPageContent = (lang: string): AProposPageContent => {
    if (lang.startsWith('de')) return aProposPageContentDe;
    return lang.startsWith('en') ? aProposPageContentEn : aProposPageContentFr;
};
