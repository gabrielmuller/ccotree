<?php

$con = new mysqli("localhost", "root", "password", "grade");
if (!$con) {
    die('Could not connect: ' . $con->connect_error);
}

$con->set_charset("utf8");

$sql="SELECT * FROM disciplinas";
$result = $con->query($sql);
$disciplinas = array();
while ($row = $result->fetch_assoc()) {
    $disciplina = array(
        "codigo"=>$row["Codigo"],
        "nome"=>$row["Nome"],
        "fase"=>$row["Fase"],
        "linha"=>$row["Linha"],
        "ementa"=>$row["Ementa"],
        "horas"=>$row["Horas"],
        "requisitos"=>array());
    $disciplinas[$row["Codigo"]] = $disciplina;
}

$sql="SELECT * FROM requisitos";
$result = $con->query($sql);
while ($row = $result->fetch_assoc()) {
    array_push($disciplinas[$row["Posterior"]]["requisitos"], $row["Requisito"]);
}

echo json_encode($disciplinas, JSON_UNESCAPED_UNICODE);
$con->close();

?>
