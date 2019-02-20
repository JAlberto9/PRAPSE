<!--<?php
//session_start();
?>-->
<?php
       $siap = "http://infosiap.siap.gob.mx:8080/agricola_siap_gobmx/ResumenDelegacion.do?";
       //$peren = $_GET['peren'];->Con eso obtengo el valor de la variable desde la pagina index, donde se declara el peren por ahora queda pausada hasta que pued
        //terminar la exportacion de datos en espesifico desde la pagina del siap.
   
 	   $peren ="anio=2018&nivel=3&delegacion=16&distrito=-1&municipio=52&mes=10&moda=3&ciclo=1&tipoprograma=0&consultar=si";
       $station_info = file_get_contents($siap.$peren);
 
       //aquí te regresa la datos de la página y debes verificar como viene la información
 		$_POST['variable']=$station_info;
       //regresa un json
       echo $station_info;
       echo"<script>\n";
       echo "var_js='".$_POST['variable']."'\n";
       echo"</script>\n";

//$valor_sesion = $_SESSION["var_sesion"];
//echo $valor_sesion;	
      ?>
<!DOCTYPE html>
<html lang="es">
<head>
	<title></title>
	<script type="text/javascript">
		var siap = [ <?php echo $variable;?> ]
      </script>

</head>
<body>
	
      
</body>
</html>




