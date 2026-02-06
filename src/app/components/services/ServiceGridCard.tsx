import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ServiceGridCardProps {
  number: string
  title: string
  subtitle: string
  description: string
  image: string
  link: string
  ctaLabel?: string
}

export function ServiceGridCard({
  number,
  title,
  subtitle,
  description,
  image,
  link,
  ctaLabel = 'Explorer',
}: ServiceGridCardProps) {
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
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-3 block">
            {subtitle}
          </span>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow font-medium line-clamp-3">
            {description}
          </p>
          <div className="mt-auto">
            <div className="w-full border border-gray-200 py-3 px-4 flex items-center justify-between text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300">
              <span>{ctaLabel}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
