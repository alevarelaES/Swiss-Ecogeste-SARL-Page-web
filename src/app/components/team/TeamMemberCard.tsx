import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MAX_EXPERTISE_ITEMS = 3;

interface TeamMemberCardProps {
    name: string;
    role: string;
    initials?: string;
    items: string[];
    image?: string;
    loading?: 'lazy' | 'eager';
}

export const TeamMemberCard = ({ name, role, initials, items, image, loading = 'lazy' }: TeamMemberCardProps) => {
    const { t } = useTranslation('common');

    return (
        <div className="group flex flex-col bg-white border border-gray-200 rounded-none overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300 h-full">
            {/* Photo */}
            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover object-top"
                        loading={loading}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#e8f5e9]">
                        {initials && (
                            <span className="text-4xl font-black text-[#1b5e39]/60">{initials}</span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                        {name}
                    </h3>
                    <p className="text-[#1b5e39] font-medium text-sm">
                        {role}
                    </p>
                </div>

                <div className="h-px w-full bg-gray-100 mb-4"></div>

                <div className="flex-grow">
                    <p className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">
                        {t('team.expertise')}
                    </p>
                    <ul className="space-y-2">
                        {items.slice(0, MAX_EXPERTISE_ITEMS).map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-800 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-[#1b5e39]/60 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
