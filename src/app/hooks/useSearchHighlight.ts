import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';

export const useSearchHighlight = () => {
    const location = useLocation();

    useEffect(() => {
        // Récupérer le terme de recherche depuis sessionStorage
        const searchTerm = sessionStorage.getItem('searchHighlight');
        
        if (!searchTerm) return;

        // Nettoyer immédiatement pour éviter de surligner à chaque navigation
        sessionStorage.removeItem('searchHighlight');

        // Attendre que le DOM soit complètement chargé
        setTimeout(() => {
            highlightSearchTerm(searchTerm);
        }, 300);

    }, [location.pathname]);
};

const highlightSearchTerm = (term: string) => {
    // Nettoyer le terme (enlever les espaces, mettre en minuscule)
    const cleanTerm = term.trim().toLowerCase();
    if (!cleanTerm || cleanTerm.length < 2) return;

    // Sélectionner les conteneurs de texte (éviter header, footer, nav)
    const containers = document.querySelectorAll('main p, main h1, main h2, main h3, main h4, main h5, main h6, main li, main span, main div.text-gray-600, main div.text-gray-700, main div.text-gray-800, main div.text-gray-900');
    
    let highlightCount = 0;
    const maxHighlights = 15; // Augmenté pour couvrir plus de résultats

    containers.forEach((element) => {
        if (highlightCount >= maxHighlights) return;
        
        const text = element.textContent || '';
        const lowerText = text.toLowerCase();
        
        // Vérifier si le terme existe dans ce texte
        if (lowerText.includes(cleanTerm)) {
            // Traiter les nœuds texte directement pour éviter de casser le HTML
            highlightInElement(element, cleanTerm);
            highlightCount++;
            
            // Scroller vers le premier élément trouvé
            if (highlightCount === 1) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    });

    // Supprimer les highlights après 5 secondes
    if (highlightCount > 0) {
        setTimeout(() => {
            document.querySelectorAll('.search-highlight-pulse').forEach(mark => {
                const parent = mark.parentNode;
                if (parent) {
                    parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
                    parent.normalize(); // Fusionner les nœuds texte adjacents
                }
            });
        }, 5000);
    }
};

// Fonction pour surligner dans un élément en préservant le HTML
const highlightInElement = (element: Element, term: string) => {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null
    );
    
    const nodesToReplace: { node: Text; text: string }[] = [];
    let node: Text | null;
    
    while ((node = walker.nextNode() as Text | null)) {
        if (node.textContent && node.textContent.toLowerCase().includes(term)) {
            nodesToReplace.push({ node, text: node.textContent });
        }
    }
    
    // Remplacer les nœuds texte
    nodesToReplace.forEach(({ node, text }) => {
        const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
        const newHTML = text.replace(regex, '<mark class="search-highlight-pulse">$1</mark>');
        
        const span = document.createElement('span');
        span.innerHTML = DOMPurify.sanitize(newHTML);
        node.parentNode?.replaceChild(span, node);
    });
};

// Échapper les caractères spéciaux regex
const escapeRegex = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
