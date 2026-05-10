<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();
requireAdmin();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Method not allowed']);
}

if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
    respond(400, ['success' => false, 'message' => 'No file uploaded']);
}

$file = $_FILES['file'];
if ((int) $file['size'] > MAX_UPLOAD_BYTES) {
    respond(400, ['success' => false, 'message' => 'File too large']);
}

$mime = mime_content_type($file['tmp_name']);
$allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'application/pdf' => 'pdf',
];

if (!isset($allowed[$mime])) {
    respond(400, ['success' => false, 'message' => 'Unsupported file type']);
}

if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

$name = uniqid('upload_', true) . '.' . $allowed[$mime];
$target = UPLOAD_DIR . '/' . $name;

if (!move_uploaded_file($file['tmp_name'], $target)) {
    respond(500, ['success' => false, 'message' => 'Failed to save file']);
}

$url = publicUrlForPath(UPLOAD_URL_PATH . '/' . $name);
respond(201, ['success' => true, 'message' => 'File uploaded successfully', 'data' => ['url' => $url, 'path' => UPLOAD_URL_PATH . '/' . $name]]);
