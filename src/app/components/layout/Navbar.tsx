import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "../ui/button";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import { BRAND_IMAGES } from '../../config/images';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false); // For mobile dropdown
    const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false); // For tablet/desktop dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const { getLocalizedPath } = useLocalizedPath();
    const isHome = location.pathname === getLocalizedPath('/') || location.pathname === '/';
    const { t } = useTranslation('common');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Body scroll lock with iOS rubber-banding prevention
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
            document.documentElement.style.overscrollBehavior = 'none';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.documentElement.style.overscrollBehavior = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            }
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.documentElement.style.overscrollBehavior = '';
        };
    }, [isMobileMenuOpen]);

    // Close mobile menu on Escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
                setIsServicesOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
    }, [location.pathname]);

    const serviceLinks = [
        { name: t('nav.gerance'), path: getLocalizedPath('/services/gerance') },
        { name: t('nav.villa'), path: getLocalizedPath('/services/villa') },
        { name: t('nav.entreprise'), path: getLocalizedPath('/services/entreprise') },
        { name: t('nav.communes'), path: getLocalizedPath('/services/communes') },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white/80 backdrop-blur-md shadow-md py-3' : 'py-5'}`}>
            {/* Dark gradient overlay for better readability on transparent background */}
            {!isScrolled && isHome && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            )}

            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
                <Link 
                    to={getLocalizedPath('/')} 
                    className="flex items-center gap-3 relative z-[60]"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <img
                        src={BRAND_IMAGES.logo}
                        alt="Swiss Ecogestes Logo"
                        className="h-14 md:h-16 lg:h-20 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`text-lg md:text-xl font-bold tracking-tight ${isMobileMenuOpen ? 'text-gray-900' : (isScrolled || !isHome ? 'text-[var(--primary)]' : 'text-white drop-shadow-md')}`}>
                        {t('common.swissecogestes')}
                    </span>
                </Link>

                {/* Desktop Menu - Now lg:flex for better tablet support */}
                <div className={`hidden lg:flex items-center gap-8 font-medium ${isScrolled || !isHome ? 'text-gray-700' : 'text-white/90 drop-shadow-md'}`}>
                    {/* Services Dropdown Group */}
                    <div
                        ref={dropdownRef}
                        className="relative group cursor-pointer h-full flex items-center"
                        onMouseEnter={() => setIsDesktopServicesOpen(true)}
                        onMouseLeave={() => setIsDesktopServicesOpen(false)}
                        onClick={() => setIsDesktopServicesOpen(!isDesktopServicesOpen)}
                    >
                        <span className={`flex items-center gap-1 hover:text-amber-400 transition-colors ${location.pathname.includes('/services/') ? 'text-amber-500' : ''}`}>
                            {t('nav.services')} <ChevronDown size={16} className={`transition-transform duration-200 ${isDesktopServicesOpen ? 'rotate-180' : ''}`} />
                        </span>

                        {/* Dropdown Content */}
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 min-w-[240px] ${isDesktopServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                            <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col">
                                {serviceLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)] text-left whitespace-nowrap"
                                        onClick={() => setIsDesktopServicesOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to={getLocalizedPath('/services')} className={`hover:text-amber-400 transition-colors ${location.pathname === getLocalizedPath('/services') ? 'text-amber-500' : ''}`}>
                        {t('nav.our_services')}
                    </Link>

                    <Link to={getLocalizedPath('/conseils')} className={`hover:text-amber-400 transition-colors ${location.pathname === getLocalizedPath('/conseils') ? 'text-amber-500' : ''}`}>
                        {t('nav.journal')}
                    </Link>

                    <Link to={getLocalizedPath('/team')} className={`hover:text-amber-400 transition-colors px-3 py-1 rounded-full border border-transparent hover:border-amber-400/30 ${location.pathname === getLocalizedPath('/team') ? 'text-amber-500 bg-amber-50 border-amber-200' : ''}`}>
                        {t('nav.about')}
                    </Link>

                    <Button asChild className="bg-[var(--primary)] hover:bg-[#0b2e24] text-white rounded-md px-6 transition-colors shadow-lg shadow-green-900/20">
                        <Link to={getLocalizedPath('/contact')}>{t('nav.contact')}</Link>
                    </Button>

                    <div className="pl-2 border-l border-white/20 ml-2">
                        <LanguageSwitcher isScrolled={isScrolled} isHome={isHome} />
                    </div>
                </div>

                {/* Mobile Toggle - Now lg:hidden */}
                <button
                    className="lg:hidden p-2 rounded-full transition-colors relative z-[60] active:scale-95"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    aria-expanded={isMobileMenuOpen}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isMobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.15 }}
                            >
                                <X size={28} className="text-gray-900" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: -90 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Menu size={28} className={isScrolled || !isHome ? 'text-[var(--primary)]' : 'text-white drop-shadow-md'} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Premium Mobile Menu Overlay */}
            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-0 top-0 z-50 min-h-[100dvh] h-[100dvh] bg-white/98 backdrop-blur-2xl flex flex-col p-8 pt-24 overflow-y-auto overscroll-none touch-pan-y lg:hidden"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                        onClick={(e) => e.target === e.currentTarget && setIsMobileMenuOpen(false)}
                    >
                        {/* Close Button - Top Right */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors z-[60]"
                            aria-label="Fermer le menu"
                        >
                            <X size={28} className="text-gray-900" />
                        </button>

                        <div className="flex flex-col h-full max-w-lg mx-auto w-full">
                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-4">
                                {/* Services Accordion */}
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                                        className="flex justify-between items-center text-gray-900 text-3xl font-black tracking-tighter text-left w-full group py-2"
                                    >
                                        <span className={isServicesOpen ? 'text-[var(--primary)]' : ''}>{t('nav.services')}</span>
                                        <ChevronDown size={28} className={`transition-transform duration-300 text-gray-300 ${isServicesOpen ? 'rotate-180 text-[var(--primary)]' : ''}`} />
                                    </button>

                                    <AnimatePresence mode="wait">
                                        {isServicesOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                                className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100 overflow-hidden mb-4"
                                            >
                                                {serviceLinks.map((link, idx) => (
                                                    <motion.div
                                                        key={link.path}
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                    >
                                                        <Link
                                                            to={link.path}
                                                            className="text-gray-500 text-xl font-bold py-1 block hover:text-[var(--primary)] transition-colors"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {[
                                    { to: '/services', label: t('nav.our_services') },
                                    { to: '/conseils', label: t('nav.journal') },
                                    { to: '/team', label: t('nav.about') }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={item.to}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <Link
                                            to={getLocalizedPath(item.to)}
                                            className="text-gray-900 text-3xl font-black tracking-tighter py-3 block hover:text-[var(--primary)] transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Bottom Actions */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-auto flex flex-col gap-10 pt-10 border-t border-gray-100"
                            >
                                <div className="flex flex-col gap-4">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('nav.choose_language')}</p>
                                    <LanguageSwitcher mobile={true} />
                                </div>

                                <Button asChild className="w-full bg-[var(--primary)] hover:bg-[#0b2e24] text-white text-xl font-bold py-8 rounded-2xl shadow-2xl shadow-green-900/10 active:scale-[0.98] transition-all">
                                    <Link to={getLocalizedPath('/contact')} onClick={() => setIsMobileMenuOpen(false)}>
                                        {t('nav.contact')}
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

