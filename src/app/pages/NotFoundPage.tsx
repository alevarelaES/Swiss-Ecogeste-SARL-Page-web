import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components';
import { Button } from '../components/ui/button';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const NotFoundPage = () => {
    const { t } = useTranslation('common');
    const { getLocalizedPath } = useLocalizedPath();

    return (
        <div className="pt-40 pb-32">
            <SEO title={t('not_found.title')} description={t('not_found.text')} noindex />
            <div className="max-w-2xl mx-auto px-6 text-center">
                <p className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-4">404</p>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">{t('not_found.title')}</h1>
                <p className="text-lg text-gray-700 mb-10">{t('not_found.text')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-[var(--primary)] hover:bg-[#1a4d3e] text-white">
                        <Link to={getLocalizedPath('/')}>{t('not_found.home')}</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-[var(--primary)] text-[var(--primary)]">
                        <Link to={getLocalizedPath('/contact')}>{t('not_found.contact')}</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
