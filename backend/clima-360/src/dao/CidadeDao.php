<?php
namespace Dao;

require_once __DIR__ . '/BaseDao.php';

class CidadeDao extends BaseDao
{
    public function getAll(): array
    {
        return $this->query(
            'SELECT 
                Id         AS id,
                Nome       AS nome,
                Estado     AS estado,
                Pais       AS pais,
                Latitude   AS latitude,
                Longitude  AS longitude
             FROM Cidade'
        );
    }

    public function getById(int $id): ?array
    {
        $rows = $this->query(
            'SELECT 
                Id         AS id,
                Nome       AS nome,
                Estado     AS estado,
                Pais       AS pais,
                Latitude   AS latitude,
                Longitude  AS longitude
             FROM Cidade
             WHERE Id = ?',
            [$id]
        );

        return $rows[0] ?? null;
    }

    public function insert(string $nome, string $estado, string $pais, float $latitude, float $longitude): int
    {
        $sql = 'INSERT INTO Cidade (Nome, Estado, Pais, Latitude, Longitude) VALUES (?, ?, ?, ?, ?)';
        $this->execute($sql, [$nome, $estado, $pais, $latitude, $longitude]);
        return (int)$this->pdo->lastInsertId();
    }

    public function update(int $id, string $nome, string $estado, string $pais, float $latitude, float $longitude): bool
    {
        $sql = 'UPDATE Cidade 
                SET Nome = ?, Estado = ?, Pais = ?, Latitude = ?, Longitude = ?
                WHERE Id = ?';
        return $this->execute($sql, [$nome, $estado, $pais, $latitude, $longitude, $id]);
    }

    public function delete(int $id): bool
    {
        return $this->execute('DELETE FROM Cidade WHERE Id = ?', [$id]);
    }
}
