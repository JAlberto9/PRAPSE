var sistemaExpuestoActivo = "";
var featureTables = [];

$(function()
{
    var featureLayer_urls = {
        "Supermercados": "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/10",
        "Aeropuertos": "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/41",
        "Hoteles": "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/10",
        "Bancos": "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/10",
        "Gasolineras": "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/10",
        "Población Urbana": "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/7",
        "Población Rural": "http://rmgir.proyectomesoamerica.org/server/rest/services/analysis/Analisis/MapServer/12",
        "Diconsa": "http://rmgir.proyectomesoamerica.org/server/rest/services/Aplicativos/Capas_RMGIR/MapServer/86",
        "Carretera": "http://rmgir.proyectomesoamerica.org/server/rest/services/Aplicativos/Capas_RMGIR/MapServer/35",
        "Puertos": "http://rmgir.proyectomesoamerica.org/server/rest/services/Aplicativos/Capas_RMGIR/MapServer/58",
        "Abasto":"http://rmgir.proyectomesoamerica.org/server/rest/services/Hosted/Copia_de_Directorio_Centrales_de_Abasto_Mayoristas/FeatureServer/0",
        "Municipio":"http://rmgir.proyectomesoamerica.org/server/rest/services/Aplicativos/Capas_RMGIR/MapServer/114",
        
        //Se toma el nombre del identificador para que cuando le des click aparescan en el mapa los iconoes para poder visualizarlos 
        //como a aparee la de hoteles y aeropuertos solo se a agregado la parte de diconsa.
    }

    $("#info").on("click", function(){
        $(".clicked").click();
    });

    $("#BtnLimpiar").on("click", function(){
        borrarCapas();
    });







//Inicio Codigo para Puertos

    $(".clickablePuerto").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickablePuerto").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroPuerto(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
//Codigo modificado para que se genere la tabla a partir del boton secundario por estados 
    
    
    $(".clickable11").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable11").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroPuerto(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })

function mostrarFeaturesDentroPuerto(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//La funcion que modifica la informacion que se muestra al dar click sobre el icono
            outFields: ["IDENTIFICA","CALI_REPR","TIPO"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'IDENTIFICA', 
                alias: 'Identificador', 
              },
              {
                name: 'CALI_REPR', 
                alias: 'Estatus',
              },
              {
                name: 'TIPO', 
                alias: 'Tipo',
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: true,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTablePuerto(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}

function loadFetureTablePuerto(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["IDENTIFICA","CALI_REPR","TIPO"],//Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            fieldInfos: [
              {
                name: 'IDENTIFICA', 
                alias: 'Identificador', 
              },
              {
                name: 'CALI_REPR', 
                alias: 'Estatus',
              },
              {
                name: 'TIPO', 
                alias: 'Tipo',
              }
            ],
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}

//Fin de codigo puerto

























//Inicio Codigo para el Municipios

    $(".clickableMunicipio").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableMunicipio").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroMunicipio(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
//Codigo modificado para que se genere la tabla a partir del boton secundario por estados 
    
    
    $(".clickable10").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable10").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroMunicipio(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })

function mostrarFeaturesDentroMunicipio(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//La funcion que modifica la informacion que se muestra al dar click sobre el icono
            outFields: ["NOM_ENT_","NOM_MUN","POBTOT","POBMAS_","POBFEM_"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'NOM_ENT_', 
                alias: 'Estado', 
              },
              {
                name: 'NOM_MUN', 
                alias: 'Municipio',
              },
              {
                name: 'POBTOT', 
                alias: 'Poblacion Total',
              },
              {
                name: 'POBMAS_',
                alias: 'Poblacion Masculina',
              },
              {
                name: 'POBFEM_',
                alias: 'Poblacion Femenina',
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: true,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableMunicipio(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}

function loadFetureTableMunicipio(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["NOM_ENT_","NOM_MUN","POBTOT","POBMAS_","POBFEM_"],//Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            fieldInfos: [
              {
                name: 'NOM_ENT_', 
                alias: 'Estado', 
              },
              {
                name: 'NOM_MUN', 
                alias: 'Municipio',
              },
              {
                name: 'POBTOT', 
                alias: 'Poblacion Total',
              },
              {
                name: 'POBMAS_',
                alias: 'Poblacion Masculina',
              },
              {
                name: 'POBFEM_',
                alias: 'Poblacion Femenina',
              }
            ],
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}

//Fin de codigo municipios

















































//Inicio de codigo de carretera
$(".clickableCarretera").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableCarretera").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroCarretera(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
    
    function mostrarFeaturesDentroCarretera(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//Es la funcion que hay que modificar con el query correcto para poder obtener solo los campos necesarios.
            outFields: ["TIPO_VIAL","NOMBRE","ID_RED","COND_PAV","CARRILES","ADMINISTRA","VELOCIDAD","FECHA_ACT"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'FECHA_ACT', 
                alias: 'Feche de Actulización', 
              },
              {
                name: 'NOMBRE', 
                alias: 'Nombre',
              },
              {
                name: 'ID_RED',
                alias: 'Id. Red Vial',
              },
              {
                name: 'COND_PAV', 
                alias: 'Composicion',
              },
              {
                name: 'CARRILES',
                alias: 'Carriles',
              },
              {
                name: 'ADMINISTRA',
                alias: 'Administración',
              },
              {
                name: 'VELOCIDAD',
                alias: 'Velocidad',
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: visible,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            var act = "";
            queryFeature.where = act;

            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableCarretera(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}
//Codigo que genera la tabla del boton para mostrar 
    $(".clickable9").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable9").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroCarretera(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })



function loadFetureTableCarretera(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
           "outFields": ["TIPO_VIAL","NOMBRE","ID_RED","COND_PAV","CARRILES","ADMINISTRA","VELOCIDAD","FECHA_ACT"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'FECHA_ACT', 
                alias: 'Feche de Actulización', 
              },
              {
                name: 'NOMBRE', 
                alias: 'Nombre',
              },
              {
                name: 'ID_RED',
                alias: 'Id. Red Vial',
              },
              {
                name: 'COND_PAV', 
                alias: 'Composicion',
              },
              {
                name: 'CARRILES',
                alias: 'Carriles',
              },
              {
                name: 'ADMINISTRA',
                alias: 'Administración',
              },
              {
                name: 'VELOCIDAD',
                alias: 'Velocidad',
              }
            ],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            //Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}
//Fin de codigo de centrales de carretera















































//Inicio de codigo de Abasto
$(".clickableAbasto").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableAbasto").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroAbasto(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
    
    function mostrarFeaturesDentroAbasto(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//Es la funcion que hay que modificar con el query correcto para poder obtener solo los campos necesarios.
            outFields: ["*"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: visible,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            var act = "";
            queryFeature.where = act;

            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableAbasto(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}
//Codigo que genera la tabla del boton para mostrar 
    $(".clickable8").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable8").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroAbasto(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })



function loadFetureTableAbasto(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["*"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            //Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}
//Fin de codigo de centrales de abasto



















































//Inicio de codigo de Diconsa
$(".clickableDiconsa").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableDiconsa").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroDiconsa(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
    
    function mostrarFeaturesDentroDiconsa(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//Es la funcion que hay que modificar con el query correcto para poder obtener solo los campos necesarios.
            outFields: ["ESTADO","MUNICIPIO","LOCALIDAD","DIRECCION","NO_TIENDA_","CVE_INEGI","LONG_GDEC","LAT_GDEC"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'ESTADO', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'DIRECCION',
                alias: 'Direccion'
              },
              {
                name: 'NO_TIENDA_',
                alias: 'No. Tienda'
              },
              {
                name: 'CVE_INEGI',
                alias: 'Clave Inegi'
              },
              {
                name: 'LONG_GDEC',
                alias: 'Longitud'
              },
              {
                name: 'LAT_GDEC',
                alias: 'Latitud'
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: visible,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            var act = "";
            queryFeature.where = act;

            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableDiconsa(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}
//Codigo que genera la tabla del boton para mostrar 
    $(".clickable7").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable7").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroDiconsa(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })



function loadFetureTableDiconsa(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["ESTADO","MUNICIPIO","LOCALIDAD","DIRECCION","NO_TIENDA_","CVE_INEGI","LONG_GDEC","LAT_GDEC"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'ESTADO', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'DIRECCION',
                alias: 'Direccion'
              },
              {
                name: 'NO_TIENDA_',
                alias: 'No. Tienda'
              },
              {
                name: 'CVE_INEGI',
                alias: 'Clave Inegi'
              },
              {
                name: 'LONG_GDEC',
                alias: 'Longitud'
              },
              {
                name: 'LAT_GDEC',
                alias: 'Latitud'
              }
            ],//Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}
//Fin de codigo de Diconsa





//Inicio de codigo de Banco
$(".clickableBanco").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableBanco").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroBanco(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
    
    function mostrarFeaturesDentroBanco(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//Es la funcion que hay que modificar con el query correcto para poder obtener solo los campos necesarios.
            outFields: ["ENTIDAD","MUNICIPIO","LOCALIDAD","NOM_ESTAB","COD_POSTAL","LATITUD","LONGITUD"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'ENTIDAD', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'NOM_ESTAB',
                alias: 'Nombre'
              },
              {
                name: 'COD_POSTAL',
                alias: 'C.P'
              },
              {
                name: 'LATITUD',
                alias: 'Latitud'
              },
              {
                name: 'LONGITUD',
                alias: 'Longitud'
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: visible,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            var act = "";
            switch(name){
                case "Bancos":
                    act = "CODIGO_ACT = '521110' OR CODIGO_ACT = '522110'"
                break;
                case "Hoteles":
                    act = "CODIGO_ACT = '721111' OR CODIGO_ACT = '721112' OR CODIGO_ACT = '721113' OR CODIGO_ACT = '721190' OR CODIGO_ACT = '721210' OR CODIGO_ACT = '721311' OR CODIGO_ACT = '721312'"
                break;
                case "Gasolineras":
                    act = "CODIGO_ACT = '468411'"
                break;
                case "Supermercados":
                    act = "CODIGO_ACT = '462111' OR CODIGO_ACT = '462112' OR CODIGO_ACT = '462210'"
                break;
            }
            queryFeature.where = act;

            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableBanco(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}
//Codigo que genera la tabla del boton para mostrar 
    $(".clickable6").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable6").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroBanco(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })



function loadFetureTableBanco(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["ENTIDAD","MUNICIPIO","LOCALIDAD","NOM_ESTAB","COD_POSTAL","LATITUD","LONGITUD"],//Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            fieldInfos: [
              {
                name: 'ENTIDAD', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'NOM_ESTAB',
                alias: 'Nombre'
              },
              {
                name: 'COD_POSTAL',
                alias: 'C.P'
              },
              {
                name: 'LATITUD',
                alias: 'Latitud'
              },
              {
                name: 'LONGITUD',
                alias: 'Longitud'
              }
            ],
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}
//Fin de codigo de Banco

//Inicio de codigo de Gasolineras
$(".clickableGas").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableGas").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroGas(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
    
    function mostrarFeaturesDentroGas(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//Es la funcion que hay que modificar con el query correcto para poder obtener solo los campos necesarios.
            outFields: ["ENTIDAD","MUNICIPIO","LOCALIDAD","NOM_ESTAB","NOM_VIAL","NUMERO_EXT","COD_POSTAL","TELEFONO","LATITUD","LONGITUD"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'ENTIDAD', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'NOM_ESTAB',
                alias: 'Nombre'
              },
              {
                name: 'NOM_VIAL',
                alias: 'Direccion'

              },
              {
                name: 'NUMERO_EXT',
                alias: 'Num.Ext.'
              },
              {
                name: 'COD_POSTAL',
                alias: 'C.P'
              },
              {
                name: 'TELEFONO',
                alias: 'Telefono',
              },
              {
                name: 'LATITUD',
                alias: 'Latitud'
              },
              {
                name: 'LONGITUD',
                alias: 'Longitud'
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: visible,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            var act = "";
            switch(name){
                case "Bancos":
                    act = "CODIGO_ACT = '521110' OR CODIGO_ACT = '522110'"
                break;
                case "Hoteles":
                    act = "CODIGO_ACT = '721111' OR CODIGO_ACT = '721112' OR CODIGO_ACT = '721113' OR CODIGO_ACT = '721190' OR CODIGO_ACT = '721210' OR CODIGO_ACT = '721311' OR CODIGO_ACT = '721312'"
                break;
                case "Gasolineras":
                    act = "CODIGO_ACT = '468411'"
                break;
                case "Supermercados":
                    act = "CODIGO_ACT = '462111' OR CODIGO_ACT = '462112' OR CODIGO_ACT = '462210'"
                break;
            }
            queryFeature.where = act;

            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableGas(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}
//Codigo que genera la tabla del boton para mostrar 
    $(".clickable5").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable5").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroGas(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })



function loadFetureTableGas(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["ENTIDAD","MUNICIPIO","LOCALIDAD","NOM_ESTAB","NOM_VIAL","NUMERO_EXT","COD_POSTAL","TELEFONO","LATITUD","LONGITUD"],//Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            fieldInfos: [
              {
                name: 'ENTIDAD', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'NOM_ESTAB',
                alias: 'Nombre',
              },
              {
                name: 'NOM_VIAL',
                alias: 'Direccion',

              },
              {
                name: 'NUMERO_EXT',
                alias: 'Num.Ext.',
              },
              {
                name: 'COD_POSTAL',
                alias: 'C.P',
              },
              {
                name: 'TELEFONO',
                alias: 'Telefono',
              },
              {
                name: 'LATITUD',
                alias: 'Latitud',
              },
              {
                name: 'LONGITUD',
                alias: 'Longitud'
              }
            ],
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}
//Fin de codigo de Gasolineras



//Inicio de codigo de supermercados
$(".clickableSuper").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableSuper").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroSuper(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
    
    function mostrarFeaturesDentroSuper(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//Es la funcion que hay que modificar con el query correcto para poder obtener solo los campos necesarios.
            outFields: ["ENTIDAD","MUNICIPIO","LOCALIDAD","NOM_ESTAB","NOM_VIAL","NUMERO_EXT","COD_POSTAL","TELEFONO","LATITUD","LONGITUD"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'ENTIDAD', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'NOM_ESTAB',
                alias: 'Nombre'
              },
              {
                name: 'NOM_VIAL',
                alias: 'Direccion'

              },
              {
                name: 'NUMERO_EXT',
                alias: 'Num.Ext.'
              },
              {
                name: 'COD_POSTAL',
                alias: 'C.P'
              },
              {
                name: 'TELEFONO',
                alias: 'Telefono',
              },
              {
                name: 'LATITUD',
                alias: 'Latitud'
              },
              {
                name: 'LONGITUD',
                alias: 'Longitud'
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: visible,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            var act = "";
            switch(name){
                case "Bancos":
                    act = "CODIGO_ACT = '521110' OR CODIGO_ACT = '522110'"
                break;
                case "Hoteles":
                    act = "CODIGO_ACT = '721111' OR CODIGO_ACT = '721112' OR CODIGO_ACT = '721113' OR CODIGO_ACT = '721190' OR CODIGO_ACT = '721210' OR CODIGO_ACT = '721311' OR CODIGO_ACT = '721312'"
                break;
                case "Gasolineras":
                    act = "CODIGO_ACT = '468411'"
                break;
                case "Supermercados":
                    act = "CODIGO_ACT = '462111' OR CODIGO_ACT = '462112' OR CODIGO_ACT = '462210'"
                break;
            }
            queryFeature.where = act;

            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableSuper(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}
//Codigo que genera la tabla del boton para mostrar 
    $(".clickable4").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable4").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroSuper(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })



function loadFetureTableSuper(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["ENTIDAD","MUNICIPIO","LOCALIDAD","NOM_ESTAB","NOM_VIAL","NUMERO_EXT","COD_POSTAL","TELEFONO","LATITUD","LONGITUD"],//Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            fieldInfos: [
              {
                name: 'ENTIDAD', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'NOM_ESTAB',
                alias: 'Nombre',
              },
              {
                name: 'NOM_VIAL',
                alias: 'Direccion',

              },
              {
                name: 'NUMERO_EXT',
                alias: 'Num.Ext.',
              },
              {
                name: 'COD_POSTAL',
                alias: 'C.P',
              },
              {
                name: 'TELEFONO',
                alias: 'Telefono',
              },
              {
                name: 'LATITUD',
                alias: 'Latitud',
              },
              {
                name: 'LONGITUD',
                alias: 'Longitud'
              }
            ],
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}
//Fin de codigo de supermercado


//Cidigo de Hoteles

    $(".clickableHotel").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableHotel").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroHotel(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
    
    function mostrarFeaturesDentroHotel(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//Es la funcion que hay que modificar con el query correcto para poder obtener solo los campos necesarios.
            outFields: ["ENTIDAD","MUNICIPIO","LOCALIDAD","NOM_ESTAB","NOM_VIAL","NUMERO_EXT","COD_POSTAL","TELEFONO","LATITUD","LONGITUD"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'ENTIDAD', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'NOM_ESTAB',
                alias: 'Nombre'
              },
              {
                name: 'NOM_VIAL',
                alias: 'Direccion'

              },
              {
                name: 'NUMERO_EXT',
                alias: 'Num.Ext.'
              },
              {
                name: 'COD_POSTAL',
                alias: 'C.P'
              },
              {
                name: 'TELEFONO',
                alias: 'Telefono',
              },
              {
                name: 'LATITUD',
                alias: 'Latitud'
              },
              {
                name: 'LONGITUD',
                alias: 'Longitud'
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: visible,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            var act = "";
            switch(name){
                case "Bancos":
                    act = "CODIGO_ACT = '521110' OR CODIGO_ACT = '522110'"
                break;
                case "Hoteles":
                    act = "CODIGO_ACT = '721111' OR CODIGO_ACT = '721112' OR CODIGO_ACT = '721113' OR CODIGO_ACT = '721190' OR CODIGO_ACT = '721210' OR CODIGO_ACT = '721311' OR CODIGO_ACT = '721312'"
                break;
                case "Gasolineras":
                    act = "CODIGO_ACT = '468411'"
                break;
                case "Supermercados":
                    act = "CODIGO_ACT = '462111' OR CODIGO_ACT = '462112' OR CODIGO_ACT = '462210'"
                break;
            }
            queryFeature.where = act;

            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableHotel(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}
//Codigo que genera la tabla del boton para mostrar 
    $(".clickable3").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable3").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroHotel(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })



function loadFetureTableHotel(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["ENTIDAD","MUNICIPIO","LOCALIDAD","NOM_ESTAB","NOM_VIAL","NUMERO_EXT","COD_POSTAL","TELEFONO","LATITUD","LONGITUD"],//Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            fieldInfos: [
              {
                name: 'ENTIDAD', 
                alias: 'Estado', 
              },
              {
                name: 'MUNICIPIO', 
                alias: 'Municipio',
              },
              {
                name: 'LOCALIDAD', 
                alias: 'Localidad',
              },
              {
                name: 'NOM_ESTAB',
                alias: 'Nombre',
              },
              {
                name: 'NOM_VIAL',
                alias: 'Direccion',

              },
              {
                name: 'NUMERO_EXT',
                alias: 'Num.Ext.',
              },
              {
                name: 'COD_POSTAL',
                alias: 'C.P',
              },
              {
                name: 'TELEFONO',
                alias: 'Telefono',
              },
              {
                name: 'LATITUD',
                alias: 'Latitud',
              },
              {
                name: 'LONGITUD',
                alias: 'Longitud'
              }
            ],
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}


//Fin de codigo de hoteles





//Inicio Codigo para el aeropuerto

    $(".clickableaero").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickableaeros").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            //$('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                0(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroAeropuerto(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
//Codigo modificado para que se genere la tabla a partir del boton secundario por estados 
    
    
    $(".clickable2").on("click", function(){//.clickable genera la tabla para aparecer en el mapa 
        var clicked = this;
        $(clicked).toggleClass("clicked");
        $(".clickable2").each(function(id, el){
            if($(el).hasClass("clicked") && $(el).attr("id") != $(clicked).attr("id")) $(el).removeClass("clicked");
        })
        borrarCapas();
        if(featureTables.length > 0){
            featureTables.forEach(function(ft){
                ft.destroy();
            })
            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });
        }
        if($(clicked).hasClass("clicked") && lastGeometry){
            showElem();
            sourcesClicked = $(clicked).attr("data-sources");
            var sources = sourcesClicked.split("/").map(function(source){ return {name: source, shortName: source.split(" ").join("")} });
            
            var templateSource = $("#featureTable-template").html();
            var template = Handlebars.compile(templateSource);
            var outputHTML = template({features: sources});
            $('#featureTable').html(outputHTML); //Es el constructor de la tabla al seleccionar el icono

            sistemaExpuestoActivo = $(".tabs__item.active").text();

            $(".tabs__item").on("click", function(){
                var tab = $(".tabs__item").index(this);
                $(".tabs__item").removeClass("active");
                $(".panels__item").removeClass("active");
                $(this).addClass("active");
                var panel = $(".panels__item")[tab];
                $(panel).addClass("active");
                sistemaExpuestoActivo = $(this).text();
            });

            $("#downloadFeature").on("click", function(){
                var activeFeature = $(".tabs__item.active").attr("data-feature");
                createFeatureTableCSV(activeFeature);
            });

            $(".closeFeatures").on('click', function(event){
                $(".clicked").click();
            });

            showElem();
            sourcesClicked.split("/").forEach(function(source){
                mostrarFeaturesDentroAeropuerto(lastGeometry, featureLayer_urls[source], source, true);
            });
            hideElem();
        } else {
            sistemaExpuestoActivo = "";
            $("#featureTable").css("display", "none");//Sirve para borrar la tabla q se crea
        }
    })
    


    function borrarCapas(){
        Object.keys(featureLayer_urls).forEach(function(key){
            if(map.getLayer(key))
                map.removeLayer(map.getLayer(key));
        })
    }
});

function mostrarFeaturesDentroAeropuerto(geometry, url, name, visible = false){
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/geometry/Circle",
        "esri/graphic",
        "esri/InfoTemplate",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/config",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Circle,
            Graphic,
            InfoTemplate,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            esriConfig,
            Color
        ){
        var featureLayer = new FeatureLayer(url,{//La funcion que modifica la informacion que se muestra al dar click sobre el icono
            outFields: ["NOMBRE","CLASE","SUBCLASE"],//Esta es el campo donde selecionamos solo ciertas cosas que queremos mostrar
            fieldInfos: [
              {
                name: 'NOMBRE', 
                alias: 'NOMBRE', 
              },
              {
                name: 'CLASE', 
                alias: 'CLASE',
              },
              {
                name: 'SUBCLASE', 
                alias: 'SUBCLASE',
              }
            ],
            mode: FeatureLayer.MODE_ONDEMAND,
            visible: true,
            infoTemplate: new InfoTemplate("Feature", "${*}"),
            id: name
        });
        
        featureLayer.on("error", function(error){
            console.log("Ocurrió un error", error);
        })

        featureLayer.on("load", function(){
            var queryTask = new QueryTask(url);
            var queryFeature = new Query();
            queryFeature.geometry = geometry;
            queryFeature.returnGeometry = false;
            queryFeature.maxAllowableOffset = 10;
            queryTask.on("error", function(error){
                alert("Ocurrió un error", error);
            })

            queryTask.executeForIds(queryFeature,function(results){
                if(!results){
                    console.log("Sin resultados", name.split(" ").join(""));
                    $("#panels__item-" + name.split(" ").join("")).text("Sin resultados");
                    return;
                } else {
                    var noResults = results.length;
                    var defExp = getQuery(results, featureLayer.objectIdField);

                    featureLayer.setDefinitionExpression(defExp);
                    map.addLayer(featureLayer);
                    var layerAdd = map.on('update-end', function(){
                        console.log("Capa agregada");
                        loadFetureTableAero(featureLayer, name, noResults)
                        layerAdd.remove();
                    })
                }
            });
        })
    })
}

function loadFetureTableAero(featureLayer, name, noItems)//Funcion que se encarga de generar la tabal en blanco que obtemos al selecionar algun icono de lo buscado
{
    require([
        "esri/layers/FeatureLayer",
        "esri/dijit/FeatureTable",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/graphic",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color"
        ], function(
            FeatureLayer,
            FeatureTable,
            Query,
            QueryTask,
            Graphic,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            SimpleRenderer,
            Color
        ){
        var featureTable = new FeatureTable({
            featureLayer : featureLayer,
            "outFields": ["CLASE","NOMBRE","SUBCLASE"],//Aqui se modifica para generar la tabla con la informacion que se requiere y no toda la informacion.
            fieldInfos: [
              {
                name: 'CLASE', 
                alias: 'Tipo', 
              },
              {
                name: 'NOMBRE', 
                alias: 'Nombre',
              },
              {
                name: 'SUBCLASE', 
                alias: 'Categoria',
              }
            ],
            map : map, 
            editable: false,
            syncSelection: true,
            batchCount: noItems,
            dateOptions: {
                datePattern: 'M/d/y', 
                timeEnabled: true,
                timePattern: 'H:mm',
            }
        }, "panels__item-" + name.split(" ").join(""));
        featureTables.push(featureTable);

        featureTable.on("row-select", function(e){
            var featureId = e.rows[0].data[featureLayer.objectIdField];

            var query = new Query();
            query.returnGeometry = false;
            query.objectIds = [featureId];
            query.where = "1=1";
            
            map.getLayer(name).queryFeatures(query, function(featureSet){
                if(featureSet.features[0].geometry.type === "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.setExtent(featureSet.features[0].geometry.getExtent().expand(2.5));
                } else if(featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0])){
                    var imageUrl = featureSet.features[0]._graphicsLayer.renderer.getSymbol(featureSet.features[0]).url;
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // map.centerAndZoom(featureSet.features[0].geometry, 16);
                }
            })
            
        })

        featureTable.on("load", function(){
            hideElem();
            map.getLayer(name).on("click", function(evt){
                if(evt.graphic.geometry.type == "polygon"){
                    var selectionSymbol =  new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 255, 17]), 4), // Color contorno
                        new Color([0, 255, 17, 0.4])  // Color fondo
                    );
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                } else {
                    var imageUrl = evt.toElement.attributes["xlink:href"].value
                    var selectionSymbol = new PictureMarkerSymbol(imageUrl, 48 ,48);
                    map.getLayer(name).setSelectionSymbol(selectionSymbol);
                }

                if (evt.graphic && evt.graphic.attributes) {
                    var feature = evt.graphic
                    var featureId = feature.attributes[evt.graphic.getLayer().objectIdField];
        
                    var query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";
        
                    map.getLayer(name).selectFeatures(query, FeatureLayer.SELECTION_NEW);
                    // featureTable.centerOnSelection();
                }                   
            });
        })

        featureTable.on("error", function(){
            hideElem();
            alert("Ocurrió un error", error);
            featureTable.sort("OBJECTID", true);
        })

        featureTable.startup();

        $("#featureTable").css("display", "block");
    })
}

//Fin de codigo aeropuerto


function getQuery(array, objectidName = "OBJECTID"){
    if(array.length <= 1000)
        return  objectidName + " IN (" + array.join(',') + ")";

    return objectidName + " IN (" + array.splice(0, 1000).join(",") + ") OR " + getQuery(array, objectidName);
}



$("#BtnLimpiar").on("click", function(){
    if(featureTables.length > 0){
        featureTables.forEach(function(ft){
            ft.destroy();
        })
        $(".closeFeatures").on('click', function(event){
            $(".clicked").click();
        });
    }
    $("#featureTable").css("display", "none");
    $(".clickable").each(function(id, el){
        if($(el).hasClass("clicked")) $(el).removeClass("clicked");
    });
});

function createFeatureTableCSV(identificador){
    var date = new Date();
    var headersArray = [];
    var headers = $("#panels__item-" + identificador + " .esri-feature-table-grid .esri-feature-table-column-header-title").each(function(f){
        headersArray.push($(this).text().replace(/,/gi, "."))
    });
    headers = headersArray.join(",");
    var tableText = "";
    $("#panels__item-" + identificador + " .dgrid-scroller .dgrid-cell div").each(function(idx, el){
        if(idx != 0 && idx % (headersArray.length) == 0)
            tableText += "\n";
        tableText += $(el).text().replace(/,/gi, ".") + ",";
    })
    var csv = headers + "\n" + tableText;

    var a         = document.createElement('a');
    a.href        = 'data:application/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv);
    a.target      = '_blank';
    a.download    = sistemaExpuestoActivo + '_analisis_' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() +'.csv';

    document.body.appendChild(a);
    a.click();
}
