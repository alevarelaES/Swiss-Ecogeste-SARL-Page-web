import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CheckCircle2, Quote } from 'lucide-react';

interface TeamMemberCardProps {
    name: string;
    role: string;
    initials: string;
    items: string[];
    index: number;
    image?: string; // Optional image URL for future use
}

export const TeamMemberCard = ({ name, role, initials, items, index, image }: TeamMemberCardProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Keep consistent brand primary for now for elegance
    const selectedGradient = 'from-[#1b5e39] to-[#0f3521]';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-[#fdfdfd] border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
        >
            {/* Top accent bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${selectedGradient}`} />

            <div className="p-6 flex flex-col h-full relative">
                {/* Subtle Background Pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Quote size={80} />
                </div>

                {/* Header: Photo/Initials & Name */}
                <div className="flex items-start gap-5 mb-6">
                    <div className={`
                        w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br ${selectedGradient} 
                        flex items-center justify-center text-white text-2xl font-bold tracking-wider 
                        shadow-lg shadow-green-900/20 group-hover:shadow-green-900/30 
                        transform group-hover:scale-105 transition-all duration-500 overflow-hidden relative
                    `}>
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span>{initials}</span>
                        )}
                    </div>
                    <div className="flex-1 pt-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors duration-300">
                            {name}
                        </h3>
                        <p className="text-amber-600 font-medium text-sm uppercase tracking-wide mt-1">
                            {role}
                        </p>
                        <div className="h-0.5 w-12 bg-gray-200 mt-3 group-hover:w-full group-hover:bg-[var(--secondary)] transition-all duration-500" />
                    </div>
                </div>

                {/* Content: Expertise Items */}
                <div className="flex-grow">
                    {/* <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Expertise</h4> */}
                    <ul className="space-y-3">
                        {items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600 text-sm group-hover:text-gray-900 transition-colors duration-300">
                                <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom decorative interaction */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-amber-400 group-hover:w-full transition-all duration-700 ease-in-out" />
            </div>
        </motion.div>
    );
};
