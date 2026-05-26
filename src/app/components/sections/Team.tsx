import { useState, useEffect, useRef } from 'react';
import Reveal from '../animations/Reveal';
import { useTranslation } from 'react-i18next';
import { getTeamMembers as getHardcodedTeamMembers } from '../../data/teamMembers';
import { getTeamMembers } from '../../../sanity/client';
import { getTeamMemberImageUrl } from '../../../sanity/image';
import { TeamMemberCard } from '../team/TeamMemberCard';

const mapMembers = (data: any[], lang: string) => data.map((m) => ({
    name: m.name,
    role: m.role?.[lang] || m.role?.fr || '',
    initials: m.initials || '',
    color: m.color || 'from-[var(--primary)] to-emerald-600',
    items: m.items?.[lang] || m.items?.fr || [],
    image: m.photo?.asset ? getTeamMemberImageUrl({ asset: m.photo.asset }) : undefined,
}));

const Team = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language.startsWith('de') ? 'de' : i18n.language.startsWith('en') ? 'en' : 'fr';

    const [teamMembers, setTeamMembers] = useState(getHardcodedTeamMembers(lang));
    const rawDataRef = useRef<any[] | null>(null);

    // Fetch Sanity data once — lang is intentionally excluded to avoid redundant network calls.
    // Language switches are handled by the effect below.
    useEffect(() => {
        let cancelled = false;
        getTeamMembers()
            .then((data: any[]) => {
                if (cancelled || !data || data.length === 0) return;
                rawDataRef.current = data;
                setTeamMembers(mapMembers(data, lang));
            })
            .catch(() => {});
        return () => { cancelled = true; };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Re-map cached Sanity data when the language changes — no network call.
    useEffect(() => {
        if (rawDataRef.current) {
            setTeamMembers(mapMembers(rawDataRef.current, lang));
        }
    }, [lang]);

    return (
        <section id="team" className="relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {teamMembers.map((member, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className="h-full">
                                <TeamMemberCard
                                    name={member.name}
                                    role={member.role}
                                    initials={member.initials}
                                    items={member.items}
                                    image={member.image}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
