<?php
header("Access-Control-Allow-Origin: *"); // Permite peticiones desde cualquier origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $usuario = $_POST['usuario'];
  $contra = $_POST['contra'];

  $sql = "INSERT INTO login (usuario, contra) VALUES ('$usuario', '$contra')";
  if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Usuario registrado correctamente"]);
  } else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
  }

  $conn->close();
}
?>
