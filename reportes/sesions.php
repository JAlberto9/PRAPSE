<?php
session_start();
?>
<?php
	$Poblacion = $_POST["Poblacion"];
	$Municipio = $_POST["Municipio"];
	$Hoteles = $_POST["Hoteles"];
	$Supermercados = $_POST["Supermercados"];
	$Gasolineras = $_POST["Gasolineras"];
	$Aeropuertos = $_POST["Aeropuertos"];
	$Puertos = $_POST["Puertos"];
	$Bancos = $_POST["Bancos"];
	$Carretera = $_POST["Carretera"];
	$Diconsa = $_POST["Diconsa"];
	$Centrales = $_POST["Centrales"];
	
	echo "".$Poblacion."".$Municipio."".$Hoteles."".$Supermercados."".$Gasolineras;

	$_SESSION["Poblacion"] = $Poblacion;
	$_SESSION["Municipio"] = $Municipio;
	$_SESSION["Hoteles"] = $Hoteles;
	$_SESSION["Supermercados"] = $Supermercados;
	$_SESSION["Gasolineras"] = $Gasolineras;
	$_SESSION["Aeropuertos"] = $Aeropuertos;
	$_SESSION["Puertos"] = $Puertos;
	$_SESSION["Bancos"] = $Bancos;
	$_SESSION["Carretera"] = $Carretera;
	$_SESSION["Diconsa"] = $Diconsa;
	$_SESSION["Centrales"] = $Centrales;

    echo "Variables de sesion enviadas";
?>