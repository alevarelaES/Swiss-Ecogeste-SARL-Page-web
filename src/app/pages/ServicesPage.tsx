import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from "../components/ui/button";
import Reveal from '../components/animations/Reveal';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { getServices } from '../data/services';
import { SERVICES_PAGE_IMAGES } from '../config/images';
import { useSearchHighlight } from '../hooks/useSearchHighlight';

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
        link: service.link
    }));

    return (
        <div className="pt-32 pb-24">
            <SEO
                title={t('services_page.seo_title')}
                description={t('services_page.seo_desc')}
                canonical="/services"
            />

            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-20">
                        <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">{t('services_page.label')}</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">{t('services_page.title')}</h1>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                            {t('services_page.intro')}
                        </p>
                    </div>
                </Reveal>

                <div className="space-y-24">
                    {detailedServices.map((service, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                                <div className="md:w-1/2">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {service.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-sm font-medium">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-4">
                                        <Button asChild className="bg-[var(--primary)] hover:bg-green-700 text-white rounded-md px-8 group shadow-lg shadow-green-900/20 hover:shadow-green-900/40 transition-all duration-300">
                                            <Link to={getLocalizedPath(service.link)}>
                                                {t('buttons.learn_more') || "En savoir plus"} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="md:w-1/2 w-full">
                                    <div className="rounded-xl overflow-hidden shadow-2xl aspect-[4/3] relative group">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${service.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;

