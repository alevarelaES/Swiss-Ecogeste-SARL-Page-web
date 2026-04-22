
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { getArticles as getHardcodedArticles, articlesFr, articlesEn, articlesDe } from '../data/articles';
import { SEO } from '../components';
import { ArrowLeft, Facebook, Linkedin, ChevronRight, User, Link as LinkIcon, Check, Sparkles } from 'lucide-react';
import { Reveal } from '../components/animations';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import DOMPurify from 'dompurify';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { getArticleBySlug } from '../../sanity/client';
import { getImageUrl } from '../../sanity/image';

interface ArticleDetail {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    imageUrl: string;
    slug: string;
    contentHtml?: string;
    contentPortableText?: PortableTextBlock[];
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

const portableTextComponents: PortableTextComponents = {
    block: {
        h3: ({ children }) => (
            <h3 className="text-gray-900 font-bold tracking-tight text-3xl mt-14 mb-6 leading-tight border-l-4 border-[var(--primary)] pl-4">
                {children}
            </h3>
        ),
        normal: ({ children }) => (
            <p className="text-gray-800 leading-[1.9] mb-8 mt-0 text-lg font-normal">{children}</p>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="text-gray-900 font-bold">{children}</strong>,
        link: ({ children, value }) => {
            const href = value?.href || '#';
            return (
                <a
                    href={href}
                    target={href.startsWith('/') ? undefined : '_blank'}
                    rel={href.startsWith('/') ? undefined : 'noreferrer noopener'}
                    className="text-[var(--primary)] font-bold no-underline hover:text-[#1a4d3e] transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
    types: {
        image: ({ value }) => {
            const source = value as any;
            const directUrl = source?.asset?.url;
            const builtUrl = getImageUrl(source, 1400);
            const imageUrl = directUrl || builtUrl;
            if (!imageUrl) return null;

            return (
                <figure className="my-10">
                    <img
                        src={imageUrl}
                        alt={source?.alt || ''}
                        className="w-full rounded-none"
                    />
                </figure>
            );
        },
    },
    list: {
        bullet: ({ children }) => <ul className="list-none pl-0 mb-8">{children}</ul>,
    },
    listItem: {
        bullet: ({ children }) => <li className="relative pl-6 mb-3 text-lg text-gray-800 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:bg-[var(--primary)] before:rounded-full">{children}</li>,
    },
};

const getFallbackArticle = (slug: string | undefined, language: string): { article: ArticleDetail | null; sanitySlug: string | null } => {
    if (!slug) return { article: null, sanitySlug: null };

    const allArticles = [...articlesFr, ...articlesEn, ...articlesDe];
    const foundBySlug = allArticles.find((article) => article.slug === slug);
    const validId = foundBySlug?.id;
    const currentLangArticles = getHardcodedArticles(language);
    const currentLangMatch = validId ? currentLangArticles.find((article) => article.id === validId) : undefined;
    const fallbackRaw = currentLangMatch || currentLangArticles.find((article) => article.slug === slug) || foundBySlug || null;

    if (!fallbackRaw) return { article: null, sanitySlug: slug };

    const frenchSlug = validId ? articlesFr.find((article) => article.id === validId)?.slug : undefined;
    return {
        article: {
            id: fallbackRaw.id,
            title: fallbackRaw.title,
            excerpt: fallbackRaw.excerpt,
            category: fallbackRaw.category,
            date: fallbackRaw.date,
            readTime: fallbackRaw.readTime,
            imageUrl: fallbackRaw.imageUrl,
            slug: fallbackRaw.slug,
            contentHtml: fallbackRaw.content,
        },
        sanitySlug: frenchSlug || fallbackRaw.slug || slug,
    };
};

const ArticleDetailPage = () => {
    const { slug } = useParams();
    useSearchHighlight();
    const navigate = useNavigate();
    const location = useLocation();
    const [copied, setCopied] = useState(false);
    const { t, i18n } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';

    const fallbackResult = useMemo(() => getFallbackArticle(slug, i18n.language), [slug, i18n.language]);
    const fallbackArticle = fallbackResult.article;
    const sanitySlug = fallbackResult.sanitySlug;

    const [article, setArticle] = useState<ArticleDetail | null>(fallbackArticle);

    useEffect(() => {
        setArticle(fallbackArticle);
    }, [fallbackArticle]);

    useEffect(() => {
        if (!sanitySlug) return;

        let cancelled = false;
        getArticleBySlug(sanitySlug, lang)
            .then((result: any) => {
                if (cancelled || !result || !result._id) return;
                setArticle({
                    id: result._id,
                    title: result.title || fallbackArticle?.title || '',
                    excerpt: result.excerpt || fallbackArticle?.excerpt || '',
                    category: result.category || fallbackArticle?.category || '',
                    date: result.publishedAt
                        ? formatArticleDate(result.publishedAt, lang)
                        : (fallbackArticle?.date || ''),
                    readTime: result.readTime || fallbackArticle?.readTime || '',
                    imageUrl: result.imageUrl || fallbackArticle?.imageUrl || '',
                    slug: result.slug || sanitySlug,
                    contentPortableText: Array.isArray(result.content) ? result.content : [],
                });
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, [fallbackArticle, lang, sanitySlug]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) return null;

    const currentUrl = window.location.href;
    const shareTitle = article.title;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = {
        x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        meta: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    };

    const XIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.403z" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-white font-sans">
            <SEO title={article.title} description={article.excerpt} canonical={`/conseils/${article.slug}`} ogImage={article.imageUrl} />

            {/* HEADER AVEC TOUCHE DE COULEUR SUBTILE */}
            <header className="pt-32 pb-12 lg:pb-16 bg-gray-100 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Navigation Row: Back Button + Breadcrumb */}
                    <div className="flex items-center justify-between mb-8">
                        {/* Back Button */}
                        <button
                            onClick={() => {
                                const from = location.state?.from;
                                if (from) {
                                    navigate(from);
                                } else {
                                    navigate(-1);
                                }
                            }}
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[var(--primary)] transition-colors group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span>{t('buttons.back')}</span>
                        </button>

                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs text-gray-800 font-bold uppercase tracking-wider">
                            <Link to={getLocalizedPath('/')} className="hover:text-gray-900 transition-colors">{t('nav.home')}</Link>
                            <ChevronRight size={10} strokeWidth={4} />
                            <Link to={getLocalizedPath('/conseils')} className="hover:text-gray-900 transition-colors">{t('blog.journal')}</Link>
                            <ChevronRight size={10} strokeWidth={4} />
                            <span className="text-[var(--primary)] font-black">{article.category}</span>
                        </nav>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        <div>
                            <Reveal>
                                <div className="inline-flex items-center gap-2 bg-green-50 text-[var(--primary)] px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-widest mb-6 border border-green-100/50">
                                    <Sparkles size={12} /> {article.category}
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
                                    {article.title}
                                </h1>
                                <div className="flex items-center gap-3 mb-8 lg:mb-0">
                                    <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center border border-green-100 shadow-sm">
                                        <User size={18} className="text-[var(--primary)]" />
                                    </div>
                                    <div className="text-left text-sm">
                                        <p className="font-bold text-gray-900">{t('blog.expert')}</p>
                                        <p className="text-gray-700 font-medium">{article.date}</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div>
                            <Reveal delay={0.2}>
                                <div className="rounded-none overflow-hidden shadow-xl aspect-video relative group border border-gray-100">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${article.imageUrl})` }}
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-none"></div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </header>

            <main className="bg-white py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6">
                    <Reveal delay={0.3}>
                        <article
                            className="prose prose-lg prose-slate max-w-none 
                            [&_p]:text-gray-800 [&_p]:leading-[1.9] [&_p]:mb-8 [&_p]:mt-0 [&_p]:text-lg [&_p]:font-normal
                            [&_h3]:text-gray-900 [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-3xl [&_h3]:mt-14 [&_h3]:mb-6 [&_h3]:leading-tight
                            [&_h3]:border-l-4 [&_h3]:border-[var(--primary)] [&_h3]:pl-4
                            [&_strong]:text-gray-900 [&_strong]:font-bold
                            [&_li]:text-lg [&_li]:mb-3 [&_li]:text-gray-800
                            [&_ul]:list-none [&_ul]:pl-0
                            [&_ul>li]:relative [&_ul>li]:pl-6
                            [&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.6em] [&_ul>li]:before:w-2 [&_ul>li]:before:h-2 [&_ul>li]:before:bg-[var(--primary)] [&_ul>li]:before:rounded-full
                            [&_a]:text-[var(--primary)] [&_a]:font-bold [&_a]:no-underline hover:text-[#1a4d3e] transition-colors
                            "
                        >
                            {article.contentPortableText && article.contentPortableText.length > 0 ? (
                                <PortableText value={article.contentPortableText} components={portableTextComponents} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contentHtml || '') }} />
                            )}
                        </article>

                        {/* SHARE SECTION CENTERED BOTTOM */}
                        <div className="mt-16 pt-12 border-t border-gray-100">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-800 mb-6 text-center">{t('blog.share')}</h3>
                            <div className="flex justify-center gap-3 mb-6">
                                <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 rounded-none flex items-center justify-center text-gray-900 border border-gray-100 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
                                    <XIcon />
                                </a>
                                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 rounded-none flex items-center justify-center text-[#0077b5] border border-gray-100 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all shadow-sm">
                                    <Linkedin size={16} fill="currentColor" strokeWidth={0} />
                                </a>
                                <a href={shareLinks.meta} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-50 rounded-none flex items-center justify-center text-[#1877F2] border border-gray-100 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-sm">
                                    <Facebook size={16} fill="currentColor" strokeWidth={0} />
                                </a>
                                <button onClick={handleCopyLink} className={`px-4 h-10 rounded-none flex items-center gap-2 text-[10px] font-black uppercase tracking-wider transition-all border ${copied ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-gray-50 text-gray-800 border-gray-100 hover:border-gray-300'}`}>
                                    {copied ? <Check size={14} strokeWidth={3} /> : <LinkIcon size={14} strokeWidth={3} />}
                                    {copied ? t('blog.copied') : t('blog.copy')}
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </main>
        </div>
    );
};

export default ArticleDetailPage;
