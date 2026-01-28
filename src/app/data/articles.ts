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

export const articles: Article[] = [
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

