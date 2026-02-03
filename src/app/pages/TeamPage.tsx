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
        <div className="pt-24 pb-12">
            <SEO
                title={t('team_page.seo_title')}
                description={t('team_page.seo_desc')}
                canonical="/equipe"
            />
            {/* Intro Section - Executive Split Layout */}
            <div className="w-full bg-white pt-12 mb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pb-8 border-b border-gray-200">
                            <div className="max-w-2xl">
                                <span className="text-[#1b5e39] font-bold tracking-widest uppercase text-xs mb-3 block">
                                    {t('team_page.header_label')}
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                                    {t('team_page.header_title')}
                                </h1>
                            </div>
                            <div className="max-w-md text-gray-600 text-lg leading-relaxed md:text-right pb-1">
                                <p>
                                    {t('team_page.intro')}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Team Grid - Reduced spacing */}
            <Team />

            {/* Values Section - Executive Grid Layout */}
            <div className="w-full bg-white py-16 mt-8 relative overflow-hidden">
                {/* Abstract subtle background */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1b5e39]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Reveal>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-gray-200">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                                    {t('team_page.values_title')}
                                </h2>
                            </div>
                            <div className="max-w-md text-gray-600 text-lg leading-relaxed md:text-right pb-1">
                                <p>
                                    {t('team_page.values_intro')}
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Value 1 */}
                            <div className="group p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#1b5e39] mb-6 group-hover:bg-[#1b5e39] group-hover:text-white transition-colors duration-300">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1b5e39] transition-colors">{t('why_us.items.confiance.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{t('why_us.items.confiance.desc')}</p>
                            </div>

                            {/* Value 2 */}
                            <div className="group p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#1b5e39] mb-6 group-hover:bg-[#1b5e39] group-hover:text-white transition-colors duration-300">
                                    <Scale size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1b5e39] transition-colors">{t('why_us.items.neutrality.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{t('why_us.items.neutrality.desc')}</p>
                            </div>

                            {/* Value 3 */}
                            <div className="group p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#1b5e39] mb-6 group-hover:bg-[#1b5e39] group-hover:text-white transition-colors duration-300">
                                    <Database size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1b5e39] transition-colors">{t('why_us.items.data.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{t('why_us.items.data.desc')}</p>
                            </div>

                            {/* Value 4 */}
                            <div className="group p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#1b5e39] mb-6 group-hover:bg-[#1b5e39] group-hover:text-white transition-colors duration-300">
                                    <FileCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1b5e39] transition-colors">{t('why_us.items.legal.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{t('why_us.items.legal.desc')}</p>
                            </div>

                            {/* Value 5 */}
                            <div className="group p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#1b5e39] mb-6 group-hover:bg-[#1b5e39] group-hover:text-white transition-colors duration-300">
                                    <Award size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1b5e39] transition-colors">{t('why_us.items.quality.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{t('why_us.items.quality.desc')}</p>
                            </div>

                            {/* Value 6 */}
                            <div className="group p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#1b5e39] mb-6 group-hover:bg-[#1b5e39] group-hover:text-white transition-colors duration-300">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1b5e39] transition-colors">{t('why_us.items.human.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{t('why_us.items.human.desc')}</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
