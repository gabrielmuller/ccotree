<?php

$codigo = $_GET['codigo'];

$con = new mysqli("localhost", "root", "password", "grade");
if (!$con) {
    die('Could not connect: ' . $con->connect_error);
}
$con->set_charset("utf8");
$sql="SELECT * FROM disciplinas WHERE Codigo = '$codigo' ";
if ($result = $con->query($sql)) {
    $row = $result->fetch_assoc();
    $json = array(
        "codigo"=>$codigo,
        "nome"=>$row["Nome"],
        "fase"=>$row["Fase"],
        "linha"=>$row["Linha"],
        "ementa"=>$row["Ementa"],
        "horas"=>$row["Horas"]);
} else {
    die('0 resultados');
}

$sql="SELECT * FROM requisitos WHERE posterior = '$codigo' ";

if ($result = $con->query($sql)) {
    $json["requisitos"] = array();
    while ($row = $result->fetch_assoc()) {
        array_push($json["requisitos"], $row["requisito"]);
    }
} else {
    die('0 resultados');
}

echo json_encode($json, JSON_UNESCAPED_UNICODE);
$con->close();

?>
