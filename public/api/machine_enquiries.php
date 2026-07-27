<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();

try {
    initDatabase();
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $id = idFromRequest('machine_enquiries');

    if ($method === 'GET') {
        requireAdmin();
        if ($id !== null) {
            $stmt = $pdo->prepare('SELECT * FROM machine_enquiries WHERE id = ?');
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if (!$row) {
                respond(404, ['success' => false, 'message' => 'Machine inquiry not found']);
            }
            respond(200, ['success' => true, 'data' => $row]);
        }

        $stmt = $pdo->query('SELECT * FROM machine_enquiries ORDER BY created_at DESC, id DESC');
        respond(200, ['success' => true, 'data' => $stmt->fetchAll()]);
    }

    if ($method === 'POST') {
        $body = readJsonBody();
        $fullName = requireText($body, 'fullName');
        $email = requireText($body, 'email');
        $subject = requireText($body, 'subject');
        $message = requireText($body, 'message');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(400, ['success' => false, 'message' => 'Invalid email address']);
        }

        $stmt = $pdo->prepare(
            'INSERT INTO machine_enquiries (full_name, company_name, email, phone, subject, message)
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

        respond(201, ['success' => true, 'message' => 'Machine inquiry submitted successfully', 'data' => ['id' => (int) $pdo->lastInsertId()]]);
    }

    respond(405, ['success' => false, 'message' => 'Method not allowed']);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Failed to process machine inquiry', 'error' => $error->getMessage()]);
}
