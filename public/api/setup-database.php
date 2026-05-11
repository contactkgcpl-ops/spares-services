<?php
declare(strict_types=1);

echo "Setting up database for spares_service...\n";

$host = 'localhost';
$dbname = 'spares_service';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

try {
    // Connect to MySQL without specifying database first
    $pdo = new PDO("mysql:host=$host;charset=$charset", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    
    echo "Connected to MySQL successfully.\n";
    
    // Create database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` 
               CHARACTER SET $charset COLLATE utf8mb4_unicode_ci");
    echo "Database '$dbname' created or already exists.\n";
    
    // Connect to the specific database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=$charset", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    
    echo "Connected to database '$dbname' successfully.\n";
    
    // Create products table
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS products (
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
    echo "Products table created or already exists.\n";
    
    // Create enquiries table
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS enquiries (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(180) NOT NULL,
            company_name VARCHAR(180) NULL,
            email VARCHAR(180) NOT NULL,
            phone VARCHAR(60) NULL,
            subject VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            status VARCHAR(40) NOT NULL DEFAULT 'new',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
    echo "Enquiries table created or already exists.\n";
    
    // Check if products exist and add sample data if empty
    $count = (int) $pdo->query('SELECT COUNT(*) FROM products')->fetchColumn();
    if ($count === 0) {
        echo "Adding sample products...\n";
        
        $stmt = $pdo->prepare(
            'INSERT INTO products (title, category, image, description, features, specifications, slug)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        
        // Sample product 1
        $stmt->execute([
            'High-Flow Centrifugal Pump',
            'Pump Systems',
            'https://images.unsplash.com/photo-1581092921461-eab10380fef2?q=80&w=1200&auto=format&fit=crop',
            'High-throughput industrial pump designed for stable pressure and continuous operation.',
            json_encode(['High flow rate', 'Low vibration', 'Corrosion-resistant body']),
            json_encode(['Flow Rate: 180 L/min', 'Power: 4.0 kW', 'Material: SS316']),
            'high-flow-centrifugal-pump',
        ]);
        
        // Sample product 2
        $stmt->execute([
            'Precision Control Valve',
            'Valves',
            'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1200&auto=format&fit=crop',
            'Precision valve for fine flow control in high-demand industrial process lines.',
            json_encode(['Low pressure drop', 'PTFE sealing', 'Compact build']),
            json_encode(['Type: Globe valve', 'Diameter: 40 mm', 'Pressure Class: PN16']),
            'precision-control-valve',
        ]);
        
        echo "Sample products added successfully.\n";
    } else {
        echo "Products table already contains {$count} products.\n";
    }
    
    echo "\nDatabase setup completed successfully!\n";
    echo "You can now test the API at:\n";
    echo "http://localhost/spares-service/public/api/products.php\n";
    echo "http://localhost/spares-service/public/api/health.php\n";
    
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "Please check your XAMPP MySQL configuration.\n";
    exit(1);
}
