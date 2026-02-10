<?php
// Conexion a la base de datos cine_daw 
$servidor = "HOST_AQUI";
$usuario = "USUARIO_AQUI";
$pass = "PASSWORD_AQUI";
$bd = "cine_daw";

$conn = new mysqli($servidor, $usuario, $pass, $bd);

if ($conn->connect_error) {
    die("Fallo en la conexion: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
