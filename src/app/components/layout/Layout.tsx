import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

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

    return (
        <div className="min-h-screen font-sans text-gray-900 bg-white selection:bg-green-100 selection:text-green-900 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

