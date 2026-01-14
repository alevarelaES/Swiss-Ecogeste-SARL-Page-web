import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
                <div className="col-span-1 md:col-span-1 text-left">
                    <Link to="/" className="flex items-center gap-3 mb-6">
                        <img
                            src="/Logo/Logo_EcoGeste_Sans_Fond.png"
                            alt="Swiss Ecogestes Logo"
                            className="h-10 w-auto brightness-0 invert"
                        />
                        <span className="text-xl font-bold">Swiss Ecogestes</span>
                    </Link>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Votre partenaire de confiance pour la transition énergétique en Suisse. Expertise, innovation et durabilité.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com/company/swissecogestes/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors">
                            <Linkedin size={18} />
                        </a>
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                            <Facebook size={18} />
                        </div>
                    </div>
                </div>

                <div className="text-left">
                    <h4 className="text-lg font-bold mb-6">Services</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/services" className="hover:text-amber-400 transition-colors">Visite conseil Villa</Link></li>
                        <li><Link to="/services" className="hover:text-amber-400 transition-colors">Calcul de l'IDC</Link></li>
                        <li><Link to="/services" className="hover:text-amber-400 transition-colors">Chauffez Renouvelable</Link></li>
                        <li><Link to="/services" className="hover:text-amber-400 transition-colors">Eco-logement</Link></li>
                    </ul>
                </div>

                <div className="text-left">
                    <h4 className="text-lg font-bold mb-6">Entreprise</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/equipe" className="hover:text-amber-400 transition-colors">À propos</Link></li>
                        <li><Link to="/equipe" className="hover:text-amber-400 transition-colors">Notre Équipe</Link></li>
                        <li><Link to="/conseils" className="hover:text-amber-400 transition-colors">Actualités</Link></li>
                        <li className="hover:text-amber-400 cursor-pointer transition-colors">Carrières</li>
                    </ul>
                </div>

                <div className="text-left">
                    <h4 className="text-lg font-bold mb-6">Contact</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex items-center gap-3"><Phone size={16} className="text-green-600" /> +41 21 000 00 00</li>
                        <li className="flex items-center gap-3"><Mail size={16} className="text-green-600" /> info@swissecogestes.ch</li>
                        <li className="flex items-center gap-3"><MapPin size={16} className="text-green-600" /> Route de Chavannes 207,<br />1007 Lausanne</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                <p>&copy; 2026 Swiss Ecogestes SA. Tous droits réservés.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span className="hover:text-white cursor-pointer transition-colors">Mentions Légales</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Confidentialité</span>
                    <span className="hover:text-white cursor-pointer transition-colors">CGV</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
