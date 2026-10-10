import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../components';
import { Hero, About, Partners, ContactSection, StatsSection, ArticlesSection, ClientTypeSection, ProcessSection } from '../components/sections';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import { useTranslation } from 'react-i18next';
import { ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from '../seo/site';

const Home = () => {
    useSearchHighlight();
    const { hash } = useLocation();
    const { t } = useTranslation('common');

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
                title={t('home_seo.title')}
                description={t('home_seo.description')}
                jsonLd={[ORGANIZATION_JSON_LD, WEBSITE_JSON_LD]}
            />
            <div className="bg-white">
                <Hero />
                <About />
                <StatsSection />
                <ProcessSection />
                <ClientTypeSection />
                <Partners />
                <ArticlesSection />

                <ContactSection compact />
            </div>
        </>
    );
};

export default Home;

