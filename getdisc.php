<?php

$codigo = $_GET['codigo'];

$con = pg_connect("host=localhost port=5432 user=postgres dbname=ccotree");
if (!$con) {
    die('Could not connect: ' . pg_last_error($con));
}

$sql="SELECT * FROM Disciplina WHERE Codigo = '$codigo' ";
$result = pg_query($con,$sql);

while($row = pg_fetch_row($result)) {
  $data = array ('codigo' => $row[0],
                  'nome' => $row[1],
                  'fase' => $row[2],
                  'linha' => $row[3],
                  'ementa' => $row[4],
                  'horas' => $row[5],);
  echo json_encode($data);
}

pg_close($con);

?>
