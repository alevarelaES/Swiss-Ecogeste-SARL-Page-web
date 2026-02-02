import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../../data/articles';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

interface GalleryCardProps {
    article: Article;
    variant?: 'standard' | 'featured';
}

const GalleryCard = ({ article }: GalleryCardProps) => {
    const { t } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();

    return (
        <Link
            to={getLocalizedPath(`/conseils/${article.slug}`)}
            className="flex flex-col h-full bg-white group hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${article.imageUrl})` }}
                />

                {/* Category Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] flex items-center gap-1.5 z-10 shadow-sm">
                    <Tag size={12} /> {article.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
                {/* Date & Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase tracking-tighter">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[var(--primary)] opacity-50" />
                        {article.date}
                    </span>
                    {article.readTime && (
                        <span className="flex items-center gap-1.5 border-l border-gray-200 pl-4">
                            {article.readTime}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-4 line-clamp-2 leading-[1.2] group-hover:text-[var(--primary)] transition-colors">
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {article.excerpt}
                </p>

                {/* Action */}
                <div className="text-[var(--primary)] font-black text-xs uppercase tracking-[0.2em] flex items-center mt-auto opacity-70 group-hover:opacity-100 transition-all">
                    {t('blog.read_more', 'Lire la suite')}
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
};

export default GalleryCard;
