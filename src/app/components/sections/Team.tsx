import React from 'react';
import Reveal from '../animations/Reveal';

const teamMembers = [
    { name: 'Mohammad SALMAN', role: 'Conseiller en énergie', initials: 'MS', color: 'from-[var(--primary)] to-emerald-600', items: ['Expert "Chauffez renouvelable"', 'Concessionnaire IDC Genève', 'Expert éclairage SIG', 'Conseiller villa/entreprises'] },
    { name: 'Reem Al AYDI', role: 'Conseillère en énergie', initials: 'RA', color: 'from-[var(--primary)] to-emerald-600', items: ['Experte "Chauffez renouvelable"', 'Concessionnaire IDC Genève', 'Conseillère villa/TPE/PME'] },
    { name: 'Batool SALMAN', role: 'Conseillère en énergie', initials: 'BS', color: 'from-[var(--primary)] to-emerald-600', items: ['Experte "Chauffez renouvelable"', 'Concessionnaire IDC Genève', 'Conseillère villa/TPE/PME'] },
    { name: 'Jessica REYNAUD', role: 'Conseillère en énergie', initials: 'JR', color: 'from-[var(--primary)] to-emerald-600', items: ['Conseillère entreprises TPE/PME', 'Conseillère Ecologement'] },
    { name: 'Thibault CASIER', role: 'Conseiller en énergie', initials: 'TC', color: 'from-[var(--primary)] to-emerald-600', items: ['Conseiller entreprises TPE/PME', 'Conseiller Ecologement'] },
    { name: 'Daniel BADOUX', role: 'Conseiller en énergie', initials: 'DB', color: 'from-[var(--primary)] to-emerald-600', items: ['Conseiller entreprises TPE/PME', 'Conseiller Ecologement'] },
    { name: 'Patrick CASIMIRUS', role: 'Conseiller en énergie', initials: 'PC', color: 'from-[var(--primary)] to-emerald-600', items: ['Conseiller entreprises TPE/PME', 'Conseiller Ecologement'] },
    { name: 'Silvia SILVA', role: 'Coordinatrice opérationnelle', initials: 'SS', color: 'from-gray-700 to-gray-900', items: ['Gestionnaire administrative'] },
];

const Team = () => {
    return (
        <section id="team" className="py-16 relative overflow-hidden">
            {/* Nature background from original index.html */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-white to-[var(--primary)]/5"></div>

            {/* Decorative leaf SVG from original */}
            <svg className="absolute bottom-0 right-10 w-48 h-48 opacity-[0.06] text-[var(--primary)]" viewBox="0 0 100 100">
                <path d="M50 10 C50 10, 75 35, 50 70 C50 70, 45 65, 45 60 L45 35 C45 35, 25 35, 50 10 Z" fill="currentColor" />
                <path d="M50 70 C50 70, 52 85, 50 95" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-12">
                        <span className="text-amber-500 font-bold tracking-wider uppercase text-lg bg-amber-50 px-4 py-2 rounded-md inline-block">Notre Équipe</span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-3 mb-4">Experts à votre écoute</h2>
                    </div>
                </Reveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <Reveal key={index} delay={index * 0.05}>
                            <div className="bg-white/90 backdrop-blur-sm border border-[var(--primary)]/20 p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-amber-400 transition-all h-full text-left">
                                <div className={`w-12 h-12 bg-gradient-to-br ${member.color} text-white rounded-md flex items-center justify-center text-xl font-bold mb-4 shadow-md`}>
                                    {member.initials}
                                </div>
                                <h3 className="font-bold text-gray-900">{member.name}</h3>
                                <p className="text-amber-500 text-sm font-semibold mb-4">{member.role}</p>
                                <ul className="text-xs text-gray-500 space-y-1">
                                    {member.items.map((item, i) => (
                                        <li key={i}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;

