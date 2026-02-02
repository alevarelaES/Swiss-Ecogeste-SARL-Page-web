import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import ConseilsPage from './pages/ConseilsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import VillaPage from './pages/VillaPage';
import EntreprisePage from './pages/EntreprisePage';
import GerancePage from './pages/GerancePage';
import CommunesPage from './pages/CommunesPage';
import MentionsLegalesPage from './pages/MentionsLegalesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';

// Wrapper component to handle language detection and redirection
const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lng } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();

  // Sync i18n instance with URL parameter only if they actually differ
  // This prevents unnecessary re-renders and language change loops
  React.useEffect(() => {
    if (lng && ['fr', 'en', 'de'].includes(lng) && i18n.language !== lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  // If the language prefix is not supported, or missing, we handle it via RootRedirect or this check
  if (!lng || !['fr', 'en', 'de'].includes(lng)) {
    const detectedLng = i18n.language.split('-')[0] || 'fr';
    const safeLng = ['fr', 'en', 'de'].includes(detectedLng) ? detectedLng : 'fr';
    return <Navigate to={`/${safeLng}${location.pathname === '/' ? '' : location.pathname}`} replace />;
  }

  return <>{children}</>;
};

// Separate component for root redirection
const RootRedirect = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const detectedLng = i18n.language.split('-')[0] || 'fr';
  const safeLng = ['fr', 'en', 'de'].includes(detectedLng) ? detectedLng : 'fr';

  // Construct target path, ensuring we don't double the prefix if it was somehow redirected here
  const cleanPath = location.pathname === '/' ? '' : location.pathname;
  return <Navigate to={`/${safeLng}${cleanPath}`} replace />;
};

export default function App() {
  return (
    <HelmetProvider>
      <Toaster position="bottom-right" richColors />
      <Router>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Localized routes */}
          <Route path="/:lng/*" element={
            <LanguageWrapper>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/conseils" element={<ConseilsPage />} />
                  <Route path="/conseils/:slug" element={<ArticleDetailPage />} />

                  {/* Service Specific Routes */}
                  <Route path="/services/villa" element={<VillaPage />} />
                  <Route path="/services/entreprise" element={<EntreprisePage />} />
                  <Route path="/services/gerance" element={<GerancePage />} />
                  <Route path="/services/communes" element={<CommunesPage />} />

                  {/* Legal Routes */}
                  <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
                  <Route path="/confidentialite" element={<PrivacyPolicyPage />} />
                  <Route path="/cookies" element={<CookiePolicyPage />} />

                  {/* Catch-all within localized paths */}
                  <Route path="*" element={<Navigate to="" replace />} />
                </Routes>
              </Layout>
            </LanguageWrapper>
          } />

          {/* Fallback for non-prefixed paths */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}


