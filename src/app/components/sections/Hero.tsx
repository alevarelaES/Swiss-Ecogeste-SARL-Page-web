import React from 'react';
import { motion } from 'motion/react';
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from 'lucide-react';
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
        title: 'Swiss Ecogestes',
        sub: 'Car chaque geste compte!'
    },
    {
        img: 'https://images.unsplash.com/photo-1759398430338-8057876edf61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXN0YWluYWJsZSUyMGhvbWUlMjBpbnRlcmlvciUyMGJyaWdodHxlbnwxfHx8fDE3Njc5Njg3MTd8MA&ixlib=rb-4.1.0&q=80&w=1920',
        title: 'Expertise Énergétique',
        sub: 'Rejoignez-nous dans la transition énergétique.'
    },
    {
        img: 'https://images.unsplash.com/photo-1764515296584-cdf00acebe3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZSUyMGdyZWVufGVufDF8fHx8MTc2Nzk2ODcyMXww&ixlib=rb-4.1.0&q=80&w=1920',
        title: 'Solutions Durables',
        sub: 'L’énergie la plus propre est celle que l’on ne consomme pas.'
    }
];

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Carousel
                plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
                className="w-full h-full"
            >
                <CarouselContent className="h-full">
                    {slides.map((slide, index) => (
                        <CarouselItem key={index} className="relative h-screen w-full">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.img})` }}
                            >
                                <div className="absolute inset-0 bg-black/40" />
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto pt-20">
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl italic tracking-tighter"
                                >
                                    {slide.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="text-xl md:text-3xl text-white/90 font-medium mb-10 max-w-2xl text-center"
                                >
                                    {slide.sub}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    <Button size="lg" className="bg-green-600 hover:bg-amber-500 text-white rounded-full px-10 py-7 text-lg font-bold transition-all transform hover:scale-105 shadow-xl">
                                        Commencer mon audit <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-amber-400/30 backdrop-blur-md text-white border-white/30 px-10 py-7 rounded-full text-lg font-bold transition-all hover:scale-105">
                                        Nos services
                                    </Button>
                                </motion.div>
                            </div>

                            {/* Dynamic Shapes from original index.html */}
                            <div className="absolute bottom-0 right-0 w-1/4 h-32 bg-white z-20 rounded-tl-[80px] hidden md:block border-l border-t border-gray-100"></div>
                            <div className="absolute top-0 left-0 w-32 h-64 bg-green-600/10 backdrop-blur-3xl z-20 rounded-br-[120px] hidden md:block border-r border-b border-white/10"></div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselDots className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30" />
            </Carousel>
        </section>
    );
};

export default Hero;
