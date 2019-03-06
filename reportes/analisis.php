<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Reporte SNIIM</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/round-about.css" rel="stylesheet">
    <meta name="description" content="An Icon Font Generated By IcoMoon.io">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--Lienas de codigo para revisar el pase de valores de cada sector estudiado-->


  </head>

  <body>
     <!--Page Content -->
    <div class="container">
      <img class="img-responsive" src="../imagenes/Reporte22.png" alt="Reporte">
      <tr><p></p></tr>

      <!-- Introduction Row -->
      <h1 class="my-4 text-center">Resultado de An&aacutelisis</h1>
      <!-- Team Members Row -->
      <div class="row">
        <div class="col-lg-12">
          <h2 class="my-4 text-center">SECTORES</h2>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/poblacion.svg" width="100" height="100" alt="">
          <h3>
            <small>Poblaci&oacuten</small>
          </h3>
               <?php
                $valor_sesion = $_SESSION["Poblacion"];
                echo $valor_sesion;
                ?>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/super.svg" width="100" height="100" alt="">
          <h3>
            <small>Supermercados</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Supermercados"];
                echo $valor_sesion;
                ?>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/Colonia.svg" width="100" height="100" alt="">
          <h3>
            <small>Estados</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Municipio"];
                echo $valor_sesion;
                ?>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/factory.svg" width="100" height="100" alt="">
          <h3>
            <small>Centrales de abasto</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Centrales"];
                echo $valor_sesion;
                ?>

        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/gasol.svg" width="100" height="100" alt="">
          <h3>
            <small>Gasolineras</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Gasolineras"];
                echo $valor_sesion;
                ?>

        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/aero.svg" width="100" height="100" alt="">
          <h3>
            <small>Aeropuertos</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Aeropuertos"];
                echo $valor_sesion;
                ?>

        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/puerto.svg" width="100" height="100" alt="">
          <h3>
            <small>Puertos</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Puertos"];
                echo $valor_sesion;
                ?>

        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/banco.svg" width="100" height="100" alt="">
          <h3>
            <small>Bancos</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Bancos"];
                echo $valor_sesion;
                ?>

        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/road.svg" width="100" height="100" alt="">
          <h3>
            <small>Carreteras</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Carretera"];
                echo $valor_sesion;
                ?>

        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/Hotel.svg" width="100" height="100" alt="">
          <h3>
            <small>Hoteles</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Hoteles"];
                echo $valor_sesion;
                ?>

        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="img-fluid d-block mx-auto" src="../imagenes/dicon.svg" width="100" height="100" alt="">
          <h3>
            <small>Diconsa</small>
          </h3>
                <?php
                $valor_sesion = $_SESSION["Diconsa"];
                echo $valor_sesion;
                ?>

        </div>
      </div>
    </div>
  </div>



    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  ?>
  </body>

</html>
