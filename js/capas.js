/*
 * --------Obener layers de los servicios de manera dinamica----
 * 
 */

            var legendLayers = [];
            var toc;
            var contador = 0;
            var Existe = false;

            function agregarMenuCapa(id) {

                contador = contador + 1;
                var layerSeleccion = id;

                for (var i = 0; i < legendLayers.length; i++) {
                    if (legendLayers[i].id == id) {
                        Existe = true;
                        break;
                    }
                    else
                        Existe = false;

                }
                if (!Existe) {
                    switch (layerSeleccion) {

                        case "geologicos":        
                       
                            var geologicoslayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer", { id: "geologicos" });
                            //var div2 = " <div class='divCapas' title=''>" + geologicoslayer.id + "<img id='geologicos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                             var div2 = " <div class='divCapas' title=''><span id='geologicos_title'>" + "Geológicos" + "</span> <img id='geologicos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: geologicoslayer, collapsed: false, slider: true });

                        break;

                        case "hidros":
                            
                            var hidroslayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer", { id: "hidros" });
                            //var div2 = " <div class='divCapas' title=''>" + hidroslayer.id + "<img id='hidros' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Hidrometereológicos" + "<img id='hidros' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: hidroslayer, collapsed: false, slider: true });
                     
                        break;

                        case "quimicos":
                
                            var quimilayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Quimico_Tecnologico/MapServer", { id: "quimicos" });
                            //var div2 = " <div class='divCapas' title=''>" + quimilayer.id + "<img id='quimicos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Químico-Tecnológicos"+ "<img id='quimicos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: quimilayer, collapsed: false, slider: true });
                   
                        break;

                        case "sanitarios":
             
                            var sanilayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/SanitarioEcologicos/MapServer", { id: "sanitarios" });
                            //var div2 = " <div class='divCapas' title=''>" + sanilayer.id + "<img id='sanitarios' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Sanitario-Ecológicos" + "<img id='sanitarios' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: sanilayer, collapsed: false, slider: true });
                  
                        break;

                        case "expuesto":
             
                            var explayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Sistema_Expuesto/MapServer", { id: "expuesto" });
                            //var div2 = " <div class='divCapas' title=''>" + explayer.id + "<img id='expuesto' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Sistema Expuesto" + "<img id='expuesto' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: explayer, collapsed: false, slider: true });
                  
                        break;

                        case "indicadores":
             
                            var indilayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Indicadores/MapServer", { id: "indicadores" });
                            //var div2 = " <div class='divCapas' title=''>" + indilayer.id + "<img id='indicadores' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Indicadores" + "<img id='indicadores' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: indilayer, collapsed: false, slider: true });
                  
                        break;
						
						case "reguladores":
             
                            var regulalayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Sistemas_Reguladores/MapServer", { id: "reguladores" });
                            //var div2 = " <div class='divCapas' title=''>" + regulalayer.id + "<img id='reguladores' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Sistemas Reguladores" + "<img id='reguladores' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: regulalayer, collapsed: false, slider: true });
                  
                        break;

                        case "anri":

                            var anrilayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/ANRI1/MapServer", { id: "anri" });
                            //var div2 = " <div class='divCapas' title=''>" + anrilayer.id + "<img id='anri' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Atlas Nacional de Riesgos por Inundaci&oacute;n (CONAGUA)"+ "<img id='anri' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: anrilayer, collapsed: false, slider: true });

                        break;

                        case "eventos":
             
                            var eventoslayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Eventos/MapServer", { id: "eventos" });
                            //var div2 = " <div class='divCapas' title=''>" + eventoslayer.id + "<img id='eventos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Eventos" + "<img id='eventos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: eventoslayer, collapsed: false, slider: true });
                  
                        break;

                        case "basicos":

                            var basicosLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer", { id: "basicos" });
                            //var div2 = " <div class='divCapas' title=''>" + basicosLayer.id + "<img id='basicos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Datos B&aacute;sicos" + "<img id='basicos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: basicosLayer, collapsed: false, slider: true });

                        break;

                        case "socio":

                            var sociolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Sociorganizativos/MapServer", { id: "socio" });
                            //var div2 = " <div class='divCapas' title=''>" + sociolayer.id + "<img id='socio' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Socio-Organizativos" + "<img id='socio' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: sociolayer, collapsed: false, slider: true });

                        break;

                        case "cambioClima":

                            var cambioClimalayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/CambioClimatico/MapServer", { id: "cambioClima" });
                            //var div2 = " <div class='divCapas' title=''>" + cambioClimalayer.id + "<img id='cambioClima' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Escenarios de Cambio Clim&aacute;tico" + "<img id='cambioClima' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: cambioClimalayer, collapsed: false, slider: true });

                        break;                        

                        /*Estados*/

                        case "aguascalientes":

                            aguaslayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAAguascalientes/MapServer", { id: "aguascalientes" });
                            //var div2 = " <div class='divCapas' title=''>" + aguaslayer.id + "<img id='aguascalientes' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Aguascalientes" + "  <img id='aguascalientes' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(22.0405661,-102.355039, 10)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: aguaslayer, collapsed: false, slider: true });

                        break;

                        case "bajaCalifornia":

                            bajalayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MapaBajaCalifornia/MapServer", { id: "bajaCalifornia" });
                            //var div2 = " <div class='divCapas' title=''>" + bajalayer.id + "<img id='bajaCalifornia' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Baja California" + "  <img id='bajaCalifornia' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(30.1217185,-114.3003307, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: bajalayer, collapsed: false, slider: true });

                        break;

                        case "bajaCaliforniaSur":

                            bajasurlayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MapaBajaCaliforniaSur/MapServer", { id: "bajaCaliforniaSur" });
                            //var div2 = " <div class='divCapas' title=''>" + bajasurlayer.id + "<img id='bajaCaliforniaSur' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Baja California Sur" + "  <img id='bajaCaliforniaSur' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(25.5354195,-112.2695307, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: bajasurlayer, collapsed: false, slider: true });

                        break;

                        case "campeche":

                            campechelayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPACampeche/MapServer", { id: "campeche" });
                            //var div2 = " <div class='divCapas' title=''>" + campechelayer.id + "<img id='campeche' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Campeche" + "  <img id='campeche' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.0160839,-90.6477069, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: campechelayer, collapsed: false, slider: true });

                        break;

                        case "coahuila":

                            coahuilalayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPACoahuila/MapServer", { id: "coahuila" });
                            //var div2 = " <div class='divCapas' title=''>" + coahuilalayer.id + "<img id='coahuila' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Coahuila" + "  <img id='coahuila' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(27.2790818,-101.7875443, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: coahuilalayer, collapsed: false, slider: true });

                        break;

                        case "colima":

                            colimalayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MapaColima/MapServer", { id: "colima" });
                            //var div2 = " <div class='divCapas' title=''>" + colimalayer.id + "<img id='colima' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Colima" + "  <img id='colima' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.0984307,-104.0888364, 10)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: colimalayer, collapsed: false, slider: true });

                        break;

                        case "chiapas":

                            chiapaslayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAChiapas/MapServer", { id: "chiapas" });
                            //var div2 = " <div class='divCapas' title=''>" + chiapaslayer.id + "<img id='chiapas' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Chiapas" + "  <img id='chiapas' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(16.272694,-92.3174159, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: chiapaslayer, collapsed: false, slider: true });

                        break;

                        case "chihuahua":

                            chihuahualayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAChihuahua/MapServer", { id: "chihuahua" });
                            //var div2 = " <div class='divCapas' title=''>" + chihuahualayer.id + "<img id='chihuahua' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Chihuahua" + "  <img id='chihuahua' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(28.6722468,-106.186553, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: chihuahualayer, collapsed: false, slider: true });

                        break;

                        case "cdmexico":

                            cdmexicolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAdf/MapServer", { id: "cdmexico" });
                            //var div2 = " <div class='divCapas' title=''>" + cdmexicolayer.id + "<img id='cdmexico' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Ciudad de M&eacute;xico" + "  <img id='cdmexico' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.3200364,-99.1521278, 11)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: cdmexicolayer, collapsed: false, slider: true });

                        break;

                        case "durango":

                            durangolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPADurango/MapServer", { id: "durango" });
                            //var div2 = " <div class='divCapas' title=''>" + durangolayer.id + "<img id='durango' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Durango" + "  <img id='durango' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(24.3146992,-104.7032648, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: durangolayer, collapsed: false, slider: true });

                        break;

                        case "guanajuato":

                            guanajuatolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAGuanajuato/MapServer", { id: "guanajuato" });
                            //var div2 = " <div class='divCapas' title=''>" + guanajuatolayer.id + "<img id='guanajuato' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Guanajuato" + "  <img id='guanajuato' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(20.8757536,-100.8839802, 9)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: guanajuatolayer, collapsed: false, slider: true });

                        break;

                        case "guerrero":

                            guerrerolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAGuerrero/MapServer", { id: "guerrero" });
                            //var div2 = " <div class='divCapas' title=''>" + guerrerolayer.id + "<img id='guerrero' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Guerrero" + "  <img id='guerrero' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(17.6009455,-100.0949411, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: guerrerolayer, collapsed: false, slider: true });


                        break;

                        case "hidalgo":

                            hidalgolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAHidalgo/MapServer", { id: "hidalgo" });
                            //var div2 = " <div class='divCapas' title=''>" + hidalgolayer.id + "<img id='hidalgo' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Hidalgo" + "  <img id='hidalgo' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(20.4972412,-98.9243423, 9)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: hidalgolayer, collapsed: false, slider: true });

                        break;

                        case "jalisco":

                            jaliscolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAJalisco/MapServer", { id: "jalisco" });
                            //var div2 = " <div class='divCapas' title=''>" + jaliscolayer.id + "<img id='jalisco' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Jalisco" + "  <img id='jalisco' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(20.8375717,-103.6022721, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: jaliscolayer, collapsed: false, slider: true });

                        break;

                        case "edoMexico":

                            edoMexicolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAEdoMex/MapServer", { id: "edoMexico" });
                            //var div2 = " <div class='divCapas' title=''>" + edoMexicolayer.id + "<img id='edoMexico' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Estado de M&eacute;xico" + "  <img id='edoMexico' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.3253627,-99.6045803, 9)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: edoMexicolayer, collapsed: false, slider: true });

                        break;

                        case "michoacan":

                            michoacanlayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAMichoacan/MapServer", { id: "michoacan" });
                            //var div2 = " <div class='divCapas' title=''>" + michoacanlayer.id + "<img id='michoacan' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Michoacán" + "  <img id='michoacan' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.1535204,-101.9006079, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: michoacanlayer, collapsed: false, slider: true });

                        break;

                        case "morelos":

                            moreloslayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAMorelos/MapServer", { id: "morelos" });
                            //var div2 = " <div class='divCapas' title=''>" + moreloslayer.id + "<img id='morelos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Morelos" + "  <img id='morelos' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(18.7318963,-99.0633631, 10)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: moreloslayer, collapsed: false, slider: true });

                        break;

                        case "nayarit":

                            nayaritlayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPANayarit/MapServer", { id: "nayarit" });
                            //var div2 = " <div class='divCapas' title=''>" + nayaritlayer.id + "<img id='nayarit' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Nayarit" + "  <img id='nayarit' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(21.8662192,-104.7512976, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: nayaritlayer, collapsed: false, slider: true });

                        break;

                        case "nuevoLeon":

                            nuevoLeonlayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPANuevoLeon/MapServer", { id: "nuevoLeon" });
                            //var div2 = " <div class='divCapas' title=''>" + nuevoLeonlayer.id + "<img id='nuevoLeon' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Nuevo Le&oacute;n" + "  <img id='nuevoLeon' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(25.4669119,-99.7756989, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: nuevoLeonlayer, collapsed: false, slider: true });

                        break;

                        case "oaxaca":

                            oaxacalayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAOaxaca/MapServer", { id: "oaxaca" });
                            //var div2 = " <div class='divCapas' title=''>" + oaxacalayer.id + "<img id='oaxaca' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Oaxaca" + "  <img id='oaxaca' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(17.1577833,-96.2099322, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: oaxacalayer, collapsed: false, slider: true });

                        break;

                        case "puebla":

                            pueblalayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MapaPuebla/MapServer", { id: "puebla" });
                            //var div2 = " <div class='divCapas' title=''>" + pueblalayer.id + "<img id='puebla' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Puebla" + "  <img id='puebla' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.3507403,-97.8971323, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: pueblalayer, collapsed: false, slider: true });

                        break;

                        case "queretaro":

                            queretarolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAQueretaro/MapServer", { id: "queretaro" });
                            //var div2 = " <div class='divCapas' title=''>" + queretarolayer.id + "<img id='queretaro' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Quer&eacute;taro" + "  <img id='queretaro' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(20.8430849,-99.821474, 9)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: queretarolayer, collapsed: false, slider: true });

                        break;

                        case "quintanaRoo":

                            quintanaRoolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MapaQuintanaRoo/MapServer", { id: "quintanaRoo" });
                            //var div2 = " <div class='divCapas' title=''>" + quintanaRoolayer.id + "<img id='quintanaRoo' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Quintana Roo" + "  <img id='quintanaRoo' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.7401578,-88.0125033, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: quintanaRoolayer, collapsed: false, slider: true });

                        break;

                        case "sanLuisPotosi":

                            sanluislayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPASanLuisPotosi/MapServer", { id: "sanLuisPotosi" });
                            //var div2 = " <div class='divCapas' title=''>" + sanluislayer.id + "<img id='sanLuisPotosi' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "San Luis Potos&iacute;" + "  <img id='sanLuisPotosi' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(22.8251348,-100.3165623, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: sanluislayer, collapsed: false, slider: true });

                        break;

                        case "sinaloa":


                            guanajuatolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPASinaloa/MapServer", { id: "sinaloa" });
                            //var div2 = " <div class='divCapas' title=''>" + guanajuatolayer.id + "<img id='sinaloa' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Sinaloa" + "  <img id='sinaloa' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(24.7541857,-107.4199703, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: guanajuatolayer, collapsed: false, slider: true });

                        break;

                        case "sonora":

                            sonoralayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPASonora/MapServer", { id: "sonora" });
                            //var div2 = " <div class='divCapas' title=''>" + sonoralayer.id + "<img id='sonora' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Sonora" + "  <img id='sonora' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(29.4067974,-111.7381018, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: sonoralayer, collapsed: false, slider: true });

                        break;

                        case "tabasco":

                            tabascolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPATabasco/MapServer", { id: "tabasco" });
                            //var div2 = " <div class='divCapas' title=''>" + tabascolayer.id + "<img id='tabasco' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Tabasco" + "  <img id='tabasco' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(17.94917,-92.5533447, 9)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: tabascolayer, collapsed: false, slider: true });

                        break;

                        case "tamaulipas":

                            tamaulipaslayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPATamaulipas/MapServer", { id: "tamaulipas" });
                            //var div2 = " <div class='divCapas' title=''>" + tamaulipaslayer.id + "<img id='tamaulipas' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Tamaulipas" + "  <img id='tamaulipas' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(24.9435236,-98.6440788, 7)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: tamaulipaslayer, collapsed: false, slider: true });

                        break;

                        case "tlaxcala":

                            tlaxcalalayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPATlaxcala/MapServer", { id: "tlaxcala" });
                            //var div2 = " <div class='divCapas' title=''>" + tlaxcalalayer.id + "<img id='tlaxcala' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Tlaxcala" + "  <img id='tlaxcala' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.4161981,-98.1689873, 10)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: tlaxcalalayer, collapsed: false, slider: true });

                        break;

                        case "veracruz":

                            veracruzlayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAVeracruz/MapServer", { id: "veracruz" });
                            //var div2 = " <div class='divCapas' title=''>" + veracruzlayer.id + "<img id='veracruz' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Veracruz" + "  <img id='veracruz' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(19.6105435,-95.7455212, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: veracruzlayer, collapsed: false, slider: true });

                        break;

                        case "yucatan":

                            yucatanlayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAYucatan/MapServer", { id: "yucatan" });
                            //var div2 = " <div class='divCapas' title=''>" + yucatanlayer.id + "<img id='yucatan' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Yucat&aacute;n" + "  <img id='yucatan' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(20.5805196,-88.9702046, 9)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: yucatanlayer, collapsed: false, slider: true });

                        break;

                        case "zacatecas":

                            zacatecaslayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Estados/MAPAZacatecas/MapServer", { id: "zacatecas" });
                            //var div2 = " <div class='divCapas' title=''>" + zacatecaslayer.id + "<img id='zacatecas' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            var div2 = " <div class='divCapas' title=''>" + "Zacatecas" + "  <img id='zacatecas' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/>" + "  <img title='Acercar'src='imagenes/lupa.png' class='imgCapas' onclick='zoomIntoPoint(23.0831271,-102.5352127, 8)'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: zacatecaslayer, collapsed: false, slider: true });

                        break;

                        /*Fin Estados*/

                        case "noroeste":        
                       
                            var noroestelayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/Municipios/REG_NOROESTE/MapServer", { id: "noroeste" });
                            //var div2 = " <div class='divCapas' title=''>" + noroestelayer.id + "<img id='noroeste' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                             var div2 = " <div class='divCapas' title=''>" + "Noroeste" + "<img id='noroeste' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: noroestelayer, collapsed: false, slider: true });

                        break;

                        case "noreste":        
                       
                            var norestelayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/Municipios/REG_NORESTE/MapServer", { id: "noreste" });
                            //var div2 = " <div class='divCapas' title=''>" + norestelayer.id + "<img id='noreste' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                             var div2 = " <div class='divCapas' title=''>" + "Noreste" + "<img id='noreste' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: norestelayer, collapsed: false, slider: true });

                        break;

                        case "occidente":        
                       
                            var occidentelayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/Municipios/REG_OCCIDENTE/MapServer", { id: "occidente" });
                            //var div2 = " <div class='divCapas' title=''>" + occidentelayer.id + "<img id='occidente' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                             var div2 = " <div class='divCapas' title=''>" + "Occidente" + "<img id='occidente' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: occidentelayer, collapsed: false, slider: true });

                        break;

                        case "centro":        
                       
                            var centrolayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/Municipios/REG_CENTRO/MapServer", { id: "centro" });
                            //var div2 = " <div class='divCapas' title=''>" + centrolayer.id + "<img id='centro' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                             var div2 = " <div class='divCapas' title=''>" + "Centro" + "<img id='centro' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: centrolayer, collapsed: false, slider: true });

                        break;

                        case "sureste":        
                       
                            var surestelayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/Municipios/REG_SUR/MapServer", { id: "sureste" });
                            //var div2 = " <div class='divCapas' title=''>" + surestelayer.id + "<img id='sureste' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                             var div2 = " <div class='divCapas' title=''>" + "Sureste" + "<img id='sureste' title='Eliminar servicio' class='imgCapas' onclick='EliminarServicio(id)' src='imagenes/eliminar.png'/></div>";
                            legendLayers.push({ id: id, title: div2,layer: surestelayer, collapsed: false, slider: true });

                        break;


                    }

                    Agregarcapas();
                   
                }
                else {
                    //alert("El servicio ya se encuentra en la ventana de contenido");
                    Existe = false;
                }
            }


            function Agregarcapas() {
                //abrirVentanaContenido();
            //    esri.show(dojo.byId("loading1"));
                require([
                    "esri/map",
                  //  "esri/InfoTemplate",
                    "dojo/fx",
                    "agsjs/dijit/TOC",
                    "dojo/domReady!"
                ], function (Map, fx, TOC) {
                    dojo.connect(map, 'onLayersAddResult', function (results) {
                        if (contador == 1) {
                            toc = new TOC({
                                map: map,
                                layerInfos: legendLayers

                            }, "tocDiv");
                            toc.startup();
                            toc.on("load", function(){
                                capasDefault.forEach(function(capa){
                                    if(map.getLayer(capa["serviceId"])) map.removeLayer(map.getLayer(capa["serviceId"]));
                                    var evt = new CustomEvent('capa-agregada', { 'detail': capa });
                                    document.dispatchEvent(evt);
                                });

                                capasDefault = [];
                            });
                            
                        }
                        else {
                            toc.layerInfos = legendLayers;
                            toc.refresh();
                            //alert('Cargando2!');                            
                        }
                        
                        //esri.hide(dojo.byId("loading1"));
                      
                    });

                    for (var i = 0; i < legendLayers.length; i++) {
                        map.addLayers([legendLayers[i].layer]);
                        //alert('Layer!');

                        //Imagen para indicar que se estan cargando los servicios
                        legendLayers[i].layer.on("update-start", function(){
                          document.getElementById("Img0").style.visibility = "visible";
                        });
                        legendLayers[i].layer.on("error", function(){
                          document.getElementById("Img0").style.visibility = "hidden";
                        });
                        legendLayers[i].layer.on("update-end", function(){
                            document.getElementById("Img0").style.visibility = "hidden";
                            $( ".zoomLayer" ).unbind();
                            $('.zoomLayer').click(function(evt){
                                if(this.id){
                                    zoomLayer(this.id);
                                }
                            });
                        });
                    }
                    //alert('Ventana!');
                });

            }

            function zoomIntoPoint(lat, long, zoom){
              home.home().then(function(){
                var point = new esri.geometry.Point({
                    latitude: lat,
                    longitude: long
                });
                map.centerAndZoom(point, zoom);
                document.getElementById("Img1").style.visibility = "hidden";
              }, function(err){
                console.log("Hubo un Error en el zoom :( : " + err);

                zoomIntoPoint(lat, long, zoom);

              });
            }


            function EliminarServicio(id) {
                if(serviciosEncendidos[id] && serviciosEncendidos[id]["capas"].length > 0 ){
                    serviciosEncendidos[id]["capas"].forEach(function(idx){
                        map.removeLayer(map.getLayer(id + "_layer" + idx))
                    })
                }

                if(serviciosEncendidos[id]) delete serviciosEncendidos[id];
                for (var i = 0; i < legendLayers.length; i++) {
                    if (legendLayers[i].id == id) {
                        map.removeLayer(legendLayers[i].layer);
                        legendLayers.splice(i, 1);
                        toc.layerInfos = legendLayers
                        toc.refresh();
                        break;
                    }
                }
            }
