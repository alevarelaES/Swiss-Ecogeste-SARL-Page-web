import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Leaf, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselDots
} from "../ui/carousel";

const slides = [
    {
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        title: 'La transition énergétique simple et rentable',
        sub: 'Swiss Ecogestes accompagne les propriétaires et entreprises vers une autonomie durable avec des solutions d’audit et de rénovation haute performance.',
        features: ['Audits CECB', 'Pompes à chaleur', 'Solaire Photovoltaïque']
    },
    {
        img: 'https://images.unsplash.com/photo-1759398430338-8057876edf61?q=80&w=1920',
        title: 'Optimisez votre budget énergétique',
        sub: 'Réduisez vos charges jusqu’à 60% grâce à nos stratégies d’optimisation personnalisées et aux subventions cantonales disponibles.',
        features: ['Subventions maximales', 'Rentabilité garantie', 'Accompagnement A-Z']
    },
    {
        img: 'https://images.unsplash.com/photo-1764515296584-cdf00acebe3b?q=80&w=1920',
        title: 'Valorisez votre patrimoine immobilier',
        sub: 'Une maison bien isolée et équipée est un actif qui prend de la valeur. Anticipez les normes de demain dès aujourd’hui.',
        features: ['Valeur immobilière', 'Zéro Émission', 'Confort Thermique']
    }
];

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-gray-950">
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 7000, stopOnInteraction: false })]}
                className="w-full h-full"
            >
                <CarouselContent className="h-full">
                    {slides.map((slide, index) => (
                        <CarouselItem key={index} className="relative h-screen w-full flex items-center">
                            {/* Background with advanced overlay */}
                            <div className="absolute inset-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center brightness-[0.85]"
                                    style={{ backgroundImage: `url(${slide.img})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-900/50 to-transparent" />
                            </div>

                            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
                                <div className="max-w-3xl text-left">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-xl"
                                    >
                                        {slide.sub}
                                    </motion.p>

                                    {/* Features Display restored */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="hidden md:flex gap-6 mb-12 border-l-2 border-[var(--primary)] pl-6"
                                    >
                                        {slide.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                                                <Zap size={14} className="text-amber-500" />
                                                {feature}
                                            </div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        className="flex flex-col sm:flex-row gap-5"
                                    >
                                        <Button asChild size="lg" className="bg-[var(--primary)] hover:bg-amber-600 text-white rounded-xl px-10 py-8 text-lg font-bold transition-all shadow-2xl group cursor-pointer">
                                            <Link to="/#contact">
                                                Lancer mon projet
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                        <Button asChild size="lg" variant="outline" className="bg-white/5 hover:bg-white/10 text-white border-white/20 px-10 py-8 rounded-xl text-lg font-bold backdrop-blur-sm transition-all cursor-pointer">
                                            <Link to="/services">
                                                Découvrir nos solutions
                                            </Link>
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselDots className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30" />
            </Carousel>
        </section>
    );
};

export default Hero;

