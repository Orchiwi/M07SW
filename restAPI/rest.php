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
    print_r($cheminURL_tableau);
}

if($req_type=="GET"){

    if(isset($cheminURL_tableau[1]) && $cheminURL_tableau[1]=='nombredrone'){
        $req = "SELECT COUNT(iddrone) FROM drone";
        $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $res->execute(NULL);
        $data = $res->fetchAll(PDO::FETCH_ASSOC);
        $data_json = json_encode($data);
        print_r($data_json); 
    }
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
        print_r("cet utilisateur existe\n");
        $_COOKIE['idutilisateur'] = [$reponse[0]['idutilisateur']];
        print_r("Le cookie est :" . $_COOKIE['idutilisateur'][0] . "\n");
        $UserId = $reponse[0]['idutilisateur'];
    }
else
    {
    $req = "INSERT INTO utilisateur (nom) VALUES (?);";
    // $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $reqpreparer=$BDD->prepare($req);
    $tableauDeDonnees=array($Username);
    $reqpreparer->execute($tableauDeDonnees);
    print_r("Un utilisateur a été créer\n");
    $UserId=$BDD->lastInsertId();
    // $req = "SELECT idutilisateur FROM utilisateur WHERE nom = ?";
    // $reqpreparer=$BDD->prepare($req);
    // $tableauDeDonnees=array($Username);
    // $reqpreparer->execute($tableauDeDonnees);
    // $reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
    // $reqpreparer->closeCursor();
    $_COOKIE['idutilisateur'] = $UserId;
    print_r("Le cookie est :" . $_COOKIE['idutilisateur'] . "\n");
    
    
    
// print_r("\n\n\n".$idutil. "\n\n\n");
    

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
    $DroneId = $reponse[0]['iddrone'];
    }
else{
    $req = "INSERT INTO drone (refDrone) VALUES (?);";
    // $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $reqpreparer=$BDD->prepare($req);
    $tableauDeDonnees=array($Numero);
    $reqpreparer->execute($tableauDeDonnees);
    print_r("Un drone a été créer\n");
    $DroneId=$BDD->lastInsertId();
    // $req = "SELECT iddrone FROM drone WHERE refDrone = ?";
    // $reqpreparer=$BDD->prepare($req);
    // $tableauDeDonnees=array($Numero);
    // $reqpreparer->execute($tableauDeDonnees);
    // $reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
    // $reqpreparer->closeCursor();
}
$time = $donneesVolAssoc['time'];
$date=date('Y-m-d H:i:s',$time);
print_r($date. "\n");
$req = "SELECT idvol,nom FROM vol INNER JOIN utilisateur ON utilisateur.idutilisateur = vol.idutilisateur WHERE vol.dateVol = ? AND vol.idutilisateur = ? AND vol.iddrone = ? ;";
$reqpreparer=$BDD->prepare($req);
$tableauDeDonnees=array($date,$UserId,$DroneId);
$reqpreparer->execute($tableauDeDonnees);
$reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
$reqpreparer->closeCursor();
if($reponse)
    {
    $idvol = $reponse[0]['idvol'];
    print_r("ce vol existe\n");
    }
else {
    $req = "INSERT INTO vol (dateVol,idutilisateur,iddrone) VALUES (?,?,?);";
    $reqpreparer=$BDD->prepare($req);
    $tableauDeDonnees=array($date,$UserId,$DroneId);
    $reqpreparer->execute($tableauDeDonnees);
    print_r("Un vol a été créer\n");
    $VolId=$BDD->lastInsertId();
    // $req = "SELECT idvol,nom FROM vol INNER JOIN utilisateur ON utilisateur.idutilisateur = vol.idutilisateur WHERE vol.dateVol = ? AND vol.idutilisateur = ? ;";
    // $reqpreparer=$BDD->prepare($req);
    // $tableauDeDonnees=array($date,$UserId);
    // $reqpreparer->execute($tableauDeDonnees);
    // $reponse=$reqpreparer ->fetchAll(PDO::FETCH_ASSOC);
    // $reqpreparer->closeCursor();
}


$etatdonneesVolAssoc = $donneesVolAssoc['etats'];
// print_r($etatdonneesVolAssoc);
foreach($etatdonneesVolAssoc as $etat)
{
    print_r($etat);
    $pitch = $etat['pitch'];
    $roll = $etat['roll'];
    $yaw = $etat['yaw'];
    $vgx = $etat['vgx'];
    $vgy = $etat['vgy'];
    $vgz = $etat['vgz'];
    $templ = $etat['templ'];
    $temph = $etat['temph'];
    $tof = $etat['tof'];
    $h = $etat['h'];
    $bat = $etat['bat'];
    $baro = $etat['baro'];
    $time = $etat['time'];
    $agx = $etat['agx'];
    $agy = $etat['agy'];
    $agz = $etat['agz'];
        $req = "INSERT INTO etat (idvol,pitch,roll,yaw,vgx,vgy,vgz,templ,temph,tof,h,bat,baro,time,agx,agy,agz) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $reqpreparer=$BDD->prepare($req);
        $tableauDeDonnees=array($idvol,$pitch,$roll,$yaw,$vgx,$vgy,$vgz,$templ,$temph,$tof,$h,$bat,$baro,$time,$agx,$agy,$agz);
        $reqpreparer->execute($tableauDeDonnees);
        print_r("Un état a été créer\n");
}

}
?>