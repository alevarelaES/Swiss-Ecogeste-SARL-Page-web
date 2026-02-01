import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../animations/Reveal';
import { BACKGROUND_IMAGES } from '../../config/images';
import { useTranslation } from 'react-i18next';
import { getAboutContent } from '../../data/aboutContent';

const About = () => {
    const { t, i18n } = useTranslation();
    const aboutContent = getAboutContent(i18n.language);
    const values = aboutContent.values;

    return (
        <section id="about" className="py-16 md:py-20 lg:py-24 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('${BACKGROUND_IMAGES.about}')`, backgroundBlendMode: 'screen' }}>
            <div className="absolute inset-0 bg-white/75"></div>
            <div className="absolute inset-0 bg-emerald-900/15"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="bg-white/40 backdrop-blur-md p-4 sm:p-6 md:p-10 rounded-2xl border border-white/50 text-left w-full">
                        <Reveal>
                            <span className="inline-block text-[var(--primary)] font-bold tracking-widest uppercase text-xs bg-[var(--primary)]/10 px-4 py-2 rounded-md mb-4">{aboutContent.sectionLabel}</span>
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 sm:mb-8 leading-tight">{aboutContent.title}</h2>
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
                                            <div className="hidden md:block w-0.5 h-16 bg-gradient-to-b from-[var(--primary)] to-emerald-500"></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <Link to={t('about.cta_link')} className="inline-flex items-center gap-2 text-[var(--primary)] font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all group">
                                {t('about.cta_text')} <ArrowRight size={18} />
                            </Link>
                        </Reveal>
                    </div>

                    <div className="relative flex justify-center w-full">
                        <Reveal delay={0.2}>
                            <div className="relative aspect-square bg-white/40 backdrop-blur-lg rounded-lg overflow-hidden shadow-2xl border-2 border-white/70 w-full max-w-md mx-auto">
                                <img src={BACKGROUND_IMAGES.aboutMain} alt="Office" className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute -bottom-6 right-0 left-0 mx-auto md:left-auto md:-bottom-10 md:-right-10 bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl max-w-[85%] md:max-w-xs border-2 border-gray-300 transform md:hover:scale-105 transition-transform duration-300 text-left">
                                <p className="text-gray-900 font-semibold text-sm italic leading-relaxed">{t('about.quote')}</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

