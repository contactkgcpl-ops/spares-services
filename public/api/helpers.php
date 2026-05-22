<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = env('DB_HOST', env('MYSQL_HOST', env('DB_SERVER', 'localhost')));
    $port = env('DB_PORT', '3306');
    $dbname = env('DB_NAME', 'spares_service');
    $user = env('DB_USER', env('DB_USERNAME', env('MYSQL_USER', 'root')));
    $pass = env('DB_PASSWORD', env('DB_PASS', env('MYSQL_PASSWORD', '')));

    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
}

function applyCors(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('Vary: Origin');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With, Cache-Control, Pragma');
    header('Access-Control-Max-Age: 86400');
    header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('Expires: 0');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        header('Content-Length: 0');
        exit;
    }
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    $json = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        $json = '{"success":false,"message":"Failed to encode JSON response"}';
        if ($status < 400) {
            http_response_code(500);
        }
    }
    echo $json;
    exit;
}

function readJsonBody(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        respond(400, ['success' => false, 'message' => 'Invalid JSON body']);
    }

    return $data;
}

function base64UrlEncode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode(string $data): string|false
{
    return base64_decode(strtr($data, '-_', '+/'));
}

function createToken(string $email): string
{
    $secret = env('JWT_SECRET', 'salvin_spares_secret_key');
    $header = base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64UrlEncode(json_encode([
        'email' => $email,
        'iat' => time(),
        'exp' => time() + 86400,
    ]));
    $signature = base64UrlEncode(hash_hmac('sha256', "{$header}.{$payload}", $secret, true));

    return "{$header}.{$payload}.{$signature}";
}

function requireAdmin(): void
{
    $secret = env('JWT_SECRET', 'salvin_spares_secret_key');
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';

    if ($header === '' && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $header = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }

    if (!preg_match('/Bearer\s+(.+)/i', $header, $matches)) {
        respond(401, ['success' => false, 'message' => 'Unauthorized']);
    }

    $parts = explode('.', $matches[1]);
    if (count($parts) !== 3) {
        respond(401, ['success' => false, 'message' => 'Invalid token']);
    }

    [$headerPart, $payloadPart, $signaturePart] = $parts;
    $expected = base64UrlEncode(hash_hmac('sha256', "{$headerPart}.{$payloadPart}", $secret, true));
    if (!hash_equals($expected, $signaturePart)) {
        respond(401, ['success' => false, 'message' => 'Invalid token']);
    }

    $payloadJson = base64UrlDecode($payloadPart);
    $payload = $payloadJson === false ? null : json_decode($payloadJson, true);
    if (!is_array($payload) || (int) ($payload['exp'] ?? 0) < time()) {
        respond(401, ['success' => false, 'message' => 'Token expired']);
    }
}

function initDatabase(): void
{
    $pdo = db();

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS categories (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(120) NOT NULL UNIQUE,
            slug VARCHAR(140) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS admins (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(180) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            full_name VARCHAR(180) NULL,
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

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

    seedDefaults($pdo);

    // Auto-migrate existing products to new 4-category system
    migrateProductCategories($pdo);
}

/**
 * The 4 main categories used across the entire platform.
 */
function officialCatalogCategories(): array
{
    return [
        'Pneumatic',
        'Mechanical',
        'Electronic',
        'Electric',
    ];
}

/**
 * Maps old subcategory names to the new 4 main categories.
 */
function oldToNewCategoryMap(): array
{
    return [
        'Pneumatic Sensors'             => 'Pneumatic',
        'Pneumatic Actuators'           => 'Pneumatic',
        'Pneumatic Motors'              => 'Pneumatic',
        'Pneumatic Grippers'            => 'Pneumatic',
        'Pneumatic Cylinders'           => 'Pneumatic',
        'Pneumatic Switches'            => 'Pneumatic',
        'Pneumatic Fittings'            => 'Pneumatic',
        'Air Preparation Units'         => 'Pneumatic',
        'Pneumatic Valves'              => 'Pneumatic',
        'Pneumatic Accessories'         => 'Pneumatic',
        'Vacuum Products'               => 'Pneumatic',
        'Solenoid Valves'               => 'Pneumatic',
        'Pneumatic Tubes'               => 'Pneumatic',
        'Flow Control Valves'           => 'Pneumatic',
        'Hydraulic Flow Control'        => 'Pneumatic',
        'Automation Control Systems'    => 'Electronic',
        'Automation Interface Systems'  => 'Electronic',
        'PLC Modules'                   => 'Electronic',
        'Controllers'                   => 'Electronic',
        'PCB Boards'                    => 'Electronic',
        'Relays'                        => 'Electronic',
        'Electronic Sensors'            => 'Electronic',
        'Power Supplies'                => 'Electric',
        'Electrical Switches'           => 'Electric',
        'Push Buttons'                  => 'Electric',
        'MCB'                           => 'Electric',
        'Industrial Electrical Devices' => 'Electric',
        'Manual Valves'                 => 'Mechanical',
        'Bearings'                      => 'Mechanical',
        'Couplings'                     => 'Mechanical',
        'Mechanical Hardware'           => 'Mechanical',
        'Industrial Mechanical Components' => 'Mechanical',
    ];
}

/**
 * Automatically migrates all existing product category values to the new 4-category system.
 */
function migrateProductCategories(PDO $pdo): void
{
    $map = oldToNewCategoryMap();
    $validCategories = officialCatalogCategories();

    $stmt = $pdo->query('SELECT id, category FROM products');
    $products = $stmt->fetchAll();

    $updateStmt = $pdo->prepare('UPDATE products SET category = ? WHERE id = ?');

    foreach ($products as $product) {
        $currentCategory = trim($product['category']);

        // Already using a valid new category
        if (in_array($currentCategory, $validCategories, true)) {
            continue;
        }

        // Map old category to new
        if (isset($map[$currentCategory])) {
            $updateStmt->execute([$map[$currentCategory], (int) $product['id']]);
        }
        // If not in map, default to Pneumatic (most products are pneumatic)
        else {
            $updateStmt->execute(['Pneumatic', (int) $product['id']]);
        }
    }
}

function officialCatalogProducts(): array
{
    return [
        [
            'title' => 'PU Tube 8x5mm',
            'category' => 'Pneumatic',
            'image' => 'uploads/pu-tube-8x5mm.jpg',
            'description' => 'High-flexibility polyurethane tube designed for pneumatic lines with consistent airflow and long service life.',
            'features' => [
                'Excellent bend radius for compact routing',
                'Abrasion-resistant outer surface',
                'Stable performance across repeated pressure cycles',
                'Low weight for easy installation',
            ],
            'specifications' => [
                'Outer Diameter: 8 mm',
                'Inner Diameter: 5 mm',
                'Material: Polyurethane (PU)',
                'Working Medium: Compressed Air',
                'Temperature Range: -20 C to 60 C',
            ],
            'slug' => 'pu-tube-8x5mm',
        ],
        [
            'title' => 'Air Filter Regulator Lubricator',
            'category' => 'Pneumatic',
            'image' => 'uploads/air-filter-regulator-lubricator.jpg',
            'description' => 'Integrated FRL unit for clean, regulated, and lubricated compressed air supply in industrial pneumatic systems.',
            'features' => [
                'Combined filtration, pressure control, and lubrication',
                'Transparent bowl for quick inspection',
                'Stable downstream pressure delivery',
                'Compact modular body for panel mounting',
            ],
            'specifications' => [
                'Product Type: FRL Combination Unit',
                'Filtration Grade: 5 micron',
                'Pressure Adjustment Range: 0.5 to 8 bar',
                'Port Size: 1/4 in',
                'Bowl Material: Polycarbonate with metal guard',
            ],
            'slug' => 'air-filter-regulator-lubricator',
        ],
        [
            'title' => 'Pneumatic Cylinder SC63X100',
            'category' => 'Pneumatic',
            'image' => 'uploads/pneumatic-cylinder-sc63x100.jpg',
            'description' => 'Durable double-acting pneumatic cylinder engineered for smooth linear motion and dependable actuator performance.',
            'features' => [
                'Precision-machined piston for stable movement',
                'Double-acting design for forward and return stroke',
                'Long-lasting sealing system',
                'Industrial-grade aluminum cylinder body',
            ],
            'specifications' => [
                'Model: SC63X100',
                'Bore Diameter: 63 mm',
                'Stroke Length: 100 mm',
                'Type: Double Acting',
                'Mounting: Standard SC series mounting pattern',
            ],
            'slug' => 'pneumatic-cylinder-sc63x100',
        ],
        [
            'title' => 'Solenoid Valve SV520DC',
            'category' => 'Pneumatic',
            'image' => 'uploads/solenoid-valve-sv520dc.jpg',
            'description' => '5/2 way directional solenoid valve designed for rapid switching and reliable airflow control in automation lines.',
            'features' => [
                'Fast response for automated cycle operation',
                'Low power coil suitable for continuous duty',
                'Compact manifold-friendly form factor',
                'Consistent sealing under repeated actuation',
            ],
            'specifications' => [
                'Model: SV520DC',
                'Valve Type: 5/2 Way',
                'Actuation: Single Solenoid',
                'Coil Voltage: 24V DC',
                'Working Pressure: 0.15 to 0.8 MPa',
            ],
            'slug' => 'solenoid-valve-sv520dc',
        ],
        [
            'title' => 'Flow Control Valve SCV-8',
            'category' => 'Pneumatic',
            'image' => 'uploads/flow-control-valve-scv-8.jpg',
            'description' => 'Compact flow control valve for accurate pneumatic speed regulation and smooth actuator motion control.',
            'features' => [
                'Fine adjustment needle for precise flow tuning',
                'Integrated check valve for one-way flow control',
                'Leak-resistant threaded body',
                'Quick-fit installation compatibility',
            ],
            'specifications' => [
                'Model: SCV-8',
                'Port Size: 8 mm',
                'Control Type: Meter-in/Meter-out compatible',
                'Body Material: Brass/Nickel plated alloy',
                'Working Medium: Compressed Air',
            ],
            'slug' => 'flow-control-valve-scv-8',
        ],
    ];
}

function insertCatalogProducts(PDO $pdo, array $products): void
{
    $insertProduct = $pdo->prepare(
        'INSERT INTO products (title, category, image, description, features, specifications, slug)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    foreach ($products as $product) {
        $insertProduct->execute([
            (string) $product['title'],
            (string) $product['category'],
            (string) $product['image'],
            (string) $product['description'],
            json_encode($product['features'], JSON_UNESCAPED_UNICODE),
            json_encode($product['specifications'], JSON_UNESCAPED_UNICODE),
            (string) $product['slug'],
        ]);
    }
}

function seedDefaults(PDO $pdo): void
{
    // Seed new 4 main categories
    $insertCategory = $pdo->prepare('INSERT IGNORE INTO categories (name, slug) VALUES (?, ?)');
    foreach (officialCatalogCategories() as $categoryName) {
        $insertCategory->execute([$categoryName, slugify($categoryName)]);
    }

    $adminEmail = trim((string) env('ADMIN_EMAIL', 'admin@gmail.com'));
    $configuredPassword = env('ADMIN_PASSWORD', null);
    $configuredPasswordHash = trim((string) env('ADMIN_PASSWORD_HASH', ''));
    $adminPassword = (string) ($configuredPassword ?? 'admin123');
    $adminPasswordHash = $configuredPasswordHash !== ''
        ? $configuredPasswordHash
        : password_hash($adminPassword, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare('SELECT COUNT(*) FROM admins WHERE email = ?');
    $stmt->execute([$adminEmail]);
    $count = (int) $stmt->fetchColumn();

    if ($count === 0) {
        $insertAdmin = $pdo->prepare('INSERT INTO admins (email, password_hash, full_name, is_active) VALUES (?, ?, ?, 1)');
        $insertAdmin->execute([$adminEmail, $adminPasswordHash, 'Administrator']);
    } elseif ($configuredPassword !== null || $configuredPasswordHash !== '') {
        $updateAdmin = $pdo->prepare('UPDATE admins SET password_hash = ?, is_active = 1 WHERE email = ?');
        $updateAdmin->execute([$adminPasswordHash, $adminEmail]);
    }

    $productsCount = (int) $pdo->query('SELECT COUNT(*) FROM products')->fetchColumn();
    if ($productsCount === 0) {
        insertCatalogProducts($pdo, officialCatalogProducts());
    }
}

function resetOfficialCatalog(PDO $pdo): void
{
    $pdo->beginTransaction();

    try {
        $pdo->exec('DELETE FROM products');
        $pdo->exec('DELETE FROM categories');

        $insertCategory = $pdo->prepare('INSERT INTO categories (name, slug) VALUES (?, ?)');
        foreach (officialCatalogCategories() as $categoryName) {
            $insertCategory->execute([$categoryName, slugify($categoryName)]);
        }

        insertCatalogProducts($pdo, officialCatalogProducts());
        $pdo->commit();
    } catch (Throwable $error) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $error;
    }
}

function trimString(mixed $value): string
{
    return trim((string) $value);
}

function toArrayValue(mixed $value): array
{
    if (is_array($value)) {
        return array_values(array_filter(array_map('trimString', $value), 'strlen'));
    }

    if (is_string($value)) {
        return array_values(array_filter(array_map('trim', preg_split('/[\n,]+/', $value) ?: []), 'strlen'));
    }

    return [];
}

function productFromRow(array $row): array
{
    $row['id'] = (int) $row['id'];
    $row['_id'] = (string) $row['id'];
    $row['features'] = json_decode($row['features'] ?: '[]', true) ?: [];
    $row['specifications'] = json_decode($row['specifications'] ?: '[]', true) ?: [];
    $row['createdAt'] = $row['created_at'] ?? null;
    $row['updatedAt'] = $row['updated_at'] ?? null;

    if ($row['image'] && !str_starts_with($row['image'], 'http')) {
        $row['image'] = publicUrlForPath($row['image']);
    }

    return $row;
}

function idFromRequest(string $resource): ?int
{
    if (isset($_GET['id']) && ctype_digit((string) $_GET['id'])) {
        return (int) $_GET['id'];
    }

    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '';
    if (preg_match("#/api/{$resource}/(\d+)/?$#", $path, $matches)) {
        return (int) $matches[1];
    }

    return null;
}

function requireText(array $data, string $key): string
{
    $value = trim((string) ($data[$key] ?? ''));
    if ($value === '') {
        respond(400, ['success' => false, 'message' => "{$key} is required"]);
    }

    return $value;
}

function publicUrlForPath(string $relativePath): string
{
    $filename = basename($relativePath);
    $uploadUrl = trim((string) env('UPLOAD_URL', ''));
    if ($uploadUrl !== '') {
        return rtrim($uploadUrl, '/') . '/' . $filename;
    }

    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? '';

    if ($host !== '') {
        return "{$scheme}://{$host}/spares/upload/" . rawurlencode($filename);
    }

    return 'spares/upload/' . rawurlencode($filename);
}

function slugify(string $text): string
{
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9]+/i', '_', $text);
    return trim((string) $text, '_');
}

function buildUploadPathAndName(string $sourceName, string $extension, ?string $preferredTitle = null): array
{
    $uploadDir = uploadDirectory();
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (!is_writable($uploadDir)) {
        respond(500, ['success' => false, 'message' => 'Uploads directory is not writable']);
    }

    $base = $preferredTitle && trim($preferredTitle) !== ''
        ? slugify($preferredTitle)
        : slugify(pathinfo($sourceName, PATHINFO_FILENAME));

    if ($base === '') {
        $base = 'file_' . date('Ymd_His');
    }

    $filename = $base . '.' . $extension;
    $counter = 1;
    while (file_exists($uploadDir . '/' . $filename)) {
        $filename = $base . '_' . $counter . '.' . $extension;
        $counter++;
    }

    return [$uploadDir . '/' . $filename, 'uploads/' . $filename];
}

function uploadDirectory(): string
{
    $uploadDir = rtrim((string) env('UPLOAD_PATH', __DIR__ . '/../uploads'), '/\\');
    if (!preg_match('/^(?:[A-Za-z]:[\\/\\\\]|\\/)/', $uploadDir)) {
        $uploadDir = __DIR__ . '/' . $uploadDir;
    }

    return rtrim(str_replace('\\', '/', $uploadDir), '/');
}

function saveBase64ImageIfNeeded(string $image, string $suggestedName = ''): string
{
    if (str_starts_with($image, 'http')) {
        $uploadUrlPath = '/uploads/';
        $pos = strpos($image, $uploadUrlPath);
        if ($pos !== false) {
            return substr($image, $pos + 1);
        }
        return $image;
    }

    if (!str_starts_with($image, 'data:image/')) {
        return $image;
    }

    if (!preg_match('/^data:image\/(png|jpe?g|webp);base64,(.+)$/i', $image, $matches)) {
        respond(400, ['success' => false, 'message' => 'Invalid image data']);
    }

    $maxBytes = (int) env('MAX_UPLOAD_SIZE', 5242880);
    $binary = base64_decode($matches[2], true);
    if ($binary === false || strlen($binary) > $maxBytes) {
        respond(400, ['success' => false, 'message' => 'Image is invalid or too large']);
    }

    $ext = strtolower($matches[1]) === 'jpeg' ? 'jpg' : strtolower($matches[1]);
    [$absolutePath, $relativePath] = buildUploadPathAndName($suggestedName ?: 'image', $ext, $suggestedName);

    if (file_put_contents($absolutePath, $binary) === false) {
        respond(500, ['success' => false, 'message' => 'Failed to write image to disk']);
    }

    if (!file_exists($absolutePath) || filesize($absolutePath) === 0) {
        respond(500, ['success' => false, 'message' => 'Image write verification failed']);
    }

    return $relativePath;
}
