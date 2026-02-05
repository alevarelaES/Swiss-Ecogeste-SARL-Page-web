import { ClientTypePageTemplate } from '../components/layout/ClientTypePageTemplate';
import { getVillaPageContent } from '../data/villaPageContent';
import { useTranslation } from 'react-i18next';

const VillaPage = () => {
    const { i18n } = useTranslation('common');
    const content = getVillaPageContent(i18n.language);
    return <ClientTypePageTemplate content={content} />;
};

export default VillaPage;
