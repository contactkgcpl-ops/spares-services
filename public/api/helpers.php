<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = getenv('DB_HOST') ?: DB_HOST;
    $name = getenv('DB_NAME') ?: DB_NAME;
    $user = getenv('DB_USER') ?: DB_USER;
    $pass = getenv('DB_PASS') ?: DB_PASS;
    $charset = getenv('DB_CHARSET') ?: DB_CHARSET;

    $pdo = new PDO("mysql:host={$host};dbname={$name};charset={$charset}", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function applyCors(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: ' . (getenv('ALLOWED_ORIGIN') ?: ALLOWED_ORIGIN));
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

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
    $header = base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64UrlEncode(json_encode([
        'email' => $email,
        'iat' => time(),
        'exp' => time() + 86400,
    ]));
    $signature = base64UrlEncode(hash_hmac('sha256', "{$header}.{$payload}", getenv('AUTH_SECRET') ?: AUTH_SECRET, true));

    return "{$header}.{$payload}.{$signature}";
}

function requireAdmin(): void
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/Bearer\s+(.+)/i', $header, $matches)) {
        respond(401, ['success' => false, 'message' => 'Unauthorized']);
    }

    $parts = explode('.', $matches[1]);
    if (count($parts) !== 3) {
        respond(401, ['success' => false, 'message' => 'Invalid token']);
    }

    [$headerPart, $payloadPart, $signaturePart] = $parts;
    $expected = base64UrlEncode(hash_hmac('sha256', "{$headerPart}.{$payloadPart}", getenv('AUTH_SECRET') ?: AUTH_SECRET, true));
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
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? '';
    return $host ? "{$scheme}://{$host}{$relativePath}" : $relativePath;
}

function saveBase64ImageIfNeeded(string $image): string
{
    if (!str_starts_with($image, 'data:image/')) {
        return $image;
    }

    if (!preg_match('/^data:image\/(png|jpe?g|webp);base64,(.+)$/i', $image, $matches)) {
        respond(400, ['success' => false, 'message' => 'Invalid image data']);
    }

    $extension = strtolower($matches[1]) === 'jpeg' ? 'jpg' : strtolower($matches[1]);
    $binary = base64_decode($matches[2], true);
    if ($binary === false || strlen($binary) > MAX_UPLOAD_BYTES) {
        respond(400, ['success' => false, 'message' => 'Image is invalid or too large']);
    }

    if (!is_dir(UPLOAD_DIR)) {
        mkdir(UPLOAD_DIR, 0755, true);
    }

    $name = uniqid('product_', true) . ".{$extension}";
    $path = UPLOAD_DIR . '/' . $name;
    file_put_contents($path, $binary);

    return publicUrlForPath(UPLOAD_URL_PATH . '/' . $name);
}
