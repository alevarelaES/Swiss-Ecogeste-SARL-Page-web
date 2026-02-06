import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../components';
import { Hero, About, Partners, ContactSection, StatsSection, ArticlesSection, ClientTypeSection } from '../components/sections';
import { useSearchHighlight } from '../hooks/useSearchHighlight';

const Home = () => {
    useSearchHighlight();
    const { hash } = useLocation();

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
                <ClientTypeSection />
                <ArticlesSection />
                <Partners />
                <ContactSection compact />
            </div>
        </>
    );
};

export default Home;

