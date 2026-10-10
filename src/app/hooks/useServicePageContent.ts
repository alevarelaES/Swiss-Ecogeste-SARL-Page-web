import { getSanityServicePage } from '../../sanity/client';
import { useSanityContent } from '../../sanity/useSanityContent';

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
    fallback: ServicePageContent
): ServicePageContent {
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
                    ? data.services.map((s: any, i: number) => ({
                        title: s.title || '',
                        description: s.description || '',
                        image: s.image || fallback.services[i]?.image || '',
                        features: s.features || [],
                        featureLinks: s.featureLinks || [],
                        note: s.note || undefined,
                        link: s.link || undefined,
                        linkLabel: s.linkLabel || undefined,
                    }))
                    : fallback.services,
            };
        }
    );
}
