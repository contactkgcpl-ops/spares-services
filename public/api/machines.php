<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();

try {
    initDatabase();
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $id = idFromRequest('machines');

    function machineSelectSql(): string
    {
        return '
            SELECT
                m.id,
                m.machine_name,
                m.slug,
                m.description,
                m.image_url,
                m.meta_title,
                m.meta_description,
                m.specifications,
                m.created_at,
                m.updated_at,
                c.id AS category_db_id,
                c.name AS category_name,
                s.id AS subcategory_db_id,
                s.name AS subcategory_name
            FROM machine_machines m
            JOIN machine_categories c ON c.id = m.category_id
            LEFT JOIN machine_subcategories s ON s.id = m.subcategory_id
        ';
    }

    function normalizeMachineRow(array $row): array
    {
        $row['id'] = (int) $row['id'];
        $row['machine_id'] = (int) $row['id'];
        $row['category_db_id'] = (int) ($row['category_db_id'] ?? 0);
        $row['subcategory_db_id'] = $row['subcategory_db_id'] ? (int) $row['subcategory_db_id'] : null;
        $row['specifications'] = json_decode($row['specifications'] ?: '[]', true) ?: [];
        $row['tags'] = array_values(array_filter([$row['category_name'] ?? '', $row['subcategory_name'] ?? '']));
        $row['status'] = 'active';

        if (!empty($row['image_url']) && !str_starts_with($row['image_url'], 'http')) {
            $row['image'] = publicUrlForPath($row['image_url']);
        } else {
            $row['image'] = $row['image_url'] ?? '';
        }

        return $row;
    }

    if ($method === 'GET') {
        $identifier = trim((string) ($_GET['slug'] ?? $_GET['id'] ?? ''));

        if ($identifier !== '' && !isset($_GET['all'])) {
            if (ctype_digit($identifier)) {
                $stmt = $pdo->prepare(machineSelectSql() . ' WHERE m.id = ? LIMIT 1');
                $stmt->execute([(int) $identifier]);
            } else {
                $stmt = $pdo->prepare(machineSelectSql() . ' WHERE m.slug = ? OR LOWER(REPLACE(m.machine_name, " ", "-")) = ? LIMIT 1');
                $stmt->execute([$identifier, strtolower($identifier)]);
            }

            $row = $stmt->fetch();
            if ($row) {
                respond(200, ['success' => true, 'data' => normalizeMachineRow($row)]);
            } else {
                respond(404, ['success' => false, 'message' => 'Machine not found']);
            }
        }

        $stmt = $pdo->query(machineSelectSql() . ' ORDER BY m.created_at DESC');
        $rows = array_map('normalizeMachineRow', $stmt->fetchAll());
        respond(200, ['success' => true, 'count' => count($rows), 'data' => $rows]);
    }

    if (in_array($method, ['POST', 'PUT', 'DELETE'], true)) {
        requireAdmin();
    }

    if ($method === 'POST') {
        $body = readJsonBody();
        $machineName = requireText($body, 'machine_name');
        $description = requireText($body, 'description');
        $categoryId = (int) ($body['category_id'] ?? 0);
        $subcategoryId = isset($body['subcategory_id']) && $body['subcategory_id'] !== '' ? (int) $body['subcategory_id'] : null;
        $image = saveBase64ImageIfNeeded(requireText($body, 'image_url'), $machineName);
        $slug = trim((string) ($body['slug'] ?? slugify($machineName)), '_');

        if (!$categoryId) {
            respond(400, ['success' => false, 'message' => 'Valid category_id is required']);
        }

        $stmt = $pdo->prepare('
            INSERT INTO machine_machines
                (machine_name, slug, description, image_url, meta_title, meta_description, category_id, subcategory_id, specifications)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $machineName,
            $slug,
            $description,
            $image,
            trim((string) ($body['meta_title'] ?? $machineName)),
            trim((string) ($body['meta_description'] ?? $description)),
            $categoryId,
            $subcategoryId,
            json_encode(toArrayValue($body['specifications'] ?? []))
        ]);

        $newId = (int) $pdo->lastInsertId();
        $stmt = $pdo->prepare(machineSelectSql() . ' WHERE m.id = ? LIMIT 1');
        $stmt->execute([$newId]);
        respond(201, ['success' => true, 'message' => 'Machine created successfully', 'data' => normalizeMachineRow($stmt->fetch())]);
    }

    if ($method === 'PUT' && $id !== null) {
        $body = readJsonBody();
        $machineName = requireText($body, 'machine_name');
        $description = requireText($body, 'description');
        $categoryId = (int) ($body['category_id'] ?? 0);
        $subcategoryId = isset($body['subcategory_id']) && $body['subcategory_id'] !== '' ? (int) $body['subcategory_id'] : null;
        $image = saveBase64ImageIfNeeded(requireText($body, 'image_url'), $machineName);
        $slug = trim((string) ($body['slug'] ?? slugify($machineName)), '_');

        if (!$categoryId) {
            respond(400, ['success' => false, 'message' => 'Valid category_id is required']);
        }

        $stmt = $pdo->prepare('
            UPDATE machine_machines SET
                machine_name = ?, slug = ?, description = ?, image_url = ?, meta_title = ?,
                meta_description = ?, category_id = ?, subcategory_id = ?, specifications = ?
            WHERE id = ?
        ');
        $stmt->execute([
            $machineName,
            $slug,
            $description,
            $image,
            trim((string) ($body['meta_title'] ?? $machineName)),
            trim((string) ($body['meta_description'] ?? $description)),
            $categoryId,
            $subcategoryId,
            json_encode(toArrayValue($body['specifications'] ?? [])),
            $id
        ]);

        $stmt = $pdo->prepare(machineSelectSql() . ' WHERE m.id = ? LIMIT 1');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            respond(404, ['success' => false, 'message' => 'Machine not found']);
        }
        respond(200, ['success' => true, 'message' => 'Machine updated successfully', 'data' => normalizeMachineRow($row)]);
    }

    if ($method === 'DELETE' && $id !== null) {
        $stmt = $pdo->prepare('SELECT * FROM machine_machines WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            respond(404, ['success' => false, 'message' => 'Machine not found']);
        }

        $delete = $pdo->prepare('DELETE FROM machine_machines WHERE id = ?');
        $delete->execute([$id]);
        respond(200, ['success' => true, 'message' => 'Machine deleted successfully']);
    }

    respond(405, ['success' => false, 'message' => 'Method not allowed']);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Server error', 'error' => $error->getMessage()]);
}
