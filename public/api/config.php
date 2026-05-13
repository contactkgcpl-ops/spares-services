<?php
declare(strict_types=1);

/**
 * Simple .env loader for PHP
 */
function loadEnv(string $path): void
{
    if (!file_exists($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        if (!str_contains($line, '=')) {
            continue;
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        $value = trim($value, "\"'");

        $existing = getenv($name);
        if ($existing === false || trim((string) $existing) === '') {
            putenv(sprintf('%s=%s', $name, $value));
        }

        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
    }
}

// Load .env file
loadEnv(__DIR__ . '/.env');

/**
 * Helper to get env variable with fallback
 */
function env(string $key, $default = null)
{
    $value = getenv($key);
    if ($value === false || trim((string) $value) === '') {
        return $default;
    }
    return $value;
}
