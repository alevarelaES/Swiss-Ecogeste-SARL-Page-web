import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieBanner = () => {
    const { t } = useTranslation('common');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
        window.dispatchEvent(new Event('cookie-consent-updated'));
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
        window.dispatchEvent(new Event('cookie-consent-updated'));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-6 z-50 max-w-md w-full"
                >
                    <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6 rounded-2xl flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-[var(--primary)]/10 rounded-lg shrink-0">
                                <ShieldCheck className="w-6 h-6 text-[var(--primary)]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">
                                    {t('cookie_banner.title', 'Confidentialité & Cookies')}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {t('cookie_banner.text', 'Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. Vous pouvez accepter ou refuser leur utilisation.')}
                                </p>
                            </div>
                            <button
                                onClick={handleDecline}
                                className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                            >
                                <X className="w-5 h-5" />
                                <span className="sr-only">Close</span>
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button
                                onClick={handleAccept}
                                className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 flex-1 shadow-lg shadow-[var(--primary)]/20"
                            >
                                {t('cookie_banner.accept', 'Accepter')}
                            </Button>
                            <Button
                                onClick={handleDecline}
                                variant="outline"
                                className="border-gray-200 text-gray-700 hover:bg-gray-50 flex-1"
                            >
                                {t('cookie_banner.decline', 'Refuser')}
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                className="text-gray-500 hover:text-[var(--primary)] text-xs font-normal shrink-0"
                            >
                                <Link to="/cookies">
                                    {t('cookie_banner.policy', 'En savoir plus')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
