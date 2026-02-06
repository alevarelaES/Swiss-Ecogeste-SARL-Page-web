import { SEO } from '../components';
import { useTranslation } from 'react-i18next';
import { getServices } from '../data/services';
import { SERVICES_PAGE_IMAGES } from '../config/images';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import { ServiceCard } from '../components/services';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const ServicesPage = () => {
    useSearchHighlight();
    const { t, i18n } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const services = getServices(i18n.language);

    const detailedServices = services.map(service => ({
        title: service.title,
        icon: service.icon,
        description: service.description,
        features: service.features,
        image: SERVICES_PAGE_IMAGES[service.id as keyof typeof SERVICES_PAGE_IMAGES],
        link: getLocalizedPath(service.link)
    }));

    return (
        <div className="min-h-screen bg-[#fdfdfd] overflow-x-hidden">
            <SEO
                title={t('services_page.seo_title')}
                description={t('services_page.seo_desc')}
                canonical="/services"
            />

            {/* Premium Hero Section */}
            <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[var(--primary)]">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.1))]" />
                    <div className="absolute -top-[20%] -right-[20%] w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
                    <div>
                        {/* Badge Removed */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            {t('services_page.title')}
                        </h1>
                        <p className="tex-lg md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                            {t('services_page.intro')}
                        </p>
                    </div>
                </div>

                {/* Curved divider at bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#fdfdfd]"></path>
                    </svg>
                </div>
            </div>

            {/* Services List Section */}
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">
                {detailedServices.map((service, index) => (
                    <ServiceCard
                        key={index}
                        index={index}
                        title={service.title}
                        description={service.description}
                        features={service.features}
                        image={service.image}
                        link={service.link}
                        learnMoreText={t('buttons.learn_more')}
                    />
                ))}
            </div>

            {/* CTA / Bottom Section Section could go here, but taking it simple for now to focus on services */}
        </div>
    );
};

export default ServicesPage;
