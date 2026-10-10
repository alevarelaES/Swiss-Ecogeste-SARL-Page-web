import { getSanityServicePage } from '../../sanity/client';
import { useSanityContent } from '../../sanity/useSanityContent';
import { defaultServiceLinks } from '../data/serviceLinks';
import { getVillaPageContent } from '../data/villaPageContent';
import { getGerancePageContent } from '../data/gerancePageContent';
import { getEntreprisePageContent } from '../data/entreprisePageContent';
import { getCommunesPageContent } from '../data/communesPageContent';

// Contenu local en français, pour retrouver les liens par défaut des services dans toutes les langues
const FRENCH_FALLBACKS: Record<string, () => { services: { title: string; features?: string[] }[] }> = {
    villa: () => getVillaPageContent('fr'),
    gerance: () => getGerancePageContent('fr'),
    entreprise: () => getEntreprisePageContent('fr'),
    communes: () => getCommunesPageContent('fr'),
};

/** Ajoute les liens du PDF client au contenu local (affiché quand Sanity est injoignable). */
function withDefaultLinks(pageSlug: string, content: ServicePageContent): ServicePageContent {
    const french = FRENCH_FALLBACKS[pageSlug]?.().services ?? [];
    return {
        ...content,
        services: content.services.map((service, i) => {
            const defaults = defaultServiceLinks(pageSlug, french[i]?.title, french[i]?.features);
            return {
                ...service,
                link: service.link || defaults.link,
                featureLinks: service.featureLinks?.some((l) => l?.trim()) ? service.featureLinks : defaults.featureLinks,
            };
        }),
    };
}

export type ServiceItem = {
    title: string;
    description: string;
    image: string;
    features?: string[];
    /** Lien (interne "/services/villa" ou externe "https://…") pour chaque point clé, même ordre que `features`. */
    featureLinks?: string[];
    note?: string;
    /** Lien vers la page officielle du programme (subvention, partenaire…). */
    link?: string;
    linkLabel?: string;
};

export type ServicePageContent = {
    seo: { title: string; description: string; canonical: string };
    backLink: string;
    sectionLabel: string;
    title: string;
    description: string;
    heroImage: string;
    buttonText: string;
    buttonLink: string;
    services: ServiceItem[];
};

export function useServicePageContent(
    pageSlug: string,
    lang: string,
    localContent: ServicePageContent
): ServicePageContent {
    const fallback = withDefaultLinks(pageSlug, localContent);
    return useSanityContent(
        `servicePage:${pageSlug}:${lang}`,
        () => getSanityServicePage(pageSlug, lang),
        fallback,
        (data: any) => {
            if (!data.sectionLabel && !data.title) return null; // document vide
            return {
                seo: {
                    title: data.seo?.title || fallback.seo.title,
                    description: data.seo?.description || fallback.seo.description,
                    canonical: data.seo?.canonical || fallback.seo.canonical,
                },
                backLink: data.backLink || fallback.backLink,
                sectionLabel: data.sectionLabel || fallback.sectionLabel,
                title: data.title || fallback.title,
                description: data.description || fallback.description,
                heroImage: data.heroImage || fallback.heroImage,
                buttonText: data.buttonText || fallback.buttonText,
                buttonLink: data.buttonLink || fallback.buttonLink,
                services: (data.services && data.services.length > 0)
                    ? data.services.map((s: any, i: number) => {
                        // Liens du PDF client par défaut, remplacés par ceux saisis dans Sanity
                        const defaults = defaultServiceLinks(pageSlug, s.titleFr, s.featuresFr);
                        return {
                            title: s.title || '',
                            description: s.description || '',
                            image: s.image || fallback.services[i]?.image || '',
                            features: s.features || [],
                            featureLinks: s.featureLinks?.some((l: string) => l?.trim()) ? s.featureLinks : defaults.featureLinks,
                            note: s.note || undefined,
                            link: s.link || defaults.link,
                            linkLabel: s.linkLabel || undefined,
                        };
                    })
                    : fallback.services,
            };
        }
    );
}
