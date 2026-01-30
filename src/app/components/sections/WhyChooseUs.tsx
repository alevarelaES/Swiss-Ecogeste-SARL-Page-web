import React from 'react';
import { Landmark, FileText, Scale, Handshake } from 'lucide-react';
import Reveal from '../animations/Reveal';

const reasons = [
    {
        icon: Landmark,
        title: "Crédibilité Institutionnelle",
        description: "Partenaire reconnu par les SIG, le canton et les programmes officiels de subvention."
    },
    {
        icon: FileText,
        title: "Gestion Administrative",
        description: "Nous prenons en charge 100% des démarches pour l'obtention de vos subventions."
    },
    {
        icon: Scale,
        title: "Neutralité Commerciale",
        description: "Des conseils objectifs et indépendants, sans conflit d'intérêt avec les installateurs."
    },
    {
        icon: Handshake,
        title: "Approche Humaine",
        description: "Une pédagogie bienveillante pour vous accompagner à chaque étape du projet."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
                        {/* Title Side */}
                        <div className="md:w-1/3">
                            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-2 block">Nos Valeurs</span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                                Pourquoi choisir <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-emerald-600">
                                    Swiss Ecogestes ?
                                </span>
                            </h2>
                            <p className="text-gray-600 font-medium text-lg leading-relaxed">
                                Au-delà de l'expertise technique, nous apportons une sécurité et une tranquillité d'esprit à tous nos partenaires.
                            </p>
                        </div>

                        {/* Grid Side */}
                        <div className="md:w-2/3 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                                {reasons.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-start">
                                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[var(--primary)] mb-5">
                                            <item.icon size={24} strokeWidth={2} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed font-medium text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default WhyChooseUs;
