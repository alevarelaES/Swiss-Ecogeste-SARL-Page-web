import React from 'react';
import { motion } from 'motion/react';
import Reveal from '../animations/Reveal';
import { useTranslation } from 'react-i18next';
import { getSubventionsContent } from '../../data/subventionsContent';

const SubventionCard = ({ icon: Icon, title, description, delay, buttonText }: { icon: any, title: string, description: string, delay: number, buttonText: string }) => (
    <Reveal delay={delay}>
        <div className="bg-white p-8 rounded-lg border-b-4 border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-lg flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">{description}</p>
            <a href="#contact" className="inline-block bg-green-500 hover:bg-amber-500 text-white px-6 py-2 rounded-md text-sm font-bold transition-colors">
                {buttonText}
            </a>
        </div>
    </Reveal>
);

const Subventions = () => {
    const { i18n } = useTranslation();
    const subventionsContent = getSubventionsContent(i18n.language);

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
                        <span className="text-amber-500 font-bold tracking-wider uppercase text-lg bg-amber-50 px-4 py-2 rounded-md inline-block">{subventionsContent.sectionLabel}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-4">{subventionsContent.title}</h2>
                        <p className="text-gray-900 font-medium text-lg max-w-3xl mx-auto">
                            {subventionsContent.description}
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {subventionsContent.items.map((item, index) => (
                        <SubventionCard
                            key={index}
                            delay={item.delay}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            buttonText={subventionsContent.buttonText}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Subventions;

