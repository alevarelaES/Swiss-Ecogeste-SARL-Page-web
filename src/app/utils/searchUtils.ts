import { articlesFr, articlesEn, articlesDe } from '../data/articles';
import { servicesFr, servicesEn, servicesDe } from '../data/services';
import { getVillaPageContent } from '../data/villaPageContent';
import { getGerancePageContent } from '../data/gerancePageContent';
import { getEntreprisePageContent } from '../data/entreprisePageContent';
import { getCommunesPageContent } from '../data/communesPageContent';

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    type: 'article' | 'service' | 'page';
    category?: string;
    url: string;
    imageUrl?: string;
}

/**
 * Recherche globale dans tous les contenus du site
 * @param query - Terme de recherche
 * @param language - Langue actuelle (fr, en, de)
 * @returns Liste de résultats triés par pertinence
 */
export function searchAllContent(query: string, language: string = 'fr'): SearchResult[] {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Sélection des données selon la langue
    const articles = language === 'en' ? articlesEn : language === 'de' ? articlesDe : articlesFr;
    const services = language === 'en' ? servicesEn : language === 'de' ? servicesDe : servicesFr;
    const villaPageContent = getVillaPageContent(language);
    const gerancePageContent = getGerancePageContent(language);
    const entreprisePageContent = getEntreprisePageContent(language);
    const communesPageContent = getCommunesPageContent(language);

    // Recherche dans les articles
    articles.forEach(article => {
        const titleMatch = article.title.toLowerCase().includes(normalizedQuery);
        const excerptMatch = article.excerpt.toLowerCase().includes(normalizedQuery);
        const categoryMatch = article.category.toLowerCase().includes(normalizedQuery);
        const contentMatch = article.content?.toLowerCase().includes(normalizedQuery);

        if (titleMatch || excerptMatch || categoryMatch || contentMatch) {
            results.push({
                id: article.id,
                title: article.title,
                description: article.excerpt,
                type: 'article',
                category: article.category,
                url: language === 'fr' ? `/conseils/${article.slug}` : `/${language}/conseils/${article.slug}`,
                imageUrl: article.imageUrl
            });
        }
    });

    // Recherche dans les services
    services.forEach(service => {
        const titleMatch = service.title.toLowerCase().includes(normalizedQuery);
        const descriptionMatch = service.description.toLowerCase().includes(normalizedQuery);
        const fullDescriptionMatch = service.fullDescription?.toLowerCase().includes(normalizedQuery);

        if (titleMatch || descriptionMatch || fullDescriptionMatch) {
            results.push({
                id: service.id,
                title: service.title,
                description: service.description,
                type: 'service',
                url: language === 'fr' ? service.link : `/${language}${service.link}`,
                imageUrl: service.image
            });
        }
    });

    // Recherche dans les pages de services détaillées
    const servicePages = [
        { content: villaPageContent, path: '/services/villa', name: 'Villa' },
        { content: gerancePageContent, path: '/services/gerance', name: 'Gérance' },
        { content: entreprisePageContent, path: '/services/entreprise', name: 'Entreprise' },
        { content: communesPageContent, path: '/services/communes', name: 'Communes' }
    ];

    servicePages.forEach(page => {
        const titleMatch = page.content.title.toLowerCase().includes(normalizedQuery);
        const descriptionMatch = page.content.description.toLowerCase().includes(normalizedQuery);
        
        // Recherche dans les sous-services
        let servicesMatch = false;
        if (page.content.services) {
            servicesMatch = page.content.services.some(s => 
                s.title.toLowerCase().includes(normalizedQuery) || 
                s.description.toLowerCase().includes(normalizedQuery)
            );
        }

        if (titleMatch || descriptionMatch || servicesMatch) {
            results.push({
                id: page.path,
                title: page.content.title,
                description: page.content.description,
                type: 'page',
                url: language === 'fr' ? page.path : `/${language}${page.path}`,
                imageUrl: page.content.heroImage
            });
        }
    });

    // Tri par pertinence (exact match > match dans titre > match dans description)
    return results.sort((a, b) => {
        const aExactTitle = a.title.toLowerCase() === normalizedQuery;
        const bExactTitle = b.title.toLowerCase() === normalizedQuery;
        if (aExactTitle && !bExactTitle) return -1;
        if (!aExactTitle && bExactTitle) return 1;

        const aTitleMatch = a.title.toLowerCase().includes(normalizedQuery);
        const bTitleMatch = b.title.toLowerCase().includes(normalizedQuery);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;

        return 0;
    });
}

/**
 * Récupère les suggestions de recherche populaires
 */
export function getSearchSuggestions(language: string = 'fr'): string[] {
    const suggestions = {
        fr: [
            'Audit énergétique',
            'Panneaux solaires',
            'Pompe à chaleur',
            'Subventions',
            'Isolation',
            'CECB',
            'IDC',
            'Rénovation'
        ],
        en: [
            'Energy audit',
            'Solar panels',
            'Heat pump',
            'Subsidies',
            'Insulation',
            'CECB',
            'IDC',
            'Renovation'
        ],
        de: [
            'Energieaudit',
            'Solarpanels',
            'Wärmepumpe',
            'Subventionen',
            'Isolation',
            'CECB',
            'IDC',
            'Renovation'
        ]
    };

    return suggestions[language as keyof typeof suggestions] || suggestions.fr;
}
