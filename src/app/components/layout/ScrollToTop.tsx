import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

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
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[var(--primary)]/90 hover:bg-[var(--primary)] text-white rounded-lg shadow-lg shadow-[var(--primary)]/25 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
                    aria-label="Remonter en haut de la page"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
