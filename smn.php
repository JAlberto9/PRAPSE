
<?php
    
        $smn = "http://smn.cna.gob.mx/es/?";
        $dsmn = $_GET['dsmn'];
   
 
        $station_info = file_get_contents($smn.$dsmn);
 
      // aquí te regresa la datos de la página y debes verificar como viene la información
 
      // regresa un json
        echo $station_info;

?>


