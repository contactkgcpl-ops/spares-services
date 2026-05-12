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

// FORCE ABSOLUTE XAMPP PATH - NO RELATIVE PATHS
$uploadDir = 'C:/xampp/htdocs/spares-service/public/uploads';
$uploadUrlPath = '/uploads';

// Debug logging
error_log("=== UPLOAD.PHP DEBUG START ===");
error_log("Target directory: " . $uploadDir);
error_log("Directory exists: " . (is_dir($uploadDir) ? "YES" : "NO"));
error_log("Directory writable: " . (is_writable($uploadDir) ? "YES" : "NO"));
error_log("Uploaded file info: " . print_r($file, true));

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

// Create directory if needed
if (!is_dir($uploadDir)) {
    error_log("Creating uploads directory...");
    mkdir($uploadDir, 0777, true);
    error_log("Directory created: " . $uploadDir);
}

// Generate slugified filename from product title if available
$productTitle = $_POST['title'] ?? '';
if ($productTitle) {
    // Simple slugification
    $baseName = strtolower($productTitle);
    $baseName = preg_replace('/[^a-z0-9]+/i', '_', $baseName);
    $baseName = trim($baseName, '_');
    $name = $baseName . '.' . $allowed[$mime];
    
    // Handle duplicates
    $counter = 1;
    while (file_exists($uploadDir . '/' . $name)) {
        $name = $baseName . '_' . $counter . '.' . $allowed[$mime];
        $counter++;
    }
} else {
    $name = uniqid('upload_', true) . '.' . $allowed[$mime];
}

$target = $uploadDir . '/' . $name;

error_log("Final filename: " . $name);
error_log("Target path: " . $target);
error_log("Attempting move_uploaded_file...");

// Move uploaded file to absolute path
$moveResult = move_uploaded_file($file['tmp_name'], $target);

error_log("Move result: " . ($moveResult ? "SUCCESS" : "FAILED"));

if (!$moveResult) {
    error_log("CRITICAL: Failed to move uploaded file");
    respond(500, ['success' => false, 'message' => 'Failed to save file to: ' . $target]);
}

// IMMEDIATE VERIFICATION - FILE MUST PHYSICALLY EXIST
if (!file_exists($target)) {
    error_log("CRITICAL: File does not exist after move: " . $target);
    respond(500, ['success' => false, 'message' => 'File was not created: ' . $target]);
}

// Verify file has actual content
$fileSize = filesize($target);
if ($fileSize === false || $fileSize === 0) {
    error_log("CRITICAL: File is empty or unreadable: " . $target);
    respond(500, ['success' => false, 'message' => 'File is empty or unreadable: ' . $target]);
}

error_log("SUCCESS: Physically saved file to: " . $target . " (" . $fileSize . " bytes)");
error_log("=== UPLOAD.PHP DEBUG END ===");

$url = publicUrlForPath($uploadUrlPath . '/' . $name);
$relativePath = $uploadUrlPath . '/' . $name;
respond(201, ['success' => true, 'message' => 'File uploaded successfully', 'data' => ['url' => $url, 'path' => $relativePath]]);
