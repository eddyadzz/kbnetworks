# Fixing Brands Table Schema Cache Issue

## Problem
The `brands` table exists in your database, but Supabase PostgREST can't find it in the schema cache.

Error: `Could not find the table 'public.brands' in the schema cache`

## Solution

You need to reload the PostgREST schema cache in Supabase.

### Option 1: Reload Schema Cache (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **API**
3. Scroll down to find the **"Reload schema"** button
4. Click it and wait for confirmation
5. Refresh your app

### Option 2: Restart PostgREST Service

1. Go to Supabase Dashboard
2. Navigate to **Project Settings**
3. Find **Restart Services** or **Database** section
4. Restart the PostgREST service

### Option 3: Via SQL (If above options don't work)

Run this in SQL Editor:

```sql
NOTIFY pgrst, 'reload schema';
```

### Option 4: Wait
Sometimes the schema cache refreshes automatically after a few minutes. If you just created the table, wait 5-10 minutes and try again.

## After Fixing

Once the schema cache is reloaded:
1. The brands will load from the database (not defaults)
2. Admin panel will be able to create/edit/delete brands
3. No code changes needed - everything will work automatically

## Temporary Workaround

The app is currently configured to show default brands if the table isn't accessible, so your website still works while you fix the cache issue.
