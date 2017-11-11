<?php

$con = new mysqli("localhost", "root", "password", "grade");
if (!$con) {
    die('Could not connect: ' . $con->connect_error);
}
$con->set_charset("utf8");

$codigo = $_GET['codigo'];
$nome = $_GET['nome'];
$fase = $_GET['fase'];
$linha = $_GET['linha'];
$ementa = $_GET['ementa'];
$horas = $_GET['horas'];

$sql="INSERT INTO disciplinas (Codigo, Nome, Fase, Linha, Ementa, Horas)
    VALUES(
    '$codigo', '$nome', '$fase', '$linha', '$ementa', '$horas')";

$result = $con->query($sql);

if (!$result) {
    die("Erro ao inserir infos básicas da disciplina.");
}

if ($_GET['requisitos']) {
    $requisitos = explode(" ", $_GET['requisitos']);

    foreach ($requisitos as $req) {
        $sql="INSERT INTO requisitos (Requisito, Posterior)
            VALUES('$req', '$codigo')";
        $result = $con->query($sql);
        if (!$result) {
            die("Erro ao inserir requisito " . $req);
        }
    }
}

echo "Sucesso";

$con->close();

?>
