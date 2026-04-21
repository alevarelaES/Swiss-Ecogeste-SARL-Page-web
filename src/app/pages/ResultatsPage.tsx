import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { Building2, Home, Factory, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components';
import { StatsSection } from '../components/sections';
import { Reveal } from '../components/animations';
import { useTranslation } from 'react-i18next';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

/* ── Animated number ───────────────────────────────────────── */
const Num = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
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
    return <span ref={ref}>{v}{suffix}</span>;
};

/* ── Data ──────────────────────────────────────────────────── */
const casesFr = [
    {
        Icon: Building2,
        sector: 'Régie & Immeuble',
        title: 'Immeuble locatif, 24 logements — Genève',
        body: "Audit IDC + Gestionnaire Énergie Délégué. Identification des surconsommations chauffage, éclairage, ventilation. Plan d'action en 6 mois.",
        metric: 18, suffix: '%', metricLabel: "d'énergie économisée",
        sub: ['100% subventionné SIG Eco21', 'Retour sur investissement < 1 an'],
    },
    {
        Icon: Home,
        sector: 'Villa & Maison',
        title: 'Villa familiale, 4 pièces — Nyon (Vaud)',
        body: 'Visite Villa SIG + CECB+. Analyse isolation, chauffage mazout, ventilation. Scénarios de rénovation chiffrés avec aides cantonales.',
        metric: 65, suffix: '%', metricLabel: 'de subvention obtenue',
        sub: ['Chauffez renouvelable', 'Délai de rentabilité 2 ans'],
    },
    {
        Icon: Factory,
        sector: 'PME & Entreprise',
        title: 'PME industrielle, 8 collaborateurs — Genève',
        body: "Audit PEIK complet sur les installations de production. Plan d'action priorisé, accompagnement à l'obtention des aides.",
        metric: 22, suffix: '%', metricLabel: "d'économies annuelles",
        sub: ['70% du coût pris en charge', 'ROI 18 mois'],
    },
];

const casesEn = [
    {
        Icon: Building2,
        sector: 'Property Management',
        title: 'Rental building, 24 units — Geneva',
        body: 'IDC audit + Delegated Energy Manager. Overconsumption in heating, lighting, ventilation identified. Action plan in 6 months.',
        metric: 18, suffix: '%', metricLabel: 'energy saved',
        sub: ['100% subsidised SIG Eco21', 'ROI under 1 year'],
    },
    {
        Icon: Home,
        sector: 'Villa & House',
        title: 'Family villa, 4 rooms — Nyon (Vaud)',
        body: 'SIG Villa visit + CECB+. Insulation, oil heating, ventilation analysis. Costed renovation scenarios with cantonal subsidies.',
        metric: 65, suffix: '%', metricLabel: 'subsidy obtained',
        sub: ['Renewable heating programme', '2-year payback period'],
    },
    {
        Icon: Factory,
        sector: 'SME & Business',
        title: 'Industrial SME, 8 employees — Geneva',
        body: 'Full PEIK audit on production facilities. Prioritised action plan with support for obtaining subsidies.',
        metric: 22, suffix: '%', metricLabel: 'annual savings',
        sub: ['70% of cost covered', '18-month ROI'],
    },
];

const casesDe = [
    {
        Icon: Building2,
        sector: 'Verwaltung & Gebäude',
        title: 'Mietgebäude, 24 Einheiten — Genf',
        body: 'IDC-Audit + Delegierter Energieverwalter. Überverbräuche bei Heizung, Beleuchtung, Lüftung identifiziert. Aktionsplan in 6 Monaten.',
        metric: 18, suffix: '%', metricLabel: 'Energie eingespart',
        sub: ['100% subventioniert SIG Eco21', 'ROI unter 1 Jahr'],
    },
    {
        Icon: Home,
        sector: 'Villa & Haus',
        title: 'Einfamilienhaus, 4 Zimmer — Nyon (Waadt)',
        body: 'SIG-Villenbesuch + CECB+. Analyse von Dämmung, Ölheizung, Lüftung. Kostenbewertete Renovierungsszenarien.',
        metric: 65, suffix: '%', metricLabel: 'Förderung erhalten',
        sub: ['Programm erneuerbare Heizung', '2 Jahre Amortisation'],
    },
    {
        Icon: Factory,
        sector: 'KMU & Unternehmen',
        title: 'Industrielles KMU, 8 Mitarbeitende — Genf',
        body: 'Vollständiges PEIK-Audit. Priorisierter Aktionsplan mit Begleitung bei der Förderung.',
        metric: 22, suffix: '%', metricLabel: 'jährliche Einsparungen',
        sub: ['70% der Kosten übernommen', '18 Monate ROI'],
    },
];

const getCases = (lang: string) => lang === 'de' ? casesDe : lang === 'en' ? casesEn : casesFr;

const testimonialsFr = [
    {
        quote: "L'équipe a identifié des économies que nous n'aurions jamais trouvées seuls. Processus simple, rapide et entièrement pris en charge.",
        name: 'M. Favre',
        role: 'Gérant de régie, Genève',
        result: '18% économisés',
    },
    {
        quote: "Grâce à l'audit villa, nous avons obtenu 65% de subvention pour notre rénovation. Accompagnement professionnel du début à la fin.",
        name: 'Famille Rochat',
        role: 'Propriétaires, Nyon',
        result: '65% de subvention',
    },
];

const testimonialsEn = [
    {
        quote: "The team identified savings we would never have found alone. Simple, fast process, fully managed.",
        name: 'Mr. Favre',
        role: 'Property Manager, Geneva',
        result: '18% saved',
    },
    {
        quote: "Thanks to the villa audit, we obtained 65% subsidy for our renovation. Professional support from start to finish.",
        name: 'Rochat Family',
        role: 'Homeowners, Nyon',
        result: '65% subsidy',
    },
];

const testimonialsDe = [
    {
        quote: "Das Team hat Einsparungen identifiziert, die wir alleine nie gefunden hätten. Einfach, schnell und vollständig betreut.",
        name: 'Hr. Favre',
        role: 'Immobilienverwalter, Genf',
        result: '18% eingespart',
    },
    {
        quote: "Dank dem Villa-Audit haben wir 65% Förderung erhalten. Professionelle Begleitung von Anfang bis Ende.",
        name: 'Familie Rochat',
        role: 'Eigentümer, Nyon',
        result: '65% Förderung',
    },
];

const getTestimonials = (lang: string) => lang === 'de' ? testimonialsDe : lang === 'en' ? testimonialsEn : testimonialsFr;

const programs = [
    'SIG Eco21', 'SuisseEnergie', 'OCEN', 'Chauffez Renouvelable',
    'Programme Bâtiments', 'PEIK', 'CECB / CECB+', 'VaudEnergie',
];

/* ── Page ──────────────────────────────────────────────────── */
const ResultatsPage = () => {
    useSearchHighlight();
    const { t, i18n } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const lang = i18n.language;
    const cases = getCases(lang);
    const testimonials = getTestimonials(lang);

    return (
        <div className="bg-gray-50/50">
            <SEO
                title={t('resultats_page.seo_title')}
                description={t('resultats_page.seo_desc')}
                canonical="/resultats"
            />

            {/* ── En-tête de page ─────────────────────────────── */}
            <div className="pt-32 pb-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="max-w-3xl">
                            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4 block">
                                {t('resultats_page.hero_label')}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                {t('resultats_page.hero_title')}
                            </h1>
                            <p className="text-xl text-gray-800 leading-relaxed">
                                {t('resultats_page.hero_subtitle')}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* ── Chiffres clés ──────────────────────────────── */}
            <StatsSection />

            {/* ── Cas concrets ───────────────────────────────── */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4 block">
                                {t('resultats_page.cases_label')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                {t('resultats_page.cases_title')}
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {t('resultats_page.cases_subtitle')}
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        {cases.map((c, i) => (
                            <Reveal key={i} delay={0.08 * i}>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
                                    {/* Top accent bar */}
                                    <div className="h-1 bg-gradient-to-r from-[#1b5e39] to-emerald-500" />

                                    <div className="p-8 flex flex-col flex-1">
                                        {/* Sector */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <c.Icon size={14} className="text-[#1b5e39]" strokeWidth={2} />
                                            <span className="text-[#1b5e39] font-bold text-xs uppercase tracking-widest">
                                                {c.sector}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                                            {c.title}
                                        </h3>

                                        {/* Body */}
                                        <p className="text-gray-700 text-base leading-relaxed flex-1 mb-6">
                                            {c.body}
                                        </p>

                                        {/* Result highlight */}
                                        <div className="bg-[#F4F7F5] rounded-xl p-4 mb-4 border border-[#1b5e39]/10">
                                            <div className="text-4xl font-black text-[#1b5e39] leading-none mb-1">
                                                <Num to={c.metric} suffix={c.suffix} />
                                            </div>
                                            <div className="text-gray-600 text-sm font-medium">{c.metricLabel}</div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-col gap-1.5">
                                            {c.sub.map(s => (
                                                <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <div className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <p className="text-center text-xs text-gray-400 italic">
                        {t('resultats_page.cases_placeholder')}
                    </p>
                </div>
            </div>

            {/* ── Témoignages ────────────────────────────────── */}
            <div className="py-20 bg-[#F4F7F5] border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4 block">
                                {t('resultats_page.testi_label')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                {t('resultats_page.testi_title')}
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {testimonials.map((testi, i) => (
                            <Reveal key={i} delay={0.1 * i}>
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <Quote size={20} className="text-amber-400 mb-5 shrink-0" />
                                    <p className="text-gray-800 text-lg leading-relaxed flex-1 mb-6">
                                        "{testi.quote}"
                                    </p>
                                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-gradient-to-br from-[var(--primary)] to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {testi.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-sm">{testi.name}</div>
                                                <div className="text-gray-500 text-xs">{testi.role}</div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-[#1b5e39] bg-[#e8f5e9] px-3 py-1 rounded-full">
                                            {testi.result}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Programmes partenaires ─────────────────────── */}
            <div className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-3 block">
                                {t('resultats_page.programs_label')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                {t('resultats_page.programs_title')}
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {t('resultats_page.programs_subtitle')}
                            </p>
                            <Link
                                to={getLocalizedPath('/contact')}
                                className="inline-flex items-center gap-2 text-[#1b5e39] font-bold text-base hover:gap-4 transition-all"
                            >
                                {lang === 'de' ? 'Mein Audit erhalten' : lang === 'en' ? 'Get my audit' : 'Obtenir mon audit'}
                                <ArrowRight size={18} />
                            </Link>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="grid grid-cols-2 gap-3">
                                {programs.map((p, i) => (
                                    <motion.div
                                        key={p}
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.04 }}
                                        className="group flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-[#1b5e39]/30 hover:bg-[#eef6f1] transition-all"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                        <span className="font-semibold text-gray-800 text-sm">{p}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ResultatsPage;
