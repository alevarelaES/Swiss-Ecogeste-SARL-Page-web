import React from 'react';
import Reveal from '../animations/Reveal';
import { BACKGROUND_IMAGES, PLACEHOLDER_IMAGES } from '../../config/images';

const About = () => {
    return (
        <section id="about" className="py-24 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('${BACKGROUND_IMAGES.about}')`, backgroundBlendMode: 'screen' }}>
            <div className="absolute inset-0 bg-white/75"></div>
            <div className="absolute inset-0 bg-emerald-900/15"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/50 text-left w-full">
                        <Reveal>
                            <span className="inline-block text-[var(--primary)] font-bold tracking-widest uppercase text-xs bg-[var(--primary)]/10 px-4 py-2 rounded-md mb-4">À propos de nous</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-8 leading-tight">Engagés pour un avenir durable</h2>
                            <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-6 font-medium">
                                Chez Swiss Ecogestes, nous sommes des acteurs de la transition énergétique. L'impact global commence par des actions locales, et nous collaborons étroitement avec les acteurs suisses pour promouvoir l'efficacité énergétique et réduire les déchets.
                            </p>
                            <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-10 font-medium">
                                Notre engagement se manifeste à travers des audits énergétiques personnalisés, conçus pour optimiser l’utilisation de l’énergie et minimiser les déchets. Nous accompagnons avec des solutions clés en main.
                            </p>

                            <div className="flex flex-wrap gap-4 md:gap-8 justify-between md:justify-start">
                                <div className="flex flex-col items-start min-w-[30%] md:min-w-0">
                                    <span className="text-3xl md:text-4xl font-black text-[var(--primary)] mb-2">Local</span>
                                    <span className="text-gray-700 font-semibold text-xs md:text-sm">Action suisse</span>
                                </div>
                                <div className="hidden md:block w-0.5 h-16 bg-gradient-to-b from-[var(--primary)] to-emerald-500"></div>
                                <div className="flex flex-col items-start min-w-[30%] md:min-w-0">
                                    <span className="text-3xl md:text-4xl font-black text-[var(--primary)] mb-2">Bio</span>
                                    <span className="text-gray-700 font-semibold text-xs md:text-sm">Écologique</span>
                                </div>
                                <div className="hidden md:block w-0.5 h-16 bg-gradient-to-b from-[var(--primary)] to-emerald-500"></div>
                                <div className="flex flex-col items-start min-w-[30%] md:min-w-0">
                                    <span className="text-3xl md:text-4xl font-black text-[var(--primary)] mb-2">Éco</span>
                                    <span className="text-gray-700 font-semibold text-xs md:text-sm">Économique</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="relative flex justify-center w-full order-first lg:order-last">
                        <Reveal delay={0.2}>
                            <div className="relative aspect-square bg-white/40 backdrop-blur-lg rounded-lg overflow-hidden shadow-2xl border-2 border-white/70 w-full max-w-md mx-auto">
                                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000" alt="Office" className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="absolute -bottom-6 right-0 left-0 mx-auto md:left-auto md:-bottom-10 md:-right-10 bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl max-w-[85%] md:max-w-xs border-2 border-gray-300 transform md:hover:scale-105 transition-transform duration-300 text-left">
                                <p className="text-gray-900 font-semibold text-sm italic leading-relaxed">"L'énergie la plus propre est celle que l'on ne consomme pas"</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

