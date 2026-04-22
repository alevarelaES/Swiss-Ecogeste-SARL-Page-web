import { ClientTypePageTemplate } from '../components/layout';
import { getCommunesPageContent } from '../data/communesPageContent';
import { useTranslation } from 'react-i18next';
import { useServicePageContent } from '../hooks/useServicePageContent';

const CommunesPage = () => {
    const { i18n } = useTranslation('common');
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';
    const fallback = getCommunesPageContent(lang);
    const content = useServicePageContent('communes', lang, fallback);
    return <ClientTypePageTemplate content={content} />;
};

export default CommunesPage;
