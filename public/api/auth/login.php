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

$adminEmail = 'info.salvinindustries@gmail.com';
$hash = '$2y$10$Vp7L6R3W/P2vDLXkpPX20eswoOfTTHq6JBsz1kp4zYkAYdkDtUKo2'; // 'admin123'

if ($email !== $adminEmail || !password_verify($password, $hash)) {
    respond(401, ['success' => false, 'message' => 'Invalid credentials']);
}

respond(200, [
    'success' => true,
    'message' => 'Login successful',
    'token' => createToken($email),
    'data' => ['email' => $email],
]);
