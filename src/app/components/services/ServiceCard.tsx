import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/components/ui/utils';

interface ServiceCardProps {
    title: string;
    description: string;
    features: string[];
    image: string;
    link: string;
    index: number;
    learnMoreText?: string;
}

export const ServiceCard = ({
    title,
    description,
    features,
    image,
    link,
    index,
    learnMoreText = "En savoir plus"
}: ServiceCardProps) => {
    const isReversed = index % 2 !== 0;

    return (
        <div
            className={cn(
                "flex flex-col gap-8 md:gap-16 items-center group",
                isReversed ? "md:flex-row-reverse" : "md:flex-row"
            )}
        >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    {/* Overlay for text readability premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                    {/* Floating Badge/Icon or simple deco could go here */}
                </div>

                {/* Decorative element behind */}
                <div className={cn(
                    "absolute -z-10 w-full h-full top-4 bg-[var(--primary)]/10 rounded-xl transition-transform duration-500",
                    isReversed ? "-left-4 group-hover:-translate-x-2" : "-right-4 group-hover:translate-x-2"
                )} />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                            {title}
                        </h2>
                        <div className="h-1.5 w-24 bg-[var(--primary)] mt-4 rounded-full" />
                    </div>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 text-gray-700 font-medium"
                        >
                            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)]">
                                <CheckCircle2 className="w-4 h-4" />
                            </span>
                            {feature}
                        </div>
                    ))}
                </div>

                <div className="pt-2">
                    <Button
                        asChild
                        className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 h-12 px-8 rounded-lg text-base transition-all duration-300 shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40 hover:-translate-y-1"
                    >
                        <Link to={link} state={{ from: 'services' }}>
                            {learnMoreText}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
