<?php
namespace Dao;

require_once __DIR__ . '/BaseDao.php';

class UsuarioAlertaDao extends BaseDao
{
    public function insert(int $idUsuario, int $idAlerta): bool
    {
        $sql = 'INSERT INTO UsuarioAlerta (IdUsuario, IdAlerta) VALUES (?, ?)';
        return $this->execute($sql, [$idUsuario, $idAlerta]);
    }

    public function delete(int $idUsuario, int $idAlerta): bool
    {
        $sql = 'DELETE FROM UsuarioAlerta WHERE IdUsuario = ? AND IdAlerta = ?';
        return $this->execute($sql, [$idUsuario, $idAlerta]);
    }
}
