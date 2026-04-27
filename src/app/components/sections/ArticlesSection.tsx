
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticles as getHardcodedArticles } from '../../data/articles';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import { getArticles as getSanityArticles } from '../../../sanity/client';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    imageUrl: string;
    slug: string;
}

const LOCALE_BY_LANG: Record<'fr' | 'en' | 'de', string> = {
    fr: 'fr-CH',
    en: 'en-GB',
    de: 'de-CH',
};

const formatArticleDate = (publishedAt: string, lang: 'fr' | 'en' | 'de') => {
    const parsed = new Date(publishedAt);
    if (Number.isNaN(parsed.getTime())) return '';
    return parsed.toLocaleDateString(LOCALE_BY_LANG[lang], {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const getFallbackArticles = (lang: string): Article[] => getHardcodedArticles(lang).slice(0, 3);

const ArticlesSection = () => {
    const { t, i18n } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';

    const [articles, setArticles] = useState<Article[]>(getFallbackArticles(lang));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setArticles(getFallbackArticles(lang));
        setIsLoading(true);
    }, [lang]);

    useEffect(() => {
        let cancelled = false;
        getSanityArticles(lang)
            .then((result: any[]) => {
                if (cancelled || !result || result.length === 0) return;
                const fallbackArticles = getFallbackArticles(lang);
                const mapped = result
                    .map((article: any, index: number) => ({
                        id: article._id || fallbackArticles[index]?.id || `${index}`,
                        title: article.title || fallbackArticles[index]?.title || '',
                        excerpt: article.excerpt || fallbackArticles[index]?.excerpt || '',
                        category: article.category || fallbackArticles[index]?.category || '',
                        date: article.publishedAt
                            ? formatArticleDate(article.publishedAt, lang)
                            : (fallbackArticles[index]?.date || ''),
                        readTime: article.readTime || fallbackArticles[index]?.readTime || '',
                        imageUrl: article.imageUrl || fallbackArticles[index]?.imageUrl || '',
                        slug: article.slug || fallbackArticles[index]?.slug || '',
                    }))
                    .filter((article: Article) => article.slug && article.title);

                if (mapped.length > 0) {
                    setArticles(mapped);
                }
            })
            .catch(() => {})
            .finally(() => {
                if (!cancelled) {
                    setIsLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [lang]);

    return (
        <section id="articles" className="py-8 md:py-10 lg:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="h-[2px] w-12 bg-amber-500"></span>
                            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">
                                {t('blog.label')}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            {t('blog.title')}
                        </h2>
                    </div>
                    <Link to={getLocalizedPath('/actualites')} className="hidden md:flex items-center text-[var(--primary)] font-medium hover:text-amber-500 transition-colors">
                        {t('blog.view_all')} <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {isLoading ? Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={`article-skeleton-${index}`}
                            className="bg-white rounded-none overflow-hidden shadow-md border border-gray-100 animate-pulse"
                        >
                            <div className="h-56 bg-gray-200" />
                            <div className="p-8">
                                <div className="h-3 w-1/3 bg-gray-200 mb-4" />
                                <div className="h-8 w-full bg-gray-200 mb-3" />
                                <div className="h-5 w-11/12 bg-gray-100 mb-2" />
                                <div className="h-5 w-10/12 bg-gray-100 mb-6" />
                                <div className="h-3 w-1/2 bg-gray-200" />
                            </div>
                        </div>
                    )) : articles.map((article) => (
                        <div key={article.id}>
                            <Link
                                to={getLocalizedPath(`/actualites/${article.slug}`)}
                                state={{ from: getLocalizedPath('/#articles') }}
                                className="bg-white rounded-none overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full border border-gray-100"
                            >
                                <div className="relative h-56 overflow-hidden rounded-none">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${article.imageUrl})` }}
                                    />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-widest text-[var(--primary)] flex items-center gap-1.5 z-10 shadow-sm border border-gray-100">
                                        <Tag size={12} /> {article.category}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-gray-800 mb-4 font-bold uppercase tracking-tighter">
                                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[var(--primary)] opacity-50" /> {article.date}</span>
                                        {article.readTime ? <span>{article.readTime}</span> : null}
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-4 line-clamp-2 leading-[1.2] group-hover:text-[var(--primary)] transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed line-clamp-3 mb-6 flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="text-[var(--primary)] font-black text-xs uppercase tracking-[0.2em] flex items-center mt-auto opacity-70 group-hover:opacity-100 transition-all">
                                        {t('blog.read_more')} <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Link to={getLocalizedPath('/actualites')} className="inline-flex items-center text-[var(--primary)] font-medium hover:text-amber-500 transition-colors">
                        {t('blog.view_all')} <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;
