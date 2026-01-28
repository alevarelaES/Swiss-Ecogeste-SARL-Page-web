import React from 'react';
import { motion } from 'motion/react';
import { Bike, Refrigerator, Sun, Building } from 'lucide-react';
import Reveal from '../animations/Reveal';

const SubventionCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <Reveal delay={delay}>
        <div className="bg-white p-8 rounded-lg border-b-4 border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-lg flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">{description}</p>
            <a href="#contact" className="inline-block bg-green-500 hover:bg-amber-500 text-white px-6 py-2 rounded-md text-sm font-bold transition-colors">
                Formulaire
            </a>
        </div>
    </Reveal>
);

const Subventions = () => {
    return (
        <section className="py-16 relative bg-gray-200 overflow-hidden">
            {/* Decorative circles background */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-20 w-64 h-64 bg-green-100 rounded-md blur-3xl opacity-30"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200 rounded-md blur-3xl opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <Reveal>
                    <div className="text-center mb-12">
                        <span className="text-amber-500 font-bold tracking-wider uppercase text-lg bg-amber-50 px-4 py-2 rounded-md inline-block">Subventions</span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-4">Demande de subvention en ligne</h2>
                        <p className="text-gray-900 font-medium text-lg max-w-3xl mx-auto">
                            Pour vous encourager à diminuer votre consommation d’énergie, nous vous aidons à obtenir des aides pour vos projets durables.
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-4 gap-6">
                    <SubventionCard
                        delay={0.1}
                        icon={Bike}
                        title="Mobilité douce"
                        description="Pour scooter, vélo électrique, batterie."
                    />
                    <SubventionCard
                        delay={0.2}
                        icon={Refrigerator}
                        title="Électroménager"
                        description="20% du prix d'achat d'un appareil efficient."
                    />
                    <SubventionCard
                        delay={0.3}
                        icon={Sun}
                        title="Solaire thermique"
                        description="Ajoutez une subvention à celle de l'État de Vaud."
                    />
                    <SubventionCard
                        delay={0.4}
                        icon={Building}
                        title="Rénovation"
                        description="25% sur une rénovation énergétique certifiée."
                    />
                </div>
            </div>
        </section>
    );
};

export default Subventions;

