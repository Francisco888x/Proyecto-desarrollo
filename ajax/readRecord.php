<?php
	// include Database connection file 
	include("db_connection.php");
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	// Design initial table header 
	
	$sql = "SELECT * FROM Usuario";
$result = $con->prepare($sql);
$result->execute();


$users = [];

    while($row = $result->fetch()) {
        $users[] = $row;
    }

echo json_encode($users);
?>