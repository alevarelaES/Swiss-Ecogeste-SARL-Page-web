import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getArticleBySlug } from '../../sanity/client'
import { getImageUrl } from '../../sanity/image'
import { Article } from '../../sanity/types'
import { PortableTextRenderer } from '../components/ui/PortableTextRenderer'
import { Reveal } from '../components/animations/Reveal'

export function ArticleDetailPageSanity() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentLang = i18n.language as 'fr' | 'en'

  useEffect(() => {
    if (!slug) return

    getArticleBySlug(slug)
      .then((data) => {
        if (!data) {
          setError('Article not found')
        } else {
          setArticle(data)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching article:', err)
        setError('Failed to load article')
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('article.notFound')}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:text-primary/80 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.back')}
          </button>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    currentLang === 'fr' ? 'fr-CH' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <>
      <Helmet>
        <title>{article.title[currentLang]} | Swiss Ecogeste</title>
        <meta name="description" content={article.excerpt[currentLang]} />
      </Helmet>

      <div className="min-h-screen bg-white pt-20">
        {/* Header avec image */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={getImageUrl(article.image, 1920, 1080)}
            alt={article.image.alt || article.title[currentLang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 container-custom pb-12">
            <Reveal>
              <button
                onClick={() => navigate(-1)}
                className="text-white hover:text-gray-200 flex items-center gap-2 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {t('common.back')}
              </button>
              
              <span className="inline-block px-4 py-1 bg-primary text-white rounded-full text-sm font-semibold mb-4">
                {article.category[currentLang]}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {article.title[currentLang]}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Contenu de l'article */}
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-xl text-gray-600 mb-12 leading-relaxed">
                {article.excerpt[currentLang]}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <PortableTextRenderer value={article.content[currentLang]} />
            </Reveal>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <Reveal delay={0.3}>
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('article.tags')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
