declare(strict_types=1);

require_once __DIR__ . '/config.php';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = env('DB_HOST', 'localhost');
    $port = env('DB_PORT', '3306');
    $dbname = env('DB_NAME', 'spares_service');
    $user = env('DB_USER', 'root');
    $pass = env('DB_PASSWORD', '');
    
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
}

function applyCors(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Cache-Control: post-check=0, pre-check=0', false);
    header('Pragma: no-cache');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
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

    $count = (int) $pdo->query('SELECT COUNT(*) FROM products')->fetchColumn();
    if ($count === 0) {
        $stmt = $pdo->prepare(
            'INSERT INTO products (title, category, image, description, features, specifications, slug)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            'High-Flow Centrifugal Pump',
            'Pump Systems',
            'https://images.unsplash.com/photo-1581092921461-eab10380fef2?q=80&w=1200&auto=format&fit=crop',
            'High-throughput industrial pump designed for stable pressure and continuous operation.',
            json_encode(['High flow rate', 'Low vibration', 'Corrosion-resistant body']),
            json_encode(['Flow Rate: 180 L/min', 'Power: 4.0 kW', 'Material: SS316']),
            'high-flow-centrifugal-pump',
        ]);
        $stmt->execute([
            'Precision Control Valve',
            'Valves',
            'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1200&auto=format&fit=crop',
            'Precision valve for fine flow control in high-demand industrial process lines.',
            json_encode(['Low pressure drop', 'PTFE sealing', 'Compact build']),
            json_encode(['Type: Globe valve', 'Diameter: 40 mm', 'Pressure Class: PN16']),
            'precision-control-valve',
        ]);
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

    // Ensure image is a full URL for the frontend
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
    $uploadUrl = env('UPLOAD_URL');
    if ($uploadUrl) {
        $name = basename($relativePath);
        return rtrim($uploadUrl, '/') . '/' . $name;
    }

    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? '';
    
    // Dynamically determine the base path to the public folder
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
    $basePath = str_replace('/api', '', dirname($scriptName));
    $basePath = rtrim($basePath, '/\\');
    $relativePath = '/' . ltrim($relativePath, '/\\');
    
    return $host ? "{$scheme}://{$host}{$basePath}{$relativePath}" : $relativePath;
}

function slugify(string $text): string
{
    // Convert to lowercase
    $text = strtolower($text);
    // Replace spaces and special characters with underscore
    $text = preg_replace('/[^a-z0-9]+/i', '_', $text);
    // Trim underscores from ends
    return trim($text, '_');
}

function saveBase64ImageIfNeeded(string $image, string $suggestedName = ''): string
{
    // If it's already an absolute URL, check if it's from our own uploads folder
    if (str_starts_with($image, 'http')) {
        $uploadUrlPath = '/uploads/';
        $pos = strpos($image, $uploadUrlPath);
        if ($pos !== false) {
            // Return only the relative part: uploads/filename.jpg
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
    
    // Use path from env with fallback to local path
    $uploadDir = env('UPLOAD_PATH', 'C:/xampp/htdocs/spares-service/public/uploads');
    
    // Comprehensive debugging
    error_log("=== IMAGE UPLOAD DEBUG START ===");
    error_log("Target directory: " . $uploadDir);
    error_log("Directory exists: " . (is_dir($uploadDir) ? "YES" : "NO"));
    error_log("Directory writable: " . (is_writable($uploadDir) ? "YES" : "NO"));
    error_log("Current working dir: " . getcwd());
    error_log("Script location: " . __FILE__);
    
    // Create directory if needed
    if (!is_dir($uploadDir)) {
        error_log("Creating uploads directory...");
        if (!mkdir($uploadDir, 0777, true)) {
            error_log("FAILED to create directory: " . $uploadDir);
            respond(500, ['success' => false, 'message' => 'Failed to create uploads directory at: ' . $uploadDir]);
        }
        error_log("Directory created successfully");
    }

    if (!is_writable($uploadDir)) {
        error_log("DIRECTORY NOT WRITABLE: " . $uploadDir);
        respond(500, ['success' => false, 'message' => 'Uploads directory is not writable: ' . $uploadDir]);
    }

    $extension = strtolower($matches[1]) === 'jpeg' ? 'jpg' : strtolower($matches[1]);
    $binary = base64_decode($matches[2], true);
    if ($binary === false || strlen($binary) > $maxBytes) {
        error_log("Invalid image data or too large");
        respond(400, ['success' => false, 'message' => 'Image is invalid or too large']);
    }

    // Create slugified filename from product title
    $baseName = $suggestedName ? slugify($suggestedName) : uniqid('product_', true);
    $name = $baseName . ".{$extension}";
    
    // Handle duplicate filenames
    $counter = 1;
    while (file_exists($uploadDir . '/' . $name)) {
        $name = $baseName . '_' . $counter . ".{$extension}";
        $counter++;
    }

    // Use ABSOLUTE path for ALL file operations
    $absolutePath = $uploadDir . '/' . $name;
    
    error_log("Final absolute path: " . $absolutePath);
    error_log("Generated filename: " . $name);
    error_log("Binary data size: " . strlen($binary) . " bytes");
    
    // ATTEMPT FILE WRITE WITH ABSOLUTE PATH
    error_log("Attempting file_put_contents...");
    $bytesWritten = file_put_contents($absolutePath, $binary);
    
    error_log("file_put_contents result: " . ($bytesWritten === false ? "FALSE" : $bytesWritten . " bytes"));
    
    if ($bytesWritten === false) {
        error_log("FILE WRITE FAILED - Checking error...");
        $error = error_get_last();
        error_log("PHP Error: " . ($error ? $error['message'] : 'No error info'));
        respond(500, ['success' => false, 'message' => 'Failed to write image to disk at: ' . $absolutePath]);
    }
    
    // IMMEDIATE VERIFICATION - FILE MUST PHYSICALLY EXIST
    error_log("Verifying file existence...");
    $fileExists = file_exists($absolutePath);
    error_log("File exists after write: " . ($fileExists ? "YES" : "NO"));
    
    if (!$fileExists) {
        error_log("CRITICAL: File does not exist after write attempt");
        respond(500, ['success' => false, 'message' => 'File was not created: ' . $absolutePath]);
    }
    
    // Verify file has actual content
    $actualSize = filesize($absolutePath);
    error_log("File size check: " . ($actualSize === false ? "FALSE" : $actualSize . " bytes"));
    
    if ($actualSize === false || $actualSize === 0) {
        error_log("CRITICAL: File is empty or unreadable");
        respond(500, ['success' => false, 'message' => 'File is empty or unreadable: ' . $absolutePath]);
    }
    
    error_log("SUCCESS: Image physically saved to: " . $absolutePath . " (" . $actualSize . " bytes)");
    error_log("=== IMAGE UPLOAD DEBUG END ===");

    // Return relative path for database storage
    return 'uploads/' . $name;
}
