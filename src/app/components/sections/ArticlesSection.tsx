
import React from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticles } from '../../data/articles';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

const ArticlesSection = () => {
    const { t, i18n } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const articles = getArticles(i18n.language);

    return (
        <section id="articles" className="py-8 md:py-10 lg:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-2 block">
                            {t('blog.label')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)]">
                            {t('blog.title')}
                        </h2>
                    </div>
                    <Link to={getLocalizedPath('/conseils')} className="hidden md:flex items-center text-[var(--primary)] font-medium hover:text-amber-500 transition-colors">
                        {t('blog.view_all')} <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {articles.map((article, index) => (
                        <div key={article.id}>
                            <Link
                                to={getLocalizedPath(`/conseils/${article.slug}`)}
                                state={{ from: getLocalizedPath('/#articles') }}
                                className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full border border-gray-100"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${article.imageUrl})` }}
                                    />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-widest text-[var(--primary)] flex items-center gap-1.5 z-10 shadow-sm">
                                        <Tag size={12} /> {article.category}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase tracking-tighter">
                                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[var(--primary)] opacity-50" /> {article.date}</span>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-4 line-clamp-2 leading-[1.2] group-hover:text-[var(--primary)] transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
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
                    <Link to={getLocalizedPath('/conseils')} className="inline-flex items-center text-[var(--primary)] font-medium hover:text-amber-500 transition-colors">
                        {t('blog.view_all')} <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;
