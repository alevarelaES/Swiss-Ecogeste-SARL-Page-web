import React from 'react';
import Marquee from 'react-fast-marquee';

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
    <div className="mx-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
        <img
            src={`/partners/${partner.logo}`}
            alt={partner.name}
            className="h-20 w-auto object-contain max-w-[220px]"
            onError={(e) => {
                // Fallback to text if image fails
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
    return (
        <section className="py-20 bg-[var(--primary)]/5 border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                <div className="flex flex-col items-center gap-3">
                    <span className="h-1 w-12 bg-amber-500 rounded-md"></span>
                    <h3 className="text-[var(--primary)] font-bold text-lg tracking-[0.2em] uppercase">
                        Ils nous font confiance et recommandent nos services
                    </h3>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <Marquee gradient={false} speed={40} pauseOnHover={false}>
                    {[...partners, ...partners, ...partners].map((partner, index) => (
                        <PartnerLogo key={index} partner={partner} />
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default Partners;

