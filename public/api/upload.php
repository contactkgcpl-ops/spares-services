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
$maxBytes = 5242880;

if ((int) $file['size'] > $maxBytes) {
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
$productTitle = trim((string) ($_POST['title'] ?? ''));
[$target, $relativePath] = buildUploadPathAndName((string) $file['name'], $allowed[$mime], $productTitle);

if (!move_uploaded_file($file['tmp_name'], $target)) {
    respond(500, ['success' => false, 'message' => 'Failed to save uploaded file']);
}

if (!file_exists($target) || (int) filesize($target) <= 0) {
    respond(500, ['success' => false, 'message' => 'Upload verification failed']);
}

respond(201, [
    'success' => true,
    'message' => 'File uploaded successfully',
    'data' => [
        'url' => publicUrlForPath($relativePath),
        'path' => '/' . $relativePath,
    ],
]);
