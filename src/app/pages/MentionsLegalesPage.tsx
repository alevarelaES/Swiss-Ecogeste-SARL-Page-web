import { useTranslation } from 'react-i18next';
import { BackButton } from '../components/navigation';
import { SEO } from '../components';
import { Reveal } from '../components/animations';
import { sanitizeHtml } from '../utils/sanitize';
import { getLegalPage } from '../../sanity/client';
import { useSanityData } from '../../sanity/useSanityContent';

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

const MentionsLegalesPage = () => {
    const { t, i18n } = useTranslation('common');
    const lang = i18n.language.split('-')[0] === 'de' ? 'de' : i18n.language.split('-')[0] === 'en' ? 'en' : 'fr';
    const legalPage = useSanityData<LegalPageData | null>(`legalPage:mentions-legales:${lang}`, () => getLegalPage('mentions-legales', lang));
    const pageData = legalPage?.sections?.length ? legalPage : null;

    const i18nSections = t('legal.mentions.sections', { returnObjects: true }) as Record<string, LegalSection>;
    const sections: LegalSection[] = pageData?.sections ?? Object.values(i18nSections);
    const title = pageData?.title ?? t('legal.mentions.title');
    const seoTitle = pageData?.seoTitle ?? t('legal.mentions.seo_title');
    const seoDesc = pageData?.seoDescription ?? t('legal.mentions.seo_desc');
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
                        <span className="text-[var(--primary)] font-bold tracking-wider uppercase text-sm">Informations Légales</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">{title}</h1>
                        <p className="text-gray-700 text-sm">{t('legal.mentions.last_updated')} : {lastUpdated}</p>
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
                                            __html: sanitizeHtml(paragraph, {
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

export default MentionsLegalesPage;
