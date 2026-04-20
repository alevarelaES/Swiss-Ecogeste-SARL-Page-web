import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "../ui/carousel";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import { getHeroSlides } from '../../data/heroSlides';

const Hero = () => {
    const { i18n } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const heroSlides = getHeroSlides(i18n.language);

    const [api, setApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);


    useEffect(() => {
        if (!api) return;
        const onSelect = () => setCurrentSlide(api.selectedScrollSnap());
        api.on('select', onSelect);
        return () => { api.off('select', onSelect); };
    }, [api]);

    const goToSlide = useCallback((index: number) => {
        api?.scrollTo(index);
        const autoplay = api?.plugins()?.autoplay;
        if (autoplay) autoplay.reset();
    }, [api]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-gray-950 select-none">
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 7000, stopOnInteraction: false })]}
                setApi={setApi}
                className="w-full h-full select-none"
            >
                <CarouselContent className="h-full select-none">
                    {Array.isArray(heroSlides) && heroSlides.map((slide, index) => (
                        <CarouselItem key={index} className="relative h-screen w-full flex items-center select-none">
                            {/* Background */}
                            <div className="absolute inset-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center brightness-[0.75]"
                                    style={{ backgroundImage: `url(${slide.img})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/65 to-transparent" />
                            </div>

                            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 sm:pt-28 md:pt-20 pb-28 select-none">
                                <div className="max-w-2xl text-left select-none">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                        className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.05] tracking-tight drop-shadow-lg"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.2 }}
                                        className="text-base sm:text-lg md:text-xl text-white/95 mb-5 leading-relaxed drop-shadow-md"
                                    >
                                        {slide.sub}
                                    </motion.p>

                                    {slide.description && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.7, delay: 0.28 }}
                                            className="hidden md:block text-base text-white/90 mb-5 leading-relaxed drop-shadow-md"
                                        >
                                            {slide.description}
                                        </motion.p>
                                    )}

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.35 }}
                                        className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 border-l-2 border-[var(--primary)] pl-4"
                                    >
                                        {slide.featuresLabel && (
                                            <span className="w-full text-white/80 text-sm italic mb-1">{slide.featuresLabel}</span>
                                        )}
                                        {slide.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-1.5 text-white/95 text-base font-medium">
                                                <CheckCircle2 size={13} className="text-[var(--primary)] shrink-0" />
                                                {feature}
                                            </div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.45 }}
                                        className="flex flex-col sm:flex-row items-start gap-4"
                                    >
                                        <Button asChild className="h-14 px-8 text-base font-bold bg-[var(--primary)] hover:bg-[#1a4d3e] text-white rounded-lg transition-all hover:scale-105 active:scale-95 shadow-lg">
                                            <Link to={getLocalizedPath(slide.buttonLink)}>
                                                {slide.buttonText}
                                                <ArrowRight className="ml-2 w-5 h-5" />
                                            </Link>
                                        </Button>
                                        {slide.secondButtonText && slide.secondButtonLink && (
                                            <Button asChild variant="outline" className="h-14 px-8 text-base font-bold bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg">
                                                <Link to={getLocalizedPath(slide.secondButtonLink)}>
                                                    {slide.secondButtonText}
                                                    <ArrowRight className="ml-2 w-4 h-4" />
                                                </Link>
                                            </Button>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Sector navigation bar */}
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/50 backdrop-blur-md border-t border-white/10">
                <div className="max-w-7xl mx-auto flex">
                    {heroSlides.map((slide, idx) => {
                        const slideIndex = idx;
                        const isActive = currentSlide === slideIndex;
                        return (
                            <button
                                key={idx}
                                onClick={() => goToSlide(slideIndex)}
                                className={`flex-1 py-4 px-3 text-sm font-semibold transition-all duration-200 border-t-2 text-center ${
                                    isActive
                                        ? 'text-white border-[var(--primary)] bg-white/10'
                                        : 'text-white/50 border-transparent hover:text-white/85 hover:bg-white/5'
                                }`}
                            >
                                {slide.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Hero;
