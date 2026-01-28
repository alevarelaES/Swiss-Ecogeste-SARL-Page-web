import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { Calculator, BarChart3, ArrowRight, Building } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

const GerancePage = () => {
    const services = [
        {
            icon: Calculator,
            title: "Calcul IDC",
            description: "Calcul de l'Indice de Dépense de Chaleur obligatoire. Suivi annuel et optimisation pour éviter les sanctions.",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800"
        },
        {
            icon: Building,
            title: "Audit de Parc",
            description: "Analyse globale de portefeuilles immobiliers. Identification des objets prioritaires pour la rénovation.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800"
        },
        {
            icon: BarChart3,
            title: "Subventions",
            description: "Gestion complète des demandes de subventions (Programme Bâtiments, etc.) pour vos travaux de rénovation.",
            image: "https://images.unsplash.com/photo-1759398430338-8057876edf61?q=80&w=800"
        }
    ];

    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Services Régies & Gérances | IDC & Rénovation"
                description="Partenaire des régies immobilières. Calcul IDC, audit de parc immobilier et planification de rénovation énergétique."
                canonical="/services/gerance"
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Hero Section with Image */}
                <Reveal>
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
                        <div className="md:w-1/2">
                            <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">Immobilier & Régies</span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">Gestion Énergétique de Parc</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Nous aidons les gérances et propriétaires institutionnels à valoriser leur parc immobilier et à répondre aux obligations légales (IDC, CECB).
                            </p>
                            <Link to="/contact">
                                <Button size="lg" className="bg-[var(--primary)] hover:bg-[#1a4d3e] text-white rounded-md">
                                    Contacter notre pôle Régie <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="md:w-1/2">
                            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-100 h-64 md:h-96 relative">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')" }}
                                />
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Services Grid with Images */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Reveal key={index} delay={0.1 * (index + 1)}>
                            <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                                {/* Image at top */}
                                <div className="h-48 overflow-hidden relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-8 text-center">
                                    <div className="mx-auto w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-md flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-lg bg-white border-4 border-white">
                                        <service.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
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

export default GerancePage;

