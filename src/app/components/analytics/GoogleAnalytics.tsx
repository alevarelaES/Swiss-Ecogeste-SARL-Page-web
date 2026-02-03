import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual Measurement ID

declare global {
    interface Window {
        gtag: (command: string, targetId: string, config?: any) => void;
        dataLayer: any[];
    }
}

export const GoogleAnalytics = () => {
    const location = useLocation();

    const initGA = () => {
        // Prevent multiple initializations (check if script already exists)
        if (document.getElementById('google-analytics')) return;

        const script = document.createElement('script');
        script.id = 'google-analytics';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        window.gtag = gtag as any;
        window.gtag('js', 'new Date()');
        window.gtag('config', GA_MEASUREMENT_ID);

        console.log('Google Analytics initialized');
    };

    const checkConsentAndInit = () => {
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'accepted') {
            initGA();
        }
    };

    // Check on mount and listen for updates
    useEffect(() => {
        checkConsentAndInit();

        const handleConsentUpdate = () => checkConsentAndInit();
        window.addEventListener('cookie-consent-updated', handleConsentUpdate);

        return () => {
            window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
        };
    }, []);

    // Track page views
    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'accepted' && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null; // Component does not render anything
};
