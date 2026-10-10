import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import ServiceModal from '../ui/ServiceModal'
import { useLocalizedPath } from '../../hooks/useLocalizedPath'
import type { ServiceItem } from '../../hooks/useServicePageContent'
import { SmartLink, resolveServiceLink } from '../ui/SmartLink'
import { ExternalLink } from 'lucide-react'

export interface ClientTypeServiceCardProps {
  service: ServiceItem
  t: (key: string) => string
}

const ClientTypeServiceCard = ({ service, t }: ClientTypeServiceCardProps) => {
  const { i18n } = useTranslation('common')
  const { getLocalizedPath } = useLocalizedPath()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { link, note } = resolveServiceLink(service)

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group h-full flex flex-col">
        <div
          className="h-40 sm:h-48 overflow-hidden relative cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        </div>

        <div className="p-5 sm:p-8 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
          <div className="text-gray-800 leading-relaxed line-clamp-3 mb-4">{service.description}</div>

          <div className="mt-auto flex gap-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-[var(--primary)] hover:bg-[#1a4d3e] text-white shadow-md transition-all hover:-translate-y-0.5 text-[13px] md:text-sm px-2 h-10"
            >
              {t('buttons.learn_more') || 'En savoir plus'}
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex-1 border-[var(--primary)] text-[var(--primary)] hover:bg-gray-50 transition-all text-[13px] md:text-sm px-2 h-10"
            >
              <Link to={getLocalizedPath('/contact')}>{t('buttons.contact_us') || 'Contact'}</Link>
            </Button>
          </div>

          {(note || link) && (
            <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              {note && <p className="text-xs text-gray-500 italic">{note}</p>}
              {link && (
                <SmartLink
                  href={link}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline"
                >
                  {service.linkLabel || t('service_detail.program_link')}
                  <ExternalLink size={12} aria-hidden="true" />
                </SmartLink>
              )}
            </div>
          )}
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={service}
        t={t}
        i18n={i18n}
      />
    </>
  )
}

export default ClientTypeServiceCard
