import { service } from './service'
import { teamMember } from './teamMember'
import { article } from './article'
import { settings } from './settings'
import { heroSlide } from './heroSlide'
import { clientType } from './clientType'
import { teamPage } from './teamPage'
import { contactPage } from './contactPage'
import { localeString } from './localeString'
import { localeText } from './localeText'
import { homePage } from './homePage'
import { blogPage } from './blogPage'
import { servicesPage } from './servicesPage'
import { aboutPage } from './aboutPage'
import { partner } from './partner'
import { processStep } from './processStep'
import { stat } from './stat'
import { whyChooseUs } from './whyChooseUs'
import { servicePage } from './servicePage'

export const schemaTypes = [
  // Types globaux
  localeString,
  localeText,

  // Pages (Singletons)
  homePage,
  servicesPage,
  aboutPage,
  teamPage,
  blogPage,
  contactPage,
  settings, // Footer & Config

  // Documents de contenu (Collections)
  service,
  teamMember,
  article,
  clientType,   // Cartes solutions (accueil)
  partner,      // Section partenaires
  processStep,  // Section processus (étapes)
  stat,         // Statistiques chiffres clés
  heroSlide,    // Slides du carrousel hero
  whyChooseUs,  // Section "Pourquoi nous choisir"
  servicePage,  // Pages de service (villa, gérance, entreprise, communes)
]
