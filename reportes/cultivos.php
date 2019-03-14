<!doctype html>
<html lang="es">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <title>Reporte de Cultivos</title>
</head>
<body>
  <div class="container">
    <img src="../imagenes/Reporte22.png" alt="responsive image" class="img-fluid">
    <tr>
      <p></p>
    </tr>
    <div class="Row">
      <div class="container">
        <form name="ResumenTodosForm" method="post" action="http://infosiap.siap.gob.mx:8080/agricola_siap_gobmx/ResumenDelegacion.do" target="_self">
          <table class="table" align="center">
            <tbody><tr>
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
                    Información
                    <br>
                    <input type="radio" name="nivel" value="1" checked="checked" onclick="javascript:noconsultar();">Estatal
                    <input type="radio" name="nivel" value="2" onclick="javascript:noconsultar();">Distrital
                    <input type="radio" name="nivel" value="3" onclick="javascript:noconsultar();">Municipal
                    <br>
                    <!-- delegacion -->
                    Estado
                    <select name="delegacion" onchange="javascript:noconsultar();"><option value="1" selected="selected">Aguascalientes                     </option>
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
                              <span class="glyphicon glyphicon-print" aria-hidden="true"></span>
                              Imprimir
                            </button>
                            <button class="btn btn-default" type="button" onclick="javascript:excel();">
                              <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>
                              Descargar
                            </button>
                          </th>
                        </tr>
                      </tbody></table>
                    </form>

                  </div>



                </div>

              </div>

              <!-- Optional JavaScript -->
              <!-- jQuery first, then Popper.js, then Bootstrap JS -->
              <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
              <script src="generalsiap.js"></script>

            </body>
            </html>
