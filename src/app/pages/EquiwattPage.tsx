import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

const EquiwattPage = () => {
    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Programme Équiwatt | Subventions & Économies"
                description="Découvrez le programme Équiwatt. Profitez de subventions pour optimiser votre consommation électrique et réduire votre facture énergétique."
                canonical="/equiwatt"
            />

            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">Programme National</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Équiwatt : L'efficacité électrique récompensée</h1>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                            Équiwatt est un programme de soutien qui encourage les mesures d'efficacité électrique.
                            Que vous soyez un particulier ou une entreprise, bénéficiez d'aides financières pour moderniser vos installations.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi participer ?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-[var(--primary)] mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">Subventions attractives pour le remplacement d'installations énergivores.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-[var(--primary)] mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">Réduction durable de votre facture d'électricité.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-[var(--primary)] mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">Contribution concrète à la stratégie énergétique 2050.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-[var(--primary)] mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">Audit et accompagnement par nos experts accrédités.</span>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <Link to="/contact">
                                    <Button size="lg" className="bg-[var(--primary)] hover:bg-[#1a4d3e] text-white rounded-md">
                                        Vérifier mon éligibilité <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border border-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000"
                                    alt="Ampoule économique"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white font-bold text-xl">
                                    Moins de Watt, plus d'Écot
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.4}>
                    <div className="bg-[var(--primary)]/5 rounded-lg p-8 md:p-12 text-center border border-[var(--primary)]/10">
                        <Zap size={48} className="text-[var(--primary)] mx-auto mb-6" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Prêt à passer à l'action ?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                            Swiss Ecogestes vous accompagne dans toutes les démarches administratives pour obtenir vos subventions Équiwatt.
                        </p>
                        <Link to="/contact">
                            <Button size="lg" variant="outline" className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-md bg-white">
                                Contactez un expert Équiwatt
                            </Button>
                        </Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default EquiwattPage;

