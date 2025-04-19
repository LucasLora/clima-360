<?php
namespace Config;

use PDO;
use PDOException;

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $host     = 'localhost';
            $db       = 'clima360';
            $charset  = 'utf8mb4';
            $user     = 'root';
            $password = '';

            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $opts = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {        
                self::$instance = new PDO($dsn, $user, $password, $opts);
            } catch (PDOException $e) {
                http_response_code(500);
                exit(json_encode(['error' => 'DB Connection failed']));
            }
        }

        return self::$instance;
    }
}
