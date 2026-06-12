<?php
// Connexion à la base de données MySQL
$pdo = new PDO('mysql:host=localhost;dbname=lumely;charset=utf8', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
