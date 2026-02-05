import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getServices } from '../../../sanity/client'
import { getImageUrl } from '../../../sanity/image'
import { Service } from '../../../sanity/types'
import Reveal from '../animations/Reveal'

const ServiceCard = ({ 
  number, 
  title, 
  subtitle, 
  description, 
  image, 
  link 
}: any) => {
  return (
    <Link to={link} className="block h-full">
      <div className="group bg-white h-full flex flex-col border border-gray-100 hover:border-amber-400 hover:shadow-2xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors" />
          <span className="absolute -bottom-8 -left-2 text-9xl font-black text-white/10 group-hover:text-amber-500/10 transition-colors duration-500 select-none z-10 leading-none">
            {number}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-grow bg-white relative">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
            {title}
          </h3>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1b5e39] mb-3 block">
            {subtitle}
          </span>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow font-medium line-clamp-3">
            {description}
          </p>
          <div className="mt-auto">
            <div className="w-full border border-gray-200 py-3 px-4 flex items-center justify-between text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300">
              <span>Explorer</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ServicesSanity() {
  const { t, i18n } = useTranslation()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentLang = (i18n.language.split('-')[0] || 'fr') as 'fr' | 'en' | 'de'

  useEffect(() => {
    getServices()
      .then((data: Service[]) => {
        setServices(data)
        setLoading(false)
      })
      .catch((err: Error) => {
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
            return (
              <Reveal key={service._id} delay={service.delay}>
                <ServiceCard
                  number={service.number}
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
