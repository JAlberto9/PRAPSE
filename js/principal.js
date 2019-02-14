 /*$.mobile.pagecontainer({defaults: true});
  $.mobile.pagecontainer({
    create: function (event, ui){
      console.log("create:", event.type);

    }
  });
 */

  initializeEsriJS();

  var map;
  var tb;

  var editToolbar, ctxMenuForGraphics;
  var selected, currentLocation, locationEventClick, locationEventClusterClick;

  var geometryService;
  var distanceParams;
  var bufferParams;
  var bufferGraphics;

  var clickDraw;
  var overDraw;
  var dragDraw;
  var dragStartDraw;
  var dragEndDraw;
  var drawVertex;
  var endGraphic;
  var lastVertex;

  var lastGeometry;

  var randomTextInterval;
  var delay = 50;

  var serviciosEncendidos = {};
  var capasDefault = [];
  var exceptLayers = ["PoblacionITER"];
  var identifiedServices = [];

  function initializeEsriJS(){
    require([
        "dojo/dom-construct",

        "esri/toolbars/draw",

        "dojo/on",

        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/graphic",
        "esri/Color",

        "dojo/parser",

        "dojo/_base/array",

        "esri/dijit/HomeButton",
        "esri/dijit/Legend",
        "esri/dijit/LocateButton",

        "esri/dijit/BasemapGallery",

        "esri/dijit/Search",
        "esri/InfoTemplate",
        "esri/layers/FeatureLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/map",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",

        "dojo/dom",
        "dojo/_base/lang",
        "dojo/json",
        "esri/config",
        "esri/geometry/Geometry",

        "esri/geometry/webMercatorUtils",

        "esri/geometry/scaleUtils",

        "esri/tasks/GeometryService",
        "esri/tasks/AreasAndLengthsParameters",

        "esri/tasks/IdentifyTask",
        "esri/tasks/IdentifyParameters",
        "esri/dijit/Popup",
        "dojo/_base/array",

        "esri/toolbars/edit",
        "esri/geometry/jsonUtils",
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "dijit/PopupMenuItem",

        "esri/tasks/GeometryService",
        "esri/tasks/AreasAndLengthsParameters",
        "dijit/registry",

        "esri/tasks/DistanceParameters",
        "esri/tasks/BufferParameters",        
        "esri/geometry/Point",
        "esri/symbols/Font",
        "esri/symbols/TextSymbol",

        "esri/layers/GraphicsLayer"
      ],
      function (

        domConstruct,

        Draw,

        on,

        SimpleFillSymbol,
        SimpleLineSymbol,
        Graphic,
        Color,

        parser,

        arrayUtils,

        HomeButton,
        Legend,
        LocateButton,

        BasemapGallery,

        Search,
        InfoTemplate,
        FeatureLayer,
        ArcGISDynamicMapServiceLayer,
        Map,
        SimpleFillSymbol,
        SimpleLineSymbol,

        dom,
        lang,
        json,
        esriConfig,
        Geometry,

        webMercatorUtils,

        scaleUtils,

        GeometryService,
        AreasAndLengthsParameters,

        IdentifyTask,
        IdentifyParameters,
        Popup,
        arrayUtils,

        Edit,
        geometryJsonUtils,
        Menu,
        MenuItem,
        MenuSeparator,
        PopupMenuItem,

        GeometryService,
        AreasAndLengthsParameters,
        registry,

        DistanceParameters,
        BufferParameters,
        Point,
        Font,
        TextSymbol,

        GraphicsLayer

        ){

        parser.parse();

          var search,homeButton,geoLocate,legend;

          var popup = new Popup({
            fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255]), 2),
                        new Color([255, 255, 0, 0.25]))
          }, domConstruct.create("div"));

          esriConfig.defaults.io.proxyUrl = "http://rmgir.cenapred.gob.mx/proxy/proxy.php";
          esriConfig.defaults.io.alwaysUseProxy = false;
          esriConfig.defaults.io.timeout = 100000

          esri.addProxyRule({
            urlPrefix: "http://servicios1.cenapred.unam.mx:6080/arcgis/services/",
            proxyUrl: "http://www.atlasnacionalderiesgos.gob.mx/proxy/proxy.php"
          });

          esri.addProxyRule({
            urlPrefix: "http://servicios2.cenapred.unam.mx:6080/arcgis/services/",
            proxyUrl: "http://www.atlasnacionalderiesgos.gob.mx/proxy/proxy.php"
          });

          geometryService = new GeometryService("http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
          geometryService.on("areas-and-lengths-complete", outputAreaAndLength);

          distanceParams = new DistanceParameters();
          distanceParams.distanceUnit = GeometryService.UNIT_METER;

          bufferParams = new BufferParameters();
          bufferParams.unit = GeometryService.UNIT_METER;
          bufferParams.unionResults = true;
          bufferParams.geodesic = true;
          bufferParams.bufferSpatialReference = new esri.SpatialReference({ "wkid": 4326 });
          bufferParams.outSpatialReference = new esri.SpatialReference({ "wkid": 4326 });

          bufferGraphics = new GraphicsLayer();

          map = new Map("ui-map", {
          //sliderOrientation: "horizontal",
          //sliderPosition: "bottom-right",
          basemap: "streets-navigation-vector",
          center: [-102.12,23.56],
          zoom: 5,
          sliderStyle: "small"
          //infoWindow: infoWindowPopup
          });

          map.on("load", function (event){

            search = new Search({
              map: map
            }, "ui-dijit-search");
            search.startup();

            basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
            }, "basemapGallery");
            basemapGallery.startup();

            geoLocate = new LocateButton({
              map: map
            }, "LocateButton");
            geoLocate.startup();

            home = new HomeButton({
              map: map
            }, "HomeButton");
            home.startup();

            editToolbar = new Edit(map);
            map.on("click", function(evt) {
              editToolbar.deactivate();
            });

            map.on("mouse-move", showCoordinates);
            map.on("mouse-drag", showCoordinates);
            showScale();
            map.on("zoom-end", showScale);

            map.addLayer(bufferGraphics);

            createGraphicsMenu();
            initToolbar();
        });

        function createGraphicsMenu() {
          // Creates right-click context menu for GRAPHICS
          ctxMenuForGraphics = new Menu({});
          ctxMenuForGraphics.addChild(new MenuItem({
            label: "Editar",
            onClick: function() {
              if ( selected.geometry.type !== "point" ) {
                editToolbar.activate(Edit.EDIT_VERTICES, selected);
              } else {
                alert("Not implemented");
              }
            }
          }));

          ctxMenuForGraphics.addChild(new MenuItem({
            label: "Mover",
            onClick: function() {
              editToolbar.activate(Edit.MOVE, selected);
            }
          }));

          ctxMenuForGraphics.addChild(new MenuItem({
            label: "Rotar/Escalar",
            onClick: function() {
              editToolbar.activate(Edit.ROTATE | Edit.SCALE, selected);
            }
          }));

          ctxMenuForGraphics.addChild(new MenuItem({
            label: "Analizar",
            onClick: function() {
              if ( selected.geometry.type != "point" ) {
                  showElem();
                  createRandomText();
                  lastGeometry = selected.geometry;
                  realizarAnalisis(selected.geometry, exceptLayers);
                  calcularAreaPerimetro(selected.geometry);
              } else {
                  showElem();
                  showBuffer(selected.geometry);
              }
            }
          }));

          ctxMenuForGraphics.addChild(new MenuItem({
            label: "Identificar",
            onClick: function() {
              lastGeometry = selected.geometry;
              identify(selected.geometry);
            }
          }));

          ctxMenuForGraphics.addChild(new MenuSeparator());
          ctxMenuForGraphics.addChild(new MenuItem({
            label: "Borrar",
            onClick: function() {
              map.graphics.remove(selected);
            }
          }));

          ctxMenuForGraphics.startup();

          map.graphics.on("mouse-over", function(evt) {
            if(evt.graphic.symbol.type !== "textsymbol"){
              selected = evt.graphic;
              ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
            }
          });

          map.graphics.on("mouse-out", function(evt) {
            ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
          });
        }

          function initToolbar() {
            var totalDistance = 0;
            var textSymbol;
            var extraTextSymbol;
            var point;
            var extraPoint;
            var distanceRequest;
            var font = new Font("18px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER, "sans-serif");
              tb = new Draw(map);
              tb.on("draw-end", addGraphic);
              //on(dom.byId("info"), "click", function (evt) {
              $("#analisis span").click(function (evt) {
                  if (evt.target.id === "BtnLimpiar") {
                    if(tb) tb.deactivate();
                    map.enableMapNavigation();
                    if(clickDraw) clickDraw.remove();
                    if(overDraw) overDraw.remove();
                    if(dragDraw) dragDraw.remove();
                    if(dragStartDraw) dragStartDraw.remove();
                    if(dragEndDraw) dragEndDraw.remove();
                    if(locationEventClick) locationEventClick.remove();
                    $("#toolbar span").removeClass("active");
                    return;
                  }
                  $("#analisis span").removeClass("active");
                  $(this).addClass("active");
                  var dibujo = evt.target.id;
                  map.graphics.clear();
                  var tool = evt.target.id.toLowerCase();
                  map.disableMapNavigation();
                  if(tb) tb.deactivate();
                  tb.activate(tool);
                  drawVertex = [];
                  // identify.remove();
                  if(dibujo === "Polygon"){
                    clickDraw = map.on("click", function(evt){
                      drawVertex.push(evt.mapPoint);
                      if (endGraphic) { //if an end label already exists remove it
                        map.graphics.remove(endGraphic);
                      }
                      if(drawVertex.length >= 2){
                        if(distanceRequest) distanceRequest.cancel();
                        distanceParams.geometry1 = drawVertex[drawVertex.length - 2];
                        distanceParams.geometry2 = drawVertex[drawVertex.length - 1];
                        distanceParams.geodesic = true;
                        point = new Point((distanceParams.geometry1.x + distanceParams.geometry2.x)/2, (distanceParams.geometry1.y + distanceParams.geometry2.y)/2, distanceParams.geometry1.spatialReference);
                        distanceRequest = geometryService.distance(distanceParams, function(distance){
                          totalDistance += distance;
                          textSymbol = new TextSymbol(distance < 1000 ? agregasComas(distance.toFixed(2)) + " m" : agregasComas((distance/1000).toFixed(2)) + " km", font, new Color([255, 255, 255]));
                          textSymbol.horizontalAlignment = "center";
                          textSymbol.verticalAlignment = "top";
                          map.graphics.add(Graphic(point, textSymbol));
                          console.log("Acumulado: ", totalDistance.toFixed(2));
                        })
                      }
                      if(drawVertex.length >= 3){
                        distanceParams.geometry1 = drawVertex[drawVertex.length - 1];
                        distanceParams.geometry2 = drawVertex[0]
                        distanceParams.geodesic = true;
                        extraPoint = new Point((distanceParams.geometry1.x + distanceParams.geometry2.x)/2, (distanceParams.geometry1.y + distanceParams.geometry2.y)/2, distanceParams.geometry1.spatialReference);
                        geometryService.distance(distanceParams, function(distance){
                          extraTextSymbol = new TextSymbol(distance < 1000 ? agregasComas(distance.toFixed(2)) + " m" : agregasComas((distance/1000).toFixed(2)) + " km", font, new Color([255, 255, 255]));
                          extraTextSymbol.horizontalAlignment = "center";
                          extraTextSymbol.verticalAlignment = "top";
                          if (lastVertex) { //if an end label already exists remove it
                            map.graphics.remove(lastVertex);
                          }
                          lastVertex = new Graphic(extraPoint, extraTextSymbol);
                          map.graphics.add(lastVertex);
                        });
                      }
                    });
                    overDraw = map.on("mouse-move", function(evt){
                      if(distanceRequest) distanceRequest.cancel();
                      if(drawVertex.length >= 1){
                        distanceParams.geometry1 = drawVertex[drawVertex.length - 1];
                        distanceParams.geometry2 = evt.mapPoint;
                        distanceParams.geodesic = true;
                        point = new Point((distanceParams.geometry1.x + distanceParams.geometry2.x)/2, (distanceParams.geometry1.y + distanceParams.geometry2.y)/2, distanceParams.geometry1.spatialReference);
                        distanceRequest = geometryService.distance(distanceParams, function(distance){
                          textSymbol = new TextSymbol(distance < 1000 ? agregasComas(distance.toFixed(2)) + " m" : agregasComas((distance/1000).toFixed(2)) + " km", font, new Color([255, 255, 255]));
                          textSymbol.horizontalAlignment = "center";
                          textSymbol.verticalAlignment = "top";
                          if (endGraphic) { //if an end label already exists remove it
                            map.graphics.remove(endGraphic);
                          }
                          endGraphic = new Graphic(point, textSymbol);
                          map.graphics.add(endGraphic);
                        })
                      }
                    });
                  } else if(dibujo === "Circle"){
                    dragStartDraw = map.on("mouse-drag-start", function(evt){
                      drawVertex.push(evt.mapPoint);
                    });
                    dragEndDraw = map.on("mouse-drag-end", function(evt){
                      if(distanceRequest) distanceRequest.cancel();
                      if (endGraphic) { //if an end label already exists remove it
                        map.graphics.remove(endGraphic);
                      }
                      distanceParams.geometry1 = drawVertex[0];
                      distanceParams.geometry2 = evt.mapPoint;
                      distanceParams.geodesic = true;
                      point = distanceParams.geometry1;
                      distanceRequest = geometryService.distance(distanceParams, function(distance){
                        drawVertex.push(evt.mapPoint);
                        textSymbol = new TextSymbol("Radio: " + (distance < 1000 ? agregasComas(distance.toFixed(2)) + " m" : agregasComas((distance/1000).toFixed(2)) + " km"), font, new Color([255, 255, 255]));
                        textSymbol.horizontalAlignment = "center";
                        textSymbol.verticalAlignment = "top";
                        map.graphics.add(Graphic(point, textSymbol));
                      });
                    })
                    dragDraw = map.on("mouse-drag", function(evt){
                      if(distanceRequest) distanceRequest.cancel();
                      distanceParams.geometry1 = drawVertex[0];
                      distanceParams.geometry2 = evt.mapPoint;
                      distanceParams.geodesic = true;
                      point = distanceParams.geometry1;
                      distanceRequest = geometryService.distance(distanceParams, function(distance){
                        textSymbol = new TextSymbol("Radio: " + (distance < 1000 ? agregasComas(distance.toFixed(2)) + " m" : agregasComas((distance/1000).toFixed(2)) + " km"), font, new Color([255, 255, 255]));
                        textSymbol.horizontalAlignment = "center";
                        textSymbol.verticalAlignment = "top";
                        if (endGraphic) { //if an end label already exists remove it
                          map.graphics.remove(endGraphic);
                        }
                        endGraphic = new Graphic(point, textSymbol);
                        map.graphics.add(endGraphic);
                      });
                    })
                  } else {
                    if(clickDraw) clickDraw.remove();
                    if(overDraw) overDraw.remove();
                    if(dragDraw) dragDraw.remove();
                    if(dragStartDraw) dragStartDraw.remove();
                    if(dragEndDraw) dragEndDraw.remove();
                  }
              });
          }

          var circle;
          var fillSymbol =
                new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,28,28]), 4), // Color contorno
                new Color([255,28,28, 0.25])  // Color fondo
          );

          function addGraphic(evt) {
            $("#analisis span").removeClass("active");
            if(clickDraw) clickDraw.remove();
            if(overDraw) overDraw.remove();
            if(dragDraw) dragDraw.remove();
            if(dragStartDraw) dragStartDraw.remove();
            if(dragEndDraw) dragEndDraw.remove();
            var geometry = evt.geometry;
              //deactivate the toolbar and clear existing graphics
              tb.deactivate();
              map.enableMapNavigation();

              // figure out which symbol to use
              var symbol;
              if (evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
                  symbol = markerSymbol;
              } else if (evt.geometry.type === "line" || evt.geometry.type === "polyline") {
                  symbol = lineSymbol;
              }
              else {
                  symbol = fillSymbol;
              }

              map.graphics.add(new Graphic(geometry, symbol));

              //Calculo de área y perímetro
              calcularAreaPerimetro(geometry);

              //Funciones geo --> outStatistics
              showElem();
              createRandomText();
              lastGeometry = evt.geometry;
              realizarAnalisis(evt.geometry, exceptLayers);
          }

          function calcularAreaPerimetro(geometry){
            var areasAndLengthParams = new AreasAndLengthsParameters();
            areasAndLengthParams.lengthUnit = GeometryService.UNIT_KILOMETER;
            areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_KILOMETERS;
            areasAndLengthParams.calculationType = "geodesic";
            geometryService.simplify([geometry], function(simplifiedGeometries) {
              areasAndLengthParams.polygons = simplifiedGeometries;
              geometryService.areasAndLengths(areasAndLengthParams);
            });
          }

          function outputAreaAndLength(evtObj) {
            var result = evtObj.result;
            var area = agregasComas(result.areas[0].toFixed(2)) + " km&sup2;";
            var length = agregasComas(result.lengths[0].toFixed(2)) + " km";
            dom.byId("area").innerHTML = area;
            dom.byId("length").innerHTML = length;
          }

        function showCoordinates(evt) {
          //the map is in web mercator but display coordinates in geographic (lat, long)
          var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
          //display mouse coordinates

          var dlong = parseInt(mp.x);
          var mlong = (mp.x.toFixed(6)-dlong) * 60 ;
          var mlongitud = parseInt(mlong);
          var slong = (mlong-parseInt(mlong))*60;
          var slongitud = parseInt(slong);

          var dlati = parseInt(mp.y);
          var mlati = (mp.y.toFixed(6)-dlati) * 60 ;
          var mlatitud = parseInt(mlati);
          var slati = (mlati-parseInt(mlati))*60;
          var slatitud = parseInt(slati);

          if (mlongitud<0){
            mlongitud =(mlongitud)*(-1);
          }

          if (slongitud<0){
            slongitud =(slongitud)*(-1);
          }

          if (mlatitud<0){
            mlatitud =(mlatitud)*(-1);
          }

          if (slatitud<0){
            slatitud =(slatitud)*(-1);
          }


           dom.byId("ubicacion").innerHTML = "Latitud:" + mp.y.toFixed(4) + "/" + dlati + "°" + mlatitud + "'" + slatitud + "''" + "," +
                                             "Longitud:" + mp.x.toFixed(4) + "/" + dlong + "°" + mlongitud + "'" + slongitud + "''";
        }


        function showScale() {
          //the map is in web mercator but display coordinates in geographic (lat, long)
          var scale = scaleUtils.getScale(map);
          //alert(scale);
          //var scale2 = scale.toLocaleString('en-IN');
          dom.byId("escala").innerHTML = "Escala 1:" + scale.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
          })

        }



      });
  }
  
function getCleanedString(cadena){
   // Definimos los caracteres que queremos eliminar
   var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

   // Los eliminamos todos
   for (var i = 0; i < specialChars.length; i++) {
       cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
   }   

   // Lo queremos devolver limpio en minusculas
   cadena = cadena.toLowerCase();

   // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
   cadena = cadena.replace(/ /g,"_");

   // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
   cadena = cadena.replace(/á/gi,"a");
   cadena = cadena.replace(/é/gi,"e");
   cadena = cadena.replace(/í/gi,"i");
   cadena = cadena.replace(/ó/gi,"o");
   cadena = cadena.replace(/ú/gi,"u");
   cadena = cadena.replace(/ñ/gi,"n");
   return cadena;
}

// Análisis
document.addEventListener('analisis-completo', function(result){//es el auditor que solo espera a que la funcion de analisis-completo se termine de ejecutar para poder obtener los resultados del objeto de alisis que contiene el resto de los datos
  clearInterval(randomTextInterval);
  $("#Poblacion .resultNumber").text(agregasComas(result.detail["Poblacion"]));
  $("#Viviendas .resultNumber").text(agregasComas(result.detail["Viviendas"]));
  $("#Hospitales .resultNumber").text(agregasComas(result.detail["Hospitales"]));
  $("#Escuelas .resultNumber").text(agregasComas(result.detail["Escuelas"]));
  $("#Supermercados .resultNumber").text(agregasComas(result.detail["Supermercados"]));
  $("#Aeropuertos .resultNumber").text(agregasComas(result.detail["Aeropuertos"]));
  $("#Hoteles .resultNumber").text(agregasComas(result.detail["Hoteles"]));
  $("#Bancos .resultNumber").text(agregasComas(result.detail["Bancos"]));
  $("#Gasolineras .resultNumber").text(agregasComas(result.detail["Gasolineras"]));
  $("#Presas .resultNumber").text(agregasComas(result.detail["Presas"]));
  $("#Ganadero .resultNumber").text(agregasComas(result.detail["Ganaderias"]));
  $("#Colonias .resultNumber").text(agregasComas(result.detail["Colonias"]));
  $("#Diconsa .resultNumber").text(agregasComas(result.detail["Diconsa"]));
  $("#Carretera .resultNumber").text(agregasComas(result.detail["Carretera"]));
  $("#Puertos .resultNumber").text(agregasComas(result.detail["Puertos"]));
  $("#Abasto .resultNumber").text(agregasComas(result.detail["Abasto"]));
  $("#Municipio .resultNumber").text(agregasComas(result.detail["Municipio"]));
  
  //
  $("#pob_m_t").text(agregasComas(result.detail["TotalPobMas"]));
  $("#pob_f_t").text(agregasComas(result.detail["TotalPobFem"]));
  $("#pob_menor_12").text(agregasComas(result.detail["TotalMenor12"]));
  $("#pob_m_menor_12").text(agregasComas(result.detail["TotalMenor12M"]));
  $("#pob_f_menor_12").text(agregasComas(result.detail["TotalMenor12F"]));
  $("#pob_mayor_60").text(agregasComas(result.detail["TotalMayor60"]));
  $("#pob_m_mayor_60").text(agregasComas(result.detail["TotalMayor60M"]));
  $("#pob_f_mayor_60").text(agregasComas(result.detail["TotalMayor60F"]));

  /*Abrir el panel al hacer un análisis*/
  if($(".ui-panel").hasClass("ui-panel-closed"))
    $("#ui-settings-button")[0].click();
  if($("#analisis-container div")[0].attributes[1].value == "true")
        $("#analisis-container h4")[0].click();
  
  generaTablaPo(pobTotalXEstado);
  hideElem();
});

function showElem() {
    document.getElementById("Img1").style.visibility = "visible";
}
function hideElem() {
    document.getElementById("Img1").style.visibility = "hidden";
}

function agregasComas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function createRandomText(){
  randomTextInterval = setInterval(function(){
          $(".resultNumber").each(function(){
            $(this).text(agregasComas(Math.floor(Math.random() * 99999)));
          })
        }, delay);
}

function limpiarGeometria() {
    map.graphics.clear();
    bufferGraphics.clear();
    lastGeometry = undefined;
    $("#analisis-container figcaption").each(function(idx, el){
      $(el).text("0");
    })
    $(".resultNumber").each(function(idx, el){
      $(el).text("0");
    })
    $("#area").text("0");
    $("#length").text("0");
    pobTotalXEstado = []
    $("#table a").click();
    TotalPobFinal = 0;
    TotalVivFinal = 0;
    TotalPobMas = 0;
    TotalPobFem = 0;
    TotalMenor12 = 0;
    TotalMenor12M = 0;
    TotalMenor12F = 0;
    TotalMayor60 = 0;
    TotalMayor60M = 0;
    TotalMayor60F = 0;
}
/*
(function () {
  $.ajax({
    url:'http://infosiap.siap.gob.mx:8080/agricola_siap_gobmx/ResumenDelegacion.do?anio=2017&nivel=3&delegacion=20&mes=12&moda=3&ciclo=3&&consultar=si',
      type: "GET", 
      success: function (data){
        console.log(data);
      },
      error: function(err){
      },

  });
}());
*/


/*
var fecha = new Date();

var peren = 'anio=2014&mes=1&delegacion=14&distrito=-1&municipio=-1&moda=3&ciclo=3&tipoprograma=0&nivel=3&consultar=si';


var table;



var anio =2014 //fecha.getFullYear()-1;
var nivel = 3;
var delegacion=14;
var distrito=-1;
var municipio=-1;
var mes = 5; //fecha.getMonth()+1;
var moda=3;
var ciclo=4;
var tipoprograma=0; 
var consultar='si';
console.log(anio);


$(function () {
  $.ajax({
    type: "GET",
    url: "siap.php",
    data: {peren:peren},
    dataType: "html",
    success: function(isiap){
        console.log(isiap);
    // aquí ya tienes los datos 
        },
    error: function(err){

        },
  })
}());
*/
/*
var dsmn = 'option=com_visforms&view=visformsdata&layout=data&tmpl=component&id=107&cid=2692&logo=0';

$(function () {
  $.ajax({
    type: "GET",
    url: "smn.php",
    data: {dsmn:dsmn},
    dataType: "html",
    success: function(ismn){
        console.log(ismn);
    // aquí ya tienes los datos 
        },
    error: function(err){

        },
  })
}());

*/

function zoomLayer(url){
    require([
      "esri/layers/FeatureLayer", 
      "esri/geometry/Extent", 
      "esri/SpatialReference", 
      "esri/tasks/ProjectParameters"
    ], function(
      FeatureLayer, 
      Extent, 
      SpatialReference, 
      ProjectParameters
    ){
      console.log(url);
      $.ajax({//REvisar el los datos 
        url: url,
            type: "GET",
            data: {f: "json"},
            dataType: "json",
            success: function (data) {
              console.log(data);
              var extent = new Extent(data.extent);
              console.log(extent);
              var projParams = new ProjectParameters();
              projParams.geometries = [extent];
              projParams.outSR = map.spatialReference;
              geometryService.project(projParams, function(results){
                map.setExtent(results[0].expand(1.5));
              });
            },
            error: function(err){

            }
      });
    });
}

function zoomToFeature(geometry){
    if(geometry.type == "point"){
      var offset = 200;
      map.setExtent(new esri.geometry.Extent(geometry.x - offset, geometry.y - offset, geometry.x + offset, geometry.y + offset, new esri.SpatialReference(map.spatialReference)))
    } else {
      var graphic = new esri.Graphic(geometry);
      map.setExtent(esri.graphicsExtent([graphic]).expand(2))
    }
}

function showBuffer(geometry, distance){
    require([
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/graphic",
    "esri/Color"
    ], function(
        SimpleFillSymbol,
        SimpleLineSymbol,
        Graphic,
        Color
    ){
        bufferGraphics.clear();
        bufferParams.geometries = [geometry];
        bufferParams.distances = [ distance ];
        geometryService.buffer(bufferParams, function(buffer){
            var polySym = new SimpleFillSymbol()
            .setColor(new Color([56, 102, 164, 0.4]))
            .setOutline(
                new SimpleLineSymbol()
                .setColor(new Color([56, 102, 164, 0.8]))
            );
            var bufferGraphic = new Graphic(buffer[0], polySym);
            bufferGraphics.add(bufferGraphic);
            createRandomText();
            lastGeometry = bufferGraphic.geometry;
            realizarAnalisis(bufferGraphic.geometry, exceptLayers);
            var lyrExtent = esri.graphicsExtent(bufferGraphics.graphics);
            map.setExtent(lyrExtent.expand(2));
        })
    })
}

document.addEventListener('capa-agregada', function(capaObj){
  var capa = capaObj.detail;
  var url = capa["url"] + "/" + capa["id"];

  opacityFeature = $("input[type='range']").on('input', function(){
      layerId = this.id.substr(0, this.id.lastIndexOf("_"));
      if(map.getLayer(layerId)) map.getLayer(layerId).setOpacity(this.value/100);
  });

  if(!serviciosEncendidos[capa["serviceId"]]) serviciosEncendidos[capa["serviceId"]] = {"url": capa["url"] ,"capas": [], "nombres": [], "rasterLayers": [], "clusterLayers": [], "identify": {"params": new esri.tasks.IdentifyParameters(), "task": new esri.tasks.IdentifyTask(capa["url"])}};
  if(!serviciosEncendidos[capa["serviceId"]]["capas"].includes(capa.id)) {
    serviciosEncendidos[capa["serviceId"]]["capas"].push(capa.id);
    serviciosEncendidos[capa["serviceId"]]["nombres"].push(capa.nombre);
  }

  serviciosEncendidos[capa["serviceId"]]["identify"]["params"].tolerance = 10;
  serviciosEncendidos[capa["serviceId"]]["identify"]["params"].returnGeometry = true;
  serviciosEncendidos[capa["serviceId"]]["identify"]["params"].layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
  serviciosEncendidos[capa["serviceId"]]["identify"]["params"].layerIds = [-1]

  require([
    "esri/request",
    "esri/layers/FeatureLayer",
    'dojo/_base/lang',
    "app/clusterfeaturelayer",
    "esri/layers/ImageParameters",
    "esri/renderers/ClassBreaksRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "dojo/_base/Color"
    ], function(
      esriRequest, 
      FeatureLayer, 
      lang, 
      ClusterFeatureLayer,
      ImageParameters,
      ClassBreaksRenderer,
      SimpleMarkerSymbol,
      SimpleLineSymbol,
      SimpleFillSymbol,
      PictureMarkerSymbol,
      Color
      ){
    esriRequest({
        url: url,
        content: {
            f: 'json'
        },
        handleAs: 'json'
    }).then(lang.hitch(this, function(response) {
      showElem();
        if (response.geometryType === 'esriGeometryPolygon' || response.geometryType === 'esriGeometryPolyline') {
          var imageParameters = new ImageParameters();
          imageParameters.layerIds = [capa["id"]];
          imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;

          var layer = new esri.layers.ArcGISDynamicMapServiceLayer(serviciosEncendidos[capa["serviceId"]]["url"], {
            id: capa["serviceId"] + "_layer" + capa["id"],
            imageParameters: imageParameters
          });

          var layerLoad = layer.on("load", function(){
            layerLoad.remove();
            map.addLayer(layer);
            var layerAdd = layer.on("update-end", function(){
              hideElem();
              layerAdd.remove();
            });
          });
        } else if(response.geometryType == null){
          console.log("Capa sin tipo de geometría")
          serviciosEncendidos[capa["serviceId"]]["rasterLayers"].push(capa["id"]);
          var imageParameters = new ImageParameters();
          imageParameters.layerIds = [capa["id"]];
          imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;

          var layer = new esri.layers.ArcGISDynamicMapServiceLayer(serviciosEncendidos[capa["serviceId"]]["url"], {
            id: capa["serviceId"] + "_layer" + capa["id"],
            imageParameters: imageParameters
          });

          var layerLoad = layer.on("load", function(){
            layerLoad.remove();
            map.addLayer(layer);
            var layerAdd = layer.on("update-end", function(){
              hideElem();
              layerAdd.remove();
            });
          });
          
          hideElem();
        } else {
          if(capa["nombre"] == "Directorio Estadístico Nacional de Unidades Económicas  (INEGI, 2016)" 
            || capa["url"] == "http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Anri/MapServer"
            || capa["nombre"] == "Unidades de Producción Ganadera (SAGARPA, 2015)" 
          ){ // DENUE
          // if(1 == 1){
            var imageParameters = new ImageParameters();
            imageParameters.layerIds = [capa["id"]];
            imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
  
            var layer = new esri.layers.ArcGISDynamicMapServiceLayer(serviciosEncendidos[capa["serviceId"]]["url"], {
              id: capa["serviceId"] + "_layer" + capa["id"],
              imageParameters: imageParameters
            });
  
            var layerLoad = layer.on("load", function(){
              layerLoad.remove();
              map.addLayer(layer);
              var layerAdd = layer.on("update-end", function(){
                hideElem();
                layerAdd.remove();
              });
            });
          } else {
            if(map.getLayer(capa["serviceId"] + "_layer" + capa["id"])) map.removeLayer(map.getLayer(capa["serviceId"] + "_layer" + capa["id"]));
            var distance = 50;
            var outFields = [];
            response.fields.forEach(function(field){
              if(field.type == "esriFieldTypeOID") outFields.push(field.name);
            });

            if(response.drawingInfo.renderer.type !== "simple"){
              if(response.drawingInfo.renderer.field != null){
                outFields.push(response.drawingInfo.renderer.field);
              }
              if(response.drawingInfo.renderer.field1 != null){
                outFields.push(response.drawingInfo.renderer.field1);
              }
              if(response.drawingInfo.renderer.field2 != null){
                outFields.push(response.drawingInfo.renderer.field2);
              }
              if(response.drawingInfo.renderer.field3 != null){
                outFields.push(response.drawingInfo.renderer.field3);
              }
            }

            createCluster(url, capa["serviceId"], capa["id"], outFields, distance);

            if(!$("span[data-layerUrl='" + url + "'].action").hasClass("active")) $("span[data-layerUrl='" + url + "'].action").addClass("active")
            $("span[data-layerUrl='" + url + "'].action").css("display", "inline-block");
            $("span[data-layerUrl='" + url + "'].action").unbind();
            $("span[data-layerUrl='" + url + "'].action").on("click", function(){
              if($(this).hasClass('active')){
                showElem();
                $(this).removeClass('active');
                if(map.getLayer(capa["serviceId"] + "_layer" + capa["id"])) map.removeLayer(map.getLayer(capa["serviceId"] + "_layer" + capa["id"]));
                if(serviciosEncendidos[capa["serviceId"]]["clusterLayers"].includes(capa["id"])){
                  serviciosEncendidos[capa["serviceId"]]["clusterLayers"].splice(serviciosEncendidos[capa["serviceId"]]["clusterLayers"].indexOf(capa.id), 1);
                }
                var imageParameters = new ImageParameters();
                imageParameters.layerIds = [capa["id"]];
                imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
      
                var layer = new esri.layers.ArcGISDynamicMapServiceLayer(serviciosEncendidos[capa["serviceId"]]["url"], {
                  id: capa["serviceId"] + "_layer" + capa["id"],
                  // infoTemplates: new esri.InfoTemplate(),
                  imageParameters: imageParameters
                });
      
                var layerLoad = layer.on("load", function(){
                  layerLoad.remove();
                  map.addLayer(layer);
                  var layerAdd = layer.on("update-end", function(){
                    hideElem();
                    layerAdd.remove();
                  });
                });
              } else {
                showElem();
                $(this).addClass('active');
                if(map.getLayer(capa["serviceId"] + "_layer" + capa["id"])) map.removeLayer(map.getLayer(capa["serviceId"] + "_layer" + capa["id"]));
                var distance = 50;
                var outFields = [];
                response.fields.forEach(function(field){
                  if(field.type == "esriFieldTypeOID") outFields.push(field.name);
                });
    
                if(response.drawingInfo.renderer.type !== "simple"){
                  if(response.drawingInfo.renderer.field != null){
                    outFields.push(response.drawingInfo.renderer.field);
                  }
                  if(response.drawingInfo.renderer.field1 != null){
                    outFields.push(response.drawingInfo.renderer.field1);
                  }
                  if(response.drawingInfo.renderer.field2 != null){
                    outFields.push(response.drawingInfo.renderer.field2);
                  }
                  if(response.drawingInfo.renderer.field3 != null){
                    outFields.push(response.drawingInfo.renderer.field3);
                  }
                }
  
                createCluster(url, capa["serviceId"], capa["id"], outFields, distance);
              }
            });
          }
        }
    }));
  })
})

function createCluster(layerUrl, serviceId, layerId, outFields, distance){
  require([
    "app/clusterfeaturelayer",
    "esri/renderers/ClassBreaksRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "dojo/_base/Color"
    ], function(
      ClusterFeatureLayer,
      ClassBreaksRenderer,
      SimpleMarkerSymbol,
      SimpleLineSymbol,
      SimpleFillSymbol,
      PictureMarkerSymbol,
      Color
      ){
        serviciosEncendidos[serviceId]["clusterLayers"].push(layerId);
        var clusterLayer = new ClusterFeatureLayer({
          "url": layerUrl,
          "distance": distance,
          "id": serviceId + "_layer" + layerId,
          "labelColor": "#fff",
          "resolution": map.extent.getWidth() / map.width,
          // "singleTemplate": esri.InfoTemplate(capa["nombre"], "${*}"),
          "useDefaultSymbol": true,
          "zoomOnClick": true,
          "showSingles": true,
          "disablePopup": true,
          "objectIdField": outFields[0],
          "outFields": outFields
        });

        var defaultSym = new SimpleMarkerSymbol("circle", 16,
                      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([102,0,0, 0.55]), 3),
                      new Color([255, 255, 255, 1]));

        var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");

        var increment = Math.floor(Math.random() * 70)
        var colorXLarge = [Math.floor(Math.random() * 70), Math.floor(Math.random() * 70), Math.floor(Math.random() * 70)]
        increment = Math.floor(Math.random() * 45)
        var colorLarge = [colorXLarge[0] + increment, colorXLarge[1] + increment, colorXLarge[2] + increment]
        increment = Math.floor(Math.random() * 80)
        var colorMedium = [colorLarge[0] + increment, colorLarge[1] + increment, colorLarge[2] + increment]
        increment = Math.floor(Math.random() * 60)
        var colorSmall = [colorMedium[0] + increment, colorMedium[1] + increment, colorMedium[2] + increment]

        small = new SimpleMarkerSymbol("circle", 25,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([colorSmall[0], colorSmall[1], colorSmall[2], 0.5]), 15),
                    new Color([colorSmall[0], colorSmall[1], colorSmall[2], 0.75]));
        medium = new SimpleMarkerSymbol("circle", 50,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([colorMedium[0], colorMedium[1], colorMedium[2], 0.5]), 15),
                    new Color([colorMedium[0], colorMedium[1], colorMedium[2], 0.75]));
        large = new SimpleMarkerSymbol("circle", 80,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([colorLarge[0], colorLarge[1], colorLarge[2], 0.5]), 15),
                    new Color([colorLarge[0], colorLarge[1], colorLarge[2], 0.75]));
        xlarge = new SimpleMarkerSymbol("circle", 110,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([colorXLarge[0], colorXLarge[1], colorXLarge[2], 0.5]), 15),
                    new Color([colorXLarge[0], colorXLarge[1], colorXLarge[2], 0.75]));

        // Break values - can adjust easily
        renderer.addBreak(2, 150, small);
        renderer.addBreak(150, 450, medium);
        renderer.addBreak(450, 2000, large);
        renderer.addBreak(2000, 1000000, xlarge);

        // Providing a ClassBreakRenderer is also optional
        clusterLayer.setRenderer(renderer);

        map.addLayer(clusterLayer);

        var clusterAdd = clusterLayer.on("clusters-shown", function(e){
          hideElem();
          clusterAdd.remove();
        })

        clusterLayer.on("click", function(e){
          if (e.graphic.attributes.clusterCount === 1) {
            var evt = new CustomEvent("cluster-clicked", { 'detail': e });
            document.dispatchEvent(evt);
          }
        });
      });
}

function identifyFeatures(location){
  map.infoWindow.hide();
  var clickPoint = location;

  if(Object.keys(serviciosEncendidos).length > 0){
    showElem();
    Object.keys(serviciosEncendidos).forEach(function(serviceId){
      serviciosEncendidos[serviceId]["identify"]["params"].geometry = clickPoint;
      serviciosEncendidos[serviceId]["identify"]["params"].mapExtent = map.extent;
      serviciosEncendidos[serviceId]["identify"]["params"].width  = map.width;
      serviciosEncendidos[serviceId]["identify"]["params"].height = map.height;
    })

    var deferreds = Object.keys(serviciosEncendidos).map(function(serviceId){
      return serviciosEncendidos[serviceId]["identify"]["task"].execute(serviciosEncendidos[serviceId]["identify"]["params"]);
    });
    var dlist = new dojo.DeferredList(deferreds);
    dlist.then(function(results){
      var features = [];
      results.forEach(function(result){
        if(typeof result === "object" && result[1].length > 0){
          result[1].forEach(function(obj){
            var fields = Object.keys(obj.feature.attributes).map(function(field){
              if(["OBJECTID", "OBJECTID_1", "OID", "OID_1", "SHAPE", "SHAPE.AREA", "SHAPE.LEN"].indexOf(field.toUpperCase()) == -1) return field + " = ${" + field + "}<br/>";;
            });
            var text = fields.join("");
            var infoTemplate = new esri.InfoTemplate(obj.layerName, text);
            obj.feature.setInfoTemplate(infoTemplate);
            features.push(obj.feature);
          });
        }
      });
      map.infoWindow.onShow = function(){
        $(".esriPopup").css("z-index", "1000");
      };
      map.infoWindow.onHide = function(){
        map.infoWindow.clearFeatures();
        map.infoWindow.onShow = function(){}
      }
      if(features.length != 0){
        map.infoWindow.setFeatures(features);
        map.infoWindow.show(clickPoint);
      } else {
        map.infoWindow.setTitle("Resultados");
        map.infoWindow.setContent("La búsqueda no obtuvo resultados");
        map.infoWindow.show(clickPoint);
      }
      Object.keys(serviciosEncendidos).forEach(function(servicio){
        serviciosEncendidos[servicio]["identify"]["params"].layerIds = [-1];
      });
      hideElem();
    });
  }
}

document.addEventListener('capa-borrada', function(capaObj){
  var capa = capaObj.detail;
  serviciosEncendidos[capa["serviceId"]]["capas"].splice(serviciosEncendidos[capa["serviceId"]]["capas"].indexOf(capa.id), 1);
  serviciosEncendidos[capa["serviceId"]]["nombres"].splice(serviciosEncendidos[capa["serviceId"]]["nombres"].indexOf(capa.nombre), 1);

  if(serviciosEncendidos[capa["serviceId"]]["rasterLayers"].includes(capa["id"])){
    serviciosEncendidos[capa["serviceId"]]["rasterLayers"].splice(serviciosEncendidos[capa["serviceId"]]["rasterLayers"].indexOf(capa.id), 1);
  }
  if(serviciosEncendidos[capa["serviceId"]]["clusterLayers"].includes(capa["id"])){
    serviciosEncendidos[capa["serviceId"]]["clusterLayers"].splice(serviciosEncendidos[capa["serviceId"]]["clusterLayers"].indexOf(capa.id), 1);
  }
  
  map.removeLayer(map.getLayer(capa["serviceId"] + "_layer" + capa["id"]));
  $("span[data-layerUrl='" + capa["url"] + "/" + capa["id"] + "'].action").css("display", "none");

  if(serviciosEncendidos[capa["serviceId"]]["capas"].length == 0) {
    delete serviciosEncendidos[capa["serviceId"]]
  }
})

function getFeaturesFromLayer(url, lastObjectId, objectIdsArray, previousResults){
  require([
    "esri/layers/FeatureLayer", 
    "esri/geometry/Extent", 
    "esri/SpatialReference"
    ], function(
      FeatureLayer, 
      Extent, 
      SpatialReference, 
      SimpleFillSymbol, 
      SimpleLineSymbol, 
      Graphic, 
      Color
      ){
        if(!lastObjectId){
          var queryTask = new esri.tasks.QueryTask(url);
          var query = new esri.tasks.Query();  
          query.where = "1=1";
          query.outSpatialReference = map.spatialReference;

          queryTask.executeForIds(query, function(response){
            console.log(response.length)
            objectIdsArray = response;
            var objectIds = objectIdsArray.splice(0, 1000);
            var defExp = "OBJECTID IN (" + objectIds.join(",") + ")";
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.where = defExp;
            queryTask.execute(query, function(results){
              previousResults = results.features;
              console.log(previousResults.length)
              if(objectIdsArray.length > 1000){
                getFeaturesFromLayer(url, objectIds[0], objectIdsArray, previousResults)
              } else {
                var geometries = previousResults.map(function(feature){ return feature.geometry });
                showElem();
                unionGeometries(geometries);
              }
            })
          })
        } else {
          var queryTask = new esri.tasks.QueryTask(url);
          var query = new esri.tasks.Query();  
          query.where = "1=1";
          query.outSpatialReference = map.spatialReference;
          var objectIds = objectIdsArray.splice(0, 1000);
          var defExp = "OBJECTID IN (" + objectIds.join(",") + ")";
          query.outFields = ["*"];
          query.returnGeometry = true;
          query.where = defExp;
          queryTask.execute(query, function(results){
            previousResults = previousResults.concat(results.features);
            console.log(previousResults.length)
            if(objectIdsArray.length > 0){
              getFeaturesFromLayer(url, objectIds[0], objectIdsArray, previousResults)
            } else {
              var geometries = previousResults.map(function(feature){ return feature.geometry });
              showElem();
              unionGeometries(geometries);
            }
          })
        }
    })
}

function unionGeometries(geometriesArray, previousGeometry){
  if(previousGeometry) geometriesArray.splice(0,0,previousGeometry);
  var elements = geometriesArray.splice(0, geometriesArray > 50 ? 250 : 10 );
  if(elements.length > 1){
    geometryService.union(elements, function(geometry){
      require([
      "esri/symbols/SimpleFillSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/graphic",
      "esri/Color"
    ], function(
      SimpleFillSymbol,
      SimpleLineSymbol,
      Graphic,
      Color
    ){
      map.graphics.clear();
      var polySym = new SimpleFillSymbol()
          .setColor(new Color([56, 102, 164, 0.4]))
          .setOutline(
              new SimpleLineSymbol()
              .setColor(new Color([56, 102, 164, 0.8]))
          );
      var graphic = new Graphic(geometry, polySym);
      map.graphics.add(graphic);
    });
      
      unionGeometries(geometriesArray, geometry);
    })
  } else {
    require([
      "esri/symbols/SimpleFillSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/graphic",
      "esri/Color"
    ], function(
      SimpleFillSymbol,
      SimpleLineSymbol,
      Graphic,
      Color
    ){
      console.log(previousGeometry)
      map.graphics.clear();
      var polySym = new SimpleFillSymbol()
          .setColor(new Color([56, 102, 164, 0.4]))
          .setOutline(
              new SimpleLineSymbol()
              .setColor(new Color([56, 102, 164, 0.8]))
          );
      var graphic = new Graphic(previousGeometry, polySym);
      map.graphics.add(graphic);
      createRandomText();
      lastGeometry = previousGeometry;
      realizarAnalisis(lastGeometry, exceptLayers);
    })
  }
}

$(function(){
  $("#identifyLayers").on("click", function(){
    $(this).addClass("active");
    $(".message").css("display", "block");
    setTimeout(function(){
      $(".message").css("display", "none");
    }, 2000);
    if(Object.keys(serviciosEncendidos).length == 0){
      $(this).removeClass("active");
      $(".message").addClass("unable");
      $(".message").text("Enciende una capa de información primero");
      setTimeout(function(){
        $(".message").removeClass("unable");
      }, 2000);
      return;
    } else {
      $(".message").text("Da click sobre una capa para identificar sus atributos");
      var locationEventOver =  map.on("mouse-over", function(evt){
        currentLocation = evt.mapPoint;
      });

      locationEventClick = map.on("click", function(evt){
        locationEventOver.remove();
        locationEventClick.remove();
        identify(evt.mapPoint);
      });

      var handler = function(evt){
        locationEventOver.remove();
        locationEventClick.remove();
        var event = new Event("cluster-finished");
        document.dispatchEvent(event);
        identify(evt.detail.mapPoint);
      }

      document.addEventListener("cluster-clicked", handler);
      document.addEventListener("cluster-finished", function(){
        document.removeEventListener("cluster-clicked", handler);
      }); 
    }  
  });
})

function identify(geometry){
  currentLocation = geometry;
  if(Object.keys(serviciosEncendidos).length === 0){
    if(locationEventClick) locationEventClick.remove();
    $("#toolbar span").removeClass("active");
    return
  }
  if($(".clickable.clicked").length > 0){
    $(".clickable.clicked").click();
  }
  var keys = Object.keys(serviciosEncendidos);
  if(keys.length === 1 && serviciosEncendidos[keys[0]]["capas"].length === 1){
    serviciosEncendidos[keys[0]]["identify"]["params"].layerIds = serviciosEncendidos[keys[0]]["capas"];
    identifyFeatures(currentLocation);

    var sources = serviciosEncendidos[keys[0]]["nombres"].map(function(source){ return {name: source, shortName: keys[0] + "_" + serviciosEncendidos[keys[0]]["capas"][0], parent: keys[0], layerId: serviciosEncendidos[keys[0]]["capas"][0] }});
    var templateSource = $("#featureTable-template").html();
    var template = Handlebars.compile(templateSource);
    var outputHTML = template({features: sources});
    $('#featureTable').html(outputHTML);
    $("#featureTable").css("display", "block");
    $(".closeFeatures").on('click', function(event){
      borrarCapas(identifiedServices);
      identifiedServices = [];
      sistemaExpuestoActivo = "";
      $("#featureTable").css("display", "none");
    });

    $("#downloadFeature").on("click", function(){
      var activeFeature = $(".tabs__item.active").attr("data-feature");
      createFeatureTableCSV(activeFeature);
    });

    sistemaExpuestoActivo = $(".tabs__item.active").text();
    identifiedServices.push(keys[0] + "_" + serviciosEncendidos[keys[0]]["capas"][0]);

    mostrarFeaturesDentro(currentLocation, serviciosEncendidos[keys[0]]["url"] + "/" + serviciosEncendidos[keys[0]]["capas"][0], keys[0] + "_" + serviciosEncendidos[keys[0]]["capas"][0], true);
    
    $("#toolbar span").removeClass("active");
    if(locationEventClick) locationEventClick.remove();
  } else {
    var capasMostrar = [];
    keys.forEach(function(key){
      var servicio = {
        nombre: key,
        nombres: serviciosEncendidos[key].nombres
      }
      capasMostrar.push(servicio);
    });
    var templateSource = $("#layersActive-template").html();
    var template = Handlebars.compile(templateSource);
    var outputHTML = template({servicios: capasMostrar});
    $('#layersActive').html(outputHTML);
    $("#layersActive").css("display", "flex");
    $("#layersActive .aceptar").on("click", function(){ 
      var layers = $("#layersActive input:checked");
      if(layers.length > 0){
        var capasDeBusqueda = {};
        var sources = [];
        layers.each(function(idx, element){
          var service = $(element).attr("data-parent");
          var layerIdx = parseInt($(element).attr("data-index"));
          if(!capasDeBusqueda[service]) capasDeBusqueda[service] = [];
          if(identifiedServices.indexOf(service + "_" + serviciosEncendidos[service]["capas"][layerIdx]) === -1) identifiedServices.push(service + "_" + serviciosEncendidos[service]["capas"][layerIdx]);
          capasDeBusqueda[service].push(serviciosEncendidos[service]["capas"][layerIdx]);
          sources.push({name: serviciosEncendidos[service]["nombres"][idx], shortName: service + "_" + serviciosEncendidos[service]["capas"][layerIdx], parent: service, layerId: serviciosEncendidos[service]["capas"][layerIdx] });
        });
        var templateSource = $("#featureTable-template").html();
        var template = Handlebars.compile(templateSource);
        var outputHTML = template({features: sources});
        $('#featureTable').html(outputHTML);
        $("#featureTable").css("display", "block");

        $(".closeFeatures").on('click', function(event){
          borrarCapas(identifiedServices);
          identifiedServices = [];
          sistemaExpuestoActivo = "";
          $("#featureTable").css("display", "none");
        });

        $("#downloadFeature").on("click", function(){
            var activeFeature = $(".tabs__item.active").attr("data-feature");
            createFeatureTableCSV(activeFeature);
        });
        
        sistemaExpuestoActivo = $(".tabs__item.active").text();
    
        $(".tabs__item").on("click", function(){
          var tab = $(".tabs__item").index(this);
          $(".tabs__item").removeClass("active");
          $(".panels__item").removeClass("active");
          $(this).addClass("active");
          var panel = $(".panels__item")[tab];
          $(panel).addClass("active");
          identifiedServices.forEach(function(service){
            if(map.getLayer(service)) map.getLayer(service).setVisibility(false);
          });
          if(map.getLayer($(this).attr("data-feature"))) map.getLayer($(this).attr("data-feature")).setVisibility(true);
          sistemaExpuestoActivo = $(this).text();
        });
        
        Object.keys(capasDeBusqueda).forEach(function(key){
          serviciosEncendidos[key]["identify"]["params"].layerIds = capasDeBusqueda[key];
          capasDeBusqueda[key].forEach(function(layer, idx){
            // console.log(key, layer, idx);
            if(idx === 0) mostrarFeaturesDentro(currentLocation, serviciosEncendidos[key]["url"] + "/" + layer, key + "_" + layer, true);
            else mostrarFeaturesDentro(currentLocation, serviciosEncendidos[key]["url"] + "/" + layer, key + "_" + layer);
          })
        });
        identifyFeatures(currentLocation);
        $("#toolbar span").removeClass("active");
        $("#layersActive").css("display", "none");
        if(locationEventClick) locationEventClick.remove();
      }
    });
    $("#layersActive .cancelar").on("click", function(){ $("#layersActive").css("display", "none") });
  }
}

function borrarCapas(capas){
  capas.forEach(function(capa){
      if(map.getLayer(capa)) map.removeLayer(map.getLayer(capa));
  });
  featureTables.forEach(function(ft){
      ft.destroy();
  });
}

$(function(){
  $("#BtnLimpiar").on("click", function(){
    borrarCapas(identifiedServices);
    identifiedServices = [];
  });
});