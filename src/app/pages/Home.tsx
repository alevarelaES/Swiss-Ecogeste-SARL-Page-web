import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Team from '../components/sections/Team';
import Subventions from '../components/sections/Subventions';
import Partners from '../components/sections/Partners';
import ContactSection from '../components/sections/ContactSection';
import StatsSection from '../components/sections/StatsSection';
import ArticlesSection from '../components/sections/ArticlesSection';

const Home = () => {
    const { hash } = useLocation();

    useLayoutEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'auto', block: 'start' });
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
                <Services />
                <StatsSection />
                <ArticlesSection />
                <Partners />
                <ContactSection />
            </div>
        </>
    );
};

export default Home;

