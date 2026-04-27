import { useEffect, useState } from 'react';
import { ShieldCheck, Scale, Database, FileCheck, Award, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components';
import { Team } from '../components/sections';
import { Reveal } from '../components/animations';
import { useTranslation } from 'react-i18next';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import { getSanityAProposPage } from '../../sanity/client';

const GROUP_PHOTO_PLACEHOLDER = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop';

interface CompanyStat {
    value: string;
    label: string;
}

interface AProposPageContent {
    heroLabel: string;
    heroTitle: string;
    heroIntro: string;
    missionTitle: string;
    missionText: string;
    missionText2: string;
    presenceTitle: string;
    presenceText: string;
    companyStats: CompanyStat[];
    qualityTitle: string;
    qualityText: string;
    qualitySteps: string[];
    groupPhotoUrl: string;
    photoTitle: string;
    photoSubtitle: string;
}

const getFallbackAProposContent = (t: (key: string) => string): AProposPageContent => ({
    heroLabel: t('team_page.header_label'),
    heroTitle: t('team_page.header_title'),
    heroIntro: t('team_page.intro'),
    missionTitle: t('team_page.mission_title'),
    missionText: t('team_page.mission_text'),
    missionText2: t('team_page.mission_text2'),
    presenceTitle: t('team_page.presence_title'),
    presenceText: t('team_page.presence_text'),
    companyStats: [
        { value: '5', label: t('team_page.stat_experts') },
        { value: '2', label: t('team_page.stat_cantons') },
        { value: '6', label: t('team_page.stat_partners') },
        { value: '100%', label: t('team_page.stat_approach') },
    ],
    qualityTitle: t('team_page.quality_title'),
    qualityText: t('team_page.quality_text'),
    qualitySteps: t('team_page.quality_steps').split(',').map((step) => step.trim()).filter(Boolean),
    groupPhotoUrl: GROUP_PHOTO_PLACEHOLDER,
    photoTitle: t('team_page.photo_title'),
    photoSubtitle: t('team_page.photo_subtitle'),
});

const TeamPage = () => {
    useSearchHighlight();
    const { t, i18n } = useTranslation('common');
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';

    const [content, setContent] = useState<AProposPageContent>(getFallbackAProposContent(t));

    useEffect(() => {
        setContent(getFallbackAProposContent(t));
    }, [lang, t]);

    useEffect(() => {
        let cancelled = false;
        getSanityAProposPage(lang)
            .then((data: any) => {
                if (cancelled || !data) return;
                if (!data.heroTitle && !data.missionTitle && !data.presenceTitle && !data.photoTitle) return;

                const mappedStats: CompanyStat[] = Array.isArray(data.companyStats)
                    ? data.companyStats
                        .filter((stat: any) => stat?.value || stat?.label)
                        .map((stat: any) => ({
                            value: stat.value || '',
                            label: stat.label || '',
                        }))
                    : [];

                const mappedQualitySteps = Array.isArray(data.qualitySteps)
                    ? data.qualitySteps.filter((step: any) => typeof step === 'string' && step.trim().length > 0)
                    : [];

                setContent((prev) => ({
                    heroLabel: data.heroLabel || prev.heroLabel,
                    heroTitle: data.heroTitle || prev.heroTitle,
                    heroIntro: data.heroIntro || prev.heroIntro,
                    missionTitle: data.missionTitle || prev.missionTitle,
                    missionText: data.missionText || prev.missionText,
                    missionText2: data.missionText2 || prev.missionText2,
                    presenceTitle: data.presenceTitle || prev.presenceTitle,
                    presenceText: data.presenceText || prev.presenceText,
                    companyStats: mappedStats.length > 0 ? mappedStats : prev.companyStats,
                    qualityTitle: data.qualityTitle || prev.qualityTitle,
                    qualityText: data.qualityText || prev.qualityText,
                    qualitySteps: mappedQualitySteps.length > 0 ? mappedQualitySteps : prev.qualitySteps,
                    groupPhotoUrl: data.groupPhotoUrl || prev.groupPhotoUrl,
                    photoTitle: data.photoTitle || prev.photoTitle,
                    photoSubtitle: data.photoSubtitle || prev.photoSubtitle,
                }));
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, [lang]);

    return (
        <div className="bg-slate-50">
            <SEO
                title={t('team_page.seo_title')}
                description={t('team_page.seo_desc')}
                canonical="/a-propos"
            />

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1b5e39]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4ade80]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
            </div>

            <div className="relative z-10 pt-20 pb-0">

                {/* ── Hero ── */}
                <div className="relative pb-16 pt-12 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#1b5e39] opacity-10 blur-[100px]"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <Reveal>
                            <div className="max-w-4xl mx-auto text-center">
                                <span className="inline-block text-[#1b5e39] font-bold tracking-wider text-xs uppercase mb-4 bg-[#e8f5e9] px-4 py-1.5 rounded-full">
                                    {content.heroLabel}
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                                    {content.heroTitle}
                                </h1>
                                <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full mb-6"></div>
                                <p className="text-gray-800 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                                    {content.heroIntro}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* ── Mission & Présence ── */}
                <div className="relative py-16 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">

                            {/* Mission */}
                            <Reveal>
                                <div>
                                    <span className="text-[#1b5e39] font-bold tracking-wider uppercase text-xs mb-3 block">
                                        {t('team_page.mission_label')}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                                        {content.missionTitle}
                                    </h2>
                                    <div className="w-12 h-1 bg-amber-400 rounded-full mb-6"></div>
                                    <p className="text-gray-800 text-lg leading-relaxed mb-4">
                                        {content.missionText}
                                    </p>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        {content.missionText2}
                                    </p>
                                </div>
                            </Reveal>

                            {/* Présence + Stats */}
                            <Reveal delay={0.1}>
                                <div>
                                    <span className="text-[#1b5e39] font-bold tracking-wider uppercase text-xs mb-3 block">
                                        {t('team_page.presence_label')}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                                        {content.presenceTitle}
                                    </h2>
                                    <div className="w-12 h-1 bg-amber-400 rounded-full mb-6"></div>
                                    <div className="flex items-start gap-3 mb-6">
                                        <MapPin size={20} className="text-[#1b5e39] mt-1 shrink-0" />
                                        <p className="text-gray-800 text-lg leading-relaxed">
                                            {content.presenceText}
                                        </p>
                                    </div>

                                    {/* Key figures */}
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        {content.companyStats.map((stat, i) => (
                                            <div key={i} className="bg-[#F4F7F5] rounded-xl p-5 border border-[#1b5e39]/10">
                                                <div className="text-3xl font-black text-[#1b5e39] mb-1">{stat.value}</div>
                                                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>

                {/* ── Processus qualité ── */}
                <div className="relative py-14 bg-[#F4F7F5] border-t border-[#1b5e39]/10">
                    <div className="max-w-7xl mx-auto px-6">
                        <Reveal>
                            <div className="max-w-3xl mx-auto text-center">
                                <span className="inline-block text-[#1b5e39] font-bold tracking-wider text-xs uppercase mb-4 bg-[#e8f5e9] px-4 py-1.5 rounded-full">
                                    {t('team_page.quality_label')}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                    {content.qualityTitle}
                                </h2>
                                <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-6"></div>
                                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                    {content.qualityText}
                                </p>
                                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-[#1b5e39]">
                                    {content.qualitySteps.map((step) => (
                                        <div key={step} className="flex items-center gap-2 bg-white border border-[#1b5e39]/20 rounded-full px-4 py-2 shadow-sm">
                                            <CheckCircle2 size={14} className="shrink-0" />
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* ── Photo de groupe ── */}
                <div className="relative h-[420px] md:h-[520px] overflow-hidden">
                    <img
                        src={content.groupPhotoUrl}
                        alt="Équipe Swiss Ecogestes"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[#0f1f1a]/65"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <Reveal>
                            <span className="inline-block text-amber-400 font-bold tracking-widest uppercase text-xs mb-4">
                                {t('team_page.photo_label')}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight max-w-2xl">
                                {content.photoTitle}
                            </h2>
                            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-4"></div>
                            <p className="text-white/80 text-lg max-w-xl mx-auto">
                                {content.photoSubtitle}
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* ── Notre équipe ── */}
                <div className="relative py-16 pb-20 bg-gradient-to-b from-[#F0F4F2] to-slate-50 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <Reveal>
                            <div className="text-center mb-12">
                                <span className="inline-block text-[#1b5e39] font-bold tracking-wider text-xs uppercase mb-3 bg-[#e8f5e9] px-4 py-1.5 rounded-full">
                                    {t('team_page.team_title')}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mt-4 mb-4">
                                    {t('team_page.team_title')}
                                </h2>
                                <p className="text-gray-800 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                    {t('team_page.team_subtitle')}
                                </p>
                            </div>
                        </Reveal>
                        <Team />
                    </div>
                </div>

                {/* ── Valeurs ── */}
                <div className="relative py-10 md:py-12 bg-cover bg-center overflow-hidden -mb-1" style={{ backgroundImage: `url('/images/fond_values_section.png')` }}>
                    <div className="absolute inset-0 bg-white/85"></div>
                    <div className="absolute top-10 right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-amber-500/8 rounded-full blur-xl"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <Reveal>
                            <div className="grid lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                                        {t('team_page.values_title')}
                                    </h2>
                                    <div className="w-20 h-1.5 bg-amber-400 mb-8 rounded-full"></div>
                                    <p className="text-gray-800 leading-relaxed mb-8 text-lg md:text-xl font-medium">
                                        {t('team_page.values_intro')}
                                    </p>
                                </div>

                                <div className="lg:col-span-8">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            { icon: ShieldCheck, key: 'confiance' },
                                            { icon: Scale, key: 'neutrality' },
                                            { icon: Database, key: 'data' },
                                            { icon: FileCheck, key: 'legal' },
                                            { icon: Award, key: 'quality' },
                                            { icon: Users, key: 'human' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="group p-6 bg-white border border-[#1b5e39]/20 rounded-xl hover:shadow-md transition-all duration-300">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 bg-[#1b5e39]/5 rounded-lg flex items-center justify-center text-[#1b5e39] group-hover:bg-[#1b5e39] group-hover:text-white transition-colors duration-300 shrink-0">
                                                        <item.icon size={20} strokeWidth={2} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                                            {t(`why_us.items.${item.key}.title`)}
                                                        </h3>
                                                        <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                                                            {t(`why_us.items.${item.key}.desc`)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeamPage;
