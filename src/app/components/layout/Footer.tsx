
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Linkedin, Instagram, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 text-gray-900 pt-24 pb-12 font-sans overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* TOP SECTION: COLUMNS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 border-b border-gray-200 pb-20">

                    {/* COMPANY INFO (4 columns) */}
                    <div className="lg:col-span-4 max-w-sm">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <img
                                src="/Logo/Logo_EcoGeste_Sans_Fond.png"
                                alt="Swiss Ecogeste Logo"
                                className="h-10 w-auto group-hover:scale-105 transition-transform"
                            />
                            <span className="text-xl font-black tracking-tighter">Swiss Ecogeste</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Votre partenaire expert pour la transition énergétique en Suisse Romande. <br /> Solutions durables et accompagnement sur-mesure.
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:info@swissecogestes.ch" className="flex items-center gap-3 text-sm text-gray-500 hover:text-[var(--primary)] transition-colors">
                                <Mail size={16} strokeWidth={2.5} className="text-gray-400" />
                                info@swissecogestes.ch
                            </a>
                            <div className="flex items-start gap-3 text-sm text-gray-500">
                                <MapPin size={16} strokeWidth={2.5} className="text-gray-400 mt-1 shrink-0" />
                                <span>Présence sur les cantons de <br /> <span className="font-bold text-gray-700">Vaud et Genève</span></span>
                            </div>
                        </div>
                    </div>

                    {/* LINKS COLUMNS (8 columns) */}
                    <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-12 text-left">
                        {/* Column 1: Services */}
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Nos Services</h4>
                            <ul className="space-y-4 text-[13px] font-bold text-gray-400/80">
                                <li><Link to="/villa" className="hover:text-[var(--primary)] transition-colors">Visite Villa</Link></li>
                                <li><Link to="/gerance" className="hover:text-[var(--primary)] transition-colors">Gérances (IDC)</Link></li>
                                <li><Link to="/entreprise" className="hover:text-[var(--primary)] transition-colors">Entreprises</Link></li>
                                <li><Link to="/equiwatt" className="hover:text-[var(--primary)] transition-colors">Subventions Equiwatt</Link></li>
                            </ul>
                        </div>

                        {/* Column 2: Entreprise */}
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Swiss Ecogeste</h4>
                            <ul className="space-y-4 text-[13px] font-bold text-gray-400/80">
                                <li><Link to="/entreprise" className="hover:text-[var(--primary)] transition-colors">À propos</Link></li>
                                <li><Link to="/equipe" className="hover:text-[var(--primary)] transition-colors">Notre équipe</Link></li>
                                <li><Link to="/conseils" className="hover:text-[var(--primary)] transition-colors">Le Journal</Link></li>
                                <li><Link to="/contact" className="hover:text-[var(--primary)] transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Partenaires Officiels */}
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Partenaires</h4>
                            <ul className="space-y-4 text-[13px] font-bold text-gray-400/80">
                                <li className="hover:text-[var(--primary)] cursor-default">SIG Éco21</li>
                                <li className="hover:text-[var(--primary)] cursor-default">Suisse Énergie</li>
                                <li className="hover:text-[var(--primary)] cursor-default transition-colors">Chauffez Renouvelable</li>
                                <li className="hover:text-[var(--primary)] cursor-default transition-colors">Canton de Vaud & Genève</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: COPYRIGHT AND SOCIALS */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Copyright */}
                    <p className="text-[13px] font-bold text-gray-400/80 order-2 md:order-1">
                        © 2026 Swiss Ecogeste - Tous droits réservés
                    </p>

                    {/* Legal Links (centered in reference) */}
                    <div className="flex flex-wrap justify-center gap-8 text-[13px] font-bold text-gray-400/80 order-3 md:order-2">
                        <Link to="/" className="hover:text-[var(--primary)] transition-colors">Mentions Légales</Link>
                        <Link to="/" className="hover:text-[var(--primary)] transition-colors">Confidentialité</Link>
                        <Link to="/" className="hover:text-[var(--primary)] transition-colors">Cookie Policy</Link>
                    </div>

                    {/* Social Icons (Only LinkedIn & Instagram) */}
                    <div className="flex items-center gap-6 order-1 md:order-3">
                        <motion.a
                            whileHover={{ y: -3, scale: 1.1 }}
                            href="https://www.linkedin.com/company/swissecogestes/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#0077b5] transition-colors"
                        >
                            <Linkedin size={22} fill="currentColor" strokeWidth={0} />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -3, scale: 1.1 }}
                            href="https://www.instagram.com/swissecogestes/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#DD2A7B] transition-colors"
                        >
                            <Instagram size={22} />
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
