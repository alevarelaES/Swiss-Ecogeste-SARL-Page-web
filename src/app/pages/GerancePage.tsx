import { ClientTypePageTemplate } from '../components/layout';
import { getGerancePageContent } from '../data/gerancePageContent';
import { useTranslation } from 'react-i18next';
import { useServicePageContent } from '../hooks/useServicePageContent';

const GerancePage = () => {
    const { i18n } = useTranslation('common');
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';
    const fallback = getGerancePageContent(lang);
    const content = useServicePageContent('gerance', lang, fallback);
    return <ClientTypePageTemplate content={content} />;
};

export default GerancePage;
