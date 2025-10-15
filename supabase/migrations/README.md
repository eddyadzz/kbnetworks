# Database Migrations

## How to Apply Migrations

The migrations in this folder need to be applied to your Supabase database.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of the migration file you want to apply
4. Paste and execute the SQL in the SQL Editor

### Option 2: Using Supabase CLI (if configured)

```bash
supabase db push
```

## Migration Files

- `20251007195543_long_garden.sql` - Initial schema with projects and gallery
- `20251008195936_fix_admin_login_rls.sql` - Admin authentication fixes
- `20251008200715_fix_rls_for_custom_auth.sql` - RLS policy updates
- `20251009102138_create_storage_bucket_for_media.sql` - Storage bucket setup
- `20251015183830_create_brands_table.sql` - **NEW** Brands management table

## Latest Migration: Brands Table

The brands table allows administrators to manage trusted brand partners through the CMS.

To apply this migration:
1. Open `20251015183830_create_brands_table.sql`
2. Copy all the SQL content
3. Execute it in your Supabase SQL Editor

This will:
- Create the `brands` table with appropriate columns
- Set up Row Level Security (RLS) policies
- Insert default brand data
- Create indexes for performance
