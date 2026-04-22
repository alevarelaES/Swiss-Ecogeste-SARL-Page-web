import { ClientTypePageTemplate } from '../components/layout';
import { getEntreprisePageContent } from '../data/entreprisePageContent';
import { useTranslation } from 'react-i18next';
import { useServicePageContent } from '../hooks/useServicePageContent';

const EntreprisePage = () => {
    const { i18n } = useTranslation('common');
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';
    const fallback = getEntreprisePageContent(lang);
    const content = useServicePageContent('entreprise', lang, fallback);
    return <ClientTypePageTemplate content={content} />;
};

export default EntreprisePage;
