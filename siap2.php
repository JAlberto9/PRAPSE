<?php
    //$ch = curl_init();
    $url = 'http://infosiap.siap.gob.mx:8080/agricola_siap_gobmx/ResumenDelegacion.do';
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADER, false);
    $response = curl_exec($curl);
    curl_close($curl);

    echo $response;



?>
