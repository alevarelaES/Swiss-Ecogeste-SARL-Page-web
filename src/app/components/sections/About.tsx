import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../animations/Reveal';
import { BACKGROUND_IMAGES } from '../../config/images';
import { useTranslation } from 'react-i18next';
import { getAboutContent } from '../../data/aboutContent';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

const About = () => {
    const { i18n } = useTranslation();
    const { getLocalizedPath } = useLocalizedPath();
    const aboutContent = getAboutContent(i18n.language);
    const values = aboutContent.values;

    return (
        <section id="about" className="py-16 md:py-20 lg:py-24 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('${BACKGROUND_IMAGES.about}')` }}>
            <div className="absolute inset-0 bg-[#e8f5e9]/60"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="relative bg-white/60 backdrop-blur-md p-4 sm:p-6 md:p-10 rounded-none border border-white/50 text-left w-full shadow-xl">
                        {/* Coins décoratifs jaunes */}
                        <div className="absolute top-4 right-4 w-8 h-[1px] bg-amber-500 opacity-60"></div>
                        <div className="absolute top-4 right-4 w-[1px] h-8 bg-amber-500 opacity-60"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-[1px] bg-amber-500 opacity-60"></div>
                        <div className="absolute bottom-4 left-4 w-[1px] h-8 bg-amber-500 opacity-60"></div>

                        <Reveal>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="h-[2px] w-12 bg-amber-500"></span>
                                <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">
                                    {aboutContent.sectionLabel}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 sm:mb-8 leading-tight">
                                {aboutContent.title}
                            </h2>
                            <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-6 font-medium">
                                {aboutContent.paragraph1}
                            </p>
                            <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-10 font-medium">
                                {aboutContent.paragraph2}
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 justify-start mb-8">
                                {values.map((value, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex flex-col items-start min-w-[30%] md:min-w-0">
                                            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--primary)] mb-2">{value.title}</span>
                                            <span className="text-gray-700 font-semibold text-xs md:text-sm">{value.subtitle}</span>
                                        </div>
                                        {index < values.length - 1 && (
                                            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-[var(--primary)]/50 to-emerald-500/50"></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <Link to={getLocalizedPath(aboutContent.ctaLink)} className="inline-flex items-center gap-2 text-[var(--primary)] font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all group">
                                {aboutContent.ctaText} <ArrowRight size={18} />
                            </Link>
                        </Reveal>
                    </div>

                    <div className="relative flex justify-center w-full">
                        <Reveal delay={0.2}>
                            <div className="relative aspect-square bg-white shadow-2xl border border-gray-100 w-full max-w-md mx-auto rounded-none overflow-hidden">
                                <img src={BACKGROUND_IMAGES.aboutMain} alt="Office" className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute -bottom-6 right-0 left-0 mx-auto md:left-auto md:-bottom-10 md:-right-10 bg-white/95 p-6 md:p-8 rounded-none shadow-2xl max-w-[85%] md:max-w-xs border border-gray-100 transform md:hover:scale-105 transition-transform duration-300 text-left">
                                {/* Coins décoratifs jaunes */}
                                <div className="absolute top-3 right-3 w-6 h-[1px] bg-amber-500 opacity-60"></div>
                                <div className="absolute top-3 right-3 w-[1px] h-6 bg-amber-500 opacity-60"></div>
                                <div className="absolute bottom-3 left-3 w-6 h-[1px] bg-amber-500 opacity-60"></div>
                                <div className="absolute bottom-3 left-3 w-[1px] h-6 bg-amber-500 opacity-60"></div>
                                
                                <p className="text-gray-900 font-semibold text-sm italic leading-relaxed">{aboutContent.quote}</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

