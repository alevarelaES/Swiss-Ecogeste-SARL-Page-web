import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getTeamMembers } from '../../../sanity/client'
import { getImageUrl } from '../../../sanity/image'
import { TeamMember } from '../../../sanity/types'
import { TeamMemberCard } from '../team/TeamMemberCard'
import Reveal from '../animations/Reveal'

export function TeamSanity() {
  const { t, i18n } = useTranslation()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  const currentLang = (i18n.language.split('-')[0] || 'fr') as 'fr' | 'en' | 'de'

  useEffect(() => {
    getTeamMembers()
      .then((data: TeamMember[]) => {
        setTeamMembers(data)
        setLoading(false)
      })
      .catch((err: Error) => {
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
    <section id="team" className="section-padding">
      <div className="container-custom">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-2">{t('team.subtitle')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('team.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('team.description')}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Reveal key={member._id} delay={index * 0.1}>
              <TeamMemberCard
                name={member.name}
                role={member.role[currentLang]}
                items={member.items[currentLang]}
                image={member.photo ? getImageUrl(member.photo, 400, 400) : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
