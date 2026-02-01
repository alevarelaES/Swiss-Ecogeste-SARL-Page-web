import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticles } from '../data/articles';
import { getConseilsPageContent } from '../data/conseilsPageContent';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const ConseilsPage = () => {
    const { i18n } = useTranslation();
    const { getLocalizedPath } = useLocalizedPath();
    const content = getConseilsPageContent(i18n.language);
    const articles = getArticles(i18n.language);

    return (
        <div className="pt-32 pb-24">
            <SEO
                title={content.seo.title}
                description={content.seo.description}
                canonical={content.seo.canonical}
            />

            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-20">
                        <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs">{content.sectionLabel}</span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mt-4 mb-6 tracking-tight">
                            {content.title} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-emerald-600">{content.titleHighlight}</span>
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                            {content.description}
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-10">
                    {articles.map((article, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <Link to={getLocalizedPath(`/conseils/${article.slug}`)} className="group block h-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col border border-gray-100/50">
                                    <div className="h-64 overflow-hidden relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                                            style={{ backgroundImage: `url(${article.imageUrl})` }}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-[var(--primary)] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wide">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="text-gray-400 text-xs font-medium mb-3 flex items-center gap-2">
                                            <Calendar size={12} className="text-[var(--primary)]" />
                                            {article.date}
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[var(--primary)] transition-colors">
                                            {article.title}
                                        </h2>
                                        <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3 font-light">
                                            {article.excerpt}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="text-[var(--primary)] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                                {content.readMoreText} <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConseilsPage;
