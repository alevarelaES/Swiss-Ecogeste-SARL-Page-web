import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SEO } from '../components';
import { Hero, About, Partners, ContactSection, StatsSection, ArticlesSection, ClientTypeSection, ProcessSection } from '../components/sections';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    useSearchHighlight();
    const { hash } = useLocation();
    const { t } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();

    React.useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <>
            <SEO
                title="Expert en Efficacité Énergétique"
                description="Swiss Ecogestes accompagne les particuliers, gérances et entreprises dans leur transition énergétique en Suisse. Solutions durables et économies d'énergie."
                canonical="/"
            />
            <div className="bg-white">
                <Hero />
                <About />
                <StatsSection />
                <ProcessSection />
                <ClientTypeSection />
                <ArticlesSection />
                <Partners />

                {/* CTA audit gratuit */}
                <section className="bg-[#1b5e39] py-16 md:py-20">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                            {t('audit_cta.headline')}
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl mb-8">
                            {t('audit_cta.subtitle')}
                        </p>
                        <Link
                            to={getLocalizedPath('/contact')}
                            className="inline-flex items-center gap-2 bg-white text-[#1b5e39] font-bold text-base md:text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
                        >
                            {t('audit_cta.button')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="mt-4 text-white/40 text-xs italic">{t('audit_cta.note')}</p>
                    </div>
                </section>

                <ContactSection compact />
            </div>
        </>
    );
};

export default Home;

