import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

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

    return (
        <motion.div
            ref={ref}
            className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full"
        >
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1b5e39] via-[#4ade80] to-[#1b5e39] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="p-8 flex flex-col h-full relative z-10">

                {/* Avatar / Image Section */}
                <div className="mb-6 flex justify-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500 ring-4 ring-gray-50 group-hover:ring-[#e8f5e9]">
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#f4f7f5] flex items-center justify-center relative overflow-hidden group-hover:bg-[#1b5e39] transition-colors duration-500">
                                <span className="text-3xl font-bold text-[#1b5e39] tracking-wider z-10 group-hover:text-white transition-colors duration-500">
                                    {initials}
                                </span>
                                {/* Subtle decorative bg circle */}
                                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-[#1b5e39]/5 group-hover:bg-white/10 transition-colors duration-500"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1b5e39] transition-colors duration-300 mb-1">
                        {name}
                    </h3>
                    <p className="text-sm font-semibold text-amber-600 uppercase tracking-widest">
                        {role}
                    </p>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-gray-200 mx-auto mb-6 group-hover:w-24 group-hover:bg-[#1b5e39]/30 transition-all duration-500"></div>

                {/* Expertise List */}
                <div className="flex-grow">
                    <ul className="space-y-2.5 text-left">
                        {items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Optional Social/Contact placeholders (Future proofing) */}
                {/* <div className="mt-6 pt-4 border-t border-gray-50 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button className="text-gray-400 hover:text-[#0077b5] transition-colors"><Linkedin size={18} /></button>
                </div> */}
            </div>

            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f4f7f5]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </motion.div>
    );
};
