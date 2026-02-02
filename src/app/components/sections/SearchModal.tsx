import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, FileText, Wrench, FileSearch, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { searchAllContent, getSearchSuggestions, SearchResult } from '../../utils/searchUtils';
import { Button } from '../ui/button';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { i18n, t } = useTranslation('common');

    // Fonction pour mettre en surbrillance le texte recherché
    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) {
            return text;
        }
        
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        
        return parts.map((part, index) => 
            regex.test(part) ? (
                <mark key={index} className="bg-yellow-200 text-gray-900 px-0.5 rounded">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    // Autofocus quand le modal s'ouvre
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Recherche avec debounce
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        const timeoutId = setTimeout(() => {
            const searchResults = searchAllContent(query, i18n.language);
            setResults(searchResults);
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, i18n.language]);

    // Fermeture avec Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleResultClick = (url: string) => {
        // Stocker le terme de recherche pour la surbrillance sur la page de destination
        if (query.trim()) {
            sessionStorage.setItem('searchHighlight', query.trim());
        }
        navigate(url);
        onClose();
        setQuery('');
        setResults([]);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'article':
                return <FileText size={18} className="text-blue-500" />;
            case 'service':
                return <Wrench size={18} className="text-green-600" />;
            case 'page':
                return <FileSearch size={18} className="text-purple-500" />;
            default:
                return <FileText size={18} className="text-gray-500" />;
        }
    };

    const getTypeBadge = (type: string) => {
        const badges = {
            article: { label: t('search.article') || 'Article', color: 'bg-blue-50 text-blue-700' },
            service: { label: t('search.service') || 'Service', color: 'bg-green-50 text-green-700' },
            page: { label: t('search.page') || 'Page', color: 'bg-purple-50 text-purple-700' }
        };
        return badges[type as keyof typeof badges] || badges.article;
    };

    const suggestions = getSearchSuggestions(i18n.language);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-4 top-[10vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl z-[101] max-h-[80vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                            {/* Header avec barre de recherche */}
                            <div className="p-6 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder={t('search.placeholder') || 'Rechercher des articles, services, pages...'}
                                            className="w-full pl-14 pr-4 py-4 text-lg bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all"
                                        />
                                    </div>
                                    <Button
                                        onClick={onClose}
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full hover:bg-gray-100"
                                    >
                                        <X size={24} />
                                    </Button>
                                </div>

                                {/* Suggestions */}
                                {!query && (
                                    <div className="mt-4">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            {t('search.suggestions') || 'Suggestions'}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestions.map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Résultats */}
                            <div className="flex-1 overflow-y-auto">
                                {isSearching && (
                                    <div className="p-8 text-center">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
                                        <p className="mt-4 text-gray-500">{t('search.searching') || 'Recherche en cours...'}</p>
                                    </div>
                                )}

                                {!isSearching && query && results.length === 0 && (
                                    <div className="p-12 text-center">
                                        <FileSearch size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-lg font-semibold text-gray-700 mb-2">
                                            {t('search.no_results') || 'Aucun résultat trouvé'}
                                        </p>
                                        <p className="text-gray-500 mb-6">
                                            {t('search.try_different') || 'Essayez avec des mots-clés différents'}
                                        </p>
                                        <button
                                            onClick={() => {
                                                sessionStorage.setItem('searchHighlight', query.trim());
                                                navigate('/');
                                                onClose();
                                                setQuery('');
                                            }}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 transition-colors text-sm font-medium"
                                        >
                                            <Search size={16} />
                                            Rechercher "{query}" sur la page d'accueil
                                        </button>
                                    </div>
                                )}

                                {!isSearching && results.length > 0 && (
                                    <div className="p-4">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                                            {results.length} {results.length === 1 ? (t('search.result') || 'résultat') : (t('search.results') || 'résultats')}
                                        </p>
                                        <div className="space-y-2">
                                            {results.map((result, index) => {
                                                const badge = getTypeBadge(result.type);
                                                return (
                                                    <motion.button
                                                        key={result.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        onClick={() => handleResultClick(result.url)}
                                                        className="w-full p-4 rounded-xl hover:bg-gray-50 transition-all group text-left flex items-start gap-4"
                                                    >
                                                        {/* Icon et image */}
                                                        <div className="flex-shrink-0">
                                                            {result.imageUrl ? (
                                                                <img
                                                                    src={result.imageUrl}
                                                                    alt={result.title}
                                                                    className="w-16 h-16 rounded-lg object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                                                                    {getTypeIcon(result.type)}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Contenu */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                                <h3 className="font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                                                                    {highlightText(result.title, query)}
                                                                </h3>
                                                                <ArrowRight size={18} className="flex-shrink-0 text-gray-300 group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                                                            </div>
                                                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                                {highlightText(result.description, query)}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${badge.color}`}>
                                                                    {badge.label}
                                                                </span>
                                                                {result.category && (
                                                                    <span className="text-xs text-gray-400">• {result.category}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-100 bg-gray-50">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-mono">ESC</kbd>
                                            {t('search.close') || 'Fermer'}
                                        </span>
                                    </div>
                                    <span>
                                        {t('search.powered_by') || 'Recherche locale'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
