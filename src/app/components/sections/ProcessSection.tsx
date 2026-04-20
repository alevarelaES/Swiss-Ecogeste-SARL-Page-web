import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProcessSteps } from '../../../sanity/client';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

interface ProcessStep {
    stepNumber: number;
    title: string;
    description: string;
}

const FALLBACK_STEPS: Record<string, ProcessStep[]> = {
    fr: [
        { stepNumber: 1, title: "Analyse de votre situation", description: "Identification des consommations et des enjeux" },
        { stepNumber: 2, title: "Audit énergétique", description: "Analyse détaillée de vos installations et de vos usages" },
        { stepNumber: 3, title: "Recommandations concrètes", description: "Actions priorisées avec estimation des économies" },
        { stepNumber: 4, title: "Accompagnement", description: "Suivi et mise en œuvre des solutions" },
    ],
    en: [
        { stepNumber: 1, title: "Analysis of your situation", description: "Identification of consumption and key issues" },
        { stepNumber: 2, title: "Energy audit", description: "Detailed analysis of your installations and usage" },
        { stepNumber: 3, title: "Concrete recommendations", description: "Prioritised actions with estimated savings" },
        { stepNumber: 4, title: "Support", description: "Follow-up and implementation of solutions" },
    ],
    de: [
        { stepNumber: 1, title: "Analyse Ihrer Situation", description: "Identifizierung von Verbrauch und Herausforderungen" },
        { stepNumber: 2, title: "Energieaudit", description: "Detaillierte Analyse Ihrer Anlagen und Nutzung" },
        { stepNumber: 3, title: "Konkrete Empfehlungen", description: "Priorisierte Maßnahmen mit Einsparungsschätzung" },
        { stepNumber: 4, title: "Begleitung", description: "Umsetzung und Begleitung der Lösungen" },
    ],
};

const ProcessSection = () => {
    const { t, i18n } = useTranslation('common');
    const lang = i18n.language?.slice(0, 2) || 'fr';
    const navigate = useNavigate();
    const { getLocalizedPath } = useLocalizedPath();
    const [steps, setSteps] = useState<ProcessStep[]>(FALLBACK_STEPS[lang] ?? FALLBACK_STEPS.fr);

    useEffect(() => {
        getProcessSteps(lang).then((data) => {
            if (data && data.length > 0) {
                setSteps(data);
            } else {
                setSteps(FALLBACK_STEPS[lang] ?? FALLBACK_STEPS.fr);
            }
        }).catch(() => {
            setSteps(FALLBACK_STEPS[lang] ?? FALLBACK_STEPS.fr);
        });
    }, [lang]);

    return (
        <section id="process" className="py-20 md:py-28 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col items-center gap-3 text-center mb-16">
                    <span className="h-1.5 w-12 bg-amber-500 rounded-full"></span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1b5e39] leading-tight">
                        {t('process.title', 'Une méthode simple et efficace')}
                    </h2>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector line — desktop only */}
                    <div className="hidden md:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-emerald-100 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.stepNumber}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex flex-col items-center text-center gap-4"
                            >
                                {/* Step number circle */}
                                <div className="w-20 h-20 rounded-full bg-[#1b5e39] text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-emerald-900/20 flex-shrink-0">
                                    {step.stepNumber}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                                        {step.title}
                                    </h3>
                                    {step.description && (
                                        <p className="text-base text-gray-700 leading-relaxed">
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-14">
                    <button
                        onClick={() => navigate(getLocalizedPath('/contact'))}
                        className="inline-flex items-center gap-2 bg-[#1b5e39] hover:bg-[#154d2e] text-white font-bold px-8 py-4 rounded-full transition-colors duration-200 shadow-md shadow-emerald-900/20"
                    >
                        {t('process.cta', 'Démarrer mon analyse')}
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
