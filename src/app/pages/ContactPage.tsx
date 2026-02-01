import React from 'react';
import SEO from '../components/SEO';
import ContactSection from '../components/sections/ContactSection';
import Reveal from '../components/animations/Reveal';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
    const { t } = useTranslation('common');

    return (
        <div className="pt-32 pb-24">
            <SEO
                title={t('contact_page.seo_title')}
                description={t('contact_page.seo_description')}
                canonical="/contact"
            />
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <Reveal>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('contact_page.title')}</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        {t('contact_page.description')}
                    </p>
                </Reveal>
            </div>
            <ContactSection compact />
        </div>
    );
};

export default ContactPage;

