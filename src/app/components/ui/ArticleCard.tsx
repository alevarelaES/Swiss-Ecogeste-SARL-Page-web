import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../../data/articles';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    const { t } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();

    return (
        <Link
            to={getLocalizedPath(`/conseils/${article.slug}`)}
            className="group flex flex-col h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden bg-gray-100">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${article.imageUrl})` }}
                />

                {/* Category Overlay */}
                <div className="absolute bottom-4 left-4">
                    <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                        {article.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Meta Row */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <Calendar size={12} className="text-[var(--primary)]" />
                        {article.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <User size={12} className="text-[var(--primary)]" />
                        Expert
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-tight">
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                </p>

                {/* Read More Section */}
                <div className="mt-auto flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                    <span>{t('blog.read_more', 'Lire la suite')}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;
