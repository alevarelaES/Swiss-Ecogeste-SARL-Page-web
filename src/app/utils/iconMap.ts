import {
    Zap,
    Leaf,
    Users,
    Building2,
    Landmark,
    FileText,
    Scale,
    Handshake,
    Home,
    Building,
    Factory,
    Globe,
    Shield,
    Award,
    CheckCircle,
    Star,
    TrendingUp,
    BarChart,
    Activity,
    Settings,
    Package,
    type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
    Zap,
    Leaf,
    Users,
    Building2,
    Landmark,
    FileText,
    Scale,
    Handshake,
    Home,
    Building,
    Factory,
    Globe,
    Shield,
    Award,
    CheckCircle,
    Star,
    TrendingUp,
    BarChart,
    Activity,
    Settings,
    Package,
};

export function resolveIcon(name: string, fallback: LucideIcon = Zap): LucideIcon {
    if (!name) return fallback;
    return ICON_MAP[name] ?? fallback;
}
