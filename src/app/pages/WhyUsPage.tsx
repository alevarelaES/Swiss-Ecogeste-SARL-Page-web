import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { ShieldCheck, FileCheck, Scale, Award, Database, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";

const WhyUsPage = () => {
    const reasons = [
        {
            icon: ShieldCheck,
            title: "Partenaire de confiance",
            description: "Nous collaborons étroitement avec la DIREN (Direction de l'énergie), les SIG et les programmes cantonaux pour garantir la conformité de chaque projet."
        },
        {
            icon: FileCheck,
            title: "Respect du Cadre Légal",
            description: "Une veille juridique constante pour vous assurer que toutes les installations respectent les dernières normes fédérales et cantonales (MoPEC, IDC, etc.)."
        },
        {
            icon: Database,
            title: "Protection des Données",
            description: "Vos données énergétiques sont sensibles. Nous les traitons avec la plus stricte confidentialité, hébergées en Suisse et sécurisées."
        },
        {
            icon: Scale,
            title: "Neutralité Commerciale",
            description: "Nous ne vendons pas de matériel. Nos recommandations sont basées uniquement sur VOTRE intérêt et la performance technique, sans conflit d'intérêt."
        },
        {
            icon: Award,
            title: "Processus Qualité",
            description: "Chaque audit et chaque chantier suit un processus qualité rigoureux, de la première visite jusqu'à la réception finale des travaux."
        },
        {
            icon: Users,
            title: "Approche Humaine",
            description: "Parce que la transition énergétique est avant tout une aventure humaine, nous privilégions l'écoute, la pédagogie et l'accompagnement personnalisé."
        }
    ];

    return (
        <div className="pt-32 pb-24 bg-gray-50/50">
            <SEO
                title="Pourquoi Choisir Swiss Ecogestes | Expertise & Confiance"
                description="Découvrez nos valeurs : neutralité commerciale, expertise certifiée, gestion administrative complète et protection de vos données."
                canonical="/pourquoi"
            />

            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4 block">Nos Engagements</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Expertise, Neutralité et Confiance.</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Swiss Ecogestes a été fondée sur une conviction simple : la transition énergétique doit être transparente, simple et rentable pour tous.
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {reasons.map((item, index) => (
                        <Reveal key={index} delay={0.1 * index}>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary)] to-emerald-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-900/20">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Call to Action Box */}
                <Reveal>
                    <div className="bg-[var(--primary)] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-20 -mb-20"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">Prêt à travailler avec un partenaire de confiance ?</h2>
                            <p className="text-white/80 text-lg mb-8">
                                Discutons de vos besoins et voyons comment nous pouvons vous aider à atteindre vos objectifs.
                            </p>
                            <Link to="/contact">
                                <Button size="lg" className="bg-white text-[var(--primary)] hover:bg-gray-100 font-bold px-8 py-6 rounded-full text-lg shadow-xl">
                                    Prendre contact
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default WhyUsPage;
