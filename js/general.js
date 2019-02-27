// JavaScript Document


/******************************************************************************/
/*********************** FUNCIONES DE USO GENERAL *****************************/
/******************************************************************************/

// imprime el contenido de la cosnulta
function excel() {
    //var consulta= document.getElementById( 'divResultados' ).innerHTML;
    var html = new String();
    //var patron = new RegExp("&Oacute;", "g")

    //html= consulta;

    // quita las imagenes
    consulta = document.getElementById('divResultados').innerHTML;

    // limpiar de acute y tildes
    //html= html.replace(patron, "O");

    document.Excel.action = "imprimir.jsp";
    document.Excel.contenido.value = consulta;
    document.Excel.submit();
}

// restringe controles para el portal del siiap
function verificaControles() {
    var edo = document.Forma.edodef.value;

    if (edo == 0) {
        // solo pon a nivel estatal la informacion
        document.Forma.nivel.options.length = 1;
    } // if
} // funcion


function ayuda() {
    //var win; //= window.open();
    var win = window.open("", "ayuda", "height=200,width=500");
    win.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"   "http://www.w3.org/TR/html4/loose.dtd">');
    win.document.write('<HTML><HEAD>');
    //win.document.write( "<link href='<bean:write name="pagina" property="css"/>' rel='stylesheet' type='text/css' >" );
    //win.document.write( "<link rel='stylesheet' type='text/css' href='./script/sitiop.css' media='print'>" );
    win.document.write('<style type="text/css">');
    win.document.write('<!--');
    win.document.write('.style1 {');
    win.document.write('font-family: Arial, Helvetica, sans-serif;');
    win.document.write('font-size: 12px;');
    win.document.write('text-align: justify;');
    win.document.write('}');
    win.document.write('-->');
    win.document.write('</style>');
    win.document.write('</HEAD>');
    win.document.write('<BODY>');

    win.document.write('<p class="style1">');
    win.document.write('C. Usuarios de la informaci&oacute;n agr&iacute;cola, ');
    win.document.write('</p>');
    //win.document.write( '</td></tr>');
    //win.document.write( '<tr><td>');
    win.document.write('<p class="style1">');
    win.document.write('Estamos cambiando la plataforma informï¿½tica con el objetivo de poner a su disposiciï¿½n la informaciï¿½n de manera dinï¿½mica, mucho se les agradecerï¿½ que nos digan si existe alguna falla al solicitar la informaciï¿½n.');
    win.document.write('</p>');
    //win.document.write( '</td></tr>');
    //win.document.write( '<tr><td>');
    win.document.write('<p class="style1">');
    win.document.write('Por favor cualquier duda o comentario mandarlo al correo: rdominguez@siap.sagarpa.gob.mx');
    win.document.write('</p>');
    //win.document.write( '</td></tr>');
    //win.document.write( '</table>');
    win.document.write('</BODY></HTML>');
    win.document.close();
}
