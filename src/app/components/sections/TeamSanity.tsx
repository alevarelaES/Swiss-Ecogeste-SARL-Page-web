import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getTeamMembers } from '../../sanity/client'
import { getImageUrl } from '../../sanity/image'
import { TeamMember } from '../../sanity/types'
import { TeamMemberCard } from '../team/TeamMemberCard'
import Reveal from '../animations/Reveal'

export function TeamSanity() {
  const { t, i18n } = useTranslation()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  const currentLang = i18n.language as 'fr' | 'en'

  useEffect(() => {
    getTeamMembers()
      .then((data) => {
        setTeamMembers(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching team members:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="team" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('team.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-80 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="team" className="section-padding relative overflow-hidden">
      {/* Premium Abstract Background - Consistent with Contact Section */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Dot Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#1b5e39 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}></div>

        {/* Soft Ambient Glows */}
        <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-[#1b5e39]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#4ade80]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">

        {/* Executive Header Layout */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-gray-200">
            <div className="max-w-2xl">
              <span className="text-[#1b5e39] font-bold tracking-widest uppercase text-xs mb-3 block">
                {t('team.subtitle')}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                {t('team.title')}
              </h2>
            </div>
            <div className="max-w-md text-gray-600 text-lg leading-relaxed md:text-right pb-1">
              <p>{t('team.description')}</p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {teamMembers.map((member, index) => (
            <Reveal key={member._id} delay={index * 0.1}>
              <div className="h-full">
                <TeamMemberCard
                  name={member.name}
                  role={member.role[currentLang]}
                  initials={member.initials}
                  items={member.items[currentLang]}
                  index={index}
                  image={member.photo ? getImageUrl(member.photo, 400, 400) : undefined}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
