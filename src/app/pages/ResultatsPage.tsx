import React, { useEffect, useState } from 'react';
import { useInView } from 'motion/react';
import { SEO } from '../components';
import { Reveal } from '../components/animations';
import { useTranslation } from 'react-i18next';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import { getSanityResultatsPage } from '../../sanity/client';
import { getResultatsPageContent } from '../data/resultatsPageContent';
import type { ResultatsPageContent } from '../data/resultatsPageContent';

const Num = ({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string; }) => {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true });
    const [v, setV] = React.useState(0);
    React.useEffect(() => {
        if (!inView) return;
        const dur = 1800;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setV(Math.floor((1 - Math.pow(1 - p, 3)) * to));
            if (p < 1) requestAnimationFrame(tick); else setV(to);
        };
        requestAnimationFrame(tick);
    }, [inView, to]);
    return <span ref={ref}>{prefix}{v}{suffix}</span>;
};


const getFallbackResultatsContent = (lang: string): ResultatsPageContent => {
    return getResultatsPageContent(lang);
};

const ResultatsPage = () => {
    useSearchHighlight();
    const { i18n } = useTranslation('common');
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';

    const [content, setContent] = useState<ResultatsPageContent>(getFallbackResultatsContent(lang));

    useEffect(() => {
        setContent(getFallbackResultatsContent(lang));
    }, [lang]);

    useEffect(() => {
        let cancelled = false;
        getSanityResultatsPage(lang)
            .then((data: any) => {
                if (cancelled || !data) return;
                if (!data.heroTitle && !data.heroSubtitle && (!data.impactStats || data.impactStats.length === 0) && (!data.cases || data.cases.length === 0)) return;

                const mappedImpactStats = Array.isArray(data.impactStats)
                    ? data.impactStats
                        .filter((stat: any) => typeof stat?.value === 'number')
                        .map((stat: any) => ({
                            value: stat.value,
                            suffix: stat.suffix || '',
                            prefix: stat.prefix || '',
                            label: stat.label || '',
                        }))
                    : [];

                const mappedCases = Array.isArray(data.cases)
                    ? data.cases.map((caseItem: any) => ({
                        sector: caseItem.sector || '',
                        title: caseItem.title || '',
                        metric: typeof caseItem.mainMetric === 'number' ? caseItem.mainMetric : 0,
                        suffix: caseItem.mainMetricSuffix || '',
                        metricLabel: caseItem.mainMetricLabel || '',
                        kpis: Array.isArray(caseItem.kpis)
                            ? caseItem.kpis.map((kpi: any) => ({
                                value: `${kpi.value || ''}`,
                                unit: kpi.unit || '',
                                label: kpi.label || '',
                            }))
                            : [],
                        before: Array.isArray(caseItem.beforeItems) ? caseItem.beforeItems : [],
                        after: Array.isArray(caseItem.afterItems) ? caseItem.afterItems : [],
                    }))
                    : [];

                setContent((prev) => ({
                    ...prev,
                    seo: {
                        title: data.seo?.title || prev.seo.title,
                        description: data.seo?.description || prev.seo.description,
                    },
                    heroTitle: data.heroTitle || prev.heroTitle,
                    heroSubtitle: data.heroSubtitle || prev.heroSubtitle,
                    impactStats: mappedImpactStats.length > 0 ? mappedImpactStats : prev.impactStats,
                    cases: mappedCases.length > 0 ? mappedCases : prev.cases,
                }));
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, [lang]);

    return (
        <div className="bg-white">
            <SEO
                title={content.seo.title}
                description={content.seo.description}
                canonical="/resultats"
            />

            {/* ── EN-TÊTE ULTRA CONDENSÉ AVEC FOND ARCHITECTURAL ───────────────────────────── */}
            <div className="relative pt-24 pb-12 md:pt-36 md:pb-16 bg-white overflow-hidden">
                {/* Image de fond en filigrane (nom corrigé et opacité relevée car l'image est déjà très claire) */}
                <div 
                    className="absolute inset-0 z-0 opacity-60 grayscale mix-blend-multiply"
                    style={{ 
                        backgroundImage: "url('/images/fond_results_page.png')", 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Reveal>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="h-[2px] w-12 bg-amber-500"></span>
                            <span className="text-[#1b5e39] font-bold tracking-widest uppercase text-xs">
                                Swiss Ecogestes
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1b5e39] leading-[1.05] tracking-tight mb-4">
                            {content.heroTitle}
                        </h1>
                        <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-3xl">
                            {content.heroSubtitle}
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* ── IMPACT STATS (CHAMP DE COULEUR GREEN) ────────── */}
            <div className="bg-[#1b5e39] border-y border-[#14472b]">
                <div className="max-w-7xl mx-auto px-6 py-6 md:py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-white/20">
                        {content.impactStats.map((stat, i) => (
                            <Reveal key={i} delay={0.05 * i}>
                                <div className="md:px-6 flex flex-col items-start md:items-center text-left md:text-center">
                                    <div className="text-3xl lg:text-4xl font-black text-amber-500 mb-1 tracking-tighter">
                                        <Num to={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                                    </div>
                                    <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">
                                        {stat.label}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── ÉTUDES DE CAS : AVANT/APRÈS EXPLICITE ─────── */}
            <div className="py-12 md:py-20 bg-[#f4f6f8]">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="flex flex-col mb-12 border-b border-gray-200 pb-6">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
                                {content.proofByExample.title}
                            </h2>
                            <p className="text-gray-600 font-medium text-lg max-w-2xl">
                                {content.proofByExample.description}
                            </p>
                        </div>
                    </Reveal>

                    <div className="flex flex-col gap-8 md:gap-12">
                        {content.cases.map((c, i) => (
                            <Reveal key={i} delay={0.1}>
                                <div className="bg-white border border-gray-200 border-t-[8px] border-t-[#1b5e39] shadow-md rounded overflow-hidden">
                                    <div className="flex flex-col lg:flex-row">
                                        
                                        {/* Colonne Gauche: Tête de chapitre */}
                                        <div className="lg:w-2/5 flex flex-col p-8 bg-white border-r border-gray-100">
                                            <div>
                                                <span className="text-[10px] font-black text-white bg-[#1b5e39] uppercase tracking-widest mb-4 inline-block px-3 py-1.5 rounded-sm">
                                                    {c.sector}
                                                </span>
                                                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                                                    {c.title}
                                                </h3>
                                            </div>
                                            
                                            <div className="mt-auto pt-6 border-t border-gray-100">
                                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                                    Impact principal
                                                </div>
                                                <div className="flex items-end gap-3">
                                                    <div className="text-5xl font-black text-amber-500 tracking-tighter leading-none">
                                                        <Num to={c.metric} suffix={c.suffix} />
                                                    </div>
                                                    <div className="text-xs font-bold text-gray-900 leading-tight pb-1 uppercase tracking-widest max-w-[120px]">
                                                        {c.metricLabel}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Colonne Droite: KPIs & Avant/Après */}
                                        <div className="lg:w-3/5 flex flex-col p-8 bg-gray-50/50">
                                            
                                            {/* Grille Métriques */}
                                            <div className="grid grid-cols-2 gap-4 mb-8">
                                                {c.kpis.map((kpi, idx) => (
                                                    <div key={idx} className="bg-white border border-gray-200 p-5 rounded flex flex-col justify-center">
                                                        <div className="text-2xl md:text-3xl font-black text-[#1b5e39] tracking-tighter mb-1">
                                                            {kpi.value}<span className="text-sm text-gray-500 font-bold ml-1">{kpi.unit}</span>
                                                        </div>
                                                        <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-relaxed">
                                                            {kpi.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Nouvelle section Avant/Après Frontale */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                                                <div className="bg-red-50/70 border-t-[3px] border-red-400 p-5 rounded-b shadow-sm">
                                                    <h4 className="text-xs font-black text-red-600 uppercase tracking-widest mb-3">
                                                        {content.casesBefore}
                                                    </h4>
                                                    <ul className="text-sm font-medium text-red-900/80 leading-relaxed list-disc pl-4 space-y-1.5 marker:text-red-400">
                                                        {c.before.map((item, idx) => (
                                                            <li key={idx}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="bg-emerald-50/70 border-t-[3px] border-[#1b5e39] p-5 rounded-b shadow-sm">
                                                    <h4 className="text-xs font-black text-[#1b5e39] uppercase tracking-widest mb-3">
                                                        {content.casesAfter}
                                                    </h4>
                                                    <ul className="text-sm font-bold text-emerald-950 leading-relaxed list-disc pl-4 space-y-1.5 marker:text-[#1b5e39]">
                                                        {c.after.map((item, idx) => (
                                                            <li key={idx}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── TÉMOIGNAGES COMPACTS : NOIR + AMBER + EMERALD ─────────── */}
            <div className="py-12 md:py-16 bg-[#111820] border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-10">
                            <span className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-3 block">
                                {content.testimonials.tagline}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                {content.testimonials.title}
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {content.testimonials.testimonial.map((testi, i) => (
                            <Reveal key={i} delay={0.1 * i}>
                                <div className="h-full">
                                    <div className="bg-[#1a232c] p-8 h-full flex flex-col border border-gray-800 rounded hover:border-gray-700 transition-colors">
                                        <div className="mb-6 uppercase tracking-widest text-[10px] font-black text-emerald-400">
                                            // {testi.result}
                                        </div>
                                        <p className="text-gray-300 text-sm font-medium leading-relaxed mb-8 flex-1">
                                            "{testi.quote}"
                                        </p>
                                        <div className="mt-auto border-t border-gray-800 pt-5 flex items-center justify-between">
                                            <div>
                                                <div className="font-black text-white text-sm tracking-wide">{testi.name}</div>
                                                <div className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mt-1">{testi.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.3}>
                        <div className="mt-16 pt-10 border-t border-gray-800 text-center pb-8">
                            <p className="text-gray-500 mb-6 uppercase tracking-widest text-[10px] font-bold">
                                {content.actors}
                            </p>
                            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                                {['SIG Eco21', 'SuisseEnergie', 'OCEN', 'Chauffez Renouvelable', 'PEIK', 'CECB +'].map((p) => (
                                    <span key={p} className="text-gray-400 opacity-80 font-black text-xs md:text-sm uppercase tracking-widest cursor-default">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

        </div>
    );
};

export default ResultatsPage;