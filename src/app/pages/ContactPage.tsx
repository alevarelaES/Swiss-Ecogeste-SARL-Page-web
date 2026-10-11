import { SEO } from '../components';
import { ContactSection } from '../components/sections';
import { Reveal } from '../components/animations';
import { useTranslation } from 'react-i18next';
import { getContactPage } from '../../sanity/client';
import { useSanityData } from '../../sanity/useSanityContent';
import type { ContactPageData } from '../components/sections/ContactSection';

const ContactPage = () => {
    const { t, i18n } = useTranslation('common');
    const language = i18n.language.split('-')[0];
    type ContactPageContent = ContactPageData & { seoTitle?: string; seoDescription?: string; heroTitle?: string; heroDescription?: string };
    const pageData = useSanityData<ContactPageContent | null>(`contactPage:${language}`, () => getContactPage(language)) ?? {};

    return (
        <div className="pt-32 pb-24">
            <SEO
                title={pageData.seoTitle || t('contact_page.seo_title')}
                description={pageData.seoDescription || t('contact_page.seo_description')}
            />
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <Reveal>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {pageData.heroTitle || t('contact_page.title')}
                    </h1>
                    <p className="text-gray-800 max-w-2xl mx-auto text-lg">
                        {pageData.heroDescription || t('contact_page.description')}
                    </p>
                </Reveal>
            </div>
            <ContactSection compact pageData={pageData} />
        </div>
    );
};

export default ContactPage;
