import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

const EntreprisePage = () => {
    const services = [
        {
            title: "Audit Grands Consommateurs",
            description: "Pour les entreprises consommant plus de 100'000 kWh/an. Analyse détaillée et convention d'objectifs pour l'exemption de la taxe CO2.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"
        },
        {
            title: "Optimisation des Process",
            description: "Récupération de chaleur, modernisation des systèmes de ventilation et éclairage LED intelligent pour réduire les charges.",
            image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
        }
    ];

    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Services pour Entreprises | Audit & Stratégie"
                description="Optimisation énergétique pour PME et grandes entreprises. Audits grands consommateurs, optimisation process et bilan carbone."
                canonical="/services/entreprise"
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Back Link */}
                <Link to="/#nos-partenaires" className="inline-flex items-center text-gray-400 hover:text-[var(--primary)] transition-colors mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Retour au choix
                </Link>

                <Reveal>
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
                        <div className="md:w-1/2">
                            <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">PME & Industries</span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">Performance Énergétique Industrielle</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Réduisez vos coûts d'exploitation et conformez-vous aux nouvelles exigences légales.
                                Swiss Ecogestes accompagne les entreprises dans leur transition vers une production décarbonée et rentable.
                            </p>
                            <Link to="/contact">
                                <Button size="lg" className="bg-[var(--primary)] hover:bg-[#1a4d3e] text-white rounded-md">
                                    Audit pour Entreprise <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="md:w-1/2">
                            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-100 h-64 md:h-96 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
                                    alt="Industrie et performance énergétique"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Services Grid with Images */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {services.map((service, index) => (
                        <Reveal key={index} delay={0.1 * (index + 1)}>
                            <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-xl transition-all overflow-hidden group h-full flex flex-col">
                                {/* Image at top */}
                                <div className="h-56 overflow-hidden relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed flex-grow">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EntreprisePage;
