<?php
declare(strict_types=1);

require_once __DIR__ . '/../helpers.php';
applyCors();

try {
    initDatabase();

    if (isset($_GET['reset_catalog']) && $_GET['reset_catalog'] === '1') {
        resetOfficialCatalog(db());
        respond(200, ['success' => true, 'message' => 'Database tables ready and pneumatic catalog reset completed']);
    }

    respond(200, ['success' => true, 'message' => 'Database tables ready']);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Database setup failed', 'error' => $error->getMessage()]);
}
