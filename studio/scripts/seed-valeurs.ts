import { getCliClient } from 'sanity/cli'
const client = getCliClient({ apiVersion: '2024-01-01' })

async function main() {
  await client.patch('aProposPage').set({
    valeursTitle: { fr: 'Nos Engagements & Valeurs', en: 'Our Commitments & Values', de: 'Unsere Verpflichtungen & Werte' },
    valeursIntro: {
      fr: "Au-delà de l'expertise technique, nous apportons une sécurité et une tranquillité d'esprit à tous nos partenaires.",
      en: 'Beyond technical expertise, we provide security and peace of mind to all our partners.',
      de: 'Über die technische Expertise hinaus bieten wir all unseren Partnern Sicherheit und Seelenfrieden.'
    },
    valeursItems: [
      {
        _key: 'val-confiance',
        title: { fr: 'Partenaire de confiance', en: 'Trusted Partner', de: 'Vertrauenspartner' },
        description: {
          fr: 'Nous collaborons étroitement avec la DIREN (Direction de l\'énergie), les SIG et les programmes cantonaux pour garantir la conformité de chaque projet.',
          en: 'We work closely with DIREN (Energy Department), SIG and cantonal programmes to ensure compliance of every project.',
          de: 'Wir arbeiten eng mit DIREN (Energiedirektion), SIG und kantonalen Programmen zusammen, um die Konformität jedes Projekts zu gewährleisten.'
        }
      },
      {
        _key: 'val-neutrality',
        title: { fr: 'Neutralité Commerciale', en: 'Commercial Neutrality', de: 'Kommerzielle Neutralität' },
        description: {
          fr: 'Nous ne vendons pas de matériel. Nos recommandations sont basées uniquement sur VOTRE intérêt et la performance technique, sans conflit d\'intérêt.',
          en: 'We do not sell equipment. Our recommendations are based solely on YOUR interest and technical performance, with no conflict of interest.',
          de: 'Wir verkaufen kein Material. Unsere Empfehlungen basieren ausschließlich auf IHREM Interesse und der technischen Leistung, ohne Interessenkonflikt.'
        }
      },
      {
        _key: 'val-data',
        title: { fr: 'Protection des Données', en: 'Data Protection', de: 'Datenschutz' },
        description: {
          fr: 'Vos données énergétiques sont sensibles. Nous les traitons avec la plus stricte confidentialité, hébergées en Suisse et sécurisées.',
          en: 'Your energy data is sensitive. We handle it with the strictest confidentiality, hosted in Switzerland and secured.',
          de: 'Ihre Energiedaten sind sensibel. Wir behandeln sie mit strengster Vertraulichkeit, in der Schweiz gehostet und gesichert.'
        }
      },
      {
        _key: 'val-legal',
        title: { fr: 'Respect du Cadre Légal', en: 'Legal Compliance', de: 'Rechtliche Konformität' },
        description: {
          fr: 'Une veille juridique constante pour vous assurer que toutes les installations respectent les dernières normes fédérales et cantonales (MoPEC, IDC, etc.).',
          en: 'Constant legal monitoring to ensure all installations comply with the latest federal and cantonal standards (MoPEC, IDC, etc.).',
          de: 'Ständige Rechtsüberwachung, um sicherzustellen, dass alle Anlagen den neuesten eidgenössischen und kantonalen Normen entsprechen (MoPEC, IDC, usw.).'
        }
      },
      {
        _key: 'val-quality',
        title: { fr: 'Processus Qualité', en: 'Quality Process', de: 'Qualitätsprozess' },
        description: {
          fr: "Chaque audit et chaque chantier suit un processus qualité rigoureux, de la première visite jusqu'à la réception finale des travaux.",
          en: 'Every audit and every project follows a rigorous quality process, from the first visit to the final handover.',
          de: 'Jede Prüfung und jedes Projekt folgt einem strengen Qualitätsprozess, vom ersten Besuch bis zur endgültigen Abnahme.'
        }
      },
      {
        _key: 'val-human',
        title: { fr: 'Approche Humaine', en: 'Human Approach', de: 'Menschlicher Ansatz' },
        description: {
          fr: "Parce que la transition énergétique est avant tout une aventure humaine, nous privilégions l'écoute, la pédagogie et l'accompagnement personnalisé.",
          en: 'Because energy transition is above all a human journey, we prioritise listening, education and personalised support.',
          de: 'Weil die Energiewende vor allem ein menschliches Abenteuer ist, legen wir Wert auf Zuhören, Pädagogik und persönliche Begleitung.'
        }
      }
    ]
  }).commit()
  console.log('✅ valeursItems seedés dans aProposPage')
}
main().catch(console.error)
