import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { Map, Users, Banknote, BarChart3, ArrowRight, Landmark, ArrowLeft } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

const CommunesPage = () => {
    const services = [
        {
            icon: Map,
            title: "Audits Territoriaux",
            description: "Analyse complète du parc immobilier communal et planification de la transition énergétique à l'échelle du quartier.",
            image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000"
        },
        {
            icon: Users,
            title: "Sensibilisation Citoyenne",
            description: "Campagnes d'information et ateliers participatifs pour engager vos habitants dans la démarche écologique.",
            image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000"
        },
        {
            icon: Banknote,
            title: "Programmes Subventionnés",
            description: "Mise en place et gestion de programmes d'aide communaux, alignés avec les subventions cantonales et fédérales.",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000"
        },
        {
            icon: BarChart3,
            title: "Impact & Reporting",
            description: "Mesure précise des économies d'énergie et de la réduction de CO2 pour votre bilan de législature.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000"
        }
    ];

    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Services pour Communes & GRD | Transition Énergétique"
                description="Accompagnement des communes et services industriels pour atteindre les objectifs climatiques : audits, sensibilisation et gestion de programmes."
                canonical="/services/communes"
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Back Link */}
                <Link to="/#nos-partenaires" className="inline-flex items-center text-gray-400 hover:text-[var(--primary)] transition-colors mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Retour au choix
                </Link>

                <Reveal>
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
                        <div className="md:w-1/2">
                            <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
                                <Landmark size={18} /> Villes & Services Industriels
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">Un partenaire pour atteindre vos objectifs climatiques</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Swiss Ecogestes soutient les collectivités publiques dans la mise en œuvre de leur stratégie énergétique.
                                De l'audit de bâtiments communaux à l'animation de la transition auprès des citoyens.
                            </p>
                            <Link to="/contact">
                                <Button size="lg" className="bg-[var(--primary)] hover:bg-[#1a4d3e] text-white rounded-md">
                                    Discuter d'un partenariat <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="md:w-1/2">
                            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-100 h-64 md:h-96 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2000"
                                    alt="Communes et services publics"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="w-16 h-16 bg-[var(--primary)]/10 text-[var(--primary)] rounded-md flex items-center justify-center mb-6 -mt-16 relative z-10 shadow-lg bg-white border-4 border-white">
                                        <service.icon className="w-8 h-8" />
                                    </div>
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

export default CommunesPage;
