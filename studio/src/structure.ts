import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Gestion du Site Swiss Ecogestes')
    .items([

      // ═══════════════════════════════════════════════
      // PAGE D'ACCUEIL
      // ═══════════════════════════════════════════════
      S.listItem()
        .title("Page d'Accueil")
        .id('home-root')
        .child(
          S.list()
            .title("Page d'Accueil")
            .items([
              S.listItem()
                .title('Textes des sections (en-têtes)')
                .id('home-textes')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title("Textes des sections")
                ),
              S.divider(),
              S.documentTypeListItem('heroSlide')
                .title('Carrousel Hero — Slides')
                .id('hero-slides'),
              S.divider(),
              S.documentTypeListItem('stat')
                .title('Chiffres Clés')
                .id('all-stats'),
              S.divider(),
              S.listItem()
                .title('Pourquoi Swiss Ecogestes')
                .id('about-section')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('Pourquoi Swiss Ecogestes')
                ),
              S.divider(),
              S.documentTypeListItem('processStep')
                .title('Étapes du Processus')
                .id('process-steps'),
              S.documentTypeListItem('partner')
                .title('Partenaires')
                .id('partners'),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════
      // NOS SOLUTIONS (home cards + pages de service)
      // ═══════════════════════════════════════════════
      S.listItem()
        .title('Nos Solutions')
        .id('solutions-root')
        .child(
          S.list()
            .title('Nos Solutions')
            .items([

              // VILLAS & MAISONS
              S.listItem()
                .title('Villas & Maisons')
                .id('sol-villa')
                .child(
                  S.list()
                    .title('Villas & Maisons')
                    .items([
                      S.listItem()
                        .title("Carte d'accueil (texte & image)")
                        .id('sol-villa-card')
                        .child(
                          S.documentList()
                            .title("Carte — Villas & Maisons")
                            .filter('_type == "clientType" && link == "/services/villa"')
                        ),
                      S.listItem()
                        .title('Services & Cartes de la page')
                        .id('sol-villa-page')
                        .child(
                          S.documentList()
                            .title('Page — Villas & Maisons')
                            .filter('_type == "servicePage" && pageSlug == "villa"')
                        ),
                    ])
                ),

              // RÉGIES & IMMEUBLES
              S.listItem()
                .title('Régies & Immeubles')
                .id('sol-gerance')
                .child(
                  S.list()
                    .title('Régies & Immeubles')
                    .items([
                      S.listItem()
                        .title("Carte d'accueil (texte & image)")
                        .id('sol-gerance-card')
                        .child(
                          S.documentList()
                            .title("Carte — Régies & Immeubles")
                            .filter('_type == "clientType" && link == "/services/gerance"')
                        ),
                      S.listItem()
                        .title('Services & Cartes de la page')
                        .id('sol-gerance-page')
                        .child(
                          S.documentList()
                            .title('Page — Régies & Immeubles')
                            .filter('_type == "servicePage" && pageSlug == "gerance"')
                        ),
                    ])
                ),

              // ENTREPRISES
              S.listItem()
                .title('Entreprises & PME')
                .id('sol-entreprise')
                .child(
                  S.list()
                    .title('Entreprises & PME')
                    .items([
                      S.listItem()
                        .title("Carte d'accueil (texte & image)")
                        .id('sol-entreprise-card')
                        .child(
                          S.documentList()
                            .title("Carte — Entreprises & PME")
                            .filter('_type == "clientType" && link == "/services/entreprise"')
                        ),
                      S.listItem()
                        .title('Services & Cartes de la page')
                        .id('sol-entreprise-page')
                        .child(
                          S.documentList()
                            .title('Page — Entreprises & PME')
                            .filter('_type == "servicePage" && pageSlug == "entreprise"')
                        ),
                    ])
                ),

              // COMMUNES & GRD
              S.listItem()
                .title('Communes & GRD')
                .id('sol-communes')
                .child(
                  S.list()
                    .title('Communes & GRD')
                    .items([
                      S.listItem()
                        .title("Carte d'accueil (texte & image)")
                        .id('sol-communes-card')
                        .child(
                          S.documentList()
                            .title("Carte — Communes & GRD")
                            .filter('_type == "clientType" && link == "/services/communes"')
                        ),
                      S.listItem()
                        .title('Services & Cartes de la page')
                        .id('sol-communes-page')
                        .child(
                          S.documentList()
                            .title('Page — Communes & GRD')
                            .filter('_type == "servicePage" && pageSlug == "communes"')
                        ),
                    ])
                ),

            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════
      // PAGE À PROPOS
      // ═══════════════════════════════════════════════
      S.listItem()
        .title('Page À Propos (Mission & Équipe)')
        .id('a-propos-root')
        .child(
          S.list()
            .title('Page À Propos')
            .items([
              S.listItem()
                .title('Contenu de la page')
                .id('a-propos-content')
                .child(
                  S.document()
                    .schemaType('aProposPage')
                    .documentId('aProposPage')
                    .title('Contenu — Page À Propos')
                ),
              S.divider(),
              S.documentTypeListItem('teamMember')
                .title("Membres de l'équipe")
                .id('team-members'),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════
      // PAGE RÉSULTATS & IMPACT
      // ═══════════════════════════════════════════════
      S.listItem()
        .title('Page Résultats & Impact')
        .id('resultats-root')
        .child(
          S.document()
            .schemaType('resultatsPage')
            .documentId('resultatsPage')
            .title('Page Résultats & Impact')
        ),

      S.divider(),

      // ═══════════════════════════════════════════════
      // PAGE BLOG
      // ═══════════════════════════════════════════════
      S.listItem()
        .title('Page Blog — Actualités')
        .id('blog-root')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Configuration de la page')
                .id('blog-config')
                .child(
                  S.document()
                    .schemaType('blogPage')
                    .documentId('blogPage')
                    .title('Configuration — Page Blog')
                ),
              S.divider(),
              S.documentTypeListItem('article')
                .title('Articles')
                .id('articles'),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════
      // PAGE CONTACT
      // ═══════════════════════════════════════════════
      S.listItem()
        .title('Page Contact')
        .id('contact-root')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Page Contact')
        ),

      S.divider(),

      // ═══════════════════════════════════════════════
      // PAGES LÉGALES
      // ═══════════════════════════════════════════════
      S.listItem()
        .title('Pages Légales')
        .id('legal-root')
        .child(
          S.list()
            .title('Pages Légales')
            .items([
              S.listItem()
                .title('Mentions Légales')
                .id('legal-mentions')
                .child(
                  S.documentList()
                    .title('Mentions Légales')
                    .filter('_type == "legalPage" && pageType == "mentions-legales"')
                ),
              S.listItem()
                .title('Confidentialité')
                .id('legal-privacy')
                .child(
                  S.documentList()
                    .title('Confidentialité')
                    .filter('_type == "legalPage" && pageType == "confidentialite"')
                ),
              S.listItem()
                .title('Politique des Cookies')
                .id('legal-cookies')
                .child(
                  S.documentList()
                    .title('Politique des Cookies')
                    .filter('_type == "legalPage" && pageType == "cookies"')
                ),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════
      // PARAMÈTRES GLOBAUX & FOOTER
      // ═══════════════════════════════════════════════
      S.listItem()
        .title('Paramètres Globaux & Footer')
        .id('settings-root')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Paramètres Globaux & Footer')
        ),

    ])
