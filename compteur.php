<?php
$fichier = "vues.txt";

if (!file_exists($fichier)) {
    file_put_contents($fichier, 0);
}

$nombreDeVues = (int)file_get_contents($fichier);
$nombreDeVues++;
file_put_contents($fichier, $nombreDeVues);

echo $nombreDeVues;
?>
