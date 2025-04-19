<?php
namespace Dao;

require_once __DIR__ . '/BaseDao.php';

use PDO;

class AlertaDao extends BaseDao
{
    public function getAll(): array
    {
        return $this->query(
            'SELECT 
                Id          AS id,
                Mensagem    AS mensagem,
                DataHora    AS dataHora,
                TipoAlerta  AS tipoAlerta,
                IdClima     AS idClima
             FROM Alerta'
        );
    }

    public function getById(int $id): ?array
    {
        $rows = $this->query(
            'SELECT 
                Id          AS id,
                Mensagem    AS mensagem,
                DataHora    AS dataHora,
                TipoAlerta  AS tipoAlerta,
                IdClima     AS idClima
             FROM Alerta
             WHERE Id = ?',
            [$id]
        );

        return $rows[0] ?? null;
    }

    public function insert(string $mensagem, string $tipoAlerta, ?int $idClima = null): int
    {
        $sql = 'INSERT INTO Alerta (Mensagem, TipoAlerta, IdClima) VALUES (?, ?, ?)';
        $this->execute($sql, [$mensagem, $tipoAlerta, $idClima]);
        return (int)$this->pdo->lastInsertId();
    }

    public function update(int $id, string $mensagem, string $tipoAlerta, ?int $idClima = null): bool
    {
        $sql = 'UPDATE Alerta
                SET Mensagem = ?, TipoAlerta = ?, IdClima = ?
                WHERE Id = ?';
        return $this->execute($sql, [$mensagem, $tipoAlerta, $idClima, $id]);
    }

    public function delete(int $id): bool
    {
        return $this->execute('DELETE FROM Alerta WHERE Id = ?', [$id]);
    }
}
