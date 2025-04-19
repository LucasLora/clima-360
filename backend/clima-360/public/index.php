<?php

require_once __DIR__ . '/../src/controller/UsuarioController.php';
require_once __DIR__ . '/../src/controller/CidadeController.php';
require_once __DIR__ . '/../src/controller/ClimaController.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$api    = isset($_GET['api'])    ? strtolower(trim($_GET['api'])) : '';
$action = isset($_GET['action']) ? trim($_GET['action'])          : '';

switch ($api) {
    case 'usuario':
        (new Controller\UsuarioController())->handle($action);
        break;

    case 'cidade':
        (new Controller\CidadeController())->handle($action);
        break;

    case 'clima':
        (new Controller\ClimaController())->handle($action);
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'API inválida ou não especificada']);
        break;
}
