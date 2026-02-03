import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Gestion du Site Swiss Ecogestes')
        .items([
            // 1. Page d'Accueil
            S.listItem()
                .id('home-page-item') // Explicit ID to break cache
                .title("Page d'Accueil")
                .icon(() => '🏠')
                .child(
                    S.document()
                        .schemaType('homePage')
                        .documentId('homePage')
                        .title('Contenu Page d\'Accueil')
                ),

            S.divider(),

            // 2. Services
            S.listItem()
                .id('services-item')
                .title('Nos Services')
                .icon(() => '🛠️')
                .child(
                    S.documentList()
                        .title('Liste des Services')
                        .schemaType('service')
                        .filter('_type == "service"')
                        .id('services-list')
                ),

            S.divider(),

            // 3. Page Équipe
            S.listItem()
                .id('team-page-item')
                .title('Page Équipe')
                .icon(() => '👥')
                .child(
                    S.list()
                        .title('Gestion Page Équipe')
                        .id('team-page-list')
                        .items([
                            S.listItem()
                                .id('team-content-item')
                                .title('Contenu & En-tête')
                                .child(
                                    S.document()
                                        .schemaType('teamPage')
                                        .documentId('teamPage')
                                        .title('Contenu Page Équipe')
                                ),
                            S.documentTypeListItem('teamMember')
                                .id('team-members-list')
                                .title('Membres de l\'équipe'),
                        ])
                ),

            S.divider(),

            // 4. Page Conseils (Blog)
            S.listItem()
                .id('blog-page-item')
                .title('Page Conseils (Blog)')
                .icon(() => '📰')
                .child(
                    S.list()
                        .title('Gestion Blog')
                        .id('blog-page-list')
                        .items([
                            S.listItem()
                                .id('blog-config-item')
                                .title('En-tête & Configuration Page')
                                .child(
                                    S.document()
                                        .schemaType('blogPage')
                                        .documentId('blogPage')
                                        .title('Config Page Blog')
                                ),
                            S.documentTypeListItem('article')
                                .id('articles-list')
                                .title('Articles'),
                        ])
                ),

            S.divider(),

            // 5. Page Contact
            S.listItem()
                .id('contact-page-item')
                .title('Page Contact')
                .icon(() => '📞')
                .child(
                    S.document()
                        .schemaType('contactPage')
                        .documentId('contactPage')
                        .title('Contenu Page Contact')
                ),

            S.divider(),

            // 6. Pied de Page & Paramètres
            S.listItem()
                .id('settings-item')
                .title('Footer & Contact Global')
                .icon(() => '⚙️')
                .child(
                    S.list()
                        .title('Configuration / Footer')
                        .id('settings-list')
                        .items([
                            S.listItem()
                                .id('footer-item')
                                .title('Pied de Page (Footer)')
                                .child(
                                    S.document()
                                        .schemaType('footer')
                                        .documentId('footer')
                                        .title('Pied de Page')
                                ),
                            S.listItem()
                                .id('general-settings-item')
                                .title('Paramètres Généraux')
                                .child(
                                    S.document()
                                        .schemaType('settings')
                                        .documentId('settings')
                                        .title('Configuration Générale')
                                ),
                        ])
                ),

            S.divider(),

            // 7. Types de Clients & Hero (Listes de support)
            S.documentTypeListItem('clientType')
                .id('client-types-list')
                .title('Types de Clients (Solutions)'),

            S.documentTypeListItem('heroSlide')
                .id('hero-slides-list')
                .title('Carrousel Accueil'),
        ])
