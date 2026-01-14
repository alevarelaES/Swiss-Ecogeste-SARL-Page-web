import React from 'react';

const Partners = () => {
    const partners = [
        "Canton de Genève", "éco21", "SIG", "Chauffez Renouvelable", "État de Vaud", "SuisseÉnergie"
    ];

    return (
        <section id="partners" className="py-16 bg-green-600 border-y border-green-700 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <p className="text-white font-medium">Ils nous font confiance</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
                    {/* Triple the list for seamless loop */}
                    {[...partners, ...partners, ...partners].map((partner, i) => (
                        <span key={i} className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest hover:text-amber-400 transition-colors cursor-default">
                            {partner}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
};

export default Partners;
