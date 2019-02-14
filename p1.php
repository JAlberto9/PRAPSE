<?php
session_start();
?>
<?php
  $ejemplo = array(
    "nombre" => $_GET["nombre"],
    "metodo" => $_GET["metodo"]
    );
  echo json_encode($ejemplo);

  //$_SESSION["Anali"] = $ejemplo;
   // echo "Variables de sesion enviadas";
?>