import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getServices } from '../../sanity/client'
import { getImageUrl } from '../../sanity/image'
import { Service } from '../../sanity/types'
import { ServiceCard } from '../ui/ServiceCard'
import { Reveal } from '../animations/Reveal'
import * as LucideIcons from 'lucide-react'

// Mapper pour obtenir l'icône depuis le nom
const getIconComponent = (iconName: string) => {
  const Icons = LucideIcons as any
  return Icons[iconName] || LucideIcons.HelpCircle
}

export function ServicesSanity() {
  const { t, i18n } = useTranslation()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentLang = i18n.language as 'fr' | 'en'

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching services:', err)
        setError('Failed to load services')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-2">{t('services.subtitle')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-2">{t('services.subtitle')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.description')}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = getIconComponent(service.icon)
            
            return (
              <Reveal key={service._id} delay={service.delay}>
                <ServiceCard
                  number={service.number}
                  Icon={IconComponent}
                  title={service.title[currentLang]}
                  subtitle={service.subtitle[currentLang]}
                  description={service.description[currentLang]}
                  image={getImageUrl(service.image, 600, 400)}
                  link={service.link || '#'}
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
