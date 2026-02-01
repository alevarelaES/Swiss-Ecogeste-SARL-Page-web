import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from "../ui/button";
import ServiceModal from './ServiceModal';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

export interface ServiceCardProps {
    service: {
        title: string;
        description: string;
        image: string;
        features?: string[];
    };
    t: (key: string) => string;
}

const ServiceCard = ({ service, t }: ServiceCardProps) => {
    const { i18n } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group h-full flex flex-col">
                {/* Image at top */}
                <div
                    className="h-40 sm:h-48 overflow-hidden relative cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <div className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {service.description}
                    </div>

                    <div className="mt-auto flex gap-2">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="flex-1 bg-[var(--primary)] hover:bg-[#1a4d3e] text-white shadow-md transition-all hover:-translate-y-0.5 text-[13px] md:text-sm px-2 h-10"
                        >
                            {t('buttons.learn_more') || 'En savoir plus'}
                        </Button>

                        <Button asChild variant="outline" className="flex-1 border-[var(--primary)] text-[var(--primary)] hover:bg-gray-50 transition-all text-[13px] md:text-sm px-2 h-10">
                            <Link to={getLocalizedPath('/contact')}>
                                {t('buttons.contact_us') || 'Contact'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={service}
                t={t}
                i18n={i18n}
            />
        </>
    );
};

export default ServiceCard;
