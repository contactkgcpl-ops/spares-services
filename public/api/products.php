<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();

try {
    initDatabase();
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $id = idFromRequest('products');

    if ($method === 'GET' && $id === null) {
        $stmt = $pdo->query('SELECT * FROM products ORDER BY created_at DESC, id DESC');
        $products = array_map('productFromRow', $stmt->fetchAll());
        respond(200, ['success' => true, 'count' => count($products), 'data' => $products]);
    }

    if ($method === 'GET' && $id !== null) {
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        if (!$product) {
            respond(404, ['success' => false, 'message' => 'Product not found']);
        }
        respond(200, ['success' => true, 'data' => productFromRow($product)]);
    }

    if (in_array($method, ['POST', 'PUT', 'DELETE'], true)) {
        requireAdmin();
    }

    if ($method === 'POST') {
        $body = readJsonBody();
        $title = requireText($body, 'title');
        $category = requireText($body, 'category');
        $image = saveBase64ImageIfNeeded(requireText($body, 'image'), $title);
        $description = requireText($body, 'description');
        $slug = trim((string) ($body['slug'] ?? slugify($title)), '_');

        $stmt = $pdo->prepare(
            'INSERT INTO products (title, category, image, description, features, specifications, slug)
             VALUES (:title, :category, :image, :description, :features, :specifications, :slug)'
        );
        $stmt->execute([
            ':title' => $title,
            ':category' => $category,
            ':image' => $image,
            ':description' => $description,
            ':features' => json_encode(toArrayValue($body['features'] ?? [])),
            ':specifications' => json_encode(toArrayValue($body['specifications'] ?? [])),
            ':slug' => $slug,
        ]);

        $newId = (int) $pdo->lastInsertId();
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$newId]);
        respond(201, ['success' => true, 'message' => 'Product created successfully', 'data' => productFromRow($stmt->fetch())]);
    }

    if ($method === 'PUT' && $id !== null) {
        $body = readJsonBody();
        $title = requireText($body, 'title');
        $category = requireText($body, 'category');
        $image = saveBase64ImageIfNeeded(requireText($body, 'image'), $title);
        $description = requireText($body, 'description');
        $slug = trim((string) ($body['slug'] ?? slugify($title)), '_');

        $stmt = $pdo->prepare(
            'UPDATE products
             SET title = :title, category = :category, image = :image, description = :description,
                 features = :features, specifications = :specifications, slug = :slug
             WHERE id = :id'
        );
        $stmt->execute([
            ':id' => $id,
            ':title' => $title,
            ':category' => $category,
            ':image' => $image,
            ':description' => $description,
            ':features' => json_encode(toArrayValue($body['features'] ?? [])),
            ':specifications' => json_encode(toArrayValue($body['specifications'] ?? [])),
            ':slug' => $slug,
        ]);

        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        if (!$product) {
            respond(404, ['success' => false, 'message' => 'Product not found']);
        }
        respond(200, ['success' => true, 'message' => 'Product updated successfully', 'data' => productFromRow($product)]);
    }

    if ($method === 'DELETE' && $id !== null) {
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        if (!$product) {
            respond(404, ['success' => false, 'message' => 'Product not found']);
        }

        $delete = $pdo->prepare('DELETE FROM products WHERE id = ?');
        $delete->execute([$id]);
        respond(200, ['success' => true, 'message' => 'Product deleted successfully', 'data' => productFromRow($product)]);
    }

    respond(405, ['success' => false, 'message' => 'Method not allowed']);
} catch (PDOException $error) {
    $message = $error->getCode() === '23000' ? 'Product slug must be unique' : 'Database error';
    respond(500, ['success' => false, 'message' => $message, 'error' => $error->getMessage()]);
} catch (Throwable $error) {
    respond(500, ['success' => false, 'message' => 'Server error', 'error' => $error->getMessage()]);
}
