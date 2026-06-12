<?php
session_start();
require 'config.php';

$erreur = $succes = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $prenom = trim($_POST['prenom']);
    $email  = trim($_POST['email']);
    $mdp    = $_POST['mot_de_passe'];

    // Vérifie si l'email existe déjà
    $stmt = $pdo->prepare('SELECT id FROM utilisateurs WHERE email = ?');
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        $erreur = 'Cet email est déjà utilisé.';
    } else {
        // Enregistre l'utilisateur avec le mot de passe hashé
        $stmt = $pdo->prepare('INSERT INTO utilisateurs (prenom, email, mot_de_passe) VALUES (?, ?, ?)');
        $stmt->execute([$prenom, $email, password_hash($mdp, PASSWORD_DEFAULT)]);
        $succes = 'Compte créé ! <a href="connexion.php">Se connecter</a>';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Inscription — Lumely Radiance</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <div class="header-container">
        <a href="index.php"><img src="Lumely Radiance.png" class="logo-img" alt="Logo"></a>
    </div>
</header>

<main class="auth-page">
    <div class="auth-card">
        <h2>Créer un compte</h2>

        <?php if ($erreur) echo "<p class='alert erreur'>$erreur</p>"; ?>
        <?php if ($succes) echo "<p class='alert succes'>$succes</p>"; ?>

        <form method="POST">
            <label>Prénom</label>
            <input type="text" name="prenom" placeholder="Marie" required>

            <label>Email</label>
            <input type="email" name="email" placeholder="marie@exemple.fr" required>

            <label>Mot de passe</label>
            <input type="password" name="mot_de_passe" placeholder="Min. 6 caractères" required>

            <button type="submit" class="btn-auth">S'inscrire</button>
        </form>

        <p class="auth-link">Déjà un compte ? <a href="connexion.php">Se connecter</a></p>
    </div>
</main>

<footer><p>&copy; 2025 Lumely Radiance</p></footer>

</body>
</html>
