import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { ShieldCheck, FileCheck, Scale, Award, Database, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const WhyUsPage = () => {
    const { t } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();

    const reasons = [
        {
            icon: ShieldCheck,
            title: t('why_us.items.confiance.title'),
            description: t('why_us.items.confiance.desc')
        },
        {
            icon: FileCheck,
            title: t('why_us.items.legal.title'),
            description: t('why_us.items.legal.desc')
        },
        {
            icon: Database,
            title: t('why_us.items.data.title'),
            description: t('why_us.items.data.desc')
        },
        {
            icon: Scale,
            title: t('why_us.items.neutrality.title'),
            description: t('why_us.items.neutrality.desc')
        },
        {
            icon: Award,
            title: t('why_us.items.quality.title'),
            description: t('why_us.items.quality.desc')
        },
        {
            icon: Users,
            title: t('why_us.items.human.title'),
            description: t('why_us.items.human.desc')
        }
    ];

    return (
        <div className="pt-32 pb-24 bg-gray-50/50">
            <SEO
                title={t('why_us.seo_title')}
                description={t('why_us.seo_desc')}
                canonical="/pourquoi"
            />

            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4 block">{t('why_us.label')}</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">{t('why_us.title')}</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {t('why_us.intro')}
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {reasons.map((item, index) => (
                        <Reveal key={index} delay={0.1 * index}>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary)] to-emerald-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-900/20">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Call to Action Box */}
                <Reveal>
                    <div className="bg-[var(--primary)] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-20 -mb-20"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">{t('why_us.cta_title')}</h2>
                            <p className="text-white/80 text-lg mb-8">
                                {t('why_us.cta_desc')}
                            </p>
                            <Link to={getLocalizedPath('/contact')}>
                                <Button size="lg" className="bg-white text-[var(--primary)] hover:bg-gray-100 font-bold px-8 py-6 rounded-full text-lg shadow-xl">
                                    {t('why_us.cta_button')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default WhyUsPage;
