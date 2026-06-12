<?php
session_start();
require 'config.php';

// Redirige si non connecté
if (!isset($_SESSION['id'])) {
    header('Location: connexion.php');
    exit;
}

// Récupère les commandes de l'utilisateur
$stmt = $pdo->prepare('SELECT * FROM commandes WHERE utilisateur_id = ? ORDER BY date_commande DESC');
$stmt->execute([$_SESSION['id']]);
$commandes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mes commandes — Lumely Radiance</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <div class="header-container">
        <a href="index.php"><img src="Lumely Radiance.png" class="logo-img" alt="Logo"></a>
        <div class="header-actions">
            <a href="index.php" class="btn-header">Boutique</a>
            <a href="deconnexion.php" class="btn-header btn-deconnexion">Déconnexion</a>
        </div>
    </div>
</header>

<main class="container" style="padding:40px 20px">
    <h2 class="section-title">Mes commandes</h2>

    <?php if (empty($commandes)): ?>
        <p style="text-align:center;color:#888">Aucune commande pour l'instant. <a href="index.php">Voir les produits</a></p>

    <?php else: ?>
        <?php foreach ($commandes as $cmd): ?>
        <div class="commande-card">
            <span>Commande #<?= $cmd['id'] ?></span>
            <span><?= date('d/m/Y à H:i', strtotime($cmd['date_commande'])) ?></span>
            <strong><?= number_format($cmd['total'], 2, ',', '') ?>€</strong>
            <span class="statut">Commande Validée ✅</span>
        </div>
        <?php endforeach; ?>
    <?php endif; ?>
</main>

<footer><p>&copy; 2025 Lumely Radiance</p></footer>

</body>
</html>
