<html>
    <head>
        <!-- Meta Tags -->
        <meta charset='UTF-8'>
        <meta content='IE=edge' http-equiv='X-UA-Compatible'>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Resumen por cultivo</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <!-- CSS GobMX -->
        <link href="https://framework-gb.cdn.gob.mx/favicon.ico" rel="shortcut icon">
        <link href="https://framework-gb.cdn.gob.mx/assets/styles/main.css" rel="stylesheet">
        <!-- Respond.js soporte de media queries para Internet Explorer 8 -->
        <!-- ie8.js EventTarget para cada nodo en Internet Explorer 8 -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/ie8/0.2.2/ie8.js"></script>
        <![endif]-->

        <!-- Custom CSS-->
        <link href="http://www.campomexicano.gob.mx/lib_gobmx/css/custom.css" rel="stylesheet">

        <script  language="JavaScript" type="text/javascript">
            function imprimir(elemento) {
                var consulta = document.getElementById(elemento).innerHTML;

                var win = window.open();
                self.focus();
                win.document.open();
                win.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"   "http://www.w3.org/TR/html4/loose.dtd">');
                win.document.write('<HTML><HEAD>');
                win.document.write('<link href="https://framework-gb.cdn.gob.mx/assets/styles/main.css" rel="stylesheet">');
                win.document.write('</HEAD>');
                win.document.write('<BODY>');
                win.document.write(consulta);
                win.document.write('</BODY></HTML>');
                win.document.close();
            }


            function noconsultar() {
                nivel = document.ResumenTodosForm.nivel.value;

                //if ( nivel > 1 ) {
                document.ResumenTodosForm.consultar.value = "no";
                document.ResumenTodosForm.submit();
                //}
            }

            function bloqueaCombo() {
                nivel = document.ResumenTodosForm.nivel.value;
                //alert(nivel);

                /*if ( nivel == 1 )
                 document.ResumenTodosForm.delegacion.disabled= false;
                 else
                 document.ResumenTodosForm.delegacion.disabled= true;*/
            }

	    function inyectaCodigo() {

                setTimeout(function () {
                    w3IncludeHTML();

                }, 300);

                setTimeout(function () {
                    $("li.active").html($("title").html());
                    $('a[href="https://www.gob.mx/accesibilidad"]').html('Declaraci&oacute;n de Accesibilidad');
                    $('a[href="https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54"]').html('Denuncia contra servidores p&uacute;blicos');
                    $('p').each(function () {
                        $(this).html($(this).html().replace('Ã³', '&oacute;'));
                    });
		    $("body *").html(function(buscayreemplaza, reemplaza) {
			return reemplaza.replace('Fuente: Elaborado por el Servicio de Informaciï¿½n Agroalimentaria y Pesquera (SIAP).', 'Fuente: Servicio de Informaciï¿½n Agroalimentaria y Pesquera (SIAP).');
                    });
$("body *").html(function(buscayreemplaza, reemplaza) {
                        return reemplaza.replace('Elaborado por el Servicio de Informaciï¿½n Agroalimentaria y Pesquera (SIAP).', 'Fuente: Servicio de Informaciï¿½n Agroalimentaria y Pesquera (SIAP).');
                    });

                }, 500);

            }

            setInterval(function(){ $(".textoTablaPie").html("Datos Preliminares.<br/>Fuente: Elaborado por el Servicio de Informaciï¿½n Agroalimentaria y Pesquera (SIAP)."); }, 3000);
        </script>

    </head>
    <body onload="Javascript: bloqueaCombo();inyectaCodigo();">
    <style>
            .alert {
                margin-top: 47px;
            }
    </style>
    <header>
        <!-- Submenu navegacion -->
        <div w3-include-html="http://www.campomexicano.gob.mx/lib_gobmx/menu.php"></div>
    </header>
    <!-- Main -->
    <main class="inner-page interior ficha" tabindex="-1">


        <div class="container">
            <!-- Breadcrumb -->
            <div w3-include-html="http://www.campomexicano.gob.mx/lib_gobmx/breadcrumb.php"></div>

            <!-- Contenido -->
            <form name="ResumenTodosForm" method="post" action="/agricola_siap_gobmx/ResumenDelegacion.do;jsessionid=26EF0B6EF7CAA2849BC91CEFBDB2C7C9">
                <table class="table" align="center">
                    <tr>
                        <th colspan="4" style="text-align: center;">
                            <h2>Avance de Siembras y Cosechas<br>
                                Resumen por cultivo</h2>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <select name="anio" size="5"><option value="2004">2004</option>
<option value="2005">2005</option>
<option value="2006">2006</option>
<option value="2007">2007</option>
<option value="2008">2008</option>
<option value="2009">2009</option>
<option value="2010">2010</option>
<option value="2011">2011</option>
<option value="2012">2012</option>
<option value="2013">2013</option>
<option value="2014">2014</option>
<option value="2015">2015</option>
<option value="2016">2016</option>
<option value="2017">2017</option>
<option value="2018">2018</option>
<option value="2019" selected="selected">2019</option></select>
                        </td>
                        <td>
                            <!-- nivel de publicacion -->
                            Informaci&oacute;n
                            <br>
                            <input type="radio" name="nivel" value="1" checked="checked" onclick="javascript:noconsultar();">Estatal
                            <input type="radio" name="nivel" value="2" onclick="javascript:noconsultar();">Distrital
                            <input type="radio" name="nivel" value="3" onclick="javascript:noconsultar();">Municipal
                            <br>
                            <!-- delegacion -->
                            Estado
                            <select name="delegacion" onchange="javascript:noconsultar();"><option value="1">Aguascalientes                     </option>
<option value="2">Baja California                    </option>
<option value="3">Baja California Sur                </option>
<option value="4">Campeche                           </option>
<option value="5">Coahuila                           </option>
<option value="6">Colima                             </option>
<option value="7">Chiapas                            </option>
<option value="8">Chihuahua                          </option>
<option value="9">Ciudad de México                   </option>
<option value="10">Durango                            </option>
<option value="11">Guanajuato                         </option>
<option value="12">Guerrero                           </option>
<option value="13">Hidalgo                            </option>
<option value="14">Jalisco                            </option>
<option value="15">México                             </option>
<option value="16">Michoacán                          </option>
<option value="17">Morelos                            </option>
<option value="18">Nayarit                            </option>
<option value="19">Nuevo León                         </option>
<option value="20">Oaxaca                             </option>
<option value="21">Puebla                             </option>
<option value="22">Querétaro                          </option>
<option value="23">Quintana Roo                       </option>
<option value="24">San Luis Potosí                    </option>
<option value="25">Sinaloa                            </option>
<option value="26">Sonora                             </option>
<option value="27">Tabasco                            </option>
<option value="28">Tamaulipas                         </option>
<option value="29">Tlaxcala                           </option>
<option value="30">Veracruz                           </option>
<option value="31">Yucatán                            </option>
<option value="32">Zacatecas                          </option></select>
                            <br>
                            <!-- combo distrito -->

                            <br>
                            <!-- combo municipio -->

                        </td>

                        <td>
                            <select name="mes"><option value="1" selected="selected">ENERO</option>
<option value="2">FEBRERO</option>
<option value="3">MARZO</option>
<option value="4">ABRIL</option>
<option value="5">MAYO</option>
<option value="6">JUNIO</option>
<option value="7">JULIO</option>
<option value="8">AGOSTO</option>
<option value="9">SEPTIEMBRE</option>
<option value="10">OCTUBRE</option>
<option value="11">NOVIEMBRE</option>
<option value="12">DICIEMBRE</option></select>
                            <br>
                            <select name="moda"><option value="1">RIEGO</option>
<option value="2">TEMPORAL</option>
<option value="3" selected="selected">RIEGO+TEMPORAL</option></select>
                            <br>
                            <select name="ciclo"><option value="1" selected="selected">OTOÑO-INVIERNO</option>
<option value="2">PRIMAVERA-VERANO</option>
<option value="3">PERENNES</option>
<option value="4">AÑO AGRICOLA</option></select>
                        </td>
                        <td style="display:none">
                            <input type="radio" name="tipoprograma" value="0" checked="checked" onchange="javascript:noconsultar();">Sin Programa
                            <br>
                            <input type="radio" name="tipoprograma" value="1" onchange="javascript:noconsultar();">Incluir el Programa
                            <br>
                            <input type="radio" name="tipoprograma" value="2" onchange="javascript:noconsultar();">Solo el Programa
                        </td>
                    </tr>
                    <tr>
                        <th colspan="4" style="text-align: center;">
                            <input type="submit" value="Consultar" class="btn btn-primary">
                            <input type="hidden" name="consultar" value="si">
                            <button class="btn btn-default" type="button" onclick="javascript:imprimir('divResultados');">
                                <span class="glyphicon glyphicon-print" aria-hidden="true" ></span>
                                Imprimir
                            </button>
                            <button class="btn btn-default" type="button" onclick="javascript:excel();">
                                <span class="glyphicon glyphicon-download-alt" aria-hidden="true" ></span>
                                Descargar
                            </button>
                        </th>
                    </tr>
                </table>
            </form>
            <hr class="red">

            <!-- Impresion -->
            <!--EGP <div id="divImpresion">
                <table width="100%" border="0" cellpadding="0">
                    <tr>
                        <td width="100%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td>
                                <img src="img/ayuda.gif" width="32" height="32" onclick="javascript:ayuda();">
                            </td>
                            <td>
                                <img src="img/impresion2.jpg" width="32" height="32" onclick="javascript:imprimir('divResultados');"/>
                            </td>
                        <td>
                            <img src="img/excel-ico.gif" width="32" height="32" onclick="javascript:excel();"/>
                        </td>
                    </tr>
                </table>
            </div>  EGP-->

            <!-- Excel -->
            <form name="Excel" method="POST" action="">
                <input name="contenido" type="hidden" id="contenido" />
            </form>

            <div id="divResultados">
                <div id='0'><!-- BRIOMATIC -->
<div align=center><div class=textoTablaTitulo>Avance de siembras y cosechas</div></div><BR><div align=center><div class=textoTablaSubTitulo2>OTOÑO-INVIERNO      <br>2019<br>RIEGO+TEMPORAL</div></div><BR><BR><BR><TABLE BORDER=0 WIDTH=90% ALIGN=CENTER><TR> <TD WIDTH=100% ALING=LEFT><div class=textoTablaSubTitulo2>Situación al 31 de ENERO de 2019</div> </TD> <TD NOWRAP="NOWRAP"><div class=textoTablaSubTitulo2>RESUMEN NACIONAL                        </div> </TD></TR></TABLE><table class='table table-responsive table-striped table-bordered'>
<tr>
<th rowspan="2" scope="col">Producto</th>
<th colspan="3" scope="col">Superficie (ha) </th><th colspan="1" scope="col">Producción (ton)</th><th colspan="1" scope="col">Rendimiento (ton/ha)</th></tr>
<tr>
<th>sembrada</th>
<th>siniestrada</th>
<th>cosechada</th>
<th>obtenida</th>
<th>obtenido</th>
</tr>
<tr>
<td>AJO</td><td align=right>5,910</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>AJONJOLI</td><td align=right>8,132</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>ARROZ PALAY</td><td align=right>8,392</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>AVENA FORRAJERA EN VERDE</td><td align=right>77,861</td><td align=right>1,060</td><td align=right>1,466</td><td align=right>41,332</td><td align=right>28.194</td></tr>
<tr>
<td>AVENA GRANO</td><td align=right>1,826</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>BERENJENA</td><td align=right>2,089</td><td align=right></td><td align=right>1,140</td><td align=right>44,487</td><td align=right>39.024</td></tr>
<tr>
<td>BROCOLI</td><td align=right>15,243</td><td align=right></td><td align=right>847</td><td align=right>15,050</td><td align=right>17.768</td></tr>
<tr>
<td>CALABACITA</td><td align=right>9,528</td><td align=right>40</td><td align=right>2,759</td><td align=right>54,426</td><td align=right>19.724</td></tr>
<tr>
<td>CARTAMO</td><td align=right>15,704</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>CEBADA GRANO</td><td align=right>44,320</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>CEBOLLA</td><td align=right>18,038</td><td align=right></td><td align=right>2,121</td><td align=right>39,137</td><td align=right>18.452</td></tr>
<tr>
<td>CHILE VERDE</td><td align=right>30,352</td><td align=right>2,442</td><td align=right>4,850</td><td align=right>163,743</td><td align=right>33.762</td></tr>
<tr>
<td>COLIFLOR</td><td align=right>1,314</td><td align=right></td><td align=right>80</td><td align=right>1,669</td><td align=right>20.732</td></tr>
<tr>
<td>CRISANTEMO  (Gruesa)</td><td align=right>426</td><td align=right></td><td align=right>55</td><td align=right>269,150</td><td align=right>4,893.636</td></tr>
<tr>
<td>ELOTE</td><td align=right>20,832</td><td align=right>104</td><td align=right>1,635</td><td align=right>22,397</td><td align=right>13.702</td></tr>
<tr>
<td>FRESA</td><td align=right>10,127</td><td align=right></td><td align=right>7,133</td><td align=right>104,469</td><td align=right>14.646</td></tr>
<tr>
<td>FRIJOL</td><td align=right>216,320</td><td align=right>565</td><td align=right>8,308</td><td align=right>12,414</td><td align=right>1.494</td></tr>
<tr>
<td>GARBANZO GRANO</td><td align=right>67,484</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>GLADIOLA (Gruesa)</td><td align=right>1,036</td><td align=right></td><td align=right>82</td><td align=right>36,450</td><td align=right>443.971</td></tr>
<tr>
<td>LECHUGA</td><td align=right>7,897</td><td align=right>30</td><td align=right>1,598</td><td align=right>36,540</td><td align=right>22.863</td></tr>
<tr>
<td>MAIZ FORRAJERO EN VERDE</td><td align=right>4,264</td><td align=right>90</td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>MAIZ GRANO</td><td align=right>948,769</td><td align=right>1,330</td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>MELON</td><td align=right>7,683</td><td align=right>158</td><td align=right>1,336</td><td align=right>30,782</td><td align=right>23.045</td></tr>
<tr>
<td>PAPA</td><td align=right>22,691</td><td align=right>1,068</td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>PEPINO</td><td align=right>7,558</td><td align=right>12</td><td align=right>2,320</td><td align=right>86,676</td><td align=right>37.354</td></tr>
<tr>
<td>SANDIA</td><td align=right>17,832</td><td align=right>421</td><td align=right>1,100</td><td align=right>26,278</td><td align=right>23.889</td></tr>
<tr>
<td>SORGO FORRAJERO EN VERDE</td><td align=right>7,656</td><td align=right>7</td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>SORGO GRANO</td><td align=right>341,839</td><td align=right>14</td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>SOYA</td><td align=right>129</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>TABACO</td><td align=right>5,977</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>TOMATE ROJO (JITOMATE)</td><td align=right>19,031</td><td align=right>973</td><td align=right>6,201</td><td align=right>229,058</td><td align=right>36.939</td></tr>
<tr>
<td>TOMATE VERDE</td><td align=right>16,602</td><td align=right>524</td><td align=right>3,258</td><td align=right>79,790</td><td align=right>24.488</td></tr>
<tr>
<td>TRIGO GRANO</td><td align=right>409,681</td><td align=right></td><td align=right></td><td align=right></td><td align=right></td></tr>
<tr>
<td>ZANAHORIA</td><td align=right>3,337</td><td align=right></td><td align=right>36</td><td align=right>1,447</td><td align=right>40.194</td></tr>
<tr><th colspan=1 align=left>TOTAL</th>
<th align=right class=>2,375,880</th><th align=right class=>8,838</th><th align=right class=>46,326</th><th align=right class=></th><th align=right class=></th></tr>
</table>
<table >
<tr><td>
<div class=textoTablaPie>
Datos Preliminares.
<br>
Fuente: Elaborado por el Servicio de Información Agroalimentaria y Pesquera (SIAP), con información de las Delegaciones de la SAGARPA.
</div>
</td></tr>
</table>
<br><br><br>
</div>

            </div>

        </div>
    </main>
    <!-- js w3data -->
    <script src="http://www.campomexicano.gob.mx/lib_gobmx/js/w3data.js"></script>

    <!-- w3IncludeHTML -->
    <script>
                                setTimeout(function () {
                                    w3IncludeHTML();
                                }, 300);

    </script>
    <!-- JS -->
    <script src="https://framework-gb.cdn.gob.mx/gobmx.js"></script>
    <!-- JS-jquery-injection -->
    <script src="http://www.campomexicano.gob.mx/lib_gobmx/js/action.js"></script>
    <script src="./js/general.js"></script>
	<!--<script>$(document).ready(function () {$('option[value=2015]').remove();}); </script>-->
</body>
</html>
