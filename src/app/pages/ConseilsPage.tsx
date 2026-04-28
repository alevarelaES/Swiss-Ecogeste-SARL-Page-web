import { useMemo, useState, useEffect } from 'react';
import { SEO } from '../components';
import { getArticles as getStaticArticles } from '../data/articles';
import { getConseilsPageContent } from '../data/conseilsPageContent';
import { useTranslation } from 'react-i18next';
import { GalleryCard, Button } from '../components/ui';
import { getArticles as getSanityArticles, getSanityBlogPage } from '../../sanity/client';

const ConseilsPage = () => {
    const { i18n, t } = useTranslation('common');
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';

    const staticContent = getConseilsPageContent(i18n.language);
    const staticArticles = getStaticArticles(i18n.language);

    const [content, setContent] = useState(staticContent);
    const [allArticles, setAllArticles] = useState(staticArticles);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Reset langue
    useEffect(() => {
        setContent(getConseilsPageContent(i18n.language));
        setAllArticles(getStaticArticles(i18n.language));
    }, [lang]);

    // Charger depuis Sanity
    useEffect(() => {
        let cancelled = false;

        getSanityBlogPage(lang).then((data: any) => {
            if (cancelled || !data) return;
            const fallback = getConseilsPageContent(i18n.language);
            setContent({
                seo: {
                    title: data.seoTitle || fallback.seo.title,
                    description: data.seoDescription || fallback.seo.description,
                    canonical: fallback.seo.canonical,
                },
                sectionLabel: fallback.sectionLabel,
                title: data.title ? data.title.split(' &')[0] + ' &' : fallback.title,
                titleHighlight: data.title ? data.title.split('& ')[1] || fallback.titleHighlight : fallback.titleHighlight,
                description: data.description || fallback.description,
                readMoreText: fallback.readMoreText,
            });
        }).catch(() => {});

        getSanityArticles(lang).then((data: any[]) => {
            if (cancelled || !data || data.length === 0) return;
            const mapped = data.map((a: any) => ({
                id: a._id,
                title: a.title || '',
                excerpt: a.excerpt || '',
                category: a.category || '',
                date: a.publishedAt
                    ? new Date(a.publishedAt).toLocaleDateString(
                          lang === 'fr' ? 'fr-CH' : lang === 'de' ? 'de-CH' : 'en-GB',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                      )
                    : '',
                readTime: a.readTime || '',
                imageUrl: a.imageUrl || '',
                slug: a.slug || '',
            }));
            setAllArticles(mapped);
        }).catch(() => {});

        return () => { cancelled = true; };
    }, [lang]);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(allArticles.map(a => a.category)));
        return [
            { id: 'All', label: t('blog.nav.featured', 'À la une') },
            ...uniqueCategories.map(cat => ({ id: cat, label: cat }))
        ];
    }, [allArticles, t]);

    const filteredArticles = useMemo(() => {
        if (selectedCategory === 'All') return allArticles;
        return allArticles.filter(article => article.category === selectedCategory);
    }, [allArticles, selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
            <SEO
                title={content.seo.title}
                description={content.seo.description}
                canonical={content.seo.canonical}
            />

            {/* COMPACT HEADER SECTION */}
            <div className="pt-32 pb-12 px-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 font-sans uppercase">
                        {content.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl font-medium leading-relaxed">
                        {content.description}
                    </p>
                </div>
            </div>

            {/* FILTERS TABS - STICKY, MINIMALIST & CLEAN */}
            <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-6">
                <div className="max-w-7xl mx-auto flex py-1 overflow-x-auto no-scrollbar relative z-10">
                    <nav className="flex gap-8 whitespace-nowrap px-2">
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant="flat"
                                size="none"
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`relative py-5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all
                                    ${selectedCategory === cat.id
                                        ? 'text-[var(--primary)]'
                                        : 'text-gray-800 hover:text-gray-900'
                                    }`}
                            >
                                {cat.label}
                                {selectedCategory === cat.id && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--primary)] rounded-none" />
                                )}
                            </Button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* CONTENT GRID - Uniform 3-column flow */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                {filteredArticles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {filteredArticles.map((article) => (
                            <GalleryCard key={article.id} article={article} variant="standard" />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-none border border-dashed border-gray-200">
                        <p className="text-gray-800 font-medium">Aucun article trouvé dans cette catégorie.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConseilsPage;
