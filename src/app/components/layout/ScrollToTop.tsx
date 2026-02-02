import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when page is scrolled down 400px
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <Button
                    variant="default"
                    size="icon"
                    rounded="full"
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 bg-[var(--primary)]/90 hover:bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/25 backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                    aria-label="Remonter en haut de la page"
                >
                    <ArrowUp size={20} />
                </Button>
            )}
        </>
    );
};

export default ScrollToTop;
