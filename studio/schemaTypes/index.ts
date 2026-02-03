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
  clientType, // Used in Home Solutions

  // Legacy / Support (si encore utilisés, sinon à supprimer)
  heroSlide, // Maintenant intégré dans homePage mais peut rester si besoin de migration
]
