$(function(){
    var dropzone = document.getElementById('dropzoneCSV');

    var upload = function(files){
    console.log(files);
    var formData = new FormData(),
    xhr = new XMLHttpRequest(), x;

    for(x = 0; x < files.length; x++){
        formData.append('file[]', files[x]);
    }

    xhr.onload = function(){
        var data = JSON.parse(this.responseText);
        data.uploaded.forEach(function(d){
        loadCSV(d.file);
        })
    }

    xhr.open('post', 'upload.php');
    xhr.send(formData);
    }

    dropzone.ondrop = function(event){
    event.preventDefault();
    this.className = 'dropzone';
    upload(event.dataTransfer.files);
    }

    dropzone.ondragover = function(){
    this.className = 'dropzone dragover';
    return false;
    }
    dropzone.ondragleave = function(){
    this.className = 'dropzone';
    return false;
    }
})

var csvArray = [];
var csvLoad;
var mapLayerLoad;
var deleteCSV;
var opacityCSV;
var zoomCSV;
var visibleCSV;

var extension;
var name;

function loadCSV(csvUrl){
    require([ 
        "esri/layers/CSVLayer",
        "esri/toolbars/edit",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color",
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "esri/SpatialReference",
        "esri/InfoTemplate",
        "esri/graphicsUtils",
    ], function(
        CSVLayer,
        Edit,
        PictureMarkerSymbol,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        SimpleRenderer,
        Color,
        Menu,
        MenuItem,
        MenuSeparator,
        SpatialReference,
        InfoTemplate,
        graphicsUtils
    ) {
        var csv = new CSVLayer(csvUrl, {
            id: csvUrl.substr(csvUrl.lastIndexOf("/") + 1, csvUrl.lastIndexOf(".") - csvUrl.lastIndexOf("/") - 1)
        });
        extension = csvUrl.substr(csvUrl.lastIndexOf(".") + 1);
        name = csv.id;
        var color = { 
            "red": (Math.floor(Math.random() * 256)), 
            "green": (Math.floor(Math.random() * 256)),
            "blue": (Math.floor(Math.random() * 256)) 
        };
        var symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE, 15,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255]), 2),
            new Color([color.red, color.green, color.blue]));
        var renderer = new SimpleRenderer(symbol);
        var template = new InfoTemplate("Feature", "${*}");
        csv.setRenderer(renderer);
        csv.setInfoTemplate(template);

        mapLayerLoad = map.on("layer-add-result", function(obj){
            // debugger;
            zoomIntoLayerCSV(name);
            createGraphicsMenuCSV(csv);
            mapLayerLoad.remove();
        })

        csvLoad = csv.on("load", function() {
            console.log("Capa cargada");
            csvArray.push(name);
            createCSVList(csvArray);
            map.addLayer(csv);
            csvLoad.remove();
        });

        function createGraphicsMenuCSV(csv) {
            // Creates right-click context menu for GRAPHICS
            var ctxMenuForGraphics = new Menu({});
            ctxMenuForGraphics.addChild(new MenuItem({
                label: "Mover",
                onClick: function() {
                editToolbar.activate(Edit.MOVE, selected);
                }
            }));

            ctxMenuForGraphics.addChild(new MenuItem({
                label: "Acercar",
                onClick: function() {
                    zoomToFeature(selected.geometry);
                }
            }));

            ctxMenuForGraphics.addChild(new MenuItem({
                label: "Analizar",
                onClick: function() {
                   if ( selected.geometry.type != "point" ) {
                        showElem();
                        createRandomText();
                        lastGeometry = selected.geometry;
                        realizarAnalisis(selected.geometry, exceptLayers);;
                    } else {
                        var distance = prompt("¿Cuál es el radio de búsqueda? (en metros)", "1000");
                        showElem();
                        showBuffer(selected.geometry, distance);
                    }
                }
            }));

            ctxMenuForGraphics.addChild(new MenuSeparator());
            ctxMenuForGraphics.addChild(new MenuItem({
                label: "Borrar",
                onClick: function() {
                csv.remove(selected);
                }
            }));

            ctxMenuForGraphics.startup();
            csv.on("mouse-move", function(evt) {
                selected = evt.graphic;
                ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
            });

            csv.on("mouse-out", function(evt) {
                ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
            });
        }
    });
}

function borrarCSV(csvId){
    map.removeLayer(map.getLayer(csvId));
}

function createCSVList(array){
    if(deleteCSV) deleteCSV.remove();
    if(opacityCSV) opacityCSV.remove();
    if(zoomCSV) zoomCSV.remove();

    csvArray = array;

    var elements = "";
    var csvNewArray = [];
    array.forEach(function(nombre){
        elements += 
            '<li>' + 
                '<input type="checkbox" id="' + nombre + '_checkbox" checked><label for="' + nombre + '_checkbox">' + nombre + '</label>' + 
                '<br/>' +
                '<input id="'+ nombre +'_range" type="range" min="0" max="100" step="1" value="100">'+
                '<img src="imagenes/eliminar.png" id="'+ nombre + '_delete" class="delete" />' +
                '<img src="imagenes/lupa.png" id="'+ nombre + '_zoom" class="zoom" />' +
            '</li>';
    })
    $("#csvList")[0].innerHTML = elements;

    opacityCSV = $("#csvList input[type='range']").on('input', function(){
        name = this.id.substr(0, this.id.lastIndexOf("_"));
        map.getLayer(name).setOpacity(this.value/100);
        zoomIntoLayerCSV(name);
    });
    deleteCSV = $("#csvList .delete").on('click', function(){
        var regEx = /(.+)_delete$/
        var borrado = this.id.match(regEx)[1];
        if(borrado.lastIndexOf("_0") == -1) map.removeLayer(map.getLayer(borrado));
        else map.removeLayer(map.getLayer(borrado.substr(0, borrado.lastIndexOf("_"))));
        array.forEach(function(nombre){
            if(nombre != borrado){
                csvNewArray.push(nombre);
            }
        })
        // csvArray.splice(csvArray.indexOf(this.id.substr(0, this.id.lastIndexOf("_")), 1));
        console.log(csvNewArray);
        bufferGraphics.clear();
        createCSVList(csvNewArray);
    });
    zoomCSV = $("#csvList .zoom").on('click', function(){
        zoomIntoLayerCSV(this.id.substr(0, this.id.lastIndexOf("_")));
    });
    visibleCSV = $("#csvList input[type='checkbox']").on('change', function(){
        var regEx = /(.+)_checkbox$/
        var capa = this.id.match(regEx)[1];
        var lyr = map.getLayer(capa);
        console.log(capa);
        if(lyr.visible) lyr.hide();
        else lyr.show();
    })
}

function zoomIntoLayerCSV(name){
    var lyr = map.getLayer(name);
    var lyrExtent = esri.graphicsExtent(lyr.graphics)
    map.setExtent(lyrExtent.expand(2));
}
