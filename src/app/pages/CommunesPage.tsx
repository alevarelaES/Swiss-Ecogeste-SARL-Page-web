import { ClientTypePageTemplate } from '../components/layout';
import { getCommunesPageContent } from '../data/communesPageContent';
import { useTranslation } from 'react-i18next';

const CommunesPage = () => {
    const { i18n } = useTranslation('common');
    const content = getCommunesPageContent(i18n.language);
    return <ClientTypePageTemplate content={content} />;
};

export default CommunesPage;
