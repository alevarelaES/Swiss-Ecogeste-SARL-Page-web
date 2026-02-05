import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BackButtonProps {
    to?: string;
    label?: string;
}

export const BackButton = ({ to = '/', label }: BackButtonProps) => {
    const { t } = useTranslation('common');

    return (
        <div className="mb-8">
            <Link
                to={to}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--primary)] transition-colors duration-300 font-medium group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                {label || t('buttons.back')}
            </Link>
        </div>
    );
};
