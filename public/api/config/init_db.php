<?php
declare(strict_types=1);

require_once __DIR__ . '/../helpers.php';
applyCors();

try {
    initDatabase();
    respond(200, ['success' => true, 'message' => 'Database tables ready']);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Database setup failed', 'error' => $error->getMessage()]);
}
