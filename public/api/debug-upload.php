<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

// Enable all error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

echo "=== COMPREHENSIVE UPLOAD DEBUG ===\n\n";

// 1. Verify runtime project
echo "1. PROJECT VERIFICATION:\n";
echo "Current working directory: " . getcwd() . "\n";
echo "Script location: " . __FILE__ . "\n";
echo "Document root: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'NOT SET') . "\n";

// 2. Test configured upload path
$absoluteUploadDir = uploadDirectory();
echo "\n2. ABSOLUTE PATH TEST:\n";
echo "Target upload directory: " . $absoluteUploadDir . "\n";
echo "Directory exists: " . (is_dir($absoluteUploadDir) ? "YES" : "NO") . "\n";
echo "Directory writable: " . (is_writable($absoluteUploadDir) ? "YES" : "NO") . "\n";

// 3. Create directory if needed
if (!is_dir($absoluteUploadDir)) {
    echo "Creating directory...\n";
    $created = mkdir($absoluteUploadDir, 0777, true);
    echo "Directory created: " . ($created ? "YES" : "NO") . "\n";
}

// 4. Test with simple file write
echo "\n3. SIMPLE FILE WRITE TEST:\n";
$testFile = $absoluteUploadDir . '/debug_test_' . date('Y-m-d_H-i-s') . '.txt';
$testContent = "Test file created at " . date('Y-m-d H:i:s') . "\nThis proves file writing works.";

echo "Test file path: " . $testFile . "\n";
$bytesWritten = file_put_contents($testFile, $testContent);
echo "Bytes written: " . ($bytesWritten === false ? "FALSE" : $bytesWritten) . "\n";

// 5. Verification
echo "\n4. FILE VERIFICATION:\n";
echo "File exists after write: " . (file_exists($testFile) ? "YES" : "NO") . "\n";
if (file_exists($testFile)) {
    $fileSize = filesize($testFile);
    echo "File size: " . ($fileSize === false ? "FALSE" : $fileSize) . " bytes\n";
    echo "File readable: " . (is_readable($testFile) ? "YES" : "NO") . "\n";
    
    // Read back content
    $readContent = file_get_contents($testFile);
    echo "Content matches: " . ($readContent === $testContent ? "YES" : "NO") . "\n";
}

// 6. Test with actual image data
echo "\n5. IMAGE WRITE TEST:\n";
$imageData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='; // 1x1 red pixel
$imageBinary = base64_decode($imageData);
$imageFile = $absoluteUploadDir . '/test_image_' . date('Y-m-d_H-i-s') . '.png';

echo "Image file path: " . $imageFile . "\n";
echo "Binary data size: " . strlen($imageBinary) . " bytes\n";

$imageBytesWritten = file_put_contents($imageFile, $imageBinary);
echo "Image bytes written: " . ($imageBytesWritten === false ? "FALSE" : $imageBytesWritten) . "\n";

echo "\n6. IMAGE VERIFICATION:\n";
echo "Image file exists: " . (file_exists($imageFile) ? "YES" : "NO") . "\n";
if (file_exists($imageFile)) {
    $imageFileSize = filesize($imageFile);
    echo "Image file size: " . ($imageFileSize === false ? "FALSE" : $imageFileSize) . " bytes\n";
    echo "Image file readable: " . (is_readable($imageFile) ? "YES" : "NO") . "\n";
}

// 7. Directory listing
echo "\n7. UPLOADS DIRECTORY LISTING:\n";
if (is_dir($absoluteUploadDir)) {
    $files = scandir($absoluteUploadDir);
    if ($files !== false) {
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $filePath = $absoluteUploadDir . '/' . $file;
                $size = filesize($filePath);
                echo "- " . $file . " (" . ($size === false ? 'unknown' : $size) . " bytes)\n";
            }
        }
    }
} else {
    echo "Directory does not exist!\n";
}

echo "\n=== DEBUG COMPLETE ===\n";
echo "Check this file and the uploads directory for results.\n";
