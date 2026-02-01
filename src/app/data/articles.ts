export interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    imageUrl: string;
    slug: string;
    content?: string;
}

export const articlesFr: Article[] = [
    {
        id: '1',
        title: "Comment réduire sa facture d'électricité de 20% ?",
        excerpt: "Découvrez 5 gestes simples et des solutions techniques pour optimiser votre consommation immédiatement.",
        category: "Conseils",
        date: "24 Jan 2026",
        readTime: "5 min",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        slug: "reduire-facture-electricite",
        content: `
            <p>La réduction de la facture d'électricité est une préoccupation majeure pour de nombreux foyers suisses. Avec l'augmentation des coûts de l'énergie, adopter des gestes simples et investir dans des solutions durables peut faire une différence significative.</p>
            
            <h3>1. Optimisez votre éclairage</h3>
            <p>Le remplacement de vos ampoules classiques par des LED peut réduire la consommation liée à l'éclairage de près de 80%. Pensez également à éteindre les lumières en quittant une pièce.</p>

            <h3>2. Gérez vos appareils en veille</h3>
            <p>Les appareils en veille (TV, ordinateurs, chargeurs) continuent de consommer de l'électricité. Utilisez des multiprises à interrupteur pour tout éteindre facilement.</p>

            <h3>3. Chauffage et isolation</h3>
            <p>Le chauffage représente la plus grande part de la consommation d'énergie. Baisser la température de 1°C peut réduire votre consommation de 7%. Une bonne isolation est également cruciale.</p>

            <h3>4. Investissez dans le solaire</h3>
            <p>L'installation de panneaux photovoltaïques reste la solution la plus efficace pour réduire durablement vos factures et gagner en autonomie.</p>
        `
    },
    {
        id: '2',
        title: "Subventions 2026 : Le guide complet",
        excerpt: "Tout ce qu'il faut savoir sur le Programme Bâtiments, Équiwatt et les aides cantonales en Suisse Romande.",
        category: "Actualité",
        date: "15 Jan 2026",
        readTime: "8 min",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        slug: "subventions-2026-guide",
        content: `
            <p>En 2026, la Suisse continue de soutenir massivement la transition énergétique à travers divers programmes de subventions. Voici ce que vous devez savoir pour en bénéficier.</p>

            <h3>Le Programme Bâtiments</h3>
            <p>Ce programme fédéral et cantonal soutient l'assainissement énergétique des bâtiments (isolation toit, façades) et le remplacement des chauffages électriques ou à mazout par des énergies renouvelables.</p>

            <h3>Subventions Cantonales (Vaud, Genève, etc.)</h3>
            <p>Chaque canton propose ses propres aides complémentaires. Par exemple, le canton de Vaud offre des bonus pour les rénovations complètes et l'installation de panneaux solaires thermiques.</p>

            <h3>Comment faire la demande ?</h3>
            <p>Il est impératif de déposer votre demande AVANT le début des travaux. Swiss Ecogestes peut vous accompagner dans toutes ces démarches administratives complexes.</p>
        `
    },
    {
        id: '3',
        title: "Pompe à chaleur vs Chaudière gaz",
        excerpt: "Comparatif technique et financier sur 15 ans. Lequel est le plus rentable pour votre villa ?",
        category: "Technique",
        date: "10 Jan 2026",
        readTime: "6 min",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        slug: "comparatif-pac-gaz",
        content: `
            <p>Au moment de remplacer son système de chauffage, le choix entre une pompe à chaleur (PAC) et une chaudière à gaz est fréquent. Analysons les deux options.</p>

            <h3>Coût initial</h3>
            <p>La chaudière à gaz est moins chère à l'achat que la PAC. Cependant, les subventions actuelles réduisent considérablement cet écart initial en faveur de la PAC.</p>

            <h3>Coût d'exploitation</h3>
            <p>La PAC est imbattable sur le long terme. Pour 1 kWh d'électricité consommé, elle restitue 3 à 4 kWh de chaleur. Le gaz, soumis aux fluctuations du marché et à la taxe CO2, devient de plus en plus onéreux.</p>

            <h3>Impact écologique</h3>
            <p>La PAC émet beaucoup moins de CO2, surtout si elle est couplée à des panneaux solaires. Le gaz reste une énergie fossile polluante.</p>

            <h3>Conclusion</h3>
            <p>Sur 15 ans, la Pompe à Chaleur est presque toujours plus rentable, malgré l'investissement de départ plus élevé.</p>
        `
    }
];

export const articlesEn: Article[] = [
    {
        id: '1',
        title: "How to Reduce Your Electricity Bill by 20%?",
        excerpt: "Discover 5 simple tips and technical solutions to optimize your consumption immediately.",
        category: "Tips",
        date: "24 Jan 2026",
        readTime: "5 min",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        slug: "reduce-electricity-bill",
        content: `
            <p>Reducing the electricity bill is a major concern for many Swiss households. With rising energy costs, adopting simple habits and investing in sustainable solutions can make a significant difference.</p>
            
            <h3>1. Optimize your lighting</h3>
            <p>Replacing your classic bulbs with LEDs can reduce lighting-related consumption by nearly 80%. Also, remember to turn off lights when leaving a room.</p>

            <h3>2. Manage standby devices</h3>
            <p>Devices on standby (TVs, computers, chargers) continue to consume electricity. Use power strips with switches to turn everything off easily.</p>

            <h3>3. Heating and insulation</h3>
            <p>Heating accounts for the largest share of energy consumption. Lowering the temperature by 1°C can reduce your consumption by 7%. Good insulation is also crucial.</p>

            <h3>4. Invest in solar</h3>
            <p>Installing photovoltaic panels remains the most effective solution to sustainably reduce your bills and gain autonomy.</p>
        `
    },
    {
        id: '2',
        title: "2026 Subsidies: The Complete Guide",
        excerpt: "Everything you need to know about the Buildings Program, Équiwatt, and cantonal aids in French-speaking Switzerland.",
        category: "News",
        date: "15 Jan 2026",
        readTime: "8 min",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        slug: "subventions-2026-guide",
        content: `
            <p>In 2026, Switzerland continues to massively support the energy transition through various subsidy programs. Here is what you need to know to benefit from them.</p>

            <h3>The Buildings Program</h3>
            <p>This federal and cantonal program supports energy renovation of buildings (insulating roof, facades) and replacing electric or oil heaters with renewable energies.</p>

            <h3>Cantonal Subsidies (Vaud, Geneva, etc.)</h3>
            <p>Each canton offers its own complementary aids. For example, the canton of Vaud offers bonuses for complete renovations and the installation of thermal solar panels.</p>

            <h3>How to apply?</h3>
            <p>It is imperative to file your application BEFORE starting the work. Swiss Ecogestes can accompany you through all these complex administrative procedures.</p>
        `
    },
    {
        id: '3',
        title: "Heat Pump vs Gas Boiler",
        excerpt: "Technical and financial comparison over 15 years. Which one is more profitable for your villa?",
        category: "Technical",
        date: "10 Jan 2026",
        readTime: "6 min",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        slug: "comparison-hp-gas",
        content: `
            <p>When replacing a heating system, the choice between a heat pump (HP) and a gas boiler is common. Let's analyze both options.</p>

            <h3>Initial Cost</h3>
            <p>The gas boiler is cheaper to purchase than the HP. However, current subsidies significantly reduce this initial gap in favor of the HP.</p>

            <h3>Operating Cost</h3>
            <p>The HP is unbeatable in the long run. For 1 kWh of electricity consumed, it restores 3 to 4 kWh of heat. Gas, subject to market fluctuations and CO2 tax, becomes increasingly expensive.</p>

            <h3>Ecological Impact</h3>
            <p>The HP emits much less CO2, especially if coupled with solar panels. Gas remains a polluting fossil fuel.</p>

            <h3>Conclusion</h3>
            <p>Over 15 years, the Heat Pump is almost always more profitable, despite the higher initial investment.</p>
        `
    }
];

export const articlesDe: Article[] = [
    {
        id: '1',
        title: "Wie Sie Ihre Stromrechnung um 20% senken können?",
        excerpt: "Entdecken Sie 5 einfache Tipps und technische Lösungen, um Ihren Verbrauch sofort zu optimieren.",
        category: "Ratschläge",
        date: "24 Jan 2026",
        readTime: "5 min",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        slug: "stromrechnung-senken",
        content: `
            <p>Die Senkung der Stromrechnung ist ein großes Anliegen für viele Schweizer Haushalte. Mit steigenden Energiekosten können einfache Gewohnheiten und Investitionen in nachhaltige Lösungen einen erheblichen Unterschied machen.</p>
            
            <h3>1. Optimieren Sie Ihre Beleuchtung</h3>
            <p>Der Austausch klassischer Glühbirnen durch LEDs kann den Stromverbrauch für Beleuchtung um fast 80% senken. Denken Sie auch daran, das Licht auszuschalten, wenn Sie einen Raum verlassen.</p>

            <h3>2. Standby-Geräte verwalten</h3>
            <p>Geräte im Standby-Modus (TV, Computer, Ladegeräte) verbrauchen weiterhin Strom. Verwenden Sie Steckdosenleisten mit Schalter, um alles einfach auszuschalten.</p>

            <h3>3. Heizung und Isolierung</h3>
            <p>Die Heizung macht den größten Teil des Energieverbrauchs aus. Eine Senkung der Temperatur um 1°C kann Ihren Verbrauch um 7% reduzieren. Eine gute Isolierung ist ebenfalls entscheidend.</p>

            <h3>4. Investieren Sie in Solar</h3>
            <p>Die Installation von Photovoltaikanlagen bleibt die effizienteste Lösung, um Ihre Rechnungen nachhaltig zu senken und Autonomie zu gewinnen.</p>
        `
    },
    {
        id: '2',
        title: "Fördergelder 2026: Der vollständige Leitfaden",
        excerpt: "Alles, was Sie über das Gebäudeprogramm, Équiwatt und kantonale Hilfen in der Westschweiz wissen müssen.",
        category: "Aktuelles",
        date: "15 Jan 2026",
        readTime: "8 min",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        slug: "foerdergelder-2026-leitfaden",
        content: `
            <p>Im Jahr 2026 unterstützt die Schweiz die Energiewende weiterhin massiv durch verschiedene Förderprogramme. Hier ist, was Sie wissen müssen, um davon zu profitieren.</p>

            <h3>Das Gebäudeprogramm</h3>
            <p>Dieses eidgenössische und kantonale Programm unterstützt die energetische Sanierung von Gebäuden (Dach- und Fassadendämmung) und den Ersatz von Elektro- oder Ölheizungen durch erneuerbare Energien.</p>

            <h3>Kantonale Fördergelder (Waadt, Genf usw.)</h3>
            <p>Jeder Kanton bietet eigene ergänzende Hilfen an. Zum Beispiel bietet der Kanton Waadt Boni für Komplettrenovierungen und die Installation von thermischen Solaranlagen.</p>

            <h3>Wie stelle ich den Antrag?</h3>
            <p>Es ist zwingend erforderlich, Ihren Antrag VOR Beginn der Arbeiten einzureichen. Swiss Ecogestes kann Sie bei all diesen komplexen Verwaltungsverfahren begleiten.</p>
        `
    },
    {
        id: '3',
        title: "Wärmepumpe vs. Gasheizung",
        excerpt: "Technischer und finanzieller Vergleich über 15 Jahre. Was ist rentabler für Ihre Villa?",
        category: "Technik",
        date: "10 Jan 2026",
        readTime: "6 min",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        slug: "vergleich-wp-gas",
        content: `
            <p>Beim Austausch des Heizsystems stellt sich oft die Frage zwischen einer Wärmepumpe (WP) und einer Gasheizung. Lassen Sie uns beide Optionen analysieren.</p>

            <h3>Anschaffungskosten</h3>
            <p>Die Gasheizung ist in der Anschaffung günstiger als die WP. Die aktuellen Fördergelder verringern diesen anfänglichen Abstand jedoch erheblich zugunsten der WP.</p>

            <h3>Betriebskosten</h3>
            <p>Die WP ist langfristig unschlagbar. Für 1 kWh verbrauchten Strom liefert sie 3 bis 4 kWh Wärme. Gas, das Marktschwankungen und der CO2-Abgabe unterliegt, wird immer teurer.</p>

            <h3>Ökologische Auswirkung</h3>
            <p>Die WP stößt viel weniger CO2 aus, besonders wenn sie mit Solarmodulen gekoppelt ist. Gas bleibt ein umweltschädlicher fossiler Brennstoff.</p>

            <h3>Fazit</h3>
            <p>Über 15 Jahre ist die Wärmepumpe fast immer rentabler, trotz der höheren Anfangsinvestition.</p>
        `
    }
];

export const getArticles = (lang: string): Article[] => {
    if (lang.startsWith('de')) return articlesDe;
    return lang.startsWith('en') ? articlesEn : articlesFr;
};

