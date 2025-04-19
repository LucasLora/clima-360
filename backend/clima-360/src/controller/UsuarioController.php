<?php
namespace Controller;

require_once __DIR__ . '/../dao/UsuarioDao.php';

use Dao\UsuarioDao;

class UsuarioController {
    public function handle($action) {
        switch (strtolower($action)) {
            case 'listar':
                $this->listar();
                break;

            case 'get':
                $this->getById();
                break;

            default:
                http_response_code(400);
                echo json_encode(['error' => 'Ação inválida em UsuarioController']);
        }
    }

    private function listar() {
        $dao = new UsuarioDao();
        $usuarios = $dao->getAll();
        echo json_encode($usuarios, JSON_UNESCAPED_UNICODE);
    }

    private function getById() {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID não informado']);
            return;
        }
        $dao = new UsuarioDao();
        $usuario = $dao->getById($id);
        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuário não encontrado']);
            return;
        }
        echo json_encode($usuario, JSON_UNESCAPED_UNICODE);
    }
}
