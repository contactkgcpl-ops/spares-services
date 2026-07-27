-- Migration Script: Rename Database Tables for Live Deployment
-- Database: spares_service (or live database name)

-- 1. Rename admins table
RENAME TABLE admins TO spares_admins;

-- 2. Rename categories table
RENAME TABLE categories TO spares_categories;

-- 3. Rename enquiries table to spares_enquiried
RENAME TABLE enquiries TO spares_enquiried;

-- 4. Rename products table
RENAME TABLE products TO spares_products;
