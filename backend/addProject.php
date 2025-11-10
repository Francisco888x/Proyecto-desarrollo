<?php
// === Permitir peticiones desde React ===
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connection.php';

// === Solo aceptar método POST ===
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos enviados por el frontend
    $titulo = $_POST['titulo'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $estado = $_POST['estado'] ?? 'Planeado';
    $creador = $_POST['creador'] ?? '';
    $cupo = $_POST['cupo'] ?? '';

    // Validar datos
    if (empty($titulo) || empty($descripcion) || empty($creador) || empty($cupo)) {
        echo json_encode(["success" => false, "message" => "Faltan datos requeridos."]);
        exit;
    }

    // Insertar en la tabla proyectos
    $sql = "INSERT INTO proyectos (titulo, descripcion, estado, creador, cupo)
            VALUES ('$titulo', '$descripcion', '$estado', '$creador', '$cupo')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            "success" => true,
            "message" => "Proyecto guardado correctamente.",
            "id" => $conn->insert_id
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }

    $conn->close();
}
?>
