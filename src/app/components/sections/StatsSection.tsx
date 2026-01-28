import React from 'react';
import { motion, useInView } from 'motion/react';
import { Leaf, Building2, Zap, Users } from 'lucide-react';

const stats = [
    {
        id: 1,
        value: 1500,
        suffix: "+",
        label: "Projets Réalisés",
        icon: Building2,
    },
    {
        id: 2,
        value: 50,
        suffix: "GWh",
        label: "Énergie Économisée/an",
        icon: Zap,
    },
    {
        id: 3,
        value: 12000,
        suffix: "t",
        label: "CO2 Évités",
        icon: Leaf,
    },
    {
        id: 4,
        value: 100,
        suffix: "%",
        label: "Satisfaction Client",
        icon: Users,
    }
];

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
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

    return <span ref={ref}>{count}{suffix}</span>;
}

const StatsSection = () => {
    return (
        <section className="relative py-28 w-full overflow-hidden bg-[#2a7f55]">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[#226d48] to-[#1a5236]"></div>

            {/* Organic Shapes Overlay */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-[300px] text-white/20 fill-current transform -scale-y-100">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
                <div className="absolute -right-20 -bottom-40 w-96 h-96 bg-white/10 rounded-md blur-3xl"></div>
                <div className="absolute -left-20 top-20 w-72 h-72 bg-amber-400/10 rounded-md blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/20 pb-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <span className="h-px w-10 bg-amber-400"></span>
                            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm">Performance Durable</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
                        >
                            L'impact de nos actions
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/80 font-medium text-lg max-w-md text-right hidden md:block" // Hidden on mobile for cleaner look, or adapt
                    >
                        Des résultats mesurables pour votre portefeuille et pour l'environnement suisse.
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                            className={`flex flex-col justify-between items-start lg:px-8 ${index !== stats.length - 1 ? 'lg:border-r border-white/10' : ''}`}
                        >
                            <div className="mb-6">
                                <stat.icon size={32} className="text-amber-400 opacity-90" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="text-5xl lg:text-7xl font-bold text-white mb-2 tracking-tight">
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-white/70 font-medium text-sm lg:text-base uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;

