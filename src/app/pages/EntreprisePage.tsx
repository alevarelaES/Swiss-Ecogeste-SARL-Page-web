import { ClientTypePageTemplate } from '../components/layout/ClientTypePageTemplate';
import { getEntreprisePageContent } from '../data/entreprisePageContent';
import { useTranslation } from 'react-i18next';

const EntreprisePage = () => {
    const { i18n } = useTranslation('common');
    const content = getEntreprisePageContent(i18n.language);
    return <ClientTypePageTemplate content={content} />;
};

export default EntreprisePage;
