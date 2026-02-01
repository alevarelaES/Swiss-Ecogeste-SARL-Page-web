import { 
    Zap, 
    Leaf, 
    Users, 
    Building2, 
    Landmark, 
    FileText, 
    Scale, 
    Handshake,
    LucideIcon 
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    zap: Zap,
    leaf: Leaf,
    users: Users,
    building2: Building2,
    landmark: Landmark,
    file_text: FileText,
    scale: Scale,
    handshake: Handshake,
};

export const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName.toLowerCase()] || Zap;
};
