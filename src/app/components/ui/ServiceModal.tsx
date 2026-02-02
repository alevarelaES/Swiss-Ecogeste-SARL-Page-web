import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from "../ui/button";
import { Link } from 'react-router-dom';
import { i18n as I18nType } from 'i18next';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        title: string;
        description: string;
        image: string;
        features?: string[];
    };
    t: (key: string) => string;
    i18n: I18nType;
}

const ServiceModal = ({ isOpen, onClose, service, t, i18n }: ServiceModalProps) => {
    const { getLocalizedPath } = useLocalizedPath();
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with Blur Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <Button
                                variant="flat"
                                size="icon"
                                rounded="full"
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md hover:bg-white transition-colors text-gray-800 shadow-sm"
                            >
                                <X size={20} />
                            </Button>

                            {/* Left Side: Image & Blur Effect */}
                            <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                                    style={{ backgroundImage: `url(${service.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />

                                {/* Blurred Background Overlay for Premium Feel */}
                                <div className="absolute inset-0 bg-[var(--primary)]/10 mix-blend-overlay" />
                            </div>

                            {/* Right Side: Content */}
                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col overflow-y-auto">
                                <div className="mb-6">
                                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                    <div className="w-20 h-1.5 bg-[var(--primary)] rounded-full mb-6"></div>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {service.features && service.features.length > 0 && (
                                    <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
                                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="text-[var(--primary)]">★</span> {t('service_detail.what_we_offer') || 'Ce que nous proposons'}
                                        </h4>
                                        <ul className="space-y-3">
                                            {service.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                                    <Button asChild variant="default" rounded="lg" className="flex-1 h-auto py-6 text-lg shadow-lg shadow-green-900/20 transition-all hover:-translate-y-0.5">
                                        <Link to={getLocalizedPath('/contact')} onClick={onClose}>
                                            {t('buttons.contact_us') || 'Nous contacter'} <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        rounded="lg"
                                        onClick={onClose}
                                        className="sm:w-auto h-auto py-6 text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-gray-200"
                                    >
                                        {t('buttons.close') === 'buttons.close' ? (i18n.language === 'en' ? 'Close' : i18n.language === 'de' ? 'Schließen' : 'Fermer') : t('buttons.close')}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
