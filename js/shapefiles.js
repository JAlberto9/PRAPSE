$(function(){
    var shapefileArray = [];
    var deleteShapefile;
    var zoomShapefile;
    var opacityShapefile;
    var visibleShapefile;

    var dropzone = document.getElementById('dropzoneShapefile');

    dropzone.onchange = function(event){
        event.preventDefault();
        var fileName = event.target.value.toLowerCase();
        if(fileName.lastIndexOf(".zip") != -1){
            var name = fileName.replace("c:\\fakepath\\", "");
            $(".fileLabel").text("Cargando...");
            loadShapefile(name);
        } else {
            alert("No es un archivo .zip");
        }
    }
    
    function loadShapefile(name){
        require([
            "esri/request",
            "esri/geometry/scaleUtils",
            "dojo/_base/lang"
          ],
            function (
            request, scaleUtils, lang
          ) {
            var portalUrl = "https://www.arcgis.com";
            var shapefileName = name.substr(0, name.lastIndexOf("."));
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
                form: document.getElementById('uploadFormShapefile'),
                handleAs: 'json',
                load: lang.hitch(this, function (response) {
                  if (response.error) {
                    console.log(response.error);
                    return;
                  }
                //   var layerName = response.featureCollection.layers[0].layerDefinition.name;
                  addShapeFile(response.featureCollection);
                  $("#uploadFormShapefile input").val("");
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

                $(".fileLabel").text("Elige un archivo");
                zoomIntoLayerCSV(layer.layerDefinition.name + "_layer" + index);
                createGraphicsMenuShapefile(shpFeatureLayer);
                shapefileArray.push(layer.layerDefinition.name + "_layer" + index);
                createShapefileList(shapefileArray);
            });
        });
    }

    function createGraphicsMenuShapefile(shapefile) {
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
                shapefile.remove(selected);
                }
            }));

            ctxMenuForGraphics.startup();
            shapefile.on("mouse-move", function(evt) {
                selected = evt.graphic;
                ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
            });

            shapefile.on("mouse-out", function(evt) {
                ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
            });
        });
    }

    function createShapefileList(array){
        if(deleteShapefile) deleteShapefile.remove();
        if(opacityShapefile) opacityShapefile.remove();
        if(zoomShapefile) zoomShapefile.remove();
    
        shapefileArray = array;
    
        var elements = "";
        var shapefileNewArray = [];
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
        $("#shapefileList")[0].innerHTML = elements;
    
        opacityShapefile = $("#shapefileList input[type='range']").on('input', function(){
            name = this.id.substr(0, this.id.lastIndexOf("_"));
            map.getLayer(name).setOpacity(this.value/100);
            // zoomIntoLayerShapefile(name);
        });
        deleteShapefile = $("#shapefileList .delete").on('click', function(){
            var regEx = /(.+)_delete$/
            var borrado = this.id.match(regEx)[1];
            if(borrado.lastIndexOf("_0") == -1) map.removeLayer(map.getLayer(borrado));
            else map.removeLayer(map.getLayer(borrado.substr(0, borrado.lastIndexOf("_"))));
            array.forEach(function(nombre){
                if(nombre != borrado){
                    shapefileNewArray.push(nombre);
                }
            })
            // csvArray.splice(csvArray.indexOf(this.id.substr(0, this.id.lastIndexOf("_")), 1));
            console.log(shapefileNewArray);
            bufferGraphics.clear();
            createShapefileList(shapefileNewArray);
        });
        zoomShapefile = $("#shapefileList .zoom").on('click', function(){
            zoomIntoLayerShapefile(this.id.substr(0, this.id.lastIndexOf("_")));
        });
        visibleShapefile = $("#shapefileList input[type='checkbox']").on('change', function(){
            var regEx = /(.+)_checkbox$/
            var capa = this.id.match(regEx)[1];
            var lyr = map.getLayer(capa);
            console.log(capa);
            if(lyr.visible) lyr.hide();
            else lyr.show();
        })
    }
});

function zoomIntoLayerShapefile(name){
    var lyr = map.getLayer(name);
    var lyrExtent = esri.graphicsExtent(lyr.graphics)
    map.setExtent(lyrExtent.expand(1.5));
}