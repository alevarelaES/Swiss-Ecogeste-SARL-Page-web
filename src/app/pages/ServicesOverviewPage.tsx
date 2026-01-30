import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesOverviewPage = () => {
    const servicesList = [
        { name: "Programme Éco-logement", link: "/services/gerance" },
        { name: "Audits Énergétiques Entreprises (PAKE)", link: "/services/entreprise" },
        { name: "Audits Villas & CECB", link: "/services/villa" },
        { name: "Visites SIG / éco21", link: "/services/villa" },
        { name: "Calcul de l'IDC Genève", link: "/service/calcul-idc" },
        { name: "Sensibilisation Environnementale", link: "/services/communes" },
        { name: "Transition Chauffage Renouvelable", link: "/service/chauffage-renouvelable" },
    ];

    const upcomingServices = [
        "AMU (Assistance à Maîtrise d'Usage)",
        "Audit CECB Plus (Certification officielle)"
    ];

    return (
        <div className="pt-32 pb-24 bg-white">
            <SEO
                title="Nos Prestations | Vue d'ensemble Swiss Ecogestes"
                description="Liste complète de nos services d'audit, conseil énergétique et accompagnement pour particuliers, entreprises et collectivités."
                canonical="/prestations"
            />

            <div className="max-w-4xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4 block">Catalogue</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Nos Prestations</h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Une vue d'ensemble de nos solutions pour réduire votre consommation et valoriser votre patrimoine.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 md:p-12 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Services Disponibles</h2>
                        <ul className="space-y-6">
                            {servicesList.map((service, index) => (
                                <li key={index} className="flex items-start md:items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <CheckCircle2 className="text-emerald-500 min-w-[24px]" />
                                        <span className="text-lg font-medium text-gray-800 group-hover:text-[var(--primary)] transition-colors">
                                            {service.name}
                                        </span>
                                    </div>
                                    <Link
                                        to={service.link}
                                        className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-[var(--primary)] uppercase tracking-wider transition-all"
                                    >
                                        Détails <ArrowRight size={16} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-amber-50 rounded-2xl border border-amber-100 p-8">
                        <h2 className="text-xl font-bold text-amber-800 mb-6 flex items-center gap-3">
                            <Clock size={24} /> En préparation
                        </h2>
                        <ul className="space-y-4">
                            {upcomingServices.map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-amber-900/70 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default ServicesOverviewPage;
