import React from 'react';
import { useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { getStats, getStatsContent } from '../../data/statsData';

const Counter = ({ value, prefix = "", suffix }: { value: number, prefix?: string, suffix: string }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 1000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const StatsSection = () => {
    const { i18n } = useTranslation();
    const stats = getStats(i18n.language);
    const statsContent = getStatsContent(i18n.language);

    return (
        <section className="relative py-8 sm:py-10 md:py-12 w-full overflow-hidden bg-[#2a7f55]">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[#226d48] to-[#1a5236]"></div>

            {/* Organic Shapes Overlay */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-[300px] text-white/20 fill-current transform -scale-y-100">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
                <div className="absolute -right-20 -bottom-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 top-20 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-6 md:gap-8 border-b border-white/20 pb-6 md:pb-8">
                    <div className="max-w-2xl text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <span className="h-px w-10 bg-amber-400"></span>
                            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm">{statsContent.label}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-white leading-tight">
                            {statsContent.title}
                        </h2>
                    </div>
                    <div className="text-white/80 font-medium text-lg max-w-md text-right hidden md:block">
                        {statsContent.description}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                        <div
                            key={stat.id}
                            className={`flex flex-col justify-start items-center lg:items-start text-center lg:text-left lg:px-8 h-full ${index !== stats.length - 1 ? 'lg:border-r border-white/10' : ''}`}
                        >
                            <div className="mb-4 lg:mb-6">
                                <IconComponent size={32} className="text-amber-400 opacity-90" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 tracking-tight break-words w-full">
                                    {stat.value ? (
                                        <Counter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                                    ) : (
                                        <span>{stat.text}</span>
                                    )}
                                </div>
                                <p className="text-white/70 font-medium text-sm lg:text-base uppercase tracking-wider leading-snug">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;

