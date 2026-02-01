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
import { useTranslation } from 'react-i18next';
import { getHeroSlides } from '../../data/heroSlides';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

const Hero = () => {
    const { t, i18n } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const heroSlides = getHeroSlides(i18n.language);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-gray-950">
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 7000, stopOnInteraction: false })]}
                className="w-full h-full"
            >
                <CarouselContent className="h-full">
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index} className="relative h-screen w-full flex items-center">
                            {/* Background with advanced overlay */}
                            <div className="absolute inset-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center brightness-[0.85]"
                                    style={{ backgroundImage: `url(${slide.img})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-900/50 to-transparent" />
                            </div>

                            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 sm:pt-28 md:pt-20">
                                <div className="max-w-3xl text-left">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                        className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-[1.05] tracking-tight drop-shadow-lg"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 leading-relaxed max-w-xl drop-shadow-md"
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
                                                {feature}
                                            </div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        className="flex flex-col sm:flex-row items-start gap-4"
                                    >
                                        <Button asChild className="h-14 px-8 text-lg font-bold bg-[var(--primary)] hover:bg-[#1a4d3e] text-white rounded-xl transition-all hover:scale-105 active:scale-95">
                                            <Link to={getLocalizedPath('/contact')}>
                                                {t('buttons.start_project')}
                                                <ArrowRight className="ml-2 w-5 h-5" />
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" className="h-14 px-8 text-lg font-bold bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                                            <Link to={getLocalizedPath(slide.buttonLink)}>
                                                {slide.buttonText}
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

