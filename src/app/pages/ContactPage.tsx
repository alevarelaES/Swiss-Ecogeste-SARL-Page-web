import React from 'react';
import SEO from '../components/SEO';
import ContactSection from '../components/sections/ContactSection';
import Reveal from '../components/animations/Reveal';

const ContactPage = () => {
    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Contactez-nous"
                description="Besoin d'un conseil ou d'un devis ? Contactez Swiss Ecogestes pour votre projet de transition énergétique en Suisse."
                canonical="/contact"
            />
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <Reveal>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Prêt à faire le premier pas ?</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Que vous soyez au début de votre réflexion ou déjà prêt pour des travaux, nos experts vous répondent sous 48h.
                    </p>
                </Reveal>
            </div>
            <ContactSection />
        </div>
    );
};

export default ContactPage;
