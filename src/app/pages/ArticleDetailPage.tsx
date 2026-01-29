
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import SEO from '../components/SEO';
import { ArrowLeft, Calendar, Facebook, Linkedin, ChevronRight, User, Link as LinkIcon, Check, Sparkles } from 'lucide-react';
import { Button } from "../components/ui/button";
import Reveal from '../components/animations/Reveal';

const ArticleDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [copied, setCopied] = useState(false);
    const article = articles.find(a => a.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) return null;

    const currentUrl = window.location.href;
    const shareTitle = article.title;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = {
        x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        meta: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    };

    const XIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.403z" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-white font-sans">
            <SEO title={article.title} description={article.excerpt} canonical={`/conseils/${article.slug}`} ogImage={article.imageUrl} />

            {/* HEADER AVEC TOUCHE DE COULEUR SUBTILE */}
            <header className="pt-32 pb-12 lg:pb-16 bg-[#f8faf9] border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Navigation Row: Back Button + Breadcrumb */}
                    <div className="flex items-center justify-between mb-8">
                        {/* Back Button */}
                        <button
                            onClick={() => {
                                const from = location.state?.from;
                                if (from) {
                                    navigate(from);
                                } else {
                                    navigate(-1);
                                }
                            }}
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[var(--primary)] transition-colors group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Retour</span>
                        </button>

                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                            <Link to="/" className="hover:text-gray-900 transition-colors">Accueil</Link>
                            <ChevronRight size={10} strokeWidth={4} />
                            <Link to="/conseils" className="hover:text-gray-900 transition-colors">Le Journal</Link>
                            <ChevronRight size={10} strokeWidth={4} />
                            <span className="text-[var(--primary)] font-black">{article.category}</span>
                        </nav>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        <div>
                            <Reveal>
                                <div className="inline-flex items-center gap-2 bg-green-50 text-[var(--primary)] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                    <Sparkles size={12} /> {article.category}
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-6 tracking-tight">
                                    {article.title}
                                </h1>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-green-100 shadow-sm">
                                        <User size={18} className="text-[var(--primary)]" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-gray-900">Expert Swiss Ecogeste</p>
                                        <p className="text-gray-500 font-medium">{article.date}</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                        <div className="relative">
                            <Reveal delay={0.2}>
                                <div className="rounded-2xl overflow-hidden shadow-xl aspect-video max-h-[350px] relative">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.imageUrl})` }} />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTENT GRID */}
            <main className="bg-gray-100 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* SIDEBAR PLUS PROMINENTE */}
                        <aside className="lg:col-span-3">
                            <div className="sticky top-40 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02] duration-300">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[var(--primary)] rounded-b-full opacity-20"></div>

                                <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6 text-center">Partager l'article</h3>

                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className="h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 border border-gray-100 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
                                        <XIcon />
                                    </a>
                                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#0077b5] border border-gray-100 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all shadow-sm">
                                        <Linkedin size={20} fill="currentColor" strokeWidth={0} />
                                    </a>
                                    <a href={shareLinks.meta} target="_blank" rel="noopener noreferrer" className="h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#1877F2] border border-gray-100 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-sm">
                                        <Facebook size={20} fill="currentColor" strokeWidth={0} />
                                    </a>
                                </div>

                                <button onClick={handleCopyLink} className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black transition-all border-2 ${copied ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg shadow-green-900/20' : 'bg-white text-gray-700 border-gray-100 hover:border-[var(--primary)] hover:text-[var(--primary)] shadow-sm'}`}>
                                    {copied ? <Check size={16} strokeWidth={3} /> : <LinkIcon size={16} strokeWidth={3} />}
                                    {copied ? "LIEN COPIÉ !" : "COPIER LE LIEN"}
                                </button>
                            </div>
                        </aside>

                        {/* MAIN TEXT - TYPOGRAPHIE AFFINÉE ET COLOREE */}
                        <div className="lg:col-span-8 lg:col-start-5">
                            <Reveal delay={0.3}>
                                <article
                                    className="prose prose-lg prose-slate max-w-none 
                                [&_p]:text-gray-600 [&_p]:leading-[1.9] [&_p]:mb-8 [&_p]:mt-0 [&_p]:text-lg [&_p]:font-normal
                                [&_h3]:text-gray-900 [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-3xl [&_h3]:mt-14 [&_h3]:mb-6 [&_h3]:leading-tight
                                [&_h3]:border-l-4 [&_h3]:border-[var(--primary)] [&_h3]:pl-4
                                [&_strong]:text-gray-900 [&_strong]:font-bold
                                [&_li]:text-lg [&_li]:mb-3 [&_li]:text-gray-600
                                [&_ul]:list-none [&_ul]:pl-0
                                [&_ul>li]:relative [&_ul>li]:pl-6
                                [&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.6em] [&_ul>li]:before:w-2 [&_ul>li]:before:h-2 [&_ul>li]:before:bg-[var(--primary)] [&_ul>li]:before:rounded-full
                                [&_a]:text-[var(--primary)] [&_a]:font-bold [&_a]:no-underline hover:text-[#1a4d3e] transition-colors
                                "
                                    dangerouslySetInnerHTML={{ __html: article.content || '' }}
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </main>

            {/* FULL WIDTH CTA COMPACT */}
            <section className="bg-[var(--primary)] py-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full -mr-32 -mt-32"></div>
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Audit gratuit de votre installation</h2>
                        <p className="text-white/80 text-lg font-medium">Découvrez vos subventions réelles avec un expert.</p>
                    </div>
                    <Link to="/contact">
                        <Button size="lg" className="bg-white text-[var(--primary)] hover:bg-gray-100 font-black px-12 py-7 h-auto rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 text-lg">
                            Prendre Rendez-vous
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ArticleDetailPage;
