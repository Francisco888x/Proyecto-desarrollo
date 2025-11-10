<?php
// === Habilitar CORS para conexión desde React ===
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connection.php';

// === Leer todos los proyectos ===
$sql = "SELECT * FROM proyectos ORDER BY fecha_creacion DESC";
$result = $conn->query($sql);

$proyectos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $proyectos[] = [
            "id" => $row["id"],
            "titulo" => $row["titulo"],
            "descripcion" => $row["descripcion"],
            "estado" => $row["estado"],
            "creador" => $row["creador"],
            "cupo" => intval($row["cupo"]),
            "fecha_creacion" => $row["fecha_creacion"]
        ];
    }
    echo json_encode(["success" => true, "data" => $proyectos]);
} else {
    echo json_encode(["success" => true, "data" => []]);
}

$conn->close();
?>
