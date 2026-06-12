-- Importer dans phpMyAdmin (base "lumely")

CREATE TABLE utilisateurs (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    prenom       VARCHAR(50),
    email        VARCHAR(100) UNIQUE,
    mot_de_passe VARCHAR(255)
);

-- Table produits (pour la BDD complète)
CREATE TABLE produits (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nom         VARCHAR(100),
    description TEXT,
    prix        DECIMAL(10,2),
    image       VARCHAR(150)
);

INSERT INTO produits (nom, description, prix, image) VALUES
('Essence d\'Or',        'Un spray lumineux et envoûtant, symbole d\'élégance.',         189.00, 'glowy spray.jpg'),
('Crème Lumière',        'Une texture fondante qui révèle l\'éclat naturel de la peau.', 125.00, 'creme .png'),
('Huile d\'Or',          'Une huile sèche qui sublime la peau d\'un éclat satiné.',       99.00, 'huile lumely.jpg'),
('Baume Lumière Pure',   'Un baume parsemé de fleurs pour des lèvres sublimées.',         49.00, 'Baume lumely.png'),
('Masque Éclat Royal',   'Un masque luxueux qui revitalise et illumine la peau.',          79.00, 'masque.jpg'),
('Sérum Lumière Intense','Un sérum concentré pour une peau éclatante.',                   139.00, 'serum.jpg'),
('Bougie Lumely',        'Une bougie parfumée aux senteurs florales.',                     39.00, 'bougie lumely.jpg'),
('Masque de Nuit',       'Un masque nuit réparateur pour une peau régénérée.',             89.00, 'masque de nuit.png');

CREATE TABLE commandes (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT,
    total          DECIMAL(10,2),
    date_commande  DATETIME DEFAULT CURRENT_TIMESTAMP
);
