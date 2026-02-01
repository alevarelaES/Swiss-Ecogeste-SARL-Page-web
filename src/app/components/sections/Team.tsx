import React from 'react';
import Reveal from '../animations/Reveal';
import { useTranslation } from 'react-i18next';
import { getTeamMembers } from '../../data/teamMembers';

const Team = () => {
    const { t, i18n } = useTranslation();
    const teamMembers = getTeamMembers(i18n.language);
    
    const colors = [
        'from-[var(--primary)] to-emerald-600',
        'from-[var(--primary)] to-emerald-600',
        'from-[var(--primary)] to-emerald-600',
        'from-[var(--primary)] to-emerald-600',
        'from-[var(--primary)] to-emerald-600'
    ];

    return (
        <section id="team" className="py-8 relative overflow-hidden">
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
                        <span className="text-amber-500 font-bold tracking-wider uppercase text-lg bg-amber-50 px-4 py-2 rounded-md inline-block">{t('team.label')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-3 mb-4">{t('team.title')}</h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <Reveal key={index} delay={index * 0.05}>
                            <div className="bg-white/90 backdrop-blur-sm border border-[var(--primary)]/20 p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-amber-400 transition-all h-full text-left">
                                <div className={`w-12 h-12 bg-gradient-to-br ${colors[index]} text-white rounded-md flex items-center justify-center text-xl font-bold mb-4 shadow-md`}>
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

