import Reveal from '../animations/Reveal';
import { useTranslation } from 'react-i18next';
import { getTeamMembers as getHardcodedTeamMembers } from '../../data/teamMembers';
import { getTeamMembers } from '../../../sanity/client';
import { useSanityContent } from '../../../sanity/useSanityContent';
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

    // Requête indépendante de la langue : les traductions sont choisies dans mapMembers
    const teamMembers = useSanityContent(
        'teamMembers',
        () => getTeamMembers(),
        getHardcodedTeamMembers(lang),
        (data: any[]) => (data.length > 0 ? mapMembers(data, lang) : null)
    );

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
