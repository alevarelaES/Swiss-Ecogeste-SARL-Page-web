import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

const ConseilsPage = () => {
    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Actualités & Ressources | Swiss Ecogestes"
                description="Retrouvez nos derniers articles, guides et actualités sur la transition énergétique, le solaire et les économies d'énergie en Suisse."
                canonical="/conseils"
            />

            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-20">
                        <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs">Le Journal de l'Énergie</span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mt-4 mb-6 tracking-tight">
                            Actualités & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-emerald-600">Ressources</span>
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                            Décrypter la transition énergétique. Des guides pratiques, des analyses de marché et les dernières actualités sur les subventions.
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-10">
                    {articles.map((article, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <Link to={`/conseils/${article.slug}`} className="group block h-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col border border-gray-100/50">
                                    <div className="h-64 overflow-hidden relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                                            style={{ backgroundImage: `url(${article.imageUrl})` }}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-[var(--primary)] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wide">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="text-gray-400 text-xs font-medium mb-3 flex items-center gap-2">
                                            <Calendar size={12} className="text-[var(--primary)]" />
                                            {article.date}
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[var(--primary)] transition-colors">
                                            {article.title}
                                        </h2>
                                        <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3 font-light">
                                            {article.excerpt}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="text-[var(--primary)] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Lire l'article <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConseilsPage;

