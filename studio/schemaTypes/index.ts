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
import { footer } from './footer'

export const schemaTypes = [
  localeString,
  localeText,
  homePage, // Page 1
  service,  // Page 2 (Unified)
  teamPage, // Page 3
  teamMember,
  blogPage, // Page 4
  article,
  contactPage, // Page 5
  footer,   // Global
  settings, // Global
  heroSlide,
  clientType,
]
