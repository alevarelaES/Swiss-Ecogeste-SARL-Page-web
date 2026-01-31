import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CTABanner from '../sections/CTABanner';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pathname, hash } = useLocation();

    // Scroll to top on route change, but respect hash navigation
    useEffect(() => {
        // If there's a hash, let the target page handle the scrolling
        if (!hash) {
            window.scrollTo(0, 0);
        }
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
