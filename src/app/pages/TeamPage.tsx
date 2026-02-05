import { ShieldCheck, Scale, Database, FileCheck, Award, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Team from '../components/sections/Team';
import Reveal from '../components/animations/Reveal';
import { useTranslation } from 'react-i18next';
import { useSearchHighlight } from '../hooks/useSearchHighlight';

const TeamPage = () => {
    useSearchHighlight();
    const { t } = useTranslation('common');

    return (
        <div className="bg-slate-50">
            <SEO
                title={t('team_page.seo_title')}
                description={t('team_page.seo_desc')}
                canonical="/equipe"
            />

            {/* Global Decorative Background - Continuous Flow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Subtle Mesh Gradient */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1b5e39]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4ade80]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
            </div>

            <div className="relative z-10 pt-20 pb-0">

                {/* Intro Section - Compact & Gradient */}
                <div className="relative pb-16 pt-12 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#1b5e39] opacity-10 blur-[100px]"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <Reveal>
                            <div className="max-w-4xl mx-auto text-center">
                                {/* Removed Badge as requested */}
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                                    {t('team_page.header_title')}
                                </h1>
                                <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full mb-6"></div>
                                <div className="text-gray-600 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                                    <p>{t('team_page.intro')}</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Team Section - Contrasted Background */}
                <div className="relative py-16 pb-20 bg-gradient-to-b from-[#F0F4F2] to-slate-50 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                                {t('team_page.team_title') || 'Notre Équipe'}
                            </h2>
                            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                {t('team_page.team_subtitle') || 'Une équipe dédiée d\'experts passionnés par la transition énergétique.'}
                            </p>
                        </div>
                        <Team />
                    </div>
                </div>

                {/* Values Section - Split Layout Compact */}
                <div className="relative py-10 md:py-12 bg-cover bg-center overflow-hidden -mb-1" style={{ backgroundImage: `url('/images/fond_values_section.png')` }}>
                    {/* Stronger overlay to tone down background (85% white) */}
                    <div className="absolute inset-0 bg-white/85"></div>
                    {/* Yellow accent touches */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-amber-500/8 rounded-full blur-xl"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <Reveal>
                            <div className="grid lg:grid-cols-12 gap-12">
                                {/* Left: Sticky Title */}
                                <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                                        {t('team_page.values_title')}
                                    </h2>
                                    <div className="w-20 h-1.5 bg-amber-400 mb-8 rounded-full"></div>
                                    <p className="text-gray-600 leading-relaxed mb-8 text-lg md:text-xl font-medium">
                                        {t('team_page.values_intro')}
                                    </p>
                                </div>

                                {/* Right: Grid of Cards */}
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
                                                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
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
