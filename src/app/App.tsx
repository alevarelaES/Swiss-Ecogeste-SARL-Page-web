import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import ConseilsPage from './pages/ConseilsPage';
import ServiceDetail from './pages/ServiceDetail';
import ArticleDetailPage from './pages/ArticleDetailPage';
import EquiwattPage from './pages/EquiwattPage';
import VillaPage from './pages/VillaPage';
import EntreprisePage from './pages/EntreprisePage';
import GerancePage from './pages/GerancePage';
import CommunesPage from './pages/CommunesPage';
import ServicesOverviewPage from './pages/ServicesOverviewPage';

export default function App() {
  return (
    <HelmetProvider>
      <Toaster position="bottom-right" richColors />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/conseils" element={<ConseilsPage />} />
            <Route path="/conseils/:slug" element={<ArticleDetailPage />} />
            <Route path="/service/:id" element={<ServiceDetail />} />

            {/* New Routes */}
            <Route path="/services/villa" element={<VillaPage />} />
            <Route path="/services/entreprise" element={<EntreprisePage />} />
            <Route path="/services/gerance" element={<GerancePage />} />
            <Route path="/services/communes" element={<CommunesPage />} />
            <Route path="/prestations" element={<ServicesOverviewPage />} />

            {/* Fallback to Home or a 404 page could go here */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

