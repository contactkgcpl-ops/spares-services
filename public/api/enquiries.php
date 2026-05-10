<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();
requireAdmin();

try {
    initDatabase();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $id = idFromRequest('enquiries');

    if ($method === 'GET' && $id === null) {
        $stmt = db()->query('SELECT * FROM enquiries ORDER BY created_at DESC, id DESC');
        respond(200, ['success' => true, 'data' => $stmt->fetchAll()]);
    }

    if ($method === 'GET' && $id !== null) {
        $stmt = db()->prepare('SELECT * FROM enquiries WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            respond(404, ['success' => false, 'message' => 'Inquiry not found']);
        }
        respond(200, ['success' => true, 'data' => $row]);
    }

    respond(405, ['success' => false, 'message' => 'Method not allowed']);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Failed to fetch enquiries', 'error' => $error->getMessage()]);
}
