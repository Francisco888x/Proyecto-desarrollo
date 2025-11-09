<?php
$servername = "localhost";
$username = "root";      // o el usuario que uses en phpMyAdmin
$password = "";          // tu contraseña si aplica
$dbname = "proyectodesarrollo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}
?>
