import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/animations/Reveal';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from "../components/ui/button";

const posts = [
    {
        title: "Subventions 2026 : Ce qui change pour le solaire en Suisse",
        excerpt: "Le climat politique favorise l'installation de panneaux photovoltaïques. Voici les nouveaux montants pour le canton de Vaud.",
        date: "12 Jan 2026",
        author: "Thomas Dubois",
        category: "Subventions",
        image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583fb?q=80&w=800"
    },
    {
        title: "5 gestes simples pour réduire sa facture de 15%",
        excerpt: "Pas besoin de gros travaux pour commencer à économiser. Découvrez nos astuces du quotidien.",
        date: "05 Jan 2026",
        author: "Sarah Meyer",
        category: "Conseils",
        image: "https://images.unsplash.com/photo-1545258122-47dc02279745?q=80&w=800"
    },
    {
        title: "Le CECB Plus : Pourquoi est-il indispensable avant de rénover ?",
        excerpt: "Comprendre le rapport d'audit énergétique pour optimiser ses investissements immobiliers.",
        date: "28 Dec 2025",
        author: "Julien Rochat",
        category: "Audit",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800"
    }
];

const ConseilsPage = () => {
    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Conseils & Actualités Énergétiques"
                description="Retrouvez nos derniers articles, guides et actualités sur la transition énergétique, le solaire et les économies d'énergie en Suisse."
                canonical="/conseils"
            />

            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">Blog & Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Conseils d'experts</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Tout ce que vous devez savoir pour réussir votre transition énergétique en toute sérénité.
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col group">
                                <div className="h-52 overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-center gap-4 text-xs font-medium text-green-600 uppercase tracking-wider mb-4">
                                        <span>{post.category}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                        <span className="text-gray-500">{post.date}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-gray-400" />
                                            <span className="text-xs text-gray-500 font-medium">{post.author}</span>
                                        </div>
                                        <Button variant="ghost" className="text-green-600 hover:text-green-700 p-0 h-auto font-bold flex gap-2">
                                            Lire la suite <ArrowRight size={14} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConseilsPage;
