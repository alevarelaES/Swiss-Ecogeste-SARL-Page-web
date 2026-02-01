import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

interface ClientTypePageProps {
    title: string;
    description: string;
    features: string[];
    imageSrc: string;
    seoTitle: string;
    seoDescription: string;
}

const ClientTypePage: React.FC<ClientTypePageProps> = ({ title, description, features, imageSrc, seoTitle, seoDescription }) => {
    const { getLocalizedPath } = useLocalizedPath();
    return (
        <>
            <SEO
                title={`${seoTitle} | Swiss Ecogestes`}
                description={seoDescription}
            />
            <div className="min-h-screen bg-[var(--background)] pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Hero Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <div>
                            <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-2 block">
                                Nos Solutions
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6 leading-tight">
                                {title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                {description}
                            </p>
                            <div className="flex gap-4">
                                <Button asChild className="bg-[var(--primary)] hover:bg-[#0b2e24] text-white px-8 h-12 rounded-md shadow-lg shadow-green-900/20">
                                    <Link to={getLocalizedPath('/contact')}>Demander un devis</Link>
                                </Button>
                                <Button asChild variant="outline" className="text-[var(--primary)] border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white px-8 h-12 rounded-md">
                                    <Link to={getLocalizedPath('/services')}>Tous nos services</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                {/* Placeholder for now, can use generate_image if needed later */}
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                    {/* In a real app, use the imageSrc prop */}
                                    <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-400 rounded-md blur-2xl opacity-40 -z-10"></div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[var(--primary)] rounded-md blur-3xl opacity-20 -z-10"></div>
                        </div>
                    </div>

                    {/* Features / Benefits */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-bold text-[var(--primary)] text-center mb-12">Pourquoi choisir Swiss Ecogestes ?</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-green-50 rounded-md flex items-center justify-center text-[var(--primary)] mb-6">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.split(':')[0]}</h3>
                                    <p className="text-gray-600">{feature.split(':')[1] || feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-[var(--primary)] rounded-lg p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-md -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400 opacity-10 rounded-md translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Prêt à optimiser votre consommation ?</h2>
                        <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto relative z-10">
                            Contactez-nous dès aujourd'hui pour une analyse personnalisée et découvrez comment nous pouvons vous aider à économiser.
                        </p>
                        <Button asChild className="bg-amber-400 hover:bg-amber-500 text-[var(--primary)] font-bold px-8 h-12 rounded-md relative z-10">
                            <Link to={getLocalizedPath('/contact')}>Prendre rendez-vous <ArrowRight className="ml-2 w-5 h-5" /></Link>
                        </Button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ClientTypePage;

