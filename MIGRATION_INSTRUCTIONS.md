# Apply Brands Migration

The brands table needs to be created in your Supabase database before you can manage brands.

## Steps to Apply:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `lidhgecwgvgqgqqunmeu`
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy the entire contents of: `supabase/migrations/20251015183830_create_brands_table.sql`
6. Paste into the SQL Editor
7. Click "Run" button

This will:
- Create the `brands` table
- Set up security policies
- Add 8 default brands
- Create necessary indexes

After running the migration, the brands section will work on both the public website and admin CMS.
