<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

echo "Setting up database for spares_service...\n";

$host = (string) env('DB_HOST', 'localhost');
$port = (string) env('DB_PORT', '3306');
$dbname = (string) env('DB_NAME', 'spares_service');
$user = (string) env('DB_USER', 'root');
$pass = (string) env('DB_PASSWORD', env('DB_PASS', ''));
$charset = 'utf8mb4';

$shouldResetCatalog = false;
if (PHP_SAPI === 'cli') {
    $argvList = isset($argv) && is_array($argv) ? $argv : [];
    $shouldResetCatalog = in_array('--reset-catalog', $argvList, true);
} else {
    $shouldResetCatalog = isset($_GET['reset_catalog']) && $_GET['reset_catalog'] === '1';
}

try {
    $rootPdo = new PDO(
        "mysql:host={$host};port={$port};charset={$charset}",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "Connected to MySQL successfully.\n";

    $rootPdo->exec(
        "CREATE DATABASE IF NOT EXISTS `{$dbname}` CHARACTER SET {$charset} COLLATE utf8mb4_unicode_ci"
    );
    echo "Database '{$dbname}' created or already exists.\n";
} catch (PDOException $error) {
    echo "ERROR: " . $error->getMessage() . "\n";
    echo "Please check your database credentials in public/api/.env.\n";
    exit(1);
}

require_once __DIR__ . '/helpers.php';

try {
    initDatabase();
    echo "Tables verified successfully.\n";

    if ($shouldResetCatalog) {
        resetOfficialCatalog(db());
        echo "Official pneumatic catalog has been reset successfully.\n";
    } else {
        echo "Catalog seed checked. Existing products were preserved.\n";
    }

    echo "\nSetup completed successfully.\n";
    echo "API endpoints:\n";
    echo "http://localhost/spares-service/public/api/products\n";
    echo "http://localhost/spares-service/public/api/health\n";
} catch (Throwable $error) {
    echo "ERROR: " . $error->getMessage() . "\n";
    exit(1);
}

