import { CheckCircle2 } from 'lucide-react';

interface TeamMemberCardProps {
    name: string;
    role: string;
    items: string[];
    image?: string; // Optional image URL for future use
}

export const TeamMemberCard = ({ name, role, items, image }: TeamMemberCardProps) => {
    return (
        <div className="group flex flex-col bg-white border border-gray-200 rounded-none overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300 h-full">
            {/* Image Container - Reduced Height (Square) */}
            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover" // Zoom removed from image
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                        <span className="sr-only">No image</span>
                    </div>
                )}

                {/* Overlay Gradient for Text Contrast (Optional, kept minimal) */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/0 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                        {name}
                    </h3>
                    <p className="text-[#1b5e39] font-medium text-sm">
                        {role}
                    </p>
                </div>

                {/* Divider - Very subtle */}
                <div className="h-px w-full bg-gray-100 mb-4"></div>

                {/* Expertise/Tags */}
                <div className="flex-grow">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Expertise</p>
                    <ul className="space-y-2">
                        {items.slice(0, 3).map((item, i) => ( // Limit to 3 items for cleanliness
                            <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-[#1b5e39]/60 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Socials - Placeholder for future */}
                {/* <div className="mt-6 flex gap-4">
                     <SocialIcon />
                </div> */}
            </div>
        </div>
    );
};
