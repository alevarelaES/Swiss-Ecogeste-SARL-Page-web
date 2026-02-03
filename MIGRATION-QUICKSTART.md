# Quick Start - Migration Guide

## Step 1: Get Your Sanity Write Token

1. Visit: https://www.sanity.io/manage/project/btjdqrld
2. Go to **API** tab → **Tokens**
3. Click **Add API Token**
4. Give it a name (e.g., "Migration Script")
5. Set permissions to **Editor** or **Administrator**
6. Copy the token

## Step 2: Add Token to .env

Create or edit `.env` file in the root directory:

```env
SANITY_WRITE_TOKEN=your_token_here
```

**Important**: Make sure `.env` is in your `.gitignore`!

## Step 3: Run the Migration

```bash
npm run migrate:pages
```

Or directly:

```bash
npx tsx scripts/migrate-pages-to-sanity.ts
```

## Expected Output

```
🚀 Starting migration to Sanity...

Project ID: btjdqrld
Dataset: production

📦 Migrating Client Types...
✅ Created clientType: Régies & Immeubles
✅ Created clientType: Propriétaires de Villas
✅ Created clientType: Entreprises & PME
✅ Created clientType: Communes & GRD

📦 Migrating Services...
✅ Created service: Régies & Immeubles
✅ Created service: Propriétaires de Villas
✅ Created service: Entreprises & PME
✅ Created service: Communes & GRD

📦 Migrating Team Members...
✅ Created team member: Mohammad SALMAN
✅ Created team member: Reem Al AYDI
✅ Created team member: Thibault CASIER
✅ Created team member: Daniel BADOUX
✅ Created team member: Patrick CASIMIRUS

📦 Migrating Home Page...
✅ Created homePage singleton

📦 Migrating Services Page...
✅ Created servicesPage singleton

📦 Migrating Team Page...
✅ Created teamPage singleton

📦 Migrating About Page...
✅ Created aboutPage singleton

✅ Migration completed successfully!

📝 Next steps:
1. Upload images manually in Sanity Studio
2. Update image references in documents
3. Create articles and link them to homePage.blogSection
4. Add partners to homePage.partnersSection
```

## Step 4: Verify in Sanity Studio

1. Open Sanity Studio: `npm run studio`
2. Check that documents were created:
   - **Pages**: Home Page, Services Page, Team Page, About Page
   - **Content**: Services (4), Team Members (5), Client Types (4)

## Step 5: Upload Images

Since the script creates placeholder image references, you need to upload actual images:

### For Hero Slides (Home Page)
1. Go to **Home Page** in Studio
2. In **Carrousel (Hero)** section
3. Upload images for each slide (4 images)

### For Client Types
1. Go to **Client Types** in Studio
2. Upload an image for each type (4 images)

### For Services
1. Go to **Services** in Studio
2. Upload hero images for each service detail page (optional)

### For Team Members
1. Go to **Team Members** in Studio
2. Upload photos for each member (optional - will show initials if no photo)

### For About Page
1. Go to **About Page** in Studio
2. Upload the main image

### For Team Page
1. Go to **Team Page** in Studio
2. Upload hero image and recruitment section image (optional)

## Troubleshooting

### "SANITY_WRITE_TOKEN not found"
- Make sure `.env` file is in the root directory
- Check that the variable name is exactly `SANITY_WRITE_TOKEN`
- Restart your terminal after adding the token

### "Authentication failed"
- Verify the token is valid
- Check that it has write permissions
- Ensure it's for the correct project (btjdqrld)

### "Schema validation error"
- Deploy your schema first: `cd studio && npx sanity deploy`
- Check that all schema files are properly defined
- Verify field names match between script and schema

### Documents not appearing
- Refresh the Studio browser tab
- Check the correct dataset (production)
- Look in the Vision tool to query documents directly

## Running Again

You can safely run the migration multiple times:
- It uses `createOrReplace` which updates existing documents
- Document IDs are deterministic (same every time)
- Won't create duplicates

**Note**: If you manually added images or other data, they will be preserved unless the script explicitly sets those fields.

## What Gets Created

| Document Type | Count | IDs |
|--------------|-------|-----|
| Client Types | 4 | `clientType-regies`, `clientType-villas`, `clientType-entreprises`, `clientType-communes` |
| Services | 4 | `service-gerance`, `service-villa`, `service-entreprise`, `service-communes` |
| Team Members | 5 | `teamMember-ms`, `teamMember-ra`, `teamMember-tc`, `teamMember-db`, `teamMember-pc` |
| Home Page | 1 | `homePage` |
| Services Page | 1 | `servicesPage` |
| Team Page | 1 | `teamPage` |
| About Page | 1 | `aboutPage` |

**Total**: 18 documents

## Next Actions

After successful migration:

1. ✅ Upload all images
2. ✅ Create blog articles
3. ✅ Add articles to `homePage.blogSection.featuredArticles`
4. ✅ Add partners to `homePage.partnersSection.list`
5. ✅ Test frontend integration
6. ✅ Deploy your schema: `cd studio && npx sanity deploy`

## Need Help?

Check the detailed documentation: `scripts/README-MIGRATION.md`
