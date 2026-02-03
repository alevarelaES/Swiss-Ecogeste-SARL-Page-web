import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Gestion du Site Swiss Ecogestes')
        .items([
            // 1. HOME
            S.listItem()
                .title("Page d'Accueil")
                .id('home-page-root')
                .icon(() => '🏠')
                .child(
                    S.document()
                        .schemaType('homePage')
                        .documentId('homePage')
                        .title('Éditer l\'Accueil')
                ),

            S.divider(),

            // 2. SERVICES
            S.listItem()
                .title('Page Services')
                .id('services-page-root')
                .icon(() => '🛠️')
                .child(
                    S.list()
                        .title('Gestion des Services')
                        .items([
                            S.listItem()
                                .title('Page Services (Liste & Hero)')
                                .child(
                                    S.document()
                                        .schemaType('servicesPage')
                                        .documentId('servicesPage')
                                        .title('Éditer la Page Services')
                                ),
                            S.divider(),
                            S.documentTypeListItem('service')
                                .title('Tous les Services (Fiches Compètes)')
                                .id('all-services-list'),
                        ])
                ),

            S.divider(),

            // 3. ABOUT (On Home or separate?) Prompt said 'aboutPage.ts'.
            S.listItem()
                .title('Page À Propos')
                .id('about-page-root')
                .icon(() => 'ℹ️')
                .child(
                    S.document()
                        .schemaType('aboutPage')
                        .documentId('aboutPage')
                        .title('Éditer À Propos')
                ),

            S.divider(),

            // 4. TEAM
            S.listItem()
                .title('Page Équipe')
                .id('team-page-root')
                .icon(() => '👥')
                .child(
                    S.list()
                        .title('Gestion Équipe')
                        .items([
                            S.listItem()
                                .title('Page Équipe (Hero & Recrutement)')
                                .child(
                                    S.document()
                                        .schemaType('teamPage')
                                        .documentId('teamPage')
                                        .title('Éditer la Page Équipe')
                                ),
                            S.divider(),
                            S.documentTypeListItem('teamMember')
                                .title('Membres de l\'équipe')
                                .id('all-team-members'),
                        ])
                ),

            S.divider(),

            // 5. BLOG
            S.listItem()
                .title('Page Conseils (Blog)')
                .id('blog-page-root')
                .icon(() => '📰')
                .child(
                    S.list()
                        .title('Gestion du Blog')
                        .items([
                            S.listItem()
                                .title('Configuration Page Blog')
                                .child(
                                    S.document()
                                        .schemaType('blogPage')
                                        .documentId('blogPage')
                                        .title('En-tête & Paramètres')
                                ),
                            S.documentTypeListItem('article')
                                .title('Tous les Articles')
                                .id('all-articles'),
                        ])
                ),

            S.divider(),

            // 6. CONTACT
            S.listItem()
                .title('Page Contact')
                .id('contact-page-root')
                .icon(() => '📞')
                .child(
                    S.document()
                        .schemaType('contactPage')
                        .documentId('contactPage')
                        .title('Éditer Page Contact')
                ),

            S.divider(),

            // 7. SETTINGS / FOOTER
            S.listItem()
                .title('Paramètres & Footer')
                .id('settings-root')
                .icon(() => '⚙️')
                .child(
                    S.document()
                        .schemaType('settings')
                        .documentId('settings')
                        .title('Global & Footer')
                ),
        ])
