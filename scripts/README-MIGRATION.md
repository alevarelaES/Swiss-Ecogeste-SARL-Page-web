# Migration Script - Page Hierarchies

This script migrates local data from `src/app/data/*.ts` to Sanity Studio using the new Page-Section-Field hierarchy.

## What This Script Does

### 1. **Client Types** (`clientType` documents)
- Creates 4 client type documents from `clientTypes.ts`
- IDs: `clientType-regies`, `clientType-villas`, `clientType-entreprises`, `clientType-communes`
- Includes multilingual titles, subtitles, descriptions

### 2. **Services** (`service` documents)
- Creates 4 service documents from `services.ts`
- IDs: `service-gerance`, `service-villa`, `service-entreprise`, `service-communes`
- Merges card info and detail page info
- Maps features to benefits array

### 3. **Team Members** (`teamMember` documents)
- Creates 5 team member documents from `teamMembers.ts`
- IDs: `teamMember-ms`, `teamMember-ra`, `teamMember-tc`, `teamMember-db`, `teamMember-pc`
- Includes multilingual roles and competencies

### 4. **Home Page** (`homePage` singleton)
- ID: `homePage`
- Populates:
  - `heroSlides`: from `heroSlides.ts` (4 slides with multilingual content)
  - `statsSection.items`: from `statsData.ts` (4 stats)
  - `solutionsSection.items`: references to created `clientType` documents
  - `blogSection`: structure ready (articles to be added later)
  - `partnersSection`: structure ready (to be populated manually)

### 5. **Services Page** (`servicesPage` singleton)
- ID: `servicesPage`
- Populates:
  - `servicesList`: references to all created `service` documents
  - SEO metadata
  - Hero section

### 6. **Team Page** (`teamPage` singleton)
- ID: `teamPage`
- Populates:
  - `membersSection.membersList`: references to all created `teamMember` documents
  - Hero section
  - Recruitment section
  - SEO metadata

### 7. **About Page** (`aboutPage` singleton)
- ID: `aboutPage`
- Populates from `aboutContent.ts`:
  - Section label and title
  - Two paragraphs
  - Three values (Local, Bio/Green, Éco/Eco)
  - CTA button
  - Quote

## Prerequisites

1. **Sanity Write Token**: Create one at https://www.sanity.io/manage/project/btjdqrld
2. **Environment Variable**: Add to your `.env` file:
   ```
   SANITY_WRITE_TOKEN=your_token_here
   ```

## Usage

```bash
npx tsx scripts/migrate-pages-to-sanity.ts
```

## Features

- **Deterministic IDs**: Uses `createOrReplace` to avoid duplicates
- **Multilingual**: All content is mapped to French, English, and German
- **Type-safe**: Properly typed references between documents
- **Error Handling**: Clear error messages for debugging

## Post-Migration Tasks

### 1. Upload Images
The script creates placeholder image references. You need to:
- Upload images in Sanity Studio
- Update the following fields with actual image assets:
  - `homePage.heroSlides[].image`
  - `clientType[].image`
  - `service[].detailPage.heroImage`
  - `teamMember[].photo` (optional)
  - `aboutPage.image`
  - `teamPage.hero.image`
  - `teamPage.recruitmentSection.image`

### 2. Add Blog Articles
- Create `article` documents in Sanity
- Reference them in `homePage.blogSection.featuredArticles`

### 3. Add Partners
- Add partner entries to `homePage.partnersSection.list`

## Data Mapping Details

### Hero Slides
```typescript
// From heroSlides.ts
{
  img, title, sub, features, buttonText, buttonLink
}
// To homePage.heroSlides[]
{
  image, title (localeString), subtitle (localeText), 
  features (string[]), buttonText (localeString), buttonLink
}
```

### Stats
```typescript
// From statsData.ts
{
  id, value, prefix, suffix, label, icon
}
// To homePage.statsSection.items[]
{
  value, label (localeString), prefix, suffix, icon
}
```

### Services
```typescript
// From services.ts
{
  id, number, icon, title, subtitle, description,
  fullDescription, features, link
}
// To service document
{
  cardInfo: { title, description, icon, slug },
  detailPage: { fullDescription, benefits[], ctaText }
}
```

### Team Members
```typescript
// From teamMembers.ts
{
  name, role, initials, color, items
}
// To teamMember document
{
  name, role (object), initials, color, 
  items (object), order
}
```

### About Content
```typescript
// From aboutContent.ts
{
  sectionLabel, title, paragraph1, paragraph2,
  values[], ctaText, ctaLink, quote, image
}
// To aboutPage document
{
  sectionLabel, title, paragraphs[],
  values[], cta{}, quote, image
}
```

## Troubleshooting

### Token Issues
If you get authentication errors:
1. Verify your token in `.env`
2. Check token permissions (needs write access)
3. Ensure token is for project `btjdqrld`

### Schema Validation Errors
If documents fail to create:
1. Check that all schema types are deployed: `cd studio && npm run deploy`
2. Verify field types match schema definitions
3. Check for missing required fields

### Reference Errors
If references fail:
1. Ensure referenced documents were created first
2. Check that document IDs match
3. Verify `_type` in references

## Running Multiple Times

The script uses `createOrReplace` with deterministic IDs, so you can run it multiple times safely. It will:
- Replace existing documents with the same ID
- Not create duplicates
- Preserve manually added data (like uploaded images) if you don't override them

## Script Structure

```
migrate-pages-to-sanity.ts
├── Data Imports (hardcoded from local files)
├── Helper Functions
│   ├── createLocaleString()
│   ├── createLocaleText()
│   └── getIconName()
├── Migration Functions
│   ├── migrateClientTypes()
│   ├── migrateServices()
│   ├── migrateTeamMembers()
│   ├── migrateHomePage()
│   ├── migrateServicesPage()
│   ├── migrateTeamPage()
│   └── migrateAboutPage()
└── main() - Orchestrates the migration
```

## Next Steps After Migration

1. **Verify in Studio**: Open Sanity Studio and check all documents
2. **Upload Images**: Replace placeholder image references
3. **Test Queries**: Verify data can be queried correctly
4. **Update Frontend**: Connect your frontend to use Sanity data
5. **Deploy Schema**: Ensure schema is deployed to production

## Notes

- All text content is multilingual (fr, en, de)
- Simple strings in features arrays (not localized individually)
- Icon names are extracted from Lucide components
- Links are kept as simple strings (not localized)
- Order fields are auto-generated based on array index
