<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();

$isCli = (PHP_SAPI === 'cli');

if (!$isCli) {
    echo "<h1>Live Database Table Rename Tool</h1><pre>";
} else {
    echo "Starting Live Database Table Rename...\n";
}

try {
    $pdo = db();

    $tableMap = [
        'admins'     => 'spares_admins',
        'categories' => 'spares_categories',
        'enquiries'  => 'spares_enquiried',
        'enquiried'  => 'spares_enquiried',
        'products'   => 'spares_products',
    ];

    $renamedCount = 0;

    foreach ($tableMap as $oldTable => $newTable) {
        $stmtOld = $pdo->prepare("SHOW TABLES LIKE ?");
        $stmtOld->execute([$oldTable]);
        $oldExists = (bool) $stmtOld->fetchColumn();

        $stmtNew = $pdo->prepare("SHOW TABLES LIKE ?");
        $stmtNew->execute([$newTable]);
        $newExists = (bool) $stmtNew->fetchColumn();

        if ($oldExists && !$newExists) {
            $pdo->exec("RENAME TABLE `{$oldTable}` TO `{$newTable}`");
            echo "[SUCCESS] Renamed table '{$oldTable}' to '{$newTable}'\n";
            $renamedCount++;
        } elseif ($newExists) {
            echo "[INFO] Table '{$newTable}' already exists.\n";
        } else {
            echo "[SKIP] Old table '{$oldTable}' does not exist.\n";
        }
    }

    // Ensure database structure and default entries are intact
    initDatabase();

    echo "\n[COMPLETED] Database tables checked/migrated successfully! Total tables renamed: {$renamedCount}\n";

} catch (Throwable $error) {
    echo "\n[ERROR] Migration failed: " . $error->getMessage() . "\n";
    if (!$isCli) {
        http_response_code(500);
    }
    exit(1);
}

if (!$isCli) {
    echo "</pre>";
}
