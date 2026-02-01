export interface TeamMember {
    name: string;
    role: string;
    initials: string;
    color: string;
    items: string[];
}

const teamMembersFr: TeamMember[] = [
    {
        name: 'Mohammad SALMAN',
        role: 'Conseiller en énergie',
        initials: 'MS',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Expert "Chauffez renouvelable"',
            'Concessionnaire IDC Genève',
            'Expert éclairage SIG',
            'Conseiller villa/entreprises'
        ]
    },
    {
        name: 'Reem Al AYDI',
        role: 'Conseillère en énergie',
        initials: 'RA',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Experte "Chauffez renouvelable"',
            'Concessionnaire IDC Genève',
            'Conseillère villa/TPE/PME'
        ]
    },
    {
        name: 'Thibault CASIER',
        role: 'Conseiller en énergie',
        initials: 'TC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Conseiller entreprises TPE/PME',
            'Conseiller Ecologement'
        ]
    },
    {
        name: 'Daniel BADOUX',
        role: 'Conseiller en énergie',
        initials: 'DB',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Conseiller entreprises TPE/PME',
            'Conseiller Ecologement'
        ]
    },
    {
        name: 'Patrick CASIMIRUS',
        role: 'Conseiller en énergie',
        initials: 'PC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Conseiller entreprises TPE/PME',
            'Conseiller Ecologement'
        ]
    }
];

const teamMembersEn: TeamMember[] = [
    {
        name: 'Mohammad SALMAN',
        role: 'Energy Advisor',
        initials: 'MS',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            '"Renewable Heating" Expert',
            'IDC Geneva Concessionaire',
            'SIG Lighting Expert',
            'Villa/Business Advisor'
        ]
    },
    {
        name: 'Reem Al AYDI',
        role: 'Energy Advisor',
        initials: 'RA',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            '"Renewable Heating" Expert',
            'IDC Geneva Concessionaire',
            'Villa/SME/Small Business Advisor'
        ]
    },
    {
        name: 'Thibault CASIER',
        role: 'Energy Advisor',
        initials: 'TC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'SME/Small Business Advisor',
            'Ecologement Advisor'
        ]
    },
    {
        name: 'Daniel BADOUX',
        role: 'Energy Advisor',
        initials: 'DB',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'SME/Small Business Advisor',
            'Ecologement Advisor'
        ]
    },
    {
        name: 'Patrick CASIMIRUS',
        role: 'Energy Advisor',
        initials: 'PC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'SME/Small Business Advisor',
            'Ecologement Advisor'
        ]
    }
];

const teamMembersDe: TeamMember[] = [
    {
        name: 'Mohammad SALMAN',
        role: 'Energieberater',
        initials: 'MS',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            '"Erneuerbar Heizen" Experte',
            'IDC Genf Konzessionär',
            'SIG Beleuchtungs-Experte',
            'Berater für Villen/Unternehmen'
        ]
    },
    {
        name: 'Reem Al AYDI',
        role: 'Energieberaterin',
        initials: 'RA',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            '"Erneuerbar Heizen" Expertin',
            'IDC Genf Konzessionärin',
            'Beraterin für Villen/KMU'
        ]
    },
    {
        name: 'Thibault CASIER',
        role: 'Energieberater',
        initials: 'TC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Berater für KMU',
            'Ecologement Berater'
        ]
    },
    {
        name: 'Daniel BADOUX',
        role: 'Energieberater',
        initials: 'DB',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Berater für KMU',
            'Ecologement Berater'
        ]
    },
    {
        name: 'Patrick CASIMIRUS',
        role: 'Energieberater',
        initials: 'PC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Berater für KMU',
            'Ecologement Berater'
        ]
    }
];

export const getTeamMembers = (lang: string): TeamMember[] => {
    if (lang === 'de') return teamMembersDe;
    return lang === 'en' ? teamMembersEn : teamMembersFr;
};
