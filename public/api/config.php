<?php
declare(strict_types=1);

$localConfigPath = __DIR__ . '/config.local.php';
$localConfig = is_file($localConfigPath) ? require $localConfigPath : [];

$configValue = static function (string $key, string $default = '') use ($localConfig): string {
    $envValue = getenv($key);
    if ($envValue !== false && $envValue !== '') {
        return $envValue;
    }

    return (string) ($localConfig[$key] ?? $default);
};

define('DB_HOST', $configValue('DB_HOST', 'localhost'));
define('DB_NAME', $configValue('DB_NAME'));
define('DB_USER', $configValue('DB_USER'));
define('DB_PASS', $configValue('DB_PASS'));
define('DB_CHARSET', $configValue('DB_CHARSET', 'utf8mb4'));

define('ADMIN_EMAIL', $configValue('ADMIN_EMAIL'));
define('ADMIN_PASSWORD_HASH', $configValue('ADMIN_PASSWORD_HASH'));
define('AUTH_SECRET', $configValue('AUTH_SECRET'));
define('ALLOWED_ORIGIN', $configValue('ALLOWED_ORIGIN', '*'));

define('MAX_UPLOAD_BYTES', (int) $configValue('MAX_UPLOAD_BYTES', '5242880'));
define('UPLOAD_DIR', __DIR__ . '/../uploads');
define('UPLOAD_URL_PATH', '/uploads');
