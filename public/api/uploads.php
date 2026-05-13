<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

$filename = trim((string) ($_GET['file'] ?? ''));
$filename = basename($filename);

if ($filename === '') {
    respond(400, ['success' => false, 'message' => 'File name is required']);
}

$uploadDir = rtrim((string) env('UPLOAD_PATH', 'C:/xampp/htdocs/spares-service/public/uploads'), '/\\');
$target = $uploadDir . DIRECTORY_SEPARATOR . $filename;

if (!is_file($target)) {
    respond(404, ['success' => false, 'message' => 'File not found']);
}

$mime = mime_content_type($target);
if (!is_string($mime) || $mime === '') {
    $mime = 'application/octet-stream';
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: ' . $mime);
header('Content-Length: ' . (string) filesize($target));
header('Cache-Control: public, max-age=31536000');

readfile($target);
exit;

