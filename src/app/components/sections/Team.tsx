import Reveal from '../animations/Reveal';
import { useTranslation } from 'react-i18next';
import { getTeamMembers } from '../../data/teamMembers';
import { TeamMemberCard } from '../team/TeamMemberCard';

const Team = () => {
    const { i18n } = useTranslation();
    const teamMembers = getTeamMembers(i18n.language);

    return (
        <section id="team" className="relative">
            {/* Grid Layout */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {teamMembers.map((member, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className="h-full">
                                <TeamMemberCard
                                    name={member.name}
                                    role={member.role}
                                    items={member.items}
                                    image={member.image}
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
