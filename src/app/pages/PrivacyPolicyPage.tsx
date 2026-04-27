import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackButton } from '../components/navigation';
import { SEO } from '../components';
import { Reveal } from '../components/animations';
import DOMPurify from 'dompurify';
import { getLegalPage } from '../../sanity/client';

interface LegalSection {
    title: string;
    content: string[];
}

interface LegalPageData {
    title: string;
    seoTitle: string;
    seoDescription: string;
    lastUpdated?: string;
    sections: LegalSection[];
}

const PrivacyPolicyPage = () => {
    const { t, i18n } = useTranslation('common');
    const lang = i18n.language.split('-')[0] === 'de' ? 'de' : i18n.language.split('-')[0] === 'en' ? 'en' : 'fr';
    const [pageData, setPageData] = useState<LegalPageData | null>(null);

    useEffect(() => {
        getLegalPage('confidentialite', lang)
            .then((data) => { if (data?.sections?.length) setPageData(data) })
            .catch(() => {});
    }, [lang]);

    const i18nSections = t('legal.privacy.sections', { returnObjects: true }) as Record<string, LegalSection>;
    const sections: LegalSection[] = pageData?.sections ?? Object.values(i18nSections);
    const title = pageData?.title ?? t('legal.privacy.title');
    const seoTitle = pageData?.seoTitle ?? t('legal.privacy.seo_title');
    const seoDesc = pageData?.seoDescription ?? t('legal.privacy.seo_desc');
    const lastUpdated = pageData?.lastUpdated
        ? new Date(pageData.lastUpdated).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' })
        : '01 Février 2026';

    return (
        <div className="pt-32 pb-24">
            <SEO title={seoTitle} description={seoDesc} />
            <div className="max-w-4xl mx-auto px-6">
                <Reveal><BackButton /></Reveal>
                <Reveal>
                    <div className="mb-12">
                        <span className="text-[var(--primary)] font-bold tracking-wider uppercase text-sm">Données Personnelles</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">{title}</h1>
                        <p className="text-gray-700 text-sm">Dernière mise à jour : {lastUpdated}</p>
                    </div>
                </Reveal>
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                                <div className="space-y-4 text-gray-800 leading-relaxed">
                                    {section.content.map((paragraph, pIndex) => (
                                        <p key={pIndex} dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(paragraph, {
                                                ALLOWED_TAGS: ['strong', 'em', 'br', 'a'],
                                                ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
                                            })
                                        }} />
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
