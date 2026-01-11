import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Autoplay from "embla-carousel-autoplay";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "./components/ui/carousel";
import { Button } from "./components/ui/button";
import { 
  Leaf, 
  Zap, 
  Home, 
  Building2, 
  ArrowRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Instagram,
  CheckCircle2,
  TrendingUp,
  Sun
} from 'lucide-react';

// --- Assets (using Unsplash URLs for this demo) ---
const IMAGES = {
  hero1: "https://images.unsplash.com/photo-1583873844461-62e79c8c8bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHN3aXNzJTIwbW91bnRhaW5zJTIwbW9kZXJufGVufDF8fHx8MTc2Nzk2ODcxM3ww&ixlib=rb-4.1.0&q=80&w=1920",
  hero2: "https://images.unsplash.com/photo-1759398430338-8057876edf61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXN0YWluYWJsZSUyMGhvbWUlMjBpbnRlcmlvciUyMGJyaWdodHxlbnwxfHx8fDE3Njc5Njg3MTd8MA&ixlib=rb-4.1.0&q=80&w=1920",
  hero3: "https://images.unsplash.com/photo-1764515296584-cdf00acebe3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZSUyMGdyZWVufGVufDF8fHx8MTc2Nzk2ODcyMXww&ixlib=rb-4.1.0&q=80&w=1920",
  team1: "https://images.unsplash.com/photo-1688997794202-e53ca1356ea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMHN1aXQlMjBmcmllbmRseXxlbnwxfHx8fDE3Njc5Njg3MjR8MA&ixlib=rb-4.1.0&q=80&w=800",
  team2: "https://images.unsplash.com/photo-1765005204058-10418f5123c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFuJTIwYnVzaW5lc3MlMjBjb25maWRlbnR8ZW58MXx8fHwxNzY3OTY4NzI4fDA&ixlib=rb-4.1.0&q=80&w=800",
  team3: "https://images.unsplash.com/photo-1750741268857-7e44510f867d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbiUyMHN1aXQlMjBmcmllbmRseXxlbnwxfHx8fDE3Njc5Njg3czN8MA&ixlib=rb-4.1.0&q=80&w=800",
};

// --- Branding ---
const BRAND_COLORS = {
  primary: "#00A651", // Energy Green
  secondary: "#1F2937", // Dark Gray
  light: "#F3F4F6", // Light Gray
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
            <Leaf size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            Swiss Ecogestes
          </span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>
          <a href="#services" className="hover:text-green-500 transition-colors">Services</a>
          <a href="#team" className="hover:text-green-500 transition-colors">Équipe</a>
          <a href="#partners" className="hover:text-green-500 transition-colors">Partenaires</a>
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
            Contact
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-green-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? 'text-gray-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl md:hidden flex flex-col p-6 gap-4"
          >
            <a href="#services" className="text-gray-800 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#team" className="text-gray-800 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Équipe</a>
            <a href="#partners" className="text-gray-800 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Partenaires</a>
            <Button className="w-full bg-green-600 text-white">Contact</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Carousel 
        plugins={[Autoplay({ delay: 6000 })]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {[
            { img: IMAGES.hero1, title: "L'énergie de demain, gérée aujourd'hui", sub: "Expertise suisse en efficacité énergétique et solutions durables." },
            { img: IMAGES.hero2, title: "Confort durable & économies réelles", sub: "Optimisez votre consommation sans sacrifier votre bien-être." },
            { img: IMAGES.hero3, title: "Pour particuliers, gérances et entreprises", sub: "Des solutions sur mesure adaptées à vos infrastructures." }
          ].map((item, index) => (
            <CarouselItem key={index} className="relative h-screen w-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
              </div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto pt-20">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                >
                  {item.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-gray-100 mb-10 max-w-2xl"
                >
                  {item.sub}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg">
                    En savoir plus <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, description, features, index }: { icon: any, title: string, description: string, features: string[], index: number }) => {
  return (
    <Reveal delay={index * 0.1}>
      <motion.div 
        whileHover={{ y: -10 }}
        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full"
      >
        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
          <Icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-2">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> {feat}
            </li>
          ))}
        </ul>
      </motion.div>
    </Reveal>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Nos Expertises</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Solutions Énergétiques Complètes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous accompagnons chaque acteur de la transition énergétique avec des solutions adaptées et performantes.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            index={0}
            icon={Home}
            title="Particuliers"
            description="Optimisez votre habitat pour plus de confort et moins de dépenses. Des solutions simples pour un impact immédiat."
            features={["Audit énergétique", "Rénovation thermique", "Subventions cantonales", "Panneaux solaires"]}
          />
          <ServiceCard 
            index={1}
            icon={Building2}
            title="Gérances Immobilières"
            description="Valorisez votre parc immobilier et réduisez les charges. Une gestion proactive pour des bâtiments durables."
            features={["CECwd", "Planification pluriannuelle", "Optimisation chaufferie", "Suivi de consommation"]}
          />
          <ServiceCard 
            index={2}
            icon={Zap}
            title="Entreprises"
            description="Réduisez votre empreinte carbone tout en optimisant vos coûts opérationnels. L'écologie au service de l'économie."
            features={["Grands consommateurs", "Mobilité électrique", "Eclairage LED intelligent", "Monitoring énergétique"]}
          />
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ img, name, role }: { img: string, name: string, role: string }) => (
  <motion.div 
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="h-64 overflow-hidden relative">
      <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-green-600 font-medium text-sm mt-1">{role}</p>
      <div className="flex justify-center gap-4 mt-4">
         <Linkedin className="w-5 h-5 text-gray-400 hover:text-green-600 cursor-pointer transition-colors" />
         <Mail className="w-5 h-5 text-gray-400 hover:text-green-600 cursor-pointer transition-colors" />
      </div>
    </div>
  </motion.div>
);

const Team = () => {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Notre Équipe</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Experts passionnés</h2>
            </div>
            <Button variant="outline" className="hidden md:flex gap-2">
              Rejoindre l'équipe <ArrowRight size={16} />
            </Button>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          <TeamMember img={IMAGES.team1} name="Thomas Dubois" role="Directeur Technique & Ingénieur" />
          <TeamMember img={IMAGES.team2} name="Sarah Meyer" role="Spécialiste Efficacité Énergétique" />
          <TeamMember img={IMAGES.team3} name="Julien Rochat" role="Chef de Projet Renouvelable" />
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  // Mock partners for the marquee
  const partners = ["SIG", "État de Vaud", "Romande Energie", "Minergie", "Swiss Solar", "Equiwatt"];
  
  return (
    <section id="partners" className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
         <p className="text-gray-500 font-medium">Ils nous font confiance</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {/* Double the list for seamless loop */}
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <span key={i} className="text-2xl md:text-3xl font-bold text-gray-300 uppercase tracking-widest hover:text-green-600 transition-colors cursor-default">
              {partner}
            </span>
          ))}
        </div>
      </div>
      
      {/* Styles for marquee animation */}
      <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="bg-green-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Info Side */}
            <div className="p-10 md:p-16 text-white md:w-1/2 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">Parlons de votre projet</h2>
                <p className="text-green-100 text-lg mb-8 leading-relaxed">
                  Une question ? Une demande de devis ? Nos experts sont à votre disposition pour analyser vos besoins et vous proposer des solutions concrètes.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-green-100 text-sm">Téléphone</p>
                      <p className="font-semibold text-lg">+41 21 000 00 00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-green-100 text-sm">Email</p>
                      <p className="font-semibold text-lg">info@swissecogestes.ch</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-green-100 text-sm">Bureau</p>
                      <p className="font-semibold text-lg">Lausanne, Suisse</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Form Side */}
            <div className="bg-white p-10 md:p-16 md:w-1/2">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Prénom</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Jean" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nom</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Dupont" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="jean.dupont@email.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Je suis un...</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Particulier', 'Entreprise', 'Gérance'].map((type) => (
                      <button key={type} type="button" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-green-500 hover:text-green-600 focus:bg-green-50 focus:border-green-500 focus:text-green-700 transition-all">
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Décrivez votre projet..."></textarea>
                </div>

                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center text-white">
              <Leaf size={20} />
            </div>
            <span className="text-xl font-bold">Swiss Ecogestes</span>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6">
            Votre partenaire de confiance pour la transition énergétique en Suisse. Expertise, innovation et durabilité.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
              <Facebook size={18} />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
              <Linkedin size={18} />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
              <Instagram size={18} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-green-500 cursor-pointer transition-colors">Pour les Particuliers</li>
            <li className="hover:text-green-500 cursor-pointer transition-colors">Pour les Gérances</li>
            <li className="hover:text-green-500 cursor-pointer transition-colors">Pour les Entreprises</li>
            <li className="hover:text-green-500 cursor-pointer transition-colors">Audits Énergétiques</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Entreprise</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-green-500 cursor-pointer transition-colors">À propos</li>
            <li className="hover:text-green-500 cursor-pointer transition-colors">Notre Équipe</li>
            <li className="hover:text-green-500 cursor-pointer transition-colors">Carrières</li>
            <li className="hover:text-green-500 cursor-pointer transition-colors">Actualités</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3"><Phone size={16} className="text-green-600"/> +41 21 000 00 00</li>
            <li className="flex items-center gap-3"><Mail size={16} className="text-green-600"/> info@swissecogestes.ch</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-green-600"/> Avenue de la Gare 1,<br/>1003 Lausanne</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Swiss Ecogestes SA. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer transition-colors">Mentions Légales</span>
          <span className="hover:text-white cursor-pointer transition-colors">Confidentialité</span>
          <span className="hover:text-white cursor-pointer transition-colors">CGV</span>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Team />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
