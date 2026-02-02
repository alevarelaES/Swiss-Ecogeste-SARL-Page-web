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
            {/* Intro Section - Full Width with Background */}
            <div className="w-full bg-slate-50 py-12 mb-8">
                <div className="max-w-4xl mx-auto px-6">
                    <Reveal>
                        <div className="text-center">
                            <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">{t('team_page.header_label')}</span>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">{t('team_page.header_title')}</h1>
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                {t('team_page.intro')}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Fading Line Separator - Added as requested */}
            <div className="h-px w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 mb-8"></div>

            {/* Team Grid - Reduced spacing */}
            <Team />

            {/* Values Section - Light Design with Subtle Gold Accents */}
            <div className="w-full bg-white py-12 mt-8 relative overflow-hidden">
                {/* Abstract subtle background - very faint */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Reveal>
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            {/* The "Fading Line" requested by user - Gold Accent */}
                            <div className="h-px w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 mb-8"></div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('team_page.values_title')}</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {t('team_page.values_intro')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                            {/* Value 1 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                                    <ShieldCheck size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">{t('why_us.items.confiance.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">{t('why_us.items.confiance.desc')}</p>
                            </div>

                            {/* Value 2 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                                    <Scale size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">{t('why_us.items.neutrality.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">{t('why_us.items.neutrality.desc')}</p>
                            </div>

                            {/* Value 3 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                                    <Database size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">{t('why_us.items.data.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">{t('why_us.items.data.desc')}</p>
                            </div>

                            {/* Value 4 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                                    <FileCheck size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">{t('why_us.items.legal.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">{t('why_us.items.legal.desc')}</p>
                            </div>

                            {/* Value 5 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                                    <Award size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">{t('why_us.items.quality.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">{t('why_us.items.quality.desc')}</p>
                            </div>

                            {/* Value 6 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--primary)] shadow-sm mb-4 border border-gray-100 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                                    <Users size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">{t('why_us.items.human.title')}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">{t('why_us.items.human.desc')}</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
