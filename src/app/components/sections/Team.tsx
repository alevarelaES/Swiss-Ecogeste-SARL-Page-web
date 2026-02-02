import { useTranslation } from 'react-i18next';
import { getTeamMembers } from '../../data/teamMembers';
import { TeamMemberCard } from '../team/TeamMemberCard';

const Team = () => {
    const { i18n } = useTranslation();
    const teamMembers = getTeamMembers(i18n.language);

    return (
        <section id="team" className="py-8 md:py-12 relative overflow-hidden bg-[#fdfdfd]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 md:mb-24">
                    {/* No header here, handled in TeamPage Hero, or keep if used as section elsewhere. 
                         Let's keep it minimal if embedded in page, or full if standalone. 
                         Assuming standalone usage possible, keeping simple header if not passed props.
                         Actually, TeamPage has its own header. Let's make this just the GRID.
                     */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard
                            key={index}
                            name={member.name}
                            role={member.role}
                            initials={member.initials}
                            items={member.items}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;

