<?php
$route = $argv[1] ?? '/';
$_SERVER['REQUEST_URI'] = $route;
$_SERVER['HTTP_HOST'] = 'localhost';
require __DIR__ . '/preview-wp-theme.php';
