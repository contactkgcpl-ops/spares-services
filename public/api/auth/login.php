<?php
declare(strict_types=1);

require_once __DIR__ . '/../helpers.php';
applyCors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Method not allowed']);
}

$body = readJsonBody();
$email = trim((string) ($body['email'] ?? ''));
$password = (string) ($body['password'] ?? '');

if ($email === '' || $password === '') {
    respond(400, ['success' => false, 'message' => 'Email and password are required']);
}

try {
    initDatabase();
    $stmt = db()->prepare('SELECT id, email, password_hash, full_name, is_active FROM admins WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $admin = $stmt->fetch();

    if (!$admin || (int) $admin['is_active'] !== 1 || !password_verify($password, (string) $admin['password_hash'])) {
        respond(401, ['success' => false, 'message' => 'Invalid credentials']);
    }
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Login failed', 'error' => $error->getMessage()]);
}

respond(200, [
    'success' => true,
    'message' => 'Login successful',
    'token' => createToken((string) $admin['email']),
    'data' => [
        'id' => (int) $admin['id'],
        'email' => (string) $admin['email'],
        'fullName' => (string) ($admin['full_name'] ?? ''),
    ],
]);
