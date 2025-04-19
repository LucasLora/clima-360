<?php
namespace Controller;

require_once __DIR__ . '/../dao/CidadeDao.php';

use Dao\CidadeDao;

class CidadeController {
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
                echo json_encode(['error' => 'Ação inválida em CidadeController'], JSON_UNESCAPED_UNICODE);
        }
    }

    private function listar() {
        $dao = new CidadeDao();
        $cidades = $dao->getAll();
        echo json_encode($cidades, JSON_UNESCAPED_UNICODE);
    }

    private function getById() {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID não informado'], JSON_UNESCAPED_UNICODE);
            return;
        }
        $dao = new CidadeDao();
        $cidade = $dao->getById($id);
        if (!$cidade) {
            http_response_code(404);
            echo json_encode(['error' => 'Cidade não encontrada'], JSON_UNESCAPED_UNICODE);
            return;
        }
        echo json_encode($cidade, JSON_UNESCAPED_UNICODE);
    }
}
