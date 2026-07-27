<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();

try {
    initDatabase();
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $id = idFromRequest('machine_subcategories');

    function getSubcategory(PDO $pdo, int $id): array|false {
        $stmt = $pdo->prepare('
            SELECT s.id, s.category_id, s.name, s.slug, s.created_at, c.name AS category_name
            FROM machine_subcategories s
            JOIN machine_categories c ON c.id = s.category_id
            WHERE s.id = ?
            LIMIT 1
        ');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    if ($method === 'GET' && $id === null) {
        $categoryId = isset($_GET['category_id']) ? (int) $_GET['category_id'] : null;
        $sql = '
            SELECT s.id, s.category_id, s.name, s.slug, s.created_at, c.name AS category_name
            FROM machine_subcategories s
            JOIN machine_categories c ON c.id = s.category_id
            WHERE (? IS NULL OR s.category_id = ?)
            ORDER BY c.name ASC, s.name ASC
        ';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$categoryId, $categoryId]);
        respond(200, ['success' => true, 'data' => $stmt->fetchAll()]);
    }

    if ($method === 'GET' && $id !== null) {
        $sub = getSubcategory($pdo, $id);
        if (!$sub) {
            respond(404, ['success' => false, 'message' => 'Subcategory not found']);
        }
        respond(200, ['success' => true, 'data' => $sub]);
    }

    if (in_array($method, ['POST', 'PUT', 'DELETE'], true)) {
        requireAdmin();
    }

    if ($method === 'POST') {
        $body = readJsonBody();
        $categoryId = (int) ($body['category_id'] ?? 0);
        $name = requireText($body, 'name');
        $slug = trim((string) ($body['slug'] ?? slugify($name)), '_');

        if (!$categoryId) {
            respond(400, ['success' => false, 'message' => 'Valid category_id is required']);
        }

        $stmt = $pdo->prepare('INSERT INTO machine_subcategories (category_id, name, slug) VALUES (?, ?, ?)');
        $stmt->execute([$categoryId, $name, $slug]);
        $newId = (int) $pdo->lastInsertId();

        respond(201, ['success' => true, 'message' => 'Subcategory created successfully', 'data' => getSubcategory($pdo, $newId)]);
    }

    if ($method === 'PUT' && $id !== null) {
        $body = readJsonBody();
        $categoryId = (int) ($body['category_id'] ?? 0);
        $name = requireText($body, 'name');
        $slug = trim((string) ($body['slug'] ?? slugify($name)), '_');

        if (!$categoryId) {
            respond(400, ['success' => false, 'message' => 'Valid category_id is required']);
        }

        $stmt = $pdo->prepare('UPDATE machine_subcategories SET category_id = ?, name = ?, slug = ? WHERE id = ?');
        $stmt->execute([$categoryId, $name, $slug, $id]);

        $sub = getSubcategory($pdo, $id);
        if (!$sub) {
            respond(404, ['success' => false, 'message' => 'Subcategory not found']);
        }
        respond(200, ['success' => true, 'message' => 'Subcategory updated successfully', 'data' => $sub]);
    }

    if ($method === 'DELETE' && $id !== null) {
        $stmt = $pdo->prepare('UPDATE machine_machines SET subcategory_id = NULL WHERE subcategory_id = ?');
        $stmt->execute([$id]);

        $stmt = $pdo->prepare('DELETE FROM machine_subcategories WHERE id = ?');
        $stmt->execute([$id]);
        respond(200, ['success' => true, 'message' => 'Subcategory deleted successfully']);
    }

    respond(405, ['success' => false, 'message' => 'Method not allowed']);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Server error', 'error' => $error->getMessage()]);
}
