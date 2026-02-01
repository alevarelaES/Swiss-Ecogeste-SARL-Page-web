import React from 'react';
import Reveal from '../animations/Reveal';
import { useTranslation } from 'react-i18next';
import { getWhyChooseUsContent } from '../../data/whyChooseUsContent';

const WhyChooseUs = () => {
    const { i18n } = useTranslation();
    const whyChooseUsContent = getWhyChooseUsContent(i18n.language);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
                        {/* Title Side */}
                        <div className="md:w-1/3">
                            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-2 block">{whyChooseUsContent.sectionLabel}</span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                                {whyChooseUsContent.title} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-emerald-600">
                                    {whyChooseUsContent.titleHighlight}
                                </span>
                            </h2>
                            <p className="text-gray-600 font-medium text-lg leading-relaxed">
                                {whyChooseUsContent.description}
                            </p>
                        </div>

                        {/* Grid Side */}
                        <div className="md:w-2/3 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                                {whyChooseUsContent.reasons.map((item, idx) => (
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
