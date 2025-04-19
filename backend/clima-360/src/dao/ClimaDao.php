<?php
namespace Dao;

require_once __DIR__ . '/BaseDao.php';

class ClimaDao extends BaseDao
{
    public function getAll(): array
    {
        return $this->query(
            'SELECT 
                Id              AS id,
                DataHora        AS dataHora,
                Temperatura     AS temperatura,
                Precipitacao    AS precipitacao,
                VelocidadeVento AS velocidadeVento,
                Umidade         AS umidade,
                IdCidade        AS idCidade
             FROM Clima'
        );
    }

    public function getById(int $id): ?array
    {
        $rows = $this->query(
            'SELECT 
                Id              AS id,
                DataHora        AS dataHora,
                Temperatura     AS temperatura,
                Precipitacao    AS precipitacao,
                VelocidadeVento AS velocidadeVento,
                Umidade         AS umidade,
                IdCidade        AS idCidade
             FROM Clima 
             WHERE Id = ?',
            [$id]
        );

        return $rows[0] ?? null;
    }

    public function getByCidade(int $cidadeId): array
    {
        return $this->query(
            'SELECT
                Id              AS id,
                DataHora        AS dataHora,
                Temperatura     AS temperatura,
                Precipitacao    AS precipitacao,
                VelocidadeVento AS velocidadeVento,
                Umidade         AS umidade,
                IdCidade        AS idCidade
             FROM Clima 
             WHERE IdCidade = ? 
             ORDER BY DataHora DESC',
            [$cidadeId]
        );
    }

    public function insert(string $dataHora, float $temperatura, float $precipitacao, float $velocidadeVento, float $umidade, int $idCidade): int
    {
        $sql = 'INSERT INTO Clima (DataHora, Temperatura, Precipitacao, VelocidadeVento, Umidade, IdCidade) VALUES (?, ?, ?, ?, ?, ?)';
        $this->execute($sql, [$dataHora, $temperatura, $precipitacao, $velocidadeVento, $umidade, $idCidade]);
        return (int)$this->pdo->lastInsertId();
    }

    public function update(int $id, string $dataHora, float $temperatura, float $precipitacao, float $velocidadeVento, float $umidade, int $idCidade): bool
    {
        $sql = 'UPDATE Clima 
                SET DataHora = ?, Temperatura = ?, Precipitacao = ?, VelocidadeVento = ?, Umidade = ?, IdCidade = ?
                WHERE Id = ?';
        return $this->execute($sql, [$dataHora, $temperatura, $precipitacao, $velocidadeVento, $umidade, $idCidade, $id]);
    }

    public function delete(int $id): bool
    {
        return $this->execute('DELETE FROM Clima WHERE Id = ?', [$id]);
    }
}
