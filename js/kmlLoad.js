$(function(){
    $("#loadKML").on("click", function(){
        var kmlUrl = $("#kmlUrl").val();
        $("#kmlUrl").val("");
        if(kmlUrl != ""){
            loadKML(kmlUrl.replace("dl=0", "dl=1"));
        } else {
            console.log("No se introdujo ningun texto");
        }
    })
})

$(function(){
    var dropzone = document.getElementById('dropzone');

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
        loadKML(d.file);
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

var kmlLayer;
var kmlArray = [];
var kmlLoad;
var mapLayerLoad;
var deleteKml;
var opacityKml;
var zoomKml;
var active;
var visibleKML;

var extension;
var nameKML;

function loadKML(kmlUrl){
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
        var kml = new KMLLayer(kmlUrl, {
            id: kmlUrl.substr(kmlUrl.lastIndexOf("/") + 1, kmlUrl.lastIndexOf(".") - kmlUrl.lastIndexOf("/") - 1),
            outSR: new SpatialReference(4326)
        });
        extension = kmlUrl.substr(kmlUrl.lastIndexOf(".") + 1);
        nameKML = kml.id;
        mapLayerLoad = map.on("layer-add-result", function(obj){
            showElem();
            if(extension != "kml" && obj.layer.graphics){
                nameKML = obj.layer.id.substr(0, obj.layer.id.lastIndexOf("_"));
                zoomIntoLayer(nameKML);
                createGraphicsMenu(nameKML);
                kmlArray.push(nameKML);
                createKMLList(kmlArray);
                mapLayerLoad.remove();
                hideElem();
            } else if(extension == "kml"){
                kmlArray.push(nameKML);
                zoomIntoLayer(nameKML);
                createKMLList(kmlArray);
                createGraphicsMenu(nameKML);
                mapLayerLoad.remove();
                hideElem();
            }
            //getSelectedGraphic(map.getLayer(nameKML));
        })
        kmlLoad = kml.on("load", function() {
            map.addLayer(kml);
            kmlLoad.remove();
        });

        function createGraphicsMenu(name) {
            // Creates right-click context menu for GRAPHICS
            var ctxMenuForGraphicsKML = new Menu({});
            ctxMenuForGraphicsKML.addChild(new MenuItem({
                label: "EditarKML",
                onClick: function() {
                if ( selected.geometry.type !== "point" ) {
                    editToolbar.activate(Edit.EDIT_VERTICES, selected);
                } else {
                    alert("Not implemented");
                }
                }
            }));

            ctxMenuForGraphicsKML.addChild(new MenuItem({
                label: "MoverKML",
                onClick: function() {
                editToolbar.activate(Edit.MOVE, selected);
                }
            }));

            ctxMenuForGraphicsKML.addChild(new MenuItem({
                label: "RotarKML",
                onClick: function() {
                editToolbar.activate(Edit.ROTATE, selected);
                }
            }));

            ctxMenuForGraphicsKML.addChild(new MenuItem({
                label: "AcercarKML",
                onClick: function() {
                    zoomToFeature(selected.geometry);
                }
            }));

            ctxMenuForGraphicsKML.addChild(new MenuItem({
                label: "AnalizarKML",
                onClick: function() {
                   if ( selected.geometry.type != "point" ) {
                        showElem();
                        createRandomText();
                        lastGeometry = selected.geometry;
                        realizarAnalisis(selected.geometry);
                    } else {
                        var distance = prompt("¿Cuál es el radio de búsqueda? (en metros)", "1000");
                        showElem();
                        showBuffer(selected.geometry, distance);
                    }
                }
            }));

            ctxMenuForGraphicsKML.addChild(new MenuSeparator());
            ctxMenuForGraphicsKML.addChild(new MenuItem({
                label: "BorrarKML",
                onClick: function() {
                map.getLayer(name).getLayers()[0].remove(selected);
                }
            }));

            ctxMenuForGraphicsKML.startup();

            map.getLayer(name).getLayers().forEach(function(layer){
                layer.on("mouse-move", function(evt) {
                    selected = evt.graphic;
                    ctxMenuForGraphicsKML.bindDomNode(evt.graphic.getDojoShape().getNode());
                })
            })
            map.getLayer(name).getLayers().forEach(function(layer){
                layer.on("mouse-out", function(evt) {
                    ctxMenuForGraphicsKML.unBindDomNode(evt.graphic.getDojoShape().getNode());
                });
            });
        }
    });
}

function getSelectedGraphic(kml){
    kml.getLayers().forEach(function(layer){
        layer.on("mouse-move", function(evt) {
            selected = evt.graphic;
            ctxMenuForGraphicsKML.bindDomNode(evt.graphic.getDojoShape().getNode());
        });

        layer.on("mouse-out", function(evt) {
            ctxMenuForGraphicsKML.unBindDomNode(evt.graphic.getDojoShape().getNode());
        });
    })
}

function borrarKml(kmlId){
    map.removeLayer(map.getLayer(kmlId));
}

function createKMLList(array){
    if(deleteKml) deleteKml.remove();
    if(opacityKml) opacityKml.remove();
    if(zoomKml) zoomKml.remove();

    kmlArray = array;

    var elements = "";
    var kmlNewArray = [];
    array.forEach(function(nombre){
        elements += 
            '<li>' + 
                '<input type="checkbox" id="' + nombre + '_checkbox" checked><label for="' + nombre + '_checkbox">' + nombre.substr(0, (nombre.lastIndexOf("_") != -1 ? nombre.lastIndexOf("_") : nombre.length)) + '</label>' + 
                '<br/>' +
                '<input id="'+ nombre +'_range" type="range" min="0" max="100" step="1" value="100">'+
                '<img src="imagenes/eliminar.png" id="'+ nombre + '_delete" class="delete" />' +
                '<img src="imagenes/lupa.png" id="'+ nombre + '_zoom" class="zoom" />' +
            '</li>';
    })
    $("#kmlList")[0].innerHTML = elements;

    opacityKml = $("#kmlList input[type='range']").on('input', function(){
        // name = this.id.substr(0, this.id.lastIndexOf("_"));
        map.getLayer(this.id.substr(0, this.id.lastIndexOf("_"))).setOpacity(this.value/100);
        zoomIntoLayer(this.id.substr(0, this.id.lastIndexOf("_")));
    });
    deleteKml = $("#kmlList .delete").on('click', function(){
        var regEx = /(.+)_delete$/
        var borrado = this.id.match(regEx)[1];
        var regEx2 = /_0$/;
        var borrado2 = borrado.match(regEx2);
        console.log(borrado2);
        if(borrado2 == null) map.removeLayer(map.getLayer(borrado));
        else map.removeLayer(map.getLayer(borrado.substr(0, borrado.lastIndexOf("_"))));
        array.forEach(function(nombre){
            if(nombre != borrado){
                kmlNewArray.push(nombre);
            }
        })
        // kmlArray.splice(kmlArray.indexOf(this.id.substr(0, this.id.lastIndexOf("_")), 1));
        console.log(kmlNewArray);
        bufferGraphics.clear();
        createKMLList(kmlNewArray);
    });
    zoomKml = $("#kmlList .zoom").on('click', function(){
        zoomIntoLayer(this.id.substr(0, this.id.lastIndexOf("_")));
    });
    visibleKML = $("#kmlList input[type='checkbox']").on('change', function(){
        var regEx = /(.+)_checkbox$/
        var capa = this.id.match(regEx)[1];
        var lyr = map.getLayer(capa);
        console.log(capa);
        if(lyr.visible) lyr.hide();
        else lyr.show();
    })
}

function zoomIntoLayer(layerName){
    var kmlExtent;
    if(map.getLayer(layerName) && map.getLayer(layerName).getLayers()){
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
            map.setExtent(kmlExtent.expand(2));
        }
    }
}