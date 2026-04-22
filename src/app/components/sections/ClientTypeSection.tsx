import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../animations/Reveal';
import { useTranslation } from 'react-i18next';
import { getClientTypes as getHardcodedClientTypes } from '../../data/clientTypes';
import { getSanityClientTypes } from '../../../sanity/client';

const ClientTypeSection = () => {
    const { t, i18n } = useTranslation('common');
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';

    const [clientTypes, setClientTypes] = useState(getHardcodedClientTypes(lang));

    useEffect(() => {
        setClientTypes(getHardcodedClientTypes(lang));
    }, [lang]);

    useEffect(() => {
        let cancelled = false;
        getSanityClientTypes(lang)
            .then((data: any[]) => {
                if (cancelled || !data || data.length === 0) return;
                const mapped = data.map((ct: any) => ({
                    id: ct.slug || ct._id,
                    title: ct.title || '',
                    subtitle: ct.subtitle || '',
                    description: ct.description || '',
                    link: ct.link || '/',
                    image: ct.imageUrl || '',
                }));
                setClientTypes(mapped);
            })
            .catch(() => {});
        return () => { cancelled = true; };
    }, [lang]);

    const fallbackImages = [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
    ];

    return (
        <section id="nos-solutions" className="py-10 md:py-12 bg-gray-100 bg-[url('https://www.transparenttextures.com/patterns/gray-lines.png')] bg-fixed">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8 border-b border-gray-200 pb-6">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="h-[2px] w-12 bg-amber-500"></span>
                                <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">{t('client_types.label')}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                {t('client_types.title_prefix')} {t('client_types.title_connector')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-emerald-600">{t('client_types.title_highlight')}</span>
                            </h2>
                        </div>
                        <p className="text-gray-800 font-medium text-lg leading-relaxed max-w-md text-right md:text-right hidden md:block">
                            {t('client_types.description')}
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {clientTypes.map((client, index) => (
                        <Reveal key={client.id} delay={index * 0.1}>
                            <Link to={client.link} className="block h-full group">
                                <div className="bg-white hover:shadow-2xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2">
                                    {/* Image Top */}
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={client.image || fallbackImages[index % fallbackImages.length]}
                                            alt={client.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    </div>

                                    {/* Content Body */}
                                    <div className="p-8 flex flex-col flex-grow border-x border-b border-gray-100">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {client.title}
                                        </h3>

                                        <span className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-widest mb-4 block">
                                            {client.subtitle}
                                        </span>

                                        <p className="text-gray-700 text-base leading-relaxed mb-8 flex-grow">
                                            {client.description}
                                        </p>

                                        <div className="mt-auto border text-gray-800 border-gray-200 px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-between group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] group-hover:text-white transition-all">
                                            {t('buttons.explore')}
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientTypeSection;
