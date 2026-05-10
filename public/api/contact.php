<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Method not allowed']);
}

try {
    initDatabase();
    $body = readJsonBody();
    $fullName = requireText($body, 'fullName');
    $email = requireText($body, 'email');
    $subject = requireText($body, 'subject');
    $message = requireText($body, 'message');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(400, ['success' => false, 'message' => 'Invalid email']);
    }

    $stmt = db()->prepare(
        'INSERT INTO enquiries (full_name, company_name, email, phone, subject, message)
         VALUES (:full_name, :company_name, :email, :phone, :subject, :message)'
    );
    $stmt->execute([
        ':full_name' => $fullName,
        ':company_name' => trim((string) ($body['companyName'] ?? '')),
        ':email' => $email,
        ':phone' => trim((string) ($body['phone'] ?? '')),
        ':subject' => $subject,
        ':message' => $message,
    ]);

    respond(201, ['success' => true, 'message' => 'Inquiry submitted successfully', 'data' => ['id' => (int) db()->lastInsertId()]]);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Failed to submit inquiry', 'error' => $error->getMessage()]);
}
