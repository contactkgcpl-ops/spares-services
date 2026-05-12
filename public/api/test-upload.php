<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

echo "Testing image upload functionality...\n\n";

// Test 1: Check uploads directory
$uploadDir = __DIR__ . '/../uploads';
echo "Upload directory: " . $uploadDir . "\n";
echo "Directory exists: " . (is_dir($uploadDir) ? "YES" : "NO") . "\n";
echo "Directory is writable: " . (is_writable($uploadDir) ? "YES" : "NO") . "\n";
echo "Directory permissions: " . substr(sprintf('%o', fileperms($uploadDir)), -4) . "\n\n";

// Test 2: Create a simple test image
$testImageData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='; // 1x1 red pixel
$testFilename = 'test_image_' . date('Y-m-d_H-i-s') . '.png';

$testPath = $uploadDir . '/' . $testFilename;
echo "Test file path: " . $testPath . "\n";

// Test file_put_contents directly
$binary = base64_decode($testImageData);
$bytesWritten = file_put_contents($testPath, $binary);

echo "Bytes written: " . ($bytesWritten === false ? "FALSE" : $bytesWritten) . "\n";
echo "File exists after write: " . (file_exists($testPath) ? "YES" : "NO") . "\n";

if (file_exists($testPath)) {
    $fileSize = filesize($testPath);
    echo "File size: " . ($fileSize === false ? "FALSE" : $fileSize) . " bytes\n";
    echo "File is readable: " . (is_readable($testPath) ? "YES" : "NO") . "\n";
    
    // Clean up test file
    unlink($testPath);
    echo "Test file cleaned up.\n";
}

echo "\nUpload functionality test completed.\n";
