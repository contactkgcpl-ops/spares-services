<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

// Set XML Header
header('Content-Type: application/xml; charset=utf-8');

$baseUrl = rtrim((string) env('ALLOWED_ORIGIN', 'https://kmgmachineries.in'), '/');

$urls = [];
$addedLocs = [];

// Helper to add unique URLs
$addUrl = function (string $loc, string $lastmod, string $changefreq = 'weekly', string $priority = '0.8') use (&$urls, &$addedLocs) {
    if (isset($addedLocs[$loc])) return;
    $addedLocs[$loc] = true;
    $urls[] = [
        'loc' => $loc,
        'lastmod' => $lastmod,
        'changefreq' => $changefreq,
        'priority' => $priority
    ];
};

// 1. Core Static Pages
$today = date('Y-m-d');
$addUrl("{$baseUrl}/spares-service/home", $today, 'daily', '1.0');
$addUrl("{$baseUrl}/spares-service/about", $today, 'weekly', '0.8');
$addUrl("{$baseUrl}/spares-service/machineries", $today, 'daily', '0.9');
$addUrl("{$baseUrl}/spares-service/products", $today, 'daily', '0.9');
$addUrl("{$baseUrl}/spares-service/service", $today, 'monthly', '0.8');

try {
    initDatabase();
    $pdo = db();

    // 2. Dynamic Machine URLs (From machine_machines table)
    try {
        $stmt = $pdo->query("SELECT id, machine_name, slug, updated_at, created_at FROM machine_machines ORDER BY id DESC");
        while ($row = $stmt->fetch()) {
            $rawSlug = !empty($row['slug']) ? $row['slug'] : $row['machine_name'];
            $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $rawSlug), '-'));
            $date = !empty($row['updated_at']) ? date('Y-m-d', strtotime($row['updated_at'])) : (!empty($row['created_at']) ? date('Y-m-d', strtotime($row['created_at'])) : $today);
            
            $addUrl("{$baseUrl}/spares-service/machineries/" . $slug, $date, 'weekly', '0.8');
        }
    } catch (\Throwable $e) {
        // Table fallback
    }

    // 3. Dynamic Products / Spares URLs (From spares_products table)
    try {
        $stmtP = $pdo->query("SELECT id, name, updated_at, created_at FROM spares_products ORDER BY id DESC");
        while ($p = $stmtP->fetch()) {
            $date = !empty($p['updated_at']) ? date('Y-m-d', strtotime($p['updated_at'])) : (!empty($p['created_at']) ? date('Y-m-d', strtotime($p['created_at'])) : $today);
            $addUrl("{$baseUrl}/spares-service/products/" . $p['id'], $date, 'weekly', '0.8');
        }
    } catch (\Throwable $e) {
        // Table fallback
    }

    // 4. Dynamic Machine Products URLs (From machine_products table)
    try {
        $stmtMP = $pdo->query("SELECT id, product_name, updated_at, created_at FROM machine_products ORDER BY id DESC");
        while ($mp = $stmtMP->fetch()) {
            $date = !empty($mp['updated_at']) ? date('Y-m-d', strtotime($mp['updated_at'])) : (!empty($mp['created_at']) ? date('Y-m-d', strtotime($mp['created_at'])) : $today);
            $addUrl("{$baseUrl}/spares-service/products/" . $mp['id'], $date, 'weekly', '0.8');
        }
    } catch (\Throwable $e) {
        // Table fallback
    }

} catch (\Throwable $e) {
    // If DB fails, static URLs will still be output cleanly
}

// Generate Clean XML Output
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach ($urls as $u) {
    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($u['loc'], ENT_QUOTES | ENT_XML1) . "</loc>\n";
    echo "    <lastmod>" . htmlspecialchars($u['lastmod'], ENT_QUOTES | ENT_XML1) . "</lastmod>\n";
    echo "    <changefreq>" . htmlspecialchars($u['changefreq'], ENT_QUOTES | ENT_XML1) . "</changefreq>\n";
    echo "    <priority>" . htmlspecialchars($u['priority'], ENT_QUOTES | ENT_XML1) . "</priority>\n";
    echo "  </url>\n";
}

echo '</urlset>';
