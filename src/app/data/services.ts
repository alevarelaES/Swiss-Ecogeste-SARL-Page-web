import { Home, Calculator, Flame, Building } from 'lucide-react';
import { SERVICE_IMAGES } from '../config/images';

export const services = [
    {
        id: "gerance",
        number: "01",
        icon: Calculator,
        title: "Régies & Immeubles",
        subtitle: "Gestionnaires",
        description: "Valorisez votre parc immobilier et anticipez les obligations légales avec nos audits IDC et stratégies de rénovation.",
        fullDescription: "L'Indice de Dépense de Chaleur (IDC) est obligatoire pour de nombreux bâtiments. Nous calculons cet indice avec précision pour garantir votre conformité aux normes légales genevoises et suisses.",
        image: SERVICE_IMAGES.calculIdc,
        link: "/services/gerance",
        delay: 0.1
    },
    {
        id: "villa",
        number: "02",
        icon: Home,
        title: "Propriétaires de Villas",
        subtitle: "Particuliers",
        description: "Rénovez votre bien et profitez des subventions cantonales pour améliorer l'efficacité énergétique de votre maison.",
        fullDescription: "Notre visite conseil pour villa est une étape essentielle pour comprendre les performances énergétiques de votre habitation. Nous analysons l'isolation, les systèmes de chauffage, et les opportunités d'énergie solaire pour vous fournir un plan d'action concret.",
        image: SERVICE_IMAGES.visiteConseil,
        link: "/services/villa",
        delay: 0.2
    },
    {
        id: "entreprise",
        number: "03",
        icon: Building,
        title: "Entreprises & PME",
        subtitle: "Professionnels",
        description: "Optimisez votre consommation et réduisez vos coûts d'exploitation avec nos audits grands consommateurs.",
        fullDescription: "Passez aux énergies renouvelables et bénéficiez de subventions. Nous vous accompagnons dans le choix et l'installation de pompes à chaleur, chauffage à distance ou bois.",
        image: SERVICE_IMAGES.chauffage,
        link: "/services/entreprise",
        delay: 0.3
    },
    {
        id: "communes",
        number: "04",
        icon: Flame,
        title: "Communes & GRD",
        subtitle: "Collectivités",
        description: "Accompagnez vos citoyens et atteignez vos objectifs climatiques avec nos programmes de transition énergétique.",
        fullDescription: "Pour les grands parcs immobiliers, chaque détail compte. Nous optimisons les flux hydrauliques et électriques pour réduire les charges et améliorer le confort des locataires.",
        image: SERVICE_IMAGES.ecoLogement,
        link: "/services/communes",
        delay: 0.4
    }
];


