<?php
// Reçoit le panier depuis le JS et l'enregistre en BDD
session_start();
require 'config.php';

header('Content-Type: application/json');

// L'utilisateur doit être connecté
if (!isset($_SESSION['id'])) {
    echo json_encode(['succes' => false, 'message' => 'non_connecte']);
    exit;
}

$data  = json_decode(file_get_contents('php://input'), true);
$total = $data['total'];

// Enregistre la commande
$stmt = $pdo->prepare('INSERT INTO commandes (utilisateur_id, total) VALUES (?, ?)');
$stmt->execute([$_SESSION['id'], $total]);

echo json_encode(['succes' => true, 'commande_id' => $pdo->lastInsertId()]);
?>
