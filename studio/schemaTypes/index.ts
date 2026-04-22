import { teamMember } from './teamMember'
import { article } from './article'
import { settings } from './settings'
import { heroSlide } from './heroSlide'
import { clientType } from './clientType'
import { contactPage } from './contactPage'
import { localeString } from './localeString'
import { localeText } from './localeText'
import { homePage } from './homePage'
import { blogPage } from './blogPage'
import { aboutPage } from './aboutPage'
import { aProposPage } from './aProposPage'
import { partner } from './partner'
import { processStep } from './processStep'
import { resultatsPage } from './resultatsPage'
import { stat } from './stat'
import { whyChooseUs } from './whyChooseUs'
import { servicePage } from './servicePage'

export const schemaTypes = [
  // Types globaux
  localeString,
  localeText,

  // Pages (Singletons)
  homePage,
  aboutPage,       // Section A propos (accueil)
  aProposPage,     // Page A Propos complete
  blogPage,
  contactPage,
  resultatsPage,
  settings,        // Footer & Config

  // Documents de contenu (Collections)
  teamMember,
  article,
  clientType,      // Cartes solutions (accueil)
  partner,         // Section partenaires
  processStep,     // Section processus (étapes)
  stat,            // Statistiques chiffres clés
  heroSlide,       // Slides du carrousel hero
  whyChooseUs,     // Section "Pourquoi nous choisir"
  servicePage,     // Pages de service (villa, gérance, entreprise, communes)
]
