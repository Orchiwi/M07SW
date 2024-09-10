<?php
try {
    $BDD = new PDO('mysql:host=localhost;dbname=MW07_morlet;charset=utf8','morlet','snirlla');
} catch (PDOException $e) {
    die ('Connexion à la base de données : ECHEC');
}
$req_type=$_SERVER["REQUEST_METHOD"]; //GET,POST,PUT,DELETE
if(isset($_SERVER['PATH_INFO']))
{
    $cheminURL=$_SERVER['PATH_INFO'];

    $cheminURL_tableau=explode("/",$cheminURL);
    print_r($req_data);
}
if($req_type=="POST")
{
$donneesVolJSON=file_get_contents('php://input');
$donneesVolAssoc=json_decode($donneesVolJSON,true);
$Username = $donneesVolAssoc['nom'];
$req = "SELECT idutilisateur FROM utilisateur WHERE nom = ?";
$reqpreparer=$BDD->prepare($req);
$tableauDeDonnees=array($Username);
$reqpreparer->execute($tableauDeDonnees);
$reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
$reqpreparer->closeCursor();
if($reponse)
    {
        $_COOKIE['idutilisateur'] = [$reponse[0]['idutilisateur']];
        print_r("Le cookie est :" . $_COOKIE['idutilisateur'][0] . "\n");
    }
else
    {
    $req = "INSERT INTO utilisateur (nom) VALUES (?);";
    // $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $reqpreparer=$BDD->prepare($req);
    $tableauDeDonnees=array($Username);
    $reqpreparer->execute($tableauDeDonnees);
    print_r("Un utilisateur a été créer\n");
    $req = "SELECT idutilisateur FROM utilisateur WHERE nom = ?";
    $reqpreparer=$BDD->prepare($req);
    $tableauDeDonnees=array($Username);
    $reqpreparer->execute($tableauDeDonnees);
    $reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
    $reqpreparer->closeCursor();
    $_COOKIE['idutilisateur'] = [$reponse[0]['idutilisateur']];
    print_r("Le cookie est :" . $_COOKIE['idutilisateur'] . "\n");
    };
$Numero = $donneesVolAssoc['numero'];
$req = "SELECT iddrone FROM drone WHERE refDrone = ?";
$reqpreparer=$BDD->prepare($req);
$tableauDeDonnees=array($Numero);
$reqpreparer->execute($tableauDeDonnees);
$reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
$reqpreparer->closeCursor();
if($reponse)
    {
    print_r("le drone existe\n");
    }
else{
    $req = "INSERT INTO drone (refDrone) VALUES (?);";
    // $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $reqpreparer=$BDD->prepare($req);
    $tableauDeDonnees=array($Numero);
    $reqpreparer->execute($tableauDeDonnees);
    print_r("Un drone a été créer\n");
    $req = "SELECT iddrone FROM drone WHERE refDrone = ?";
    $reqpreparer=$BDD->prepare($req);
    $tableauDeDonnees=array($Numero);
    $reqpreparer->execute($tableauDeDonnees);
    $reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
    $reqpreparer->closeCursor();
}
$time = $donneesVolAssoc['time'];
$date=date('Y-m-d H:i:s',$time);
print_r($date. "\n");
$req = "SELECT idvol,nom FROM vol INNER JOIN utilisateur ON utilisateur.idutilisateur = vol.idutilisateur WHERE vol.idutilisateur = ? AND vol.dateVol = ?;";
$reqpreparer=$BDD->prepare($req);
$tableauDeDonnees=array($Username,$date);
$reqpreparer->execute($tableauDeDonnees);
$reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
$reqpreparer->closeCursor();
print_r($reponse);
}
?>