import { ShieldCheck, Scale, Database, FileCheck, Award, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Team from '../components/sections/Team';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSearchHighlight } from '../hooks/useSearchHighlight';

const TeamPage = () => {
    useSearchHighlight();
    const { t } = useTranslation('common');
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <div className="min-h-screen bg-[#fdfdfd]">
            <SEO
                title={t('team_page.seo_title')}
                description={t('team_page.seo_desc')}
                canonical="/equipe"
            />

            {/* Premium Hero Section */}
            <div className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-[#1b5e39] pt-32 pb-20">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {/* Abstract Green Gradient Background - Lighter and more branded */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(27,94,57,0.9),rgba(20,80,50,0.8))]" />

                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 w-full h-full opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />

                    <motion.div
                        style={{ y: yHero }}
                        className="absolute -top-[50%] -left-[20%] w-[1000px] h-[1000px] bg-white/10 rounded-full blur-[100px]"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
                            {t('team_page.header_label')}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            {t('team_page.header_title')}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                            {t('team_page.intro')}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Container - Overlapping the Hero */}
            <div className="relative z-20 -mt-12 max-w-7xl mx-auto px-6">
                {/* Team Grid Section */}
                <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 mb-12">
                    <Team />
                </div>
            </div>


            {/* Values Section - Premium Design */}
            <div className="w-full bg-slate-50 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('team_page.values_title')}</h2>
                        <div className="h-1 w-20 bg-amber-500 mx-auto mb-8 rounded-full" />
                        <p className="text-gray-600 text-xl leading-relaxed">
                            {t('team_page.values_intro')}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, key: 'confiance' },
                            { icon: Scale, key: 'neutrality' },
                            { icon: Database, key: 'data' },
                            { icon: FileCheck, key: 'legal' },
                            { icon: Award, key: 'quality' },
                            { icon: Users, key: 'human' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex flex-col items-center text-center group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--primary)]/20"
                            >
                                <div className="w-16 h-16 bg-[var(--secondary)]/30 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary)] transition-colors">
                                    {t(`why_us.items.${item.key}.title`)}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">
                                    {t(`why_us.items.${item.key}.desc`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
