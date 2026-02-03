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
            <div className="absolute inset-0 bg-white/80"></div>
            <div className="absolute inset-0 bg-[#f0fdf4]/85"></div>

            {/* MOTIFS DÉCORATIFS "GOOD VIBES" - PLUS RICHES ET APAISANTS */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Blob principal haut droite */}
                <div className="absolute top-0 right-0 w-2/3 h-2/3 opacity-25">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-400 fill-current">
                        <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87,-15.7,86.2,-0.4C85.5,14.8,80.7,29.7,73.4,43.1C66.1,56.5,56.4,68.5,44,76.1C31.5,83.8,15.8,87.1,0.5,86.3C-14.8,85.5,-29.7,80.6,-43.1,73.3C-56.5,66,-68.5,56.3,-76.1,43.9C-83.7,31.4,-87,15.7,-86.3,0.4C-85.5,-14.8,-80.7,-29.7,-73.4,-43.1C-66.1,-56.5,-56.4,-68.5,-44,-76.1C-31.5,-83.7,-15.7,-87,-0.4,-86.3C15,-85.5,29.9,-80.6,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>

                {/* Motif de feuilles 1 */}
                <div className="absolute top-1/2 right-10 w-48 h-48 opacity-20 rotate-45">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#15472b] w-full h-full">
                        <path d="M2 22C2 22 3 18 12 17C12 17 9 22 2 22Z" />
                        <path d="M12 17C21 18 22 22 22 22C22 22 17 12 12 17Z" />
                        <path d="M12 17V2" />
                    </svg>
                </div>

                {/* Motif de feuilles 2 */}
                <div className="absolute bottom-1/4 left-5 w-32 h-32 opacity-25 -rotate-12">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-800 w-full h-full">
                        <path d="M2 22C2 22 3 18 12 17C12 17 9 22 2 22Z" />
                        <path d="M12 17C21 18 22 22 22 22C22 22 17 12 12 17Z" />
                        <path d="M12 17V2" />
                    </svg>
                </div>

                {/* Feuilles supplémentaires pour le côté "nature" */}
                <div className="absolute top-10 left-1/3 w-16 h-16 opacity-15 rotate-[120deg]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-emerald-900 w-full h-full">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.15,20C11.33,20 14.04,18.04 15.35,14.82C15.86,13.59 16.27,11.83 17,8M7.5,14A1.5,1.5 0 1,1 6,15.5A1.5,1.5 0 0,1 7.5,14Z" />
                    </svg>
                </div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 opacity-10 rotate-[200deg]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-emerald-950 w-full h-full">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.15,20C11.33,20 14.04,18.04 15.35,14.82C15.86,13.59 16.27,11.83 17,8M7.5,14A1.5,1.5 0 1,1 6,15.5A1.5,1.5 0 0,1 7.5,14Z" />
                    </svg>
                </div>

                {/* Plus de motifs de nature */}
                <div className="absolute bottom-10 right-10 w-40 h-40 opacity-15 -rotate-45">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-900 w-full h-full">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </div>
                <div className="absolute top-1/4 right-1/3 w-12 h-12 opacity-20 rotate-12">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-emerald-700 w-full h-full">
                        <path d="M12,2L12.09,2.09C15.91,5.91 15.91,12.09 12.09,15.91C8.27,19.73 2.09,19.73 2,19.73C2.09,15.91 5.91,9.73 9.73,5.91C10.4,5.24 11.21,4.64 12,4.09V2M15.5,11.5A1,1 0 1,1 14.5,12.5A1,1 0 0,1 15.5,11.5Z" />
                    </svg>
                </div>

                {/* Bulles de douceur et gradients zen */}
                <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-50 rounded-full blur-[80px] opacity-60"></div>
                <div className="absolute bottom-1/2 right-1/4 w-[400px] h-[400px] bg-sky-50/50 rounded-full blur-[120px]"></div>

                {/* Petits points organiques */}
                <div className="absolute top-1/3 left-10 w-3 h-3 rounded-full bg-emerald-400/30"></div>
                <div className="absolute top-1/4 left-20 w-2 h-2 rounded-full bg-amber-400/30"></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-[#1b5e39]/10"></div>

                {/* Cercles Zen / Ondes de détente */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-emerald-600/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-emerald-600/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-emerald-600/10 rounded-full opacity-60"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="bg-white/60 backdrop-blur-md p-4 sm:p-6 md:p-10 rounded-none border border-white/50 text-left w-full shadow-xl">
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
                            <div className="relative aspect-square bg-white shadow-2xl border border-gray-200 w-full max-w-md mx-auto rounded-none overflow-hidden">
                                <img src={BACKGROUND_IMAGES.aboutMain} alt="Office" className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute -bottom-6 right-0 left-0 mx-auto md:left-auto md:-bottom-10 md:-right-10 bg-white p-6 md:p-8 rounded-none shadow-2xl max-w-[85%] md:max-w-xs border border-gray-100 transform md:hover:scale-105 transition-transform duration-300 text-left">
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

