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

                <ContactSection compact />
            </div>
        </>
    );
};

export default Home;

