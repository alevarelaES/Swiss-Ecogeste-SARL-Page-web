import { useState, useEffect } from 'react';
import { getSanityServicePage } from '../../sanity/client';

type PageContent = {
    seo: { title: string; description: string; canonical: string };
    backLink: string;
    sectionLabel: string;
    title: string;
    description: string;
    heroImage: string;
    buttonText: string;
    buttonLink: string;
    services: {
        title: string;
        description: string;
        image: string;
        features?: string[];
        note?: string;
    }[];
};

export function useServicePageContent(
    pageSlug: string,
    lang: string,
    fallback: PageContent
): PageContent {
    const [content, setContent] = useState<PageContent>(fallback);

    useEffect(() => {
        setContent(fallback);
    }, [lang]);

    useEffect(() => {
        let cancelled = false;
        getSanityServicePage(pageSlug, lang)
            .then((data: any) => {
                if (cancelled || !data) return;
                if (!data.sectionLabel && !data.title) return; // empty document
                setContent({
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
                        ? data.services.map((s: any) => ({
                            title: s.title || '',
                            description: s.description || '',
                            image: s.image || '',
                            features: s.features || [],
                            note: s.note || undefined,
                        }))
                        : fallback.services,
                });
            })
            .catch(() => {});
        return () => { cancelled = true; };
    }, [pageSlug, lang]);

    return content;
}
