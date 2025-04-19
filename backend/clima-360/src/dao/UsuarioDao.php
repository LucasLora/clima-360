<?php
namespace Dao;

require_once __DIR__ . '/BaseDao.php';

use PDO;

class UsuarioDao extends BaseDao
{
    public function getAll(): array
    {
        return $this->query(
            'SELECT 
                Id AS id, 
                Nome AS nome, 
                Email AS email 
             FROM Usuario'
        );
    }

    public function getById(int $id): ?array
    {
        $results = $this->query(
            'SELECT 
                Id AS id, 
                Nome AS nome, 
                Email AS email 
             FROM Usuario 
             WHERE Id = ?',
            [$id]
        );

        return $results[0] ?? null;
    }

    public function getFavoritas(int $idUsuario): array
    {
        return $this->query(
            'SELECT 
                c.Id         AS id,
                c.Nome       AS nome,
                c.Estado     AS estado,
                c.Pais       AS pais,
                c.Latitude   AS latitude,
                c.Longitude  AS longitude
             FROM Favoritos f
             JOIN Cidade c ON f.IdCidade = c.Id
             WHERE f.IdUsuario = ?',
            [$idUsuario]
        );
    }

    public function getAlertas(int $idUsuario): array
    {
        return $this->query(
            'SELECT 
                a.Id          AS id,
                a.Mensagem    AS mensagem,
                a.DataHora    AS dataHora,
                a.TipoAlerta  AS tipoAlerta,
                a.IdClima     AS idClima
             FROM UsuarioAlerta ua
             JOIN Alerta a ON ua.IdAlerta = a.Id
             WHERE ua.IdUsuario = ?
             ORDER BY a.DataHora DESC',
            [$idUsuario]
        );
    }

    public function insert(string $nome, string $email, string $senha): int
    {
        $sql = 'INSERT INTO Usuario (Nome, Email, Senha) VALUES (?, ?, ?)';
        $this->execute($sql, [$nome, $email, $senha]);
        return (int)$this->pdo->lastInsertId();
    }

    public function update(int $id, string $nome, string $email, string $senha): bool
    {
        $sql = 'UPDATE Usuario 
                SET Nome = ?, Email = ?, Senha = ? 
                WHERE Id = ?';
        return $this->execute($sql, [$nome, $email, $senha, $id]);
    }

    public function delete(int $id): bool
    {
        return $this->execute('DELETE FROM Usuario WHERE Id = ?', [$id]);
    }
}
