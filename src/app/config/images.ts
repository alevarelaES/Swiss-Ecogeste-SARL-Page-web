/**
 * ========================================
 * FICHIER DE CONFIGURATION DES IMAGES
 * ========================================
 * 
 * Ce fichier centralise toutes les URLs d'images utilisées dans le site.
 * Pour changer une image, modifiez simplement l'URL correspondante ici.
 * 
 * IMPORTANT: 
 * - Pour les images locales, placez-les dans le dossier `public/images/`
 *   et utilisez le chemin `/images/nom_fichier.jpg`
 * - Pour les images Unsplash, utilisez l'URL directe avec les paramètres
 *   de qualité et de taille (ex: ?q=80&w=1000)
 */

// ========================================
// IMAGES DES CARTES SERVICES
// ========================================
export const SERVICE_IMAGES = {
    // Visite Conseil - Image de villa moderne
    visiteConseil: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",

    // Calcul IDC - Image de calculatrice/audit
    calculIdc: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",

    // Chauffage Renouvelable - Image d'intérieur avec radiateur (fichier local)
    chauffage: "/images/Chuaffage_card.jpg",

    // Eco-Logement - Image d'immeuble moderne
    ecoLogement: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
};

// ========================================
// IMAGES POUR LA PAGE "NOS SERVICES" (détaillée)
// ========================================
export const SERVICES_PAGE_IMAGES = {
    // Particuliers / Villas - Belle villa résidentielle
    villa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    
    // Régies & Immeubles - Immeubles résidentiels
    gerance: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    
    // Entreprises - Bureaux modernes / environnement professionnel
    entreprise: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    
    // Communes - Vue aérienne de ville / urbanisme
    communes: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop",
};

// ========================================
// IMAGES DE FOND DES SECTIONS
// ========================================
export const BACKGROUND_IMAGES = {
    // Section "À Propos" - Image de fond
    about: "/images/image_fond_section_Propos.png",
    
    // Image principale de la section À Propos (bureau/équipe)
    aboutMain: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop",

    // Section Services - Image de bureau/architecture
    services: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
};

// ========================================
// IMAGES D'ÉQUIPE
// ========================================
export const TEAM_IMAGES = {
    // Les images de l'équipe peuvent être ajoutées ici
    // membre1: "/images/team/membre1.jpg",
};

// ========================================
// LOGOS ET ASSETS DE MARQUE
// ========================================
export const BRAND_IMAGES = {
    logo: "/Logo/Logo_EcoGeste_Sans_Fond.png",
    // Ajouter d'autres logos partenaires ici
};

// ========================================
// IMAGES GÉNÉRIQUES / PLACEHOLDERS
// ========================================
export const PLACEHOLDER_IMAGES = {
    office: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
};

