import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { services } from '../data/services';
import Reveal from '../components/animations/Reveal';

const ServiceDetail = () => {
    const { id } = useParams<{ id: string }>();
    const service = services.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Service non trouvé</h2>
                    <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 pt-20">
                    <Link to="/#services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors width-fit">
                        <ArrowLeft size={20} />
                        <span className="font-medium">Retour aux services</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-amber-400">
                                <Icon size={40} />
                            </div>
                            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm">
                                {service.subtitle}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                            {service.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-[1fr_300px] gap-12">
                    {/* Main Content */}
                    <div>
                        <Reveal>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Description Complète</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {service.fullDescription}
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">Ce que nous proposons :</h3>
                            <ul className="space-y-4 mb-12">
                                {[1, 2, 3].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                                        <span className="text-gray-600">
                                            Point clé ou avantage spécifique lié à {service.title} pour garantir une performance optimale.
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="bg-gray-50 p-8 rounded-2xl h-fit sticky top-24">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Intéressé ?</h3>
                        <p className="text-gray-500 mb-6 text-sm">
                            Contactez nos experts pour obtenir un devis personnalisé.
                        </p>
                        <Link
                            to="/contact"
                            className="block w-full bg-green-600 text-white text-center font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                        >
                            Demander un Devis
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;

