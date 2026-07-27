<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();

try {
    initDatabase();
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $id = idFromRequest('machine_categories');

    if ($method === 'GET' && $id === null) {
        $stmt = $pdo->query('SELECT id, name, slug, created_at FROM machine_categories ORDER BY name ASC');
        $categories = $stmt->fetchAll();
        respond(200, ['success' => true, 'data' => $categories]);
    }

    if ($method === 'GET' && $id !== null) {
        $stmt = $pdo->prepare('SELECT id, name, slug, created_at FROM machine_categories WHERE id = ?');
        $stmt->execute([$id]);
        $category = $stmt->fetch();
        if (!$category) {
            respond(404, ['success' => false, 'message' => 'Machine category not found']);
        }
        respond(200, ['success' => true, 'data' => $category]);
    }

    if (in_array($method, ['POST', 'PUT', 'DELETE'], true)) {
        requireAdmin();
    }

    if ($method === 'POST') {
        $body = readJsonBody();
        $name = requireText($body, 'name');
        $slug = trim((string) ($body['slug'] ?? slugify($name)), '_');

        $stmt = $pdo->prepare('INSERT INTO machine_categories (name, slug) VALUES (?, ?)');
        $stmt->execute([$name, $slug]);
        $newId = (int) $pdo->lastInsertId();

        $stmt = $pdo->prepare('SELECT id, name, slug, created_at FROM machine_categories WHERE id = ?');
        $stmt->execute([$newId]);
        respond(201, ['success' => true, 'message' => 'Machine category created successfully', 'data' => $stmt->fetch()]);
    }

    if ($method === 'PUT' && $id !== null) {
        $body = readJsonBody();
        $name = requireText($body, 'name');
        $slug = trim((string) ($body['slug'] ?? slugify($name)), '_');

        $stmt = $pdo->prepare('UPDATE machine_categories SET name = ?, slug = ? WHERE id = ?');
        $stmt->execute([$name, $slug, $id]);

        $stmt = $pdo->prepare('SELECT id, name, slug, created_at FROM machine_categories WHERE id = ?');
        $stmt->execute([$id]);
        $category = $stmt->fetch();
        if (!$category) {
            respond(404, ['success' => false, 'message' => 'Machine category not found']);
        }
        respond(200, ['success' => true, 'message' => 'Machine category updated successfully', 'data' => $category]);
    }

    if ($method === 'DELETE' && $id !== null) {
        $stmt = $pdo->prepare('SELECT COUNT(*) AS count FROM machine_machines WHERE category_id = ?');
        $stmt->execute([$id]);
        if ((int) $stmt->fetch()['count'] > 0) {
            respond(409, ['success' => false, 'message' => 'Move or delete machines in this category first before deleting category.']);
        }

        $stmt = $pdo->prepare('DELETE FROM machine_subcategories WHERE category_id = ?');
        $stmt->execute([$id]);

        $stmt = $pdo->prepare('DELETE FROM machine_categories WHERE id = ?');
        $stmt->execute([$id]);
        respond(200, ['success' => true, 'message' => 'Machine category deleted successfully']);
    }

    respond(405, ['success' => false, 'message' => 'Method not allowed']);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Server error', 'error' => $error->getMessage()]);
}
