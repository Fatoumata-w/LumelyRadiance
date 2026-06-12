<?php
session_start();
require 'config.php';

$erreur = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare('SELECT * FROM utilisateurs WHERE email = ?');
    $stmt->execute([trim($_POST['email'])]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérifie email + mot de passe
    if ($user && password_verify($_POST['mot_de_passe'], $user['mot_de_passe'])) {
        $_SESSION['id']     = $user['id'];
        $_SESSION['prenom'] = $user['prenom'];
        header('Location: index.php');
        exit;
    } else {
        $erreur = 'Email ou mot de passe incorrect.';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion — Lumely Radiance</title>
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
        <h2>Connexion</h2>

        <?php if ($erreur) echo "<p class='alert erreur'>$erreur</p>"; ?>

        <form method="POST">
            <label>Email</label>
            <input type="email" name="email" placeholder="marie@exemple.fr" required>

            <label>Mot de passe</label>
            <input type="password" name="mot_de_passe" placeholder="Votre mot de passe" required>

            <button type="submit" class="btn-auth">Se connecter</button>
        </form>

        <p class="auth-link">Pas de compte ? <a href="inscription.php">S'inscrire</a></p>
    </div>
</main>

<footer><p>&copy; 2025 Lumely Radiance</p></footer>

</body>
</html>
