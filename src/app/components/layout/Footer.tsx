
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import { BRAND_IMAGES } from '../../config/images';

const Footer = () => {
    const { t } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();

    return (
        <footer className="bg-gray-50 text-gray-900 pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8 font-sans overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* TOP SECTION: COLUMNS */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 md:mb-12 border-b border-gray-200 pb-8 md:pb-12">

                    {/* COMPANY INFO (4 columns) */}
                    <div className="md:col-span-4 max-w-sm">
                        <Link to={getLocalizedPath('/')} className="flex items-center gap-2 mb-4 group">
                            <img
                                src={BRAND_IMAGES.logo}
                                alt="Swiss Ecogeste Logo"
                                className="h-8 w-auto group-hover:scale-105 transition-transform"
                            />
                            <span className="text-lg font-black tracking-tighter">{t('common.swissecogestes')}</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            {t('footer.slogan')}
                        </p>

                        <div className="space-y-3">
                            <a href="mailto:info@swissecogestes.ch" className="flex items-center gap-3 text-sm text-gray-500 hover:text-[var(--primary)] transition-colors">
                                <Mail size={16} strokeWidth={2.5} className="text-gray-400" />
                                info@swissecogestes.ch
                            </a>
                            <div className="flex items-start gap-3 text-sm text-gray-500">
                                <MapPin size={16} strokeWidth={2.5} className="text-gray-400 mt-1 shrink-0" />
                                <span>{t('footer.presence')} <br /> <span className="font-bold text-gray-700">Vaud & Genève</span></span>
                            </div>
                        </div>
                    </div>

                    {/* LINKS COLUMNS (8 columns) */}
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-left">
                        {/* Column 1: Services */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">{t('footer.services')}</h4>
                            <ul className="space-y-2 text-[13px] font-bold text-gray-400/80">
                                <li><Link to={getLocalizedPath('/services/villa')} className="hover:text-[var(--primary)] transition-colors">{t('nav.villa')}</Link></li>
                                <li><Link to={getLocalizedPath('/services/gerance')} className="hover:text-[var(--primary)] transition-colors">{t('nav.gerance')}</Link></li>
                                <li><Link to={getLocalizedPath('/services/entreprise')} className="hover:text-[var(--primary)] transition-colors">{t('nav.entreprise')}</Link></li>
                                <li><Link to={getLocalizedPath('/services/communes')} className="hover:text-[var(--primary)] transition-colors">{t('nav.communes')}</Link></li>
                            </ul>
                        </div>

                        {/* Column 2: Entreprise */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">{t('footer.company')}</h4>
                            <ul className="space-y-2 text-[13px] font-bold text-gray-400/80">
                                <li><Link to={getLocalizedPath('/#about')} className="hover:text-[var(--primary)] transition-colors">{t('nav.about')}</Link></li>
                                <li><Link to={getLocalizedPath('/team')} className="hover:text-[var(--primary)] transition-colors">{t('footer.team')}</Link></li>
                                <li><Link to={getLocalizedPath('/conseils')} className="hover:text-[var(--primary)] transition-colors">{t('footer.blog')}</Link></li>
                                <li><Link to={getLocalizedPath('/contact')} className="hover:text-[var(--primary)] transition-colors">{t('nav.contact')}</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Partenaires Officiels */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">{t('footer.partners')}</h4>
                            <ul className="space-y-2 text-[13px] font-bold text-gray-400/80">
                                <li className="hover:text-[var(--primary)] cursor-default">SIG Éco21</li>
                                <li className="hover:text-[var(--primary)] cursor-default">Suisse Énergie</li>
                                <li className="hover:text-[var(--primary)] cursor-default transition-colors">Chauffez Renouvelable</li>
                                <li className="hover:text-[var(--primary)] cursor-default transition-colors">Canton de Vaud & Genève</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: COPYRIGHT AND SOCIALS */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Copyright */}
                    <p className="text-[12px] font-bold text-gray-400/80 order-2 md:order-1">
                        © 2026 {t('common.swissecogestes')} - {t('footer.rights')}
                    </p>

                    {/* Legal Links (centered in reference) */}
                    <div className="flex flex-wrap justify-center gap-6 text-[12px] font-bold text-gray-400/80 order-3 md:order-2">
                        <Link to={getLocalizedPath('/mentions-legales')} className="hover:text-[var(--primary)] transition-colors">{t('footer.mentions')}</Link>
                        <Link to={getLocalizedPath('/confidentialite')} className="hover:text-[var(--primary)] transition-colors">{t('footer.privacy')}</Link>
                        <Link to={getLocalizedPath('/cookies')} className="hover:text-[var(--primary)] transition-colors">{t('footer.cookies')}</Link>
                    </div>

                    <div className="flex items-center gap-4 order-1 md:order-3">
                        <a
                            href="https://www.linkedin.com/company/swissecogestes/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0077b5] transition-all hover:-translate-y-1 hover:scale-110 inline-block"
                        >
                            <Linkedin size={20} fill="currentColor" strokeWidth={0} />
                        </a>
                        <a
                            href="https://www.instagram.com/swissecogestes/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#E4405F] transition-all hover:-translate-y-1 hover:scale-110 inline-block"
                        >
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
