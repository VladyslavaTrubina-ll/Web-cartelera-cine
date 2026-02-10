<?php
// Conexion a la base de datos cine_daw 
$servidor = "10.5.12.221";
$usuario = "root";
$pass = "";
$bd = "cine_daw";

$conn = new mysqli($servidor, $usuario, $pass, $bd);

if ($conn->connect_error) {
    die("Fallo en la conexion: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
