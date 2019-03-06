<?php
include "simple_html_dom.php";
$nivel = $_POST['nivel'];
$delegacion = $_POST['delegacion'];
$mes = $_POST['mes'];
$moda = $_POST['moda'];
$ciclo = $_POST['ciclo'];

//echo json_encode(.$nivel.$delegacion.$mes.$moda.$ciclo);

$consulta=file_get_html('http://infosiap.siap.gob.mx:8080/agricola_siap_gobmx/ResumenDelegacion.do?'."nivel=".$nivel."delegacion=".$delegacion."mes=".$mes."moda=".$moda."ciclo=".$ciclo);



//$context = stream_context_create($request);
//$html=file_get_html('http://infosiap.siap.gob.mx:8080/agricola_siap_gobmx/ResumenDelegacion.do',true,$context);
//$html1=file_get_html('http://infosiap.siap.gob.mx:8080/agricola_siap_gobmx/ResumenDelegacion.do',true,$context);

//$table=$consulta->find("div#divResultados",0)->outertext;

//echo json_encode($table);
echo $consulta;



//$tableAgri=$html1->find("div#divResultados",0)->outertext;

?>
