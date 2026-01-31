import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Home, Building2, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from "../components/ui/button";
import Reveal from '../components/animations/Reveal';

const ServicesPage = () => {
    const detailedServices = [
        {
            title: "Pour les Particuliers",
            icon: Home,
            description: "Améliorez le confort de votre foyer tout en réduisant vos factures énergétiques. Nous vous guidons pas à pas.",
            features: [
                "Audit énergétique CECB",
                "Assainissement de l'enveloppe thermique",
                "Remplacement de système de chauffage",
                "Installation de panneaux photovoltaïques",
                "Gestion des demandes de subventions"
            ],
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
        },
        {
            title: "Pour les Gérances",
            icon: Building2,
            description: "Valorisez votre patrimoine immobilier et simplifiez la gestion des charges pour vos locataires.",
            features: [
                "Audit de parc immobilier (CECB Plus)",
                "Contrat de performance énergétique",
                "Bornes de recharge pour véhicules électriques",
                "Développement de regroupements d'autoconsommateurs (RCP)",
                "Planification thermique à long terme"
            ],
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
        },
        {
            title: "Pour les Entreprises",
            icon: Zap,
            description: "Engagez votre entreprise dans la durabilité tout en optimisant vos flux opérationnels.",
            features: [
                "Convention d'objectifs (Grands Consommateurs)",
                "Optimisation de l'air comprimé et du froid",
                "Éclairage intelligent et LED haut rendement",
                "Monitoring énergétique en temps réel",
                "Stratégie de décarbonation"
            ],
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
        }
    ];

    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Nos Services Énergétiques"
                description="Découvrez nos solutions sur mesure pour particuliers, gérances et entreprises : audits CECB, rénovations, solaire et optimisation énergétique."
                canonical="/services"
            />

            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-20">
                        <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">Expertise & Solutions</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Nos services à 360°</h1>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                            De l'audit initial à la mise en œuvre finale, nous fournissons l'expertise technique nécessaire pour transformer votre consommation énergétique.
                        </p>
                    </div>
                </Reveal>

                <div className="space-y-24">
                    {detailedServices.map((service, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                                <div className="md:w-1/2">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {service.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button asChild className="bg-[var(--primary)] hover:bg-green-700 text-white rounded-md px-8 group">
                                        <Link to="/contact">
                                            Demander un devis <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                                <div className="md:w-1/2 w-full">
                                    <div className="rounded-lg overflow-hidden shadow-2xl aspect-[4/3] relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${service.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;

