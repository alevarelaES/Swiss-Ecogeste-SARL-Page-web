import Reveal from '../animations/Reveal';
import { getServices } from '../../data/services';
import { BACKGROUND_IMAGES } from '../../config/images';
import { useTranslation } from 'react-i18next';
import { ServiceGridCard } from '../services/ServiceGridCard';

const Services = () => {
    const { i18n } = useTranslation();
    const services = getServices(i18n.language);

    return (
        <section id="services" className="relative py-8 md:py-10 lg:py-12 bg-white overflow-hidden">
            {/* Background Image (Parallax) */}
            <div
                className="absolute inset-0 bg-fixed bg-cover bg-center grayscale opacity-40"
                style={{
                    backgroundImage: `url('${BACKGROUND_IMAGES.services}')`,
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
                                <span className="text-[var(--primary)] font-bold tracking-[0.25em] uppercase text-xs">Excellence Technique</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-gray-900 leading-tight">
                                Nos <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Prestations</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <Reveal key={service.id} delay={service.delay}>
                            <ServiceGridCard
                                number={service.number}
                                title={service.title}
                                subtitle={service.subtitle}
                                description={service.description}
                                image={service.image}
                                link={service.link}
                            />
                        </Reveal>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;

