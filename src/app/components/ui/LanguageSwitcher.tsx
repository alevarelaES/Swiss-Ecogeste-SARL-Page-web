import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LanguageSwitcherProps {
    isScrolled?: boolean;
    isHome?: boolean;
    mobile?: boolean;
}

const languages = [
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'de', label: 'DE', name: 'Deutsch' },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled = true, isHome = true, mobile = false }) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find(lang => i18n.language.startsWith(lang.code)) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const changeLanguage = (lng: string) => {
        // Store current scroll position
        const scrollY = window.scrollY;
        
        // Construct new path
        const pathParts = location.pathname.split('/').filter(Boolean);
        let newPath = '';

        if (pathParts.length > 0 && ['fr', 'en', 'de'].includes(pathParts[0])) {
            // Replace existing prefix
            newPath = '/' + lng + (pathParts.length > 1 ? '/' + pathParts.slice(1).join('/') : '');
        } else {
            // Add prefix
            newPath = '/' + lng + location.pathname;
        }

        // Add hash if present
        if (location.hash) {
            newPath += location.hash;
        }

        // Navigate first to change the URL - App.tsx will handle language sync
        navigate(newPath, { replace: true });
        setIsOpen(false);
        
        // Restore scroll position after navigation with requestAnimationFrame for better timing
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollY);
            });
        });
    };

    // Mobile View: Inline buttons
    if (mobile) {
        return (
            <div className="flex items-center gap-2 p-1 bg-gray-100/50 rounded-lg w-fit">
                {languages.map((lang) => {
                    const isActive = i18n.language.startsWith(lang.code);
                    return (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${isActive
                                    ? 'bg-white text-[var(--primary)] shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                                }`}
                        >
                            {lang.label}
                        </button>
                    );
                })}
            </div>
        );
    }

    // Determine text color based on navbar state
    const textColor = isScrolled || !isHome ? 'text-gray-700' : 'text-white';
    const hoverColor = isScrolled || !isHome ? 'hover:bg-gray-100' : 'hover:bg-white/10';

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${textColor} ${hoverColor}`}
                aria-label="Select Language"
            >
                <Globe className="w-4 h-4 opacity-80" />
                <span className="font-medium text-sm pt-0.5">{currentLang.label}</span>
                <ChevronDown
                    className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden py-1 z-50 origin-top-right"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors
                                    ${i18n.language.startsWith(lang.code) ? 'text-[var(--primary)] font-bold bg-green-50/50' : 'text-gray-600 font-medium'}
                                `}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${i18n.language.startsWith(lang.code) ? 'bg-[var(--primary)]' : 'bg-transparent'}`} />
                                {lang.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
