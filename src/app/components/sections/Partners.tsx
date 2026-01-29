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
    <div className="mx-8 md:mx-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 select-none">
        <img
            src={`/partners/${partner.logo}`}
            alt={partner.name}
            className="h-16 md:h-20 w-auto object-contain max-w-[180px] md:max-w-[220px] pointer-events-none"
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

const Partners = () => {
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
        <section id="partners" className="py-20 bg-[var(--primary)]/5 border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                <div className="flex flex-col items-center gap-3">
                    <span className="h-1 w-12 bg-[#1b5e39] rounded-md"></span>
                    <h3 className="text-[#1b5e39] font-bold text-lg tracking-[0.2em] uppercase">
                        Ils nous font confiance et recommandent nos services
                    </h3>
                </div>
            </div>

            <div className="relative">
                {/* Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

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
