import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from "../ui/button";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'À propos', path: '/equipe' }, // Or keep as anchor if user prefers
        { name: 'Services', path: '/services' },
        { name: 'Équipe', path: '/equipe' },
        { name: 'Conseils', path: '/conseils' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/Logo/Logo_EcoGeste_Sans_Fond.png"
                        alt="Swiss Ecogestes Logo"
                        className="h-14 w-auto"
                    />
                    <span className={`text-xl font-bold tracking-tight ${isScrolled || !isHome ? 'text-gray-900' : 'text-white'}`}>
                        Swiss Ecogestes
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled || !isHome ? 'text-gray-700' : 'text-white/90'}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`hover:text-amber-400 transition-colors ${location.pathname === link.path ? 'text-amber-500' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button asChild className="bg-green-600 hover:bg-amber-500 text-white rounded-full px-6 transition-colors">
                        <Link to="/contact">Contact</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-green-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : (
                        <Menu size={28} className={isScrolled || !isHome ? 'text-gray-800' : 'text-white'} />
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
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-gray-800 text-lg font-medium text-left"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button asChild className="w-full bg-green-600 text-white">
                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
