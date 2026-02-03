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
                    {/* Header - Centered & Stacked */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="h-px w-10 bg-amber-400"></span>
                            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm">
                                {whyChooseUsContent.sectionLabel}
                            </span>
                            <span className="h-px w-10 bg-amber-400"></span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
                            {whyChooseUsContent.title} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-emerald-600">
                                {whyChooseUsContent.titleHighlight}
                            </span>
                        </h2>
                        <p className="text-gray-600 font-medium text-xl leading-relaxed max-w-2xl mx-auto">
                            {whyChooseUsContent.description}
                        </p>
                    </div>

                    {/* Reasons Grid - Full Width */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                            {whyChooseUsContent.reasons.map((item, idx) => {
                                const IconComponent = item.icon;
                                return (
                                    <div key={idx} className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                        <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform">
                                            <IconComponent size={32} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                        <p className="text-gray-500 leading-relaxed font-medium text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default WhyChooseUs;
