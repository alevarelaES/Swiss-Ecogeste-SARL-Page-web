import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';
import { Button } from "../ui/button";
import Reveal from '../animations/Reveal';

const ContactSection = () => {
    const [currentType, setCurrentType] = useState('Particulier');

    return (
        <section id="contact" className="py-16 relative overflow-hidden">
            {/* Decorative background from original index.html */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
            <svg className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-[0.05]" viewBox="0 0 100 100">
                <circle cx="80" cy="80" r="40" fill="currentColor" className="text-green-600" />
                <circle cx="20" cy="20" r="15" fill="currentColor" className="text-green-500" />
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-gray-100">
                        {/* Info Side */}
                        <div className="p-10 md:p-16 text-gray-900 lg:w-1/2 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-900">Parlons de votre projet</h2>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed text-left">
                                    Nos experts sont à votre disposition pour analyser vos besoins et vous proposer des solutions concrètes pour votre transition énergétique.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-center gap-5 group">
                                        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                                            <Mail className="w-7 h-7 text-green-600 group-hover:text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Email</p>
                                            <p className="font-bold text-xl text-gray-900">info@swissecogestes.ch</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 group">
                                        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                                            <MapPin className="w-7 h-7 text-green-600 group-hover:text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Bureau</p>
                                            <p className="font-bold text-xl text-gray-900">Route de Chavannes 207, 1007 Lausanne</p>
                                        </div>
                                    </div>

                                    {/* Google Map from original index.html */}
                                    <div className="mt-8 rounded-2xl overflow-hidden h-48 border border-gray-200">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.358245644122!2d6.591!3d46.523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c2e365021e1d7%3A0xc3f5d5e23f859560!2sRoute%20de%20Chavannes%20207%2C%201007%20Lausanne!5e0!3m2!1sen!2sch!4v1700000000000!5m2!1sen!2sch"
                                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" title="Google Map"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="bg-white p-10 md:p-16 lg:w-1/2">
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2 text-left">
                                        <label className="text-sm font-medium text-gray-700">Prénom</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all" placeholder="Jean" />
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <label className="text-sm font-medium text-gray-700">Nom</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Dupont" />
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="jean.dupont@email.com" />
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-gray-700">Je suis un...</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['Particulier', 'Entreprise', 'Gérance'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setCurrentType(type)}
                                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${currentType === type ? 'bg-amber-50 border-amber-500 text-amber-700' : 'border-gray-200 text-gray-600 hover:border-amber-500 hover:text-amber-600'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Décrivez votre projet..."></textarea>
                                </div>

                                <Button className="w-full bg-gray-900 hover:bg-amber-500 text-white py-6 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all">
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

export default ContactSection;
