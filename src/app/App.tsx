import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import ConseilsPage from './pages/ConseilsPage';
import ServiceDetail from './pages/ServiceDetail';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/equipe" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/conseils" element={<ConseilsPage />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            {/* Fallback to Home or a 404 page could go here */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
