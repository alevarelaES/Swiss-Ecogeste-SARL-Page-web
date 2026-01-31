import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

const VillaPage = () => {
    const services = [
        {
            title: "Audit CECB & CECB+",
            description: "Analyse officielle de l'étiquette énergétique de votre bâtiment. Le CECB+ inclut un rapport de conseil complet avec scénarios de rénovation chiffrés.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
        },
        {
            title: "Solaire Photovoltaïque",
            description: "Produisez votre propre électricité. Étude de rentabilité, dimensionnement et installation de panneaux solaires performants.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
        },
        {
            title: "Pompes à Chaleur",
            description: "Remplacez votre chauffage fossile par une solution durable et économique. Programme \"Chauffez Renouvelable\" inclus.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
        }
    ];

    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Services pour Villas | Audit & Rénovation"
                description="Solutions énergétiques pour propriétaires de villas. Audit CECB, pompes à chaleur, panneaux solaires et rénovation globale."
                canonical="/services/villa"
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Back Link */}
                <Link to="/#nos-partenaires" className="inline-flex items-center text-gray-400 hover:text-[var(--primary)] transition-colors mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Retour au choix
                </Link>

                {/* Hero Section */}
                <Reveal>
                    <div className="text-center mb-20">
                        <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">Propriétaires</span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-2 mb-6">Expertise Villa</h1>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                            Valorisez votre patrimoine immobilier tout en réduisant votre impact écologique.
                            De l'audit CECB+ à l'installation de solutions renouvelables, nous gérons votre transition clé en main.
                        </p>
                    </div>
                </Reveal>

                {/* Main Services Grid with Images */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {services.map((service, index) => (
                        <Reveal key={index} delay={0.1 * (index + 1)}>
                            <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group h-full flex flex-col">
                                {/* Image at top */}
                                <div className="h-48 overflow-hidden relative">
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

export default VillaPage;

