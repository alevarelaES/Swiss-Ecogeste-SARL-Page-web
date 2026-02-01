import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CTABanner from '../sections/CTABanner';

interface LayoutProps {
    children: React.ReactNode;
}

// Helper to get path without language prefix
const getPathWithoutLang = (path: string) => {
    const langPrefixes = ['/fr', '/en', '/de'];
    for (const prefix of langPrefixes) {
        if (path === prefix || path.startsWith(prefix + '/')) {
            return path.slice(prefix.length) || '/';
        }
    }
    return path;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pathname, hash } = useLocation();
    const prevPathRef = useRef<string>(getPathWithoutLang(pathname));

    // Scroll to top on route change, but respect hash navigation and language switches
    useEffect(() => {
        const currentPathWithoutLang = getPathWithoutLang(pathname);
        
        // Only scroll to top if the actual page changed (not just language prefix)
        if (!hash && currentPathWithoutLang !== prevPathRef.current) {
            window.scrollTo(0, 0);
        }
        
        prevPathRef.current = currentPathWithoutLang;
    }, [pathname, hash]);

    // Don't show CTA banner on contact page (already there) or home page (has its own contact section)
    const hideCTABanner = pathname === '/contact' || pathname === '/';

    return (
        <div className="min-h-screen font-sans text-gray-900 bg-white selection:bg-green-100 selection:text-green-900 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {!hideCTABanner && <CTABanner />}
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default Layout;
