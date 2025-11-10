<?php
// === Permitir CORS ===
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connection.php';

// === Validación de usuario ===
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $usuario = $_POST['usuario'] ?? '';
  $contra = $_POST['contra'] ?? '';

  if (empty($usuario) || empty($contra)) {
    echo json_encode(["success" => false, "message" => "Campos incompletos."]);
    exit;
  }

  // Consulta SQL
  $sql = "SELECT * FROM login WHERE usuario='$usuario' AND contra='$contra'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    echo json_encode(["success" => true, "message" => "Login correcto", "usuario" => $usuario]);
  } else {
    echo json_encode(["success" => false, "message" => "Usuario o contraseña incorrectos"]);
  }

  $conn->close();
}
?>
