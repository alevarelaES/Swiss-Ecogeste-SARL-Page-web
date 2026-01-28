import { Home, Calculator, Flame, Building } from 'lucide-react';
import { SERVICE_IMAGES } from '../config/images';

export const services = [
    {
        id: "visite-conseil",
        number: "01",
        icon: Home,
        title: "Visite Conseil",
        subtitle: "Villa & Individuel",
        description: "Audit complet de l'enveloppe thermique, solaire et chauffage. Réduisez vos coûts immédiatement.",
        fullDescription: "Notre visite conseil pour villa est une étape essentielle pour comprendre les performances énergétiques de votre habitation. Nous analysons l'isolation, les systèmes de chauffage, et les opportunités d'énergie solaire pour vous fournir un plan d'action concret.",
        image: SERVICE_IMAGES.visiteConseil,
        delay: 0.1
    },
    {
        id: "calcul-idc",
        number: "02",
        icon: Calculator,
        title: "Calcul IDC",
        subtitle: "Compliance & Audit",
        description: "Établissement officiel de l'Indice de Dépense de Chaleur pour la conformité légale.",
        fullDescription: "L'Indice de Dépense de Chaleur (IDC) est obligatoire pour de nombreux bâtiments. Nous calculons cet indice avec précision pour garantir votre conformité aux normes légales genevoises et suisses.",
        image: SERVICE_IMAGES.calculIdc,
        delay: 0.2
    },
    {
        id: "chauffage-renouvelable",
        number: "03",
        icon: Flame,
        title: "Chauffage",
        subtitle: "Renouvelable",
        description: "Transition subventionnée vers des énergies décarbonées. Expertise technique et financière.",
        fullDescription: "Passez aux énergies renouvelables et bénéficiez de subventions. Nous vous accompagnons dans le choix et l'installation de pompes à chaleur, chauffage à distance ou bois.",
        image: SERVICE_IMAGES.chauffage,
        delay: 0.3
    },
    {
        id: "eco-logement",
        number: "04",
        icon: Building,
        title: "Eco-Logement",
        subtitle: "Gestion Bâtiment",
        description: "Optimisation hydraulique et électrique pour les gérances et grands propriétaires.",
        fullDescription: "Pour les grands parcs immobiliers, chaque détail compte. Nous optimisons les flux hydrauliques et électriques pour réduire les charges et améliorer le confort des locataires.",
        image: SERVICE_IMAGES.ecoLogement,
        delay: 0.4
    }
];

