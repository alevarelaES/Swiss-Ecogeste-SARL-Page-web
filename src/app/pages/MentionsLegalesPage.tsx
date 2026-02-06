import { useTranslation } from 'react-i18next';
import { BackButton } from '../components/navigation';
import { SEO } from '../components';
import { Reveal } from '../components/animations';
import DOMPurify from 'dompurify';

const MentionsLegalesPage = () => {
    const { t } = useTranslation('common');
    const sections = t('legal.mentions.sections', { returnObjects: true }) as Record<string, { title: string, content: string[] }>;

    return (
        <div className="pt-32 pb-24">
            <SEO
                title={t('legal.mentions.seo_title')}
                description={t('legal.mentions.seo_desc')}
            />

            <div className="max-w-4xl mx-auto px-6">
                <Reveal>
                    <BackButton />
                </Reveal>

                <Reveal>
                    <div className="mb-12">
                        <span className="text-[var(--primary)] font-bold tracking-wider uppercase text-sm">Informations Légales</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">{t('legal.mentions.title')}</h1>
                        <p className="text-gray-500 text-sm">{t('legal.mentions.last_updated')} : 01 Février 2026</p>
                    </div>
                </Reveal>

                <div className="space-y-12">
                    {Object.values(sections).map((section, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    {section.content.map((paragraph, pIndex) => (
                                        <p
                                            key={pIndex}
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(paragraph, {
                                                    ALLOWED_TAGS: ['strong', 'em', 'br', 'a'],
                                                    ALLOWED_ATTR: ['href', 'target', 'rel']
                                                })
                                            }}
                                        />
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
