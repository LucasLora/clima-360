<?php
namespace Dao;

require_once __DIR__ . '/BaseDao.php';

class FavoritosDao extends BaseDao
{
    public function insert(int $idUsuario, int $idCidade): bool
    {
        $sql = 'INSERT INTO Favoritos (IdUsuario, IdCidade) VALUES (?, ?)';
        return $this->execute($sql, [$idUsuario, $idCidade]);
    }

    public function delete(int $idUsuario, int $idCidade): bool
    {
        $sql = 'DELETE FROM Favoritos WHERE IdUsuario = ? AND IdCidade = ?';
        return $this->execute($sql, [$idUsuario, $idCidade]);
    }
}
