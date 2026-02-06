import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

type GtagConfig = {
  page_path?: string
}

type Gtag = (command: 'js' | 'config', targetOrDate: string | Date, config?: GtagConfig) => void

declare global {
  interface Window {
    gtag?: Gtag
    dataLayer: unknown[]
  }
}

export const GoogleAnalytics = () => {
  const location = useLocation()

  const initGA = () => {
    if (!GA_MEASUREMENT_ID || document.getElementById('google-analytics')) return

    const script = document.createElement('script')
    script.id = 'google-analytics'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag as Gtag
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID)
  }

  const checkConsentAndInit = () => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted') {
      initGA()
    }
  }

  useEffect(() => {
    checkConsentAndInit()

    const handleConsentUpdate = () => checkConsentAndInit()
    window.addEventListener('cookie-consent-updated', handleConsentUpdate)

    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate)
    }
  }, [])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  return null
}
