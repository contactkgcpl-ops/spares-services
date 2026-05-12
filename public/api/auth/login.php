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

$adminEmail = env('ADMIN_EMAIL', 'info.salvinindustries@gmail.com');
$adminPass = env('ADMIN_PASSWORD', 'admin123');

if ($email !== $adminEmail || $password !== $adminPass) {
    respond(401, ['success' => false, 'message' => 'Invalid credentials']);
}

respond(200, [
    'success' => true,
    'message' => 'Login successful',
    'token' => createToken($email),
    'data' => ['email' => $email],
]);
