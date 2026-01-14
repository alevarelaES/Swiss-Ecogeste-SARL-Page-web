import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../animations/Reveal';
import { services } from '../../data/services';

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
    const Icon = service.icon;

    return (
        <Reveal delay={service.delay}>
            <Link to={`/service/${service.id}`} className="block h-full">
                <motion.div
                    className="group bg-white h-full flex flex-col border border-gray-100 hover:border-amber-400 hover:shadow-2xl transition-all duration-300"
                    whileHover="hover"
                    initial="initial"
                >
                    {/* Image Section - Fixed Aspect Ratio */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${service.image})` }}
                            variants={{
                                initial: { scale: 1 },
                                hover: { scale: 1.05 }
                            }}
                            transition={{ duration: 0.5 }}
                        />
                        {/* Overlay to ensure text readability if needed, though mostly using clear images */}
                        <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors" />

                        {/* Number - Large Subtle Watermark Bottom Left */}
                        <span className="absolute -bottom-8 -left-2 text-9xl font-black text-white/10 group-hover:text-amber-500/10 transition-colors duration-500 select-none z-10 leading-none">
                            {service.number}
                        </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow bg-white relative">
                        {/* Title with Brand Color Highlight */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                            {service.title}
                        </h3>

                        {/* Subtitle / Category */}
                        <span className="text-xs font-bold uppercase tracking-wider text-green-600 mb-3 block">
                            {service.subtitle}
                        </span>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow font-medium line-clamp-3">
                            {service.description}
                        </p>

                        {/* Bottom Action Area - Outline Button Style */}
                        <div className="mt-auto">
                            <div className="w-full border border-gray-200 py-3 px-4 flex items-center justify-between text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300">
                                <span>Explorer</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </Reveal>
    );
};

const Services = () => {
    return (
        <section id="services" className="relative py-24 bg-white overflow-hidden">
            {/* Background Image (Parallax) */}
            <div
                className="absolute inset-0 bg-fixed bg-cover bg-center grayscale opacity-40"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000')",
                }}
            />

            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <Reveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[4px] w-12 bg-amber-500" />
                                <span className="text-green-700 font-bold tracking-[0.25em] uppercase text-xs">Excellence Technique</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                                Nos Domaines <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">d'Expertise</span>
                            </h2>
                        </div>

                        <div className="hidden md:block pb-2">
                            <p className="text-gray-700 font-medium text-right max-w-xs leading-relaxed border-l-2 border-amber-500 pl-6">
                                Des solutions d'ingénierie certifiées pour valoriser votre patrimoine.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
