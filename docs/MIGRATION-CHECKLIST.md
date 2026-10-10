# Migration Checklist

Track your progress migrating local data to Sanity.

## Pre-Migration

- [ ] Sanity Studio is running (`npm run studio`)
- [ ] Schema is deployed (`cd studio && npx sanity deploy`)
- [ ] Write token is created and added to `.env`
- [ ] `.env` is in `.gitignore`

## Running the Migration

- [ ] Run migration script: `npm run migrate:pages`
- [ ] Verify no errors in console output
- [ ] Check that all 18 documents were created

## Document Verification

### Client Types (4 documents)
- [ ] clientType-regies
- [ ] clientType-villas
- [ ] clientType-entreprises
- [ ] clientType-communes

### Services (4 documents)
- [ ] service-gerance
- [ ] service-villa
- [ ] service-entreprise
- [ ] service-communes

### Team Members (5 documents)
- [ ] teamMember-ms (Mohammad SALMAN)
- [ ] teamMember-ra (Reem Al AYDI)
- [ ] teamMember-tc (Thibault CASIER)
- [ ] teamMember-db (Daniel BADOUX)
- [ ] teamMember-pc (Patrick CASIMIRUS)

### Page Singletons (4 documents)
- [ ] homePage
- [ ] servicesPage
- [ ] teamPage
- [ ] aboutPage

## Image Upload

### Home Page
- [ ] Hero Slide 1 image (Villas)
- [ ] Hero Slide 2 image (Régies)
- [ ] Hero Slide 3 image (Entreprises)
- [ ] Hero Slide 4 image (Communes)

### Client Types
- [ ] Régies & Immeubles image
- [ ] Propriétaires de Villas image
- [ ] Entreprises & PME image
- [ ] Communes & GRD image

### Services (Detail Page)
- [ ] Gérance hero image (optional)
- [ ] Villa hero image (optional)
- [ ] Entreprise hero image (optional)
- [ ] Communes hero image (optional)

### Team Members (Photos)
- [ ] Mohammad SALMAN photo (optional)
- [ ] Reem Al AYDI photo (optional)
- [ ] Thibault CASIER photo (optional)
- [ ] Daniel BADOUX photo (optional)
- [ ] Patrick CASIMIRUS photo (optional)

### Other Pages
- [ ] About Page image
- [ ] Team Page hero image (optional)
- [ ] Team Page recruitment section image (optional)

## Content Completion

### Home Page
- [ ] Stats section is populated (4 stats)
- [ ] Solutions section references client types (4 items)
- [ ] Blog section structure is ready
- [ ] Partners section structure is ready

### Services Page
- [ ] Services list references all 4 services
- [ ] SEO metadata is filled
- [ ] Hero section is filled

### Team Page
- [ ] Members list references all 5 team members
- [ ] Hero section is filled
- [ ] Recruitment section is filled
- [ ] SEO metadata is filled

### About Page
- [ ] Section label and title are filled
- [ ] Two paragraphs are filled
- [ ] Three values are filled
- [ ] CTA is filled
- [ ] Quote is filled

## Additional Content (Manual)

### Blog Articles
- [ ] Create article documents
- [ ] Add to homePage.blogSection.featuredArticles

### Partners
- [ ] Add partner entries to homePage.partnersSection.list
- [ ] Upload partner logos

## Frontend Integration

- [ ] Update frontend to fetch from Sanity instead of local data
- [ ] Test all pages render correctly
- [ ] Verify multilingual content works
- [ ] Test image URLs and rendering
- [ ] Verify references resolve correctly

## Deployment

- [ ] Test on local Studio
- [ ] Deploy schema to production: `cd studio && npx sanity deploy`
- [ ] Verify production data
- [ ] Build and deploy frontend

## Post-Migration Cleanup (Optional)

- [ ] Archive or delete old migration scripts
- [ ] Remove local data files from `src/app/data/` (keep as backup first!)
- [ ] Update documentation
- [ ] Remove unused dependencies

## Notes

_Add any notes, issues encountered, or customizations made:_

---
---
---

## Completion

**Migration Started**: ___________
**Migration Completed**: ___________
**Verified By**: ___________

### Final Status
- [ ] All documents created successfully
- [ ] All images uploaded
- [ ] All references working
- [ ] Frontend integrated
- [ ] Production deployed
