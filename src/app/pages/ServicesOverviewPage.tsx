import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServicesOverviewPage = () => {
    const { t } = useTranslation('common');

    const servicesList = [
        { name: t('services_overview.items.eco_logement'), link: "/services/gerance" },
        { name: t('services_overview.items.pake'), link: "/services/entreprise" },
        { name: t('services_overview.items.audits_villa'), link: "/services/villa" },
        { name: t('services_overview.items.visites_sig'), link: "/services/villa" },
        { name: t('services_overview.items.idc'), link: "/service/calcul-idc" },
        { name: t('services_overview.items.sensibilisation'), link: "/services/communes" },
        { name: t('services_overview.items.chauffage'), link: "/service/chauffage-renouvelable" },
    ];

    const upcomingServices = [
        t('services_overview.upcoming.amu'),
        t('services_overview.upcoming.cecb_plus')
    ];

    return (
        <div className="pt-32 pb-24 bg-white">
            <SEO
                title={t('services_overview.seo_title')}
                description={t('services_overview.seo_desc')}
                canonical="/prestations"
            />

            <div className="max-w-4xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4 block">{t('services_overview.label')}</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">{t('services_overview.title')}</h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            {t('services_overview.intro')}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 md:p-12 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">{t('services_overview.available_title')}</h2>
                        <ul className="space-y-6">
                            {servicesList.map((service, index) => (
                                <li key={index} className="flex items-start md:items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <CheckCircle2 className="text-emerald-500 min-w-[24px]" />
                                        <span className="text-lg font-medium text-gray-800 group-hover:text-[var(--primary)] transition-colors">
                                            {service.name}
                                        </span>
                                    </div>
                                    <Link
                                        to={service.link}
                                        className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-[var(--primary)] uppercase tracking-wider transition-all"
                                    >
                                        {t('services_overview.details')} <ArrowRight size={16} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-amber-50 rounded-2xl border border-amber-100 p-8">
                        <h2 className="text-xl font-bold text-amber-800 mb-6 flex items-center gap-3">
                            <Clock size={24} /> {t('services_overview.upcoming_title')}
                        </h2>
                        <ul className="space-y-4">
                            {upcomingServices.map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-amber-900/70 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default ServicesOverviewPage;
