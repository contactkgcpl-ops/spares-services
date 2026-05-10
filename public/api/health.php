<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
applyCors();

respond(200, ['ok' => true, 'message' => 'PHP backend running']);
