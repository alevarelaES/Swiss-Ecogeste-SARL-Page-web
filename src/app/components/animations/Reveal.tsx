import React from 'react';

interface RevealProps {
    children: React.ReactNode;
    delay?: number;
}

// Composant simplifié sans animations pour améliorer les performances sur mobile
// Les animations sont désormais désactivées partout sauf pour les statistiques
const Reveal: React.FC<RevealProps> = ({ children }) => (
    <div>
        {children}
    </div>
);

export default Reveal;

