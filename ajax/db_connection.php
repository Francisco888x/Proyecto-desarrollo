<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
// Connection variables 
$host = 'mysql:host=localhost;port=3306;dbname=inscripciones'; // MySQL host name eg. localhost
$user = "root"; // MySQL user. eg. root ( if your on localserver)
$password = ""; // MySQL user password  (if password is not set for your root user then keep it empty )
 
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'",
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
);


// Connect to MySQL Database
try{
$con = new PDO( $host, $user,  $password,  $options);
}catch(PDOException $e){
   
        echo $e->getMessage();
        die();

}

?>