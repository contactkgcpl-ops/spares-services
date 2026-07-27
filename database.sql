CREATE DATABASE IF NOT EXISTS spares_service CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE spares_service;

CREATE TABLE IF NOT EXISTS spares_categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  slug VARCHAR(140) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS spares_admins (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(180) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(180) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS spares_products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(120) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSON NOT NULL,
  specifications JSON NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS spares_enquiried (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(180) NOT NULL,
  company_name VARCHAR(180) NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(60) NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4 Main Categories
INSERT IGNORE INTO spares_categories (name, slug) VALUES
('Pneumatic', 'pneumatic'),
('Mechanical', 'mechanical'),
('Electronic', 'electronic'),
('Electric', 'electric');

-- Migrate old category values to new 4-category system
UPDATE spares_products SET category = 'Pneumatic' WHERE category IN (
  'Pneumatic Sensors', 'Pneumatic Actuators', 'Pneumatic Motors',
  'Pneumatic Grippers', 'Pneumatic Cylinders', 'Pneumatic Switches',
  'Pneumatic Fittings', 'Air Preparation Units', 'Pneumatic Valves',
  'Pneumatic Accessories', 'Vacuum Products', 'Solenoid Valves',
  'Pneumatic Tubes', 'Flow Control Valves', 'Hydraulic Flow Control'
);

UPDATE spares_products SET category = 'Electronic' WHERE category IN (
  'Automation Control Systems', 'Automation Interface Systems',
  'PLC Modules', 'Controllers', 'PCB Boards', 'Relays', 'Electronic Sensors'
);

UPDATE spares_products SET category = 'Electric' WHERE category IN (
  'Power Supplies', 'Electrical Switches', 'Push Buttons',
  'MCB', 'Industrial Electrical Devices'
);

UPDATE spares_products SET category = 'Mechanical' WHERE category IN (
  'Manual Valves', 'Bearings', 'Couplings',
  'Mechanical Hardware', 'Industrial Mechanical Components'
);

-- Remove old categories
DELETE FROM spares_categories WHERE name NOT IN ('Pneumatic', 'Mechanical', 'Electronic', 'Electric');

-- Admin row is seeded by PHP API (`initDatabase`) using ADMIN_EMAIL and ADMIN_PASSWORD from `public/api/.env`.

-- ════════════════════════════════════════════════════════════════════
-- Machine Module Tables (Ported from salvinindia)
-- ════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS machine_categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL UNIQUE,
  slug VARCHAR(200) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS machine_subcategories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES machine_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS machine_machines (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  machine_name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  meta_title VARCHAR(255) NULL,
  meta_description TEXT NULL,
  category_id INT UNSIGNED NOT NULL,
  subcategory_id INT UNSIGNED NULL,
  specifications JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES machine_categories(id) ON DELETE RESTRICT,
  FOREIGN KEY (subcategory_id) REFERENCES machine_subcategories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS machine_products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(120) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSON NOT NULL,
  specifications JSON NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS machine_enquiries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(180) NOT NULL,
  company_name VARCHAR(180) NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(60) NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


