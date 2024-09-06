<?php

try {
    $BDD = new PDO('mysql:host=localhost;dbname=MW07_morlet;charset=utf8','morlet','snirlla');
} catch (PDOException $e) {
    die ('Connexion à la base de données : ECHEC');
}

$body = file_get_contents("php://input");
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
print_r($donneesVolAssoc);  


$req = "SELECT idutilisateur FROM utilisateur WHERE nom = ?";
$reqpreparer=$BDD->prepare($req);
$tableauDeDonnees=array("eleve");
$reqpreparer->execute($tableauDeDonnees);
$reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
$reqpreparer->closeCursor();

// print_r($body);


if($reponse){print_r($reponse);}
else{
$req = "INSERT INTO utilisateur (nom) VALUES (?);";
// $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$reqpreparer=$BDD->prepare($req);
$tableauDeDonnees=array("eleve");
$reqpreparer->execute($tableauDeDonnees);
print_r(`Un utilisateur a été créer`);
};

$jsonbody = json_decode($body,true);
print_r($jsonbody->numero);

}
// json_decode($jsonString, $assoc, $depth, $options);
?>