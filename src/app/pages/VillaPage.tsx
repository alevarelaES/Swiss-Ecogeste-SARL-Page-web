import { ClientTypePageTemplate } from '../components/layout';
import { getVillaPageContent } from '../data/villaPageContent';
import { useTranslation } from 'react-i18next';
import { useServicePageContent } from '../hooks/useServicePageContent';

const VillaPage = () => {
    const { i18n } = useTranslation('common');
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';
    const fallback = getVillaPageContent(lang);
    const content = useServicePageContent('villa', lang, fallback);
    return <ClientTypePageTemplate content={content} />;
};

export default VillaPage;
