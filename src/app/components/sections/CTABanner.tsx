import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface CTABannerProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
}

const CTABanner = ({
    title,
    subtitle,
    buttonText,
    buttonLink = "/contact"
}: CTABannerProps) => {
    const { t } = useTranslation('common');

    // Use props if provided, otherwise use translation keys
    const displayTitle = title || t('cta_banner.title');
    const displaySubtitle = subtitle || t('cta_banner.subtitle');
    const displayButtonText = buttonText || t('cta_banner.button');

    return (
        <section className="bg-[#1b5e39] py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                            {displayTitle}
                        </h2>
                        <p className="text-white/70 text-base md:text-lg">
                            {displaySubtitle}
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-white hover:bg-gray-100 text-[#1b5e39] font-bold px-8 py-6 h-auto rounded-full transition-all hover:scale-105 shadow-lg text-base"
                    >
                        <Link to={buttonLink}>{displayButtonText}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
