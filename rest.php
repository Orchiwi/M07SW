<?php
file_get_contents("php://input");

$BDD new PDO('mysql:host=localhost;dbname=MW07_morlet;charset=utf8','morlet','amorlet')

$req_type=$_SERVER["REQUEST_METHOD"]

if(isset($_SERVER[PATH_INFO]));
{
    $req_path=$_SERVER['PATH_INFO'];

    $req_data = explode("/",$req_path);
    print_r($req_data);
}
json_decode($jsonString, $assoc, $depth, $options);

if($req_type=="GET")