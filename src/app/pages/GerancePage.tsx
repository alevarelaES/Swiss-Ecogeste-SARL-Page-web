import { ClientTypePageTemplate } from '../components/layout';
import { getGerancePageContent } from '../data/gerancePageContent';
import { useTranslation } from 'react-i18next';

const GerancePage = () => {
    const { i18n } = useTranslation('common');
    const content = getGerancePageContent(i18n.language);
    return <ClientTypePageTemplate content={content} />;
};

export default GerancePage;
