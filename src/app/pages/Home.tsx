import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Team from '../components/sections/Team';
import Subventions from '../components/sections/Subventions';
import Partners from '../components/sections/Partners';
import ContactSection from '../components/sections/ContactSection';
import Reveal from '../components/animations/Reveal';
import { Sun, Home as HomeIcon, Leaf, ArrowRight } from 'lucide-react';

const BlogPreview = () => (
    <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <Reveal>
                <div className="text-center mb-12">
                    <span className="text-amber-500 font-bold tracking-wider uppercase text-lg bg-amber-50 px-4 py-2 rounded-full inline-block">Actualités & Conseils</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6">Nos derniers articles</h2>
                    <p className="text-gray-900 font-medium text-lg max-w-3xl mx-auto">
                        Découvrez nos conseils pour réduire votre consommation d'énergie et adopter des gestes écoresponsables au quotidien.
                    </p>
                </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Article 1 */}
                <Reveal delay={0.1}>
                    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                        <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-12 flex items-center justify-center h-64">
                            <Sun size={120} strokeWidth={1.5} className="text-amber-500" />
                        </div>
                        <div className="p-6 flex-grow text-left">
                            <h3 className="text-green-600 font-semibold mb-2">Énergie Solaire</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">Profitez du soleil pour réduire vos factures d'électricité. Découvrez les avantages des panneaux solaires.</p>
                            <a href="/conseils" className="text-amber-500 font-bold hover:text-amber-600 transition-colors inline-flex items-center gap-2 mt-auto">
                                Lire la suite <ArrowRight size={16} />
                            </a>
                        </div>
                    </article>
                </Reveal>

                {/* Article 2 */}
                <Reveal delay={0.2}>
                    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                        <div className="bg-gradient-to-br from-green-100 to-green-50 p-12 flex items-center justify-center h-64">
                            <HomeIcon size={120} strokeWidth={1.5} className="text-green-600" />
                        </div>
                        <div className="p-6 flex-grow text-left">
                            <h3 className="text-green-600 font-semibold mb-2">Bien au chaud, bien chez soi</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">Testez vos connaissances et gagnez un kit «Mon hiver bien au chaud»!</p>
                            <a href="/conseils" className="text-amber-500 font-bold hover:text-amber-600 transition-colors inline-flex items-center gap-2 mt-auto">
                                Lire la suite <ArrowRight size={16} />
                            </a>
                        </div>
                    </article>
                </Reveal>

                {/* Article 3 */}
                <Reveal delay={0.3}>
                    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-12 flex items-center justify-center h-64">
                            <Leaf size={120} strokeWidth={1.5} className="text-blue-500" />
                        </div>
                        <div className="p-6 flex-grow text-left">
                            <h3 className="text-green-600 font-semibold mb-2">Gestes Écoresponsables</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">Adoptez les bons réflexes au quotidien pour préserver notre planète et réduire vos dépenses.</p>
                            <a href="/conseils" className="text-amber-500 font-bold hover:text-amber-600 transition-colors inline-flex items-center gap-2 mt-auto">
                                Lire la suite <ArrowRight size={16} />
                            </a>
                        </div>
                    </article>
                </Reveal>
            </div>
        </div>
    </section>
);

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const { hash } = useLocation();

    useLayoutEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        }
    }, [hash]);

    return (
        <>
            <SEO
                title="Expert en Efficacité Énergétique"
                description="Swiss Ecogestes accompagne les particuliers, gérances et entreprises dans leur transition énergétique en Suisse. Solutions durables et économies d'énergie."
                canonical="/"
            />
            <Hero />
            <About />
            <Services />
            <Team />
            <Subventions />
            <Partners />
            <BlogPreview />
            <ContactSection />
        </>
    );
};

export default Home;
