import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "../ui/button";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false); // For mobile dropdown
    const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false); // For tablet/desktop dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // Check scroll position on mount
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus when navigation occurs and reset scroll state
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDesktopServicesOpen(false);
        setIsServicesOpen(false);

        // Force scroll to top on the home page, then update navbar state
        if (location.pathname === '/') {
            window.scrollTo(0, 0);
            // Small delay to ensure scroll has happened before checking
            setTimeout(() => {
                setIsScrolled(window.scrollY > 50);
            }, 50);
        } else {
            setIsScrolled(window.scrollY > 50);
        }
    }, [location]);

    // Handle clicking outside of desktop dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDesktopServicesOpen(false);
            }
        };

        if (isDesktopServicesOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDesktopServicesOpen]);

    const serviceLinks = [
        { name: 'Régies & Immeubles', path: '/services/gerance' },
        { name: 'Villas & Maisons', path: '/services/villa' },
        { name: 'Entreprises', path: '/services/entreprise' },
        { name: 'Communes & GRD', path: '/services/communes' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white/85 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/Logo/Logo_EcoGeste_Sans_Fond.png"
                        alt="Swiss Ecogestes Logo"
                        className="h-14 md:h-20 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`text-xl font-bold tracking-tight ${isScrolled || !isHome ? 'text-[var(--primary)]' : 'text-white'}`}>
                        Swiss Ecogestes
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled || !isHome ? 'text-gray-700' : 'text-white/90'}`}>
                    {/* Services Dropdown Group */}
                    <div
                        ref={dropdownRef}
                        className="relative group cursor-pointer h-full flex items-center"
                        onMouseEnter={() => setIsDesktopServicesOpen(true)}
                        onMouseLeave={() => setIsDesktopServicesOpen(false)}
                        onClick={() => setIsDesktopServicesOpen(!isDesktopServicesOpen)}
                    >
                        <span className={`flex items-center gap-1 hover:text-amber-400 transition-colors ${location.pathname.startsWith('/services') ? 'text-amber-500' : ''}`}>
                            Nos Solutions <ChevronDown size={16} className={`transition-transform duration-200 ${isDesktopServicesOpen ? 'rotate-180' : ''}`} />
                        </span>

                        {/* Dropdown Content */}
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 min-w-[240px] ${isDesktopServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                            <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col">
                                {serviceLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)] text-left whitespace-nowrap"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to="/services" className={`hover:text-amber-400 transition-colors ${location.pathname === '/services' ? 'text-amber-500' : ''}`}>
                        Services
                    </Link>

                    <Link to="/conseils" className={`hover:text-amber-400 transition-colors ${location.pathname === '/conseils' ? 'text-amber-500' : ''}`}>
                        Actualités
                    </Link>

                    <Link to="/team" className={`hover:text-amber-400 transition-colors px-3 py-1 rounded-full border border-transparent hover:border-amber-400/30 ${location.pathname === '/team' ? 'text-amber-500 bg-amber-50 border-amber-200' : ''}`}>
                        À propos
                    </Link>

                    <Button asChild className="bg-[var(--primary)] hover:bg-[#0b2e24] text-white rounded-md px-6 transition-colors shadow-lg shadow-green-900/20">
                        <Link to="/contact">Contact</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-[var(--primary)]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : (
                        <Menu size={28} className={isScrolled || !isHome ? 'text-[var(--primary)]' : 'text-white'} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl md:hidden flex flex-col p-6 gap-4"
                        style={{ maxHeight: '80vh', overflowY: 'auto' }}
                    >
                        {/* Mobile Services Accordion */}
                        <div className="flex flex-col gap-2 border-b border-gray-50 pb-2">
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className="flex justify-between items-center text-gray-800 text-lg font-medium text-left w-full"
                            >
                                Nos Solutions <ChevronDown size={20} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isServicesOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="flex flex-col gap-3 pl-4 pt-2 overflow-hidden"
                                    >
                                        {serviceLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className="text-gray-600 text-base"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            to="/services"
                            className="text-gray-800 text-lg font-medium text-left border-b border-gray-50 pb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Services
                        </Link>

                        <Link
                            to="/conseils"
                            className="text-gray-800 text-lg font-medium text-left border-b border-gray-50 pb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Actualités
                        </Link>

                        <Link
                            to="/team"
                            className="text-gray-800 text-lg font-medium text-left border-b border-gray-50 pb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            À propos
                        </Link>

                        <Button asChild className="w-full bg-[var(--primary)] text-white mt-2">
                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

