<?php
namespace Controller;

require_once __DIR__ . '/../dao/ClimaDao.php';

use Dao\ClimaDao;

class ClimaController {
    public function handle($action) {
        switch (strtolower($action)) {
            case 'listar':
                $this->listar();
                break;

            case 'get':
                $this->getById();
                break;

            case 'getbycidade':
                $this->getByCidade();
                break;

            default:
                http_response_code(400);
                echo json_encode(['error' => 'Ação inválida em ClimaController'], JSON_UNESCAPED_UNICODE);
        }
    }

    private function listar() {
        $dao = new ClimaDao();
        $dados = $dao->getAll();
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    private function getById() {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID não informado'], JSON_UNESCAPED_UNICODE);
            return;
        }
        $dao = new ClimaDao();
        $registro = $dao->getById($id);
        if (!$registro) {
            http_response_code(404);
            echo json_encode(['error' => 'Registro de clima não encontrado'], JSON_UNESCAPED_UNICODE);
            return;
        }
        echo json_encode($registro, JSON_UNESCAPED_UNICODE);
    }

    private function getByCidade() {
        $idCidade = isset($_GET['idCidade']) ? (int) $_GET['idCidade'] : 0;
        if (!$idCidade) {
            http_response_code(400);
            echo json_encode(['error' => 'ID da cidade não informado'], JSON_UNESCAPED_UNICODE);
            return;
        }
        $dao = new ClimaDao();
        $registros = $dao->getByCidade($idCidade);
        echo json_encode($registros, JSON_UNESCAPED_UNICODE);
    }
}
