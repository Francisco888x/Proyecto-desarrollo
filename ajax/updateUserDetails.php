<?php
// include Database connection file
include("db_connection.php");

// check request
if(isset($_POST))
{
    // get values
    $cve = $_POST['cve'];
	$snombre=$_POST['snombre'];
	//$sapepat=$_POST['sapepat'];
   
   
    


    // Updaste User details
    $query = "UPDATE usuario SET cve='$cve', sNombre='$snombre' WHERE cve = '$cve'";
    if (!$result = mysqli_query($con, $query)) {
        exit(mysqli_error($con));
    }
}