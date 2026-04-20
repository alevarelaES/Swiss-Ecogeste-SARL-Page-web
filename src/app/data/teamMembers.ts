export interface TeamMember {
    name: string;
    role: string;
    initials: string;
    color: string;
    items: string[];
    image?: string;
}

const teamMembersFr: TeamMember[] = [
    {
        name: 'Mohammad SALMAN',
        role: 'Directeur & Conseiller en énergie',
        initials: 'MS',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Expert "Chauffez renouvelable"',
            'Concessionnaire IDC Genève',
            'Expert éclairage SIG',
            'Gestionnaire énergie délégué',
            'Conseiller PEIK',
            'Conseiller TPE/PME',
            'Conseiller villa'
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
            'Conseiller Ecologement',
            'Concessionnaire IDC',
            'Expert "Chauffez renouvelable"'
        ]
    },
    {
        name: 'Daniel BADOUX',
        role: 'Conseiller en énergie',
        initials: 'DB',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Conseiller entreprises TPE/PME'
        ]
    },
    {
        name: 'Patrick CASIMIRUS',
        role: 'Conseiller en énergie',
        initials: 'PC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Conseiller entreprises TPE/PME',
            'Conseiller Ecologement',
            'Concessionnaire IDC',
            'Expert "Chauffez renouvelable"'
        ]
    }
];

const teamMembersEn: TeamMember[] = [
    {
        name: 'Mohammad SALMAN',
        role: 'Director & Energy Advisor',
        initials: 'MS',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            '"Renewable Heating" Expert',
            'IDC Geneva Concessionaire',
            'SIG Lighting Expert',
            'Delegated Energy Manager',
            'PEIK Advisor',
            'SME/Small Business Advisor',
            'Villa Advisor'
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
            'Ecologement Advisor',
            'IDC Concessionaire',
            '"Renewable Heating" Expert'
        ]
    },
    {
        name: 'Daniel BADOUX',
        role: 'Energy Advisor',
        initials: 'DB',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'SME/Small Business Advisor'
        ]
    },
    {
        name: 'Patrick CASIMIRUS',
        role: 'Energy Advisor',
        initials: 'PC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'SME/Small Business Advisor',
            'Ecologement Advisor',
            'IDC Concessionaire',
            '"Renewable Heating" Expert'
        ]
    }
];

const teamMembersDe: TeamMember[] = [
    {
        name: 'Mohammad SALMAN',
        role: 'Direktor & Energieberater',
        initials: 'MS',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            '"Erneuerbar Heizen" Experte',
            'IDC Genf Konzessionär',
            'SIG Beleuchtungs-Experte',
            'Delegierter Energiemanager',
            'PEIK-Berater',
            'KMU-Berater',
            'Villen-Berater'
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
            'Ecologement Berater',
            'IDC Konzessionär',
            '"Erneuerbar Heizen" Experte'
        ]
    },
    {
        name: 'Daniel BADOUX',
        role: 'Energieberater',
        initials: 'DB',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Berater für KMU'
        ]
    },
    {
        name: 'Patrick CASIMIRUS',
        role: 'Energieberater',
        initials: 'PC',
        color: 'from-[var(--primary)] to-emerald-600',
        items: [
            'Berater für KMU',
            'Ecologement Berater',
            'IDC Konzessionär',
            '"Erneuerbar Heizen" Experte'
        ]
    }
];

export const getTeamMembers = (lang: string): TeamMember[] => {
    const members = lang === 'de' ? teamMembersDe : (lang === 'en' ? teamMembersEn : teamMembersFr);

    // Add generic premium placeholder images
    const images = [
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Salman
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Reem
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Thibault
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Daniel
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Patrick (New)
    ];

    return members.map((member, index) => ({
        ...member,
        image: images[index % images.length]
    }));
};
