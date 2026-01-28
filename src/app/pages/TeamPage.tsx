import React from 'react';
import SEO from '../components/SEO';
import Team from '../components/sections/Team';
import Reveal from '../components/animations/Reveal';

const TeamPage = () => {
    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Notre Équipe d'Experts"
                description="Rencontrez l'équipe de Swiss Ecogestes. Des experts passionnés par la transition énergétique et l'innovation durable."
                canonical="/equipe"
            />
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">À propos de nous</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">L'expertise au service de la planète</h1>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                            Basée à Lausanne, Swiss Ecogestes réunit des ingénieurs et spécialistes dédiés à l'optimisation des infrastructures énergétiques suisses. Notre mission est d'accélérer la transition vers des modèles plus sobres et efficaces.
                        </p>
                    </div>
                </Reveal>
            </div>
            <Team />

            <div className="max-w-7xl mx-auto px-6 mt-20">
                <Reveal>
                    <div className="bg-gray-50 rounded-lg p-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi choisir Swiss Ecogestes ?</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-xl font-bold text-[var(--primary)] mb-3">Indépendance</h3>
                                <p className="text-gray-600">Nos conseils sont neutres et basés uniquement sur vos intérêts énergétiques et financiers.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--primary)] mb-3">Qualité Suisse</h3>
                                <p className="text-gray-600">Une rigueur méthodologique héritée des plus hauts standards de l'ingénierie suisse.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--primary)] mb-3">Accompagnement</h3>
                                <p className="text-gray-600">On ne vous laisse pas avec un rapport. On vous accompagne jusqu'à la concrétisation des économies.</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default TeamPage;

