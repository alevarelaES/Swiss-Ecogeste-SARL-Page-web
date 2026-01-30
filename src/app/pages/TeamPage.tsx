import React from 'react';
import { ShieldCheck, Scale, Database, FileCheck, Award, Users } from 'lucide-react';
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
                    <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Engagements & Valeurs</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Au-delà de l'expertise technique, nous apportons une sécurité et une tranquillité d'esprit à tous nos partenaires.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {/* Value 1 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Partenaire de Confiance</h3>
                                <p className="text-gray-600">Reconnu par la direction de l'énergie et les programmes cantonaux officiels.</p>
                            </div>

                            {/* Value 2 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100">
                                    <Scale size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Neutralité Commerciale</h3>
                                <p className="text-gray-600">Conseils objectifs sans conflit d'intérêt. Nous ne vendons pas de matériel.</p>
                            </div>

                            {/* Value 3 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100">
                                    <Database size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Protection des Données</h3>
                                <p className="text-gray-600">Données hébergées en Suisse et traitées avec la plus stricte confidentialité.</p>
                            </div>

                            {/* Value 4 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100">
                                    <FileCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Cadre Légal Maîtrisé</h3>
                                <p className="text-gray-600">Veille juridique constante (MoPEC, IDC) pour garantir votre conformité.</p>
                            </div>

                            {/* Value 5 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100">
                                    <Award size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Processus Qualité</h3>
                                <p className="text-gray-600">Rigueur méthodologique suisse, de l'audit jusqu'à la réception des travaux.</p>
                            </div>

                            {/* Value 6 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Approche Humaine</h3>
                                <p className="text-gray-600">Pédagogie et accompagnement personnalisé pour chaque projet.</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default TeamPage;

