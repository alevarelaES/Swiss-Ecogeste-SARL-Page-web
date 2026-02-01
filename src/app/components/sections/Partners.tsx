import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

interface Partner {
    name: string;
    logo: string;
}

const partners: Partner[] = [
    { name: "Canton de Vaud", logo: "Logo_canton_de_Vaud.svg.png" },
    { name: "Canton de Genève", logo: "Canton_Geneve_Logo.png" },
    { name: "SIG Éco21", logo: "ECO21_SIG.png" },
    { name: "Suisse Énergie", logo: "Suisse_Energie.png" },
    { name: "Chauffez Renouvelable", logo: "Chauffez RENOUVELABLE.png" },
];

const PartnerLogo = ({ partner }: { partner: Partner }) => (
    <div className="mx-8 md:mx-16 flex items-center justify-center select-none group">
        <img
            src={`/partners/${partner.logo}`}
            alt={partner.name}
            className="h-16 md:h-20 w-auto object-contain max-w-[180px] md:max-w-[220px] filter transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-md"
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
            }}
        />
        <span className="hidden font-bold text-gray-400 text-lg border border-dashed border-gray-300 p-4 rounded-lg pointer-events-none whitespace-nowrap">
            {partner.name}
        </span>
    </div>
);

import { useTranslation } from 'react-i18next';

// ... (existing helper components)

const Partners = ({ sectionTitle }: { sectionTitle?: string }) => {
    const { t } = useTranslation('common');
    // Configuration: loop for infinite scroll, dragFree for "momentum" scrolling (hyper scroll)
    const [emblaRef] = useEmblaCarousel(
        { loop: true, dragFree: true },
        [
            AutoScroll({
                playOnInit: true,
                stopOnInteraction: false, // Continue auto-scroll after user releases
                speed: 1, // Slow drift speed
                startDelay: 0 // Resume immediately (no delay)
            })
        ]
    );

    return (
        <section id="partners" className="py-8 md:py-10 bg-[#f0f4f2] border-y border-gray-200/60 overflow-hidden relative">
            {/* Background decoration for better section definition */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
                <div className="flex flex-col items-center gap-3">
                    <span className="h-1.5 w-12 bg-amber-500 rounded-full"></span>
                    <h3 className="text-[#1b5e39] font-black text-xl tracking-[0.1em] uppercase">
                        {sectionTitle || t('partners.title')}
                    </h3>
                </div>
            </div>

            <div className="relative">
                {/* Fade Gradients for the carousel */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#f0f4f2] via-[#f0f4f2]/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#f0f4f2] via-[#f0f4f2]/80 to-transparent z-10 pointer-events-none"></div>

                {/* Embla Carousel Container */}
                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex touch-pan-y">
                        {/* We duplicate the array to ensure enough items for looping on large screens */}
                        {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                            <div className="flex-[0_0_auto]" key={index}>
                                <PartnerLogo partner={partner} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
