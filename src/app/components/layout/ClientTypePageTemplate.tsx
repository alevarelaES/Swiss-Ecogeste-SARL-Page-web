import SEO from '../SEO';
import Reveal from '../animations/Reveal';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "../ui/button";
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../ui/ServiceCard';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import { useSearchHighlight } from '../../hooks/useSearchHighlight';

interface ClientTypePageTemplateProps {
    content: {
        seo: { title: string; description: string; canonical: string };
        backLink: string;
        sectionLabel: string;
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        heroImage: string;
        services: any[];
    };
}

export const ClientTypePageTemplate = ({ content }: ClientTypePageTemplateProps) => {
    useSearchHighlight();
    const { t } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();
    const location = useLocation();
    const backLinkPath = location.state?.from === 'services' ? '/services' : '/#nos-solutions';

    return (
        <div className="pt-32 pb-24">
            <SEO
                title={content.seo.title}
                description={content.seo.description}
                canonical={content.seo.canonical}
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Back Link */}
                <Link to={getLocalizedPath(backLinkPath)} className="inline-flex items-center text-gray-400 hover:text-[var(--primary)] transition-colors mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" /> {content.backLink}
                </Link>

                {/* Hero Section */}
                <Reveal>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-8 sm:mb-12 md:mb-20">
                        <div className="md:w-1/2">
                            <span className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm">{content.sectionLabel}</span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">{content.title}</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {content.description}
                            </p>
                            <Link to={getLocalizedPath(content.buttonLink)}>
                                <Button size="lg" className="bg-[var(--primary)] hover:bg-[#1a4d3e] text-white rounded-md">
                                    {content.buttonText} <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="md:w-1/2 hidden md:block">
                            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-100 h-64 md:h-96 relative">
                                <img
                                    src={content.heroImage}
                                    alt={content.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {content.services.map((service, index) => (
                        <Reveal key={index} delay={0.1 * (index + 1)}>
                            <ServiceCard service={service} t={t} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};
