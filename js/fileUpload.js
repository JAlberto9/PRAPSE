$(function(){
    $("#loadFile").on("click", function(){
        var csvUrl = $("#fileUrl").val();
        $("#fileUrl").val("");
        if(csvUrl != ""){
            loadCSV(csvUrl.replace("dl=0", "dl=1"));
        } else {
            console.log("No se introdujo ningun texto");
        }
    });
});

$(function(){
    var inputFile = document.getElementById('inputFile');

    inputFile.onchange = function(event){
        console.log(event);
        event.preventDefault();
        var fileName = event.target.value.toLowerCase();
        if(fileName.lastIndexOf(".zip") != -1){
            var name = fileName.replace("c:\\fakepath\\", "");
            loadShapefile(name);
        } else if(fileName.lastIndexOf(".csv") != -1 || fileName.lastIndexOf(".kml") != -1 || fileName.lastIndexOf(".kmz") != -1){
            upload(event.target.files);
        } else {
            alert("No es un archivo con el formato permitido");
        }
        $("#uploadFormFile input").val("");
    }

    var upload = function(files){
    // console.log(files);
    var formData = new FormData(),
    xhr = new XMLHttpRequest(), x;

    for(x = 0; x < files.length; x++){
        formData.append('file[]', files[x]);
    }

    xhr.onload = function(){
        var data = JSON.parse(this.responseText);
        data.uploaded.forEach(function(d){
            loadFile(d.file);
        })
    }

    xhr.open('post', 'upload.php');
    xhr.send(formData);
    }
})

var filesArray = [];
var csvLoad;
var mapLayerLoad;
var deleteFile;
var opacityFile;
var zoomFile;
var visibleFile;

function createGraphicsMenuLayer(layerName) {
    require([
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "esri/toolbars/edit"
    ], function(
        Menu,
        MenuItem,
        MenuSeparator,
        Edit
    ){
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
                if(map.getLayer(layerName).getLayers()){
                    map.getLayer(layerName).getLayers().forEach(function(layer){
                        layer.remove(selected);
                    });
                } else {
                    map.getLayer(layerName).remove(selected);
                }
            }
        }));

        ctxMenuForGraphics.startup();

        if(map.getLayer(layerName).url){
            var url = map.getLayer(layerName).url;
            var extension = url.substr(url.lastIndexOf(".") + 1);
        } else {
            var type = map.getLayer(layerName).type;
        }
    
        if((url && url.indexOf("KmlServer") != -1) || extension == "kml" || extension == "kmz"){
            map.getLayer(layerName).getLayers().forEach(function(layer){
                layer.on("mouse-move", function(evt) {
                    selected = evt.graphic;
                    ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
                });
            });

            map.getLayer(layerName).getLayers().forEach(function(layer){
                layer.on("mouse-out", function(evt) {
                    ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
                });
            });
        } else if(extension == "csv" || (type && type == "Feature Layer")){
            map.getLayer(layerName).on("mouse-move", function(evt) {
                selected = evt.graphic;
                ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
            });

            map.getLayer(layerName).on("mouse-out", function(evt) {
                ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
            });
        }
    });
}

function loadFile(fileUrl){
    var name = fileUrl.substr(fileUrl.lastIndexOf("/") + 1, fileUrl.lastIndexOf(".") - fileUrl.lastIndexOf("/") - 1);
    var extension = fileUrl.substr(fileUrl.lastIndexOf(".") + 1);
    switch(extension){
        case "csv":
            loadCSV(fileUrl, name);
            break;
        case "kml":
        case "kmz":
            loadKML(fileUrl, name, extension);
            break;
    }
}

function loadCSV(fileUrl, fileName){
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
        var csv = new CSVLayer(fileUrl, {
            id: fileName
        });

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

        var csvLoad = csv.on("load", function() {
            filesArray.push(fileName);
            createFileList(filesArray);
            map.addLayer(csv);
            csvLoad.remove();
        });

        var mapLayerLoad = map.on("layer-add-result", function(obj){
            zoomIntoLayer(fileName);
            createGraphicsMenuLayer(fileName);
            mapLayerLoad.remove();
        });
    });
}

function loadKML(fileUrl, fileName, type){
    require([ 
        "esri/layers/KMLLayer",
        "esri/toolbars/edit",
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "esri/SpatialReference",
        "esri/graphicsUtils",
    ], function(
        KMLLayer,
        Edit,
        Menu,
        MenuItem,
        MenuSeparator,
        SpatialReference,
        graphicsUtils
    ) {
        var kml = new KMLLayer(fileUrl, {
            id: fileName,
            outSR: new SpatialReference(4326)
        });

        var kmlLoad = kml.on("load", function() {
            map.addLayer(kml);
            kmlLoad.remove();
        });

        var mapLayerLoad = map.on("layer-add-result", function(obj){
            showElem();
            if(type != "kml" && obj.layer.graphics){
                var layerName = obj.layer.id.substr(0, obj.layer.id.lastIndexOf("_"));
                zoomIntoLayer(layerName, type);
                createGraphicsMenuLayer(layerName);
                filesArray.push(layerName);
                createFileList(filesArray);
                mapLayerLoad.remove();
                hideElem();
            } else if(type == "kml"){
                filesArray.push(fileName);
                zoomIntoLayer(fileName, type);
                createFileList(filesArray);
                createGraphicsMenuLayer(fileName);
                mapLayerLoad.remove();
                hideElem();
            }
        });
    });
}

function loadShapefile(layerName){
    require([
        "esri/request",
        "esri/geometry/scaleUtils",
        "dojo/_base/lang"
      ],
        function (
        request, scaleUtils, lang
      ) {
        var portalUrl = "https://www.arcgis.com";
        var shapefileName = layerName.substr(0, layerName.lastIndexOf("."));
        // console.log(shapefileName);
        var params = {
            'name': shapefileName,
            'targetSR': map.spatialReference,
            'maxRecordCount': 1000,
            'enforceInputFileSizeLimit': true,
            'enforceOutputJsonSizeLimit': true
        };
        var extent = scaleUtils.getExtentForScale(map, 40000);
        var resolution = extent.getWidth() / map.width;
        params.generalize = true;
        params.maxAllowableOffset = resolution;
        params.reducePrecision = true;
        params.numberOfDigitsAfterDecimal = 0;

        var myContent = {
            'filetype': 'shapefile',
            'publishParameters': JSON.stringify(params),
            'f': 'json',
            'callback.html': 'textarea'
        };

        request({
            url: portalUrl + '/sharing/rest/content/features/generate',
            content: myContent,
            form: document.getElementById('uploadFormFile'),
            handleAs: 'json',
            load: lang.hitch(this, function (response) {
              if (response.error) {
                console.log(response.error);
                return;
              }
              addShapeFile(response.featureCollection);
              $("#uploadFormFile input").val("");
            }),
            error: lang.hitch(this, function(error){
                console.log(error);
            })
        });
    });
}

function addShapeFile(featureCollection){
    require([
        "esri/layers/FeatureLayer",
        "esri/InfoTemplate"
    ], function(
        FeatureLayer,
        InfoTemplate
    ){
        featureCollection.layers.forEach(function(layer, index){
            var infoTemplate = new InfoTemplate(layer.layerDefinition.name, "${*}");
            var shpFeatureLayer = new FeatureLayer(layer, {
                id: layer.layerDefinition.name + "_layer" + index,
                infoTemplate: infoTemplate
            });

            map.addLayer(shpFeatureLayer);

            zoomIntoLayer(layer.layerDefinition.name + "_layer" + index);
            createGraphicsMenuLayer(layer.layerDefinition.name + "_layer" + index);
            filesArray.push(layer.layerDefinition.name + "_layer" + index);
            createFileList(filesArray);
        });
    });
}

function borrarLayer(layerId){
    map.removeLayer(map.getLayer(layerId));
}

function createFileList(array){
    if(deleteFile) deleteFile.remove();
    if(opacityFile) opacityFile.remove();
    if(zoomFile) zoomFile.remove();

    filesArray = array;

    var elements = "";
    var filesNewArray = [];
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
    $("#filesList")[0].innerHTML = elements;

    opacityFile = $("#filesList input[type='range']").on('input', function(){
        name = this.id.substr(0, this.id.lastIndexOf("_"));
        map.getLayer(name).setOpacity(this.value/100);
    });
    deleteFile = $("#filesList .delete").on('click', function(){
        var regEx = /(.+)_delete$/
        var borrado = this.id.match(regEx)[1];
        if(borrado.lastIndexOf("_0") == -1) map.removeLayer(map.getLayer(borrado));
        else map.removeLayer(map.getLayer(borrado.substr(0, borrado.lastIndexOf("_"))));
        array.forEach(function(nombre){
            if(nombre != borrado){
                filesNewArray.push(nombre);
            }
        })
        // filesArray.splice(filesArray.indexOf(this.id.substr(0, this.id.lastIndexOf("_")), 1));
        // console.log(filesNewArray);
        bufferGraphics.clear();
        createFileList(filesNewArray);
    });
    zoomFile = $("#filesList .zoom").on('click', function(){
        zoomIntoLayer(this.id.substr(0, this.id.lastIndexOf("_")));
    });
    visibleFile = $("#filesList input[type='checkbox']").on('change', function(){
        var regEx = /(.+)_checkbox$/
        var capa = this.id.match(regEx)[1];
        var lyr = map.getLayer(capa);
        // console.log(capa);
        if(lyr.visible) lyr.hide();
        else lyr.show();
    })
}

function zoomIntoLayer(layerName, type = ""){
    console.log(map.getLayer(layerName));
    if(map.getLayer(layerName).url){
        var url = map.getLayer(layerName).url;
        var extension = url.substr(url.lastIndexOf(".") + 1);
    } else {
        var type = map.getLayer(layerName).type;
    }

    if((url && url.indexOf("KmlServer") != -1) || extension == "kml" || extension == "kmz"){
        var kmlExtent;
        map.getLayer(layerName).getLayers().forEach(function(lyr){
            if ( lyr.graphics && lyr.graphics.length > 0 ) {
                var lyrExtent = esri.graphicsExtent(lyr.graphics)
                if ( kmlExtent ) {
                    kmlExtent = kmlExtent.union(lyrExtent);
                } else {
                    kmlExtent = lyrExtent;
                }
            }
        })
        if(kmlExtent){
            map.setExtent(kmlExtent.expand(1.5));
        }
    } else if(extension == "csv" || (type && type == "Feature Layer")){
        var lyr = map.getLayer(layerName);
        var lyrExtent = esri.graphicsExtent(lyr.graphics)
        map.setExtent(lyrExtent.expand(1.5));
    }
}
