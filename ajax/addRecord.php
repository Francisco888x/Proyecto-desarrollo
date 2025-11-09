<?php
	if(isset($_POST['cve']) && isset($_POST['snombre']) && isset($_POST['sapepat']))
	{
		// include Database connection file 
		include("db_connection.php");

		// get values 
		$cve = $_POST['cve'];
		$snombre = $_POST['snombre'];
		$sapepat = $_POST['sapepat'];
		

		$query = "INSERT INTO usuario(cve, sNombre, sApePat) VALUES('$cve', '$snombre', '$sapepat')";
		if (!$result = mysqli_query($con, $query)) {
	        exit(mysqli_error($con));
	    }
	    echo "1Registro Exitoso!";
	}
?>