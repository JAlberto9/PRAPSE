/// <reference path="ventanaResultados.js" />
/*
**********************************************************
	funciones de outStatistics

  Análisis  con Ageb y Puntual

  Última Actualización 24/04/2017
**********************************************************
*/

/////////////////////////////////////////////////////////
//Variables
// Población
var pobTotal;
var pobTotalAjustada;
var pobTotalXEstado;
var estados = [];
// Totales
var TotalPobFinal = 0;
var TotalPEA = 0;
var TotalVivFinal = 0;
var TotalPobFem = 0;
var TotalPobMas = 0;
var TotalMenor12 = 0;
var TotalMenor12F = 0;
var TotalMenor12M = 0;
var TotalMayor60 = 0;
var TotalMayor60F = 0;
var TotalMayor60M = 0;

var resultados = {};

var resultadosAnalisis = 0;

var queryPromises = [];
var queryTaskPobArray = [];

var maxFeaturesReturned = 20000;
/*
  Los nombres a buscar deben ser a nivel de capas
  TODO:
    -> Si el nombre de una capa no es único no se garantiza el resultado del análisis
*/
// "http://rmgir-servicios.cenapred.unam.mx:6080/arcgis/rest/services/Aplicativos/Analisis/MapServer"
// "http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Analisis/Analisis/MapServer"
//Aqui se agregan las capas para solo realizar el conteo o si necesita mas como hacer el analisis

var tiposAnalisisEspecial = {
    "Poblacion": ["PoblacionAgeb", "PoblacionRural", "PoblacionITER"]
    }

var nombresCapas = {
  "http://rmgir.proyectomesoamerica.org/server/rest/services/Aplicativos/Capas_RMGIR/MapServer": [
    {
      "name": "Área geoestadística básica urbana 2010",
      "parent": "Censo 2010 (INEGI, 2010)",
      "tipo": "PoblacionAgeb"
    },
    {
      "name": "Colonias ",
      "parent": "Censo 2010 (INEGI, 2010)",
      "tipo": "Colonias"
    },
    {
      "name": "Límites estatales",
      "parent": "Censo 2010 (INEGI, 2010)",
      "tipo": "Municipio"

    },
    {
      "name": "ITER (INEGI, 2010)",
      "parent": "Población y Vivienda",
      "tipo": ["PoblacionRural", "PoblacionITER"]
    },
    {
      "name": "Establecimientos de salud",
      "parent": "Infraestructura de Salud (Secretaría de Salud, 2015)",
      "tipo": "Hospitales"
    },
    {
      "name": "Centros de Trabajo Educativo",
      "parent": "Infraestructura Educativa  (SEP, 2014-2015)",
      "tipo": "Escuelas"
    },
    {
      "name": "Instalación portuaria (SECTUR, 2013)",
      "parent": "Maritima",
      "tipo": "Puertos"
    },
    {
      "name": "Aeropuertos (SCT, 2014)",
      "parent": "Áerea",
      "tipo": "Aeropuertos"
    },
    {
      "name": "Hoteles, gasolineras, bancos, supermercados ( INEGI, 2016)",
      "parent": "Servicios",
      "tipo": ["Supermercados", "Hoteles", "Bancos", "Gasolineras"]
    },
    {
      "name": "Inventario Nacional de Presas (CONAGUA, 2015)",
      "parent": "Infraestructura Hidráulica",
      "tipo": "Presas"
    },
    {
      "name": "Unidades de Producción Ganadera (SAGARPA, 2015)",
      "parent": "Sector Agropecuario (SAGARPA, 2015)",
      "tipo": "Ganaderias"
    },
    {
      "name": "Centros de Distribución Diconsa (SEDESOL, 2011)",
      "parent": "Servicios",
      "tipo": "Diconsa"
    },
    {
      "name": "Red Vial (SCT, 2014)",
      "parent": "Carretera",
      "tipo": "Carretera"
    },
  ],/*
  "http://rmgir.proyectomesoamerica.org/server/rest/services/Hosted/Copia_de_Directorio_Centrales_de_Abasto_Mayoristas/FeatureServer":[
  {
    "name": "Copia_de_Directorio_Centrales_de_Abasto_Mayoristas",
      "tipo": "Abasto",

  },

  ],*/

}

var queryParams = {
    "Colonias": {
        "outFields": [],
        "where": ""
    },
    "Hospitales": {
        "outFields": [],
        "where": ""
    },
    "Escuelas": {
        "outFields": [],
        "where": ""
    },
    "Supermercados": {
        "outFields": ["CODIGO_ACT"],
        "where": "CODIGO_ACT = '462111' OR CODIGO_ACT = '462112' OR CODIGO_ACT = '462210'"
    },
    "Hoteles": {
        "outFields": ["CODIGO_ACT"],
        "where": "CODIGO_ACT = '721111' OR CODIGO_ACT = '721112' OR CODIGO_ACT = '721113' OR CODIGO_ACT = '721190' OR CODIGO_ACT = '721210' OR CODIGO_ACT = '721311' OR CODIGO_ACT = '721312'"
    },
    "Bancos": {
        "outFields": ["CODIGO_ACT"],
        "where": "CODIGO_ACT = '521110' OR CODIGO_ACT = '522110'"
    },
    "Gasolineras": {
        "outFields": ["CODIGO_ACT"],
        "where": "CODIGO_ACT = '468411'"
    },
    "Puertos": {
        "outFields": [],
        "where": ""
    },
    "Aeropuertos": {
        "outFields": [],
        "where": ""
    },
    "Presas": {
        "outFields": [],
        "where": ""
    },
    "Ganaderias": {
        "outFields": [],
        "where": ""
    },
    "PoblacionAgeb": {
        "outFields": ["NOM_ENT", "POBTOT", "VIVTOT", "POBFEM", "POBMAS", "PEA", "P_12YMAS", "P_12YMAS_M", "P_12YMAS_F", "P_60YMAS", "P_60YMAS_M", "P_60YMAS_F"],
        "where": ""
    },
    "PoblacionRural": {
        "outFields": ["NOM_ENT", "POBTOT", "VIVTOT", "POBFEM", "POBMAS", "PEA", "P_12YMAS", "P_12YMAS_M", "P_12YMAS_F", "P_60YMAS", "P_60YMAS_M", "P_60YMAS_F"],
        "where": "POBTOT <= 2500"
    },
    "PoblacionITER": {
        "outFields": ["NOM_ENT", "POBTOT", "VIVTOT", "POBFEM", "POBMAS", "PEA", "P_12YMAS", "P_12YMAS_M", "P_12YMAS_F", "P_60YMAS", "P_60YMAS_M", "P_60YMAS_F"],
        "where": ""
    },
    "Diconsa": {
        "outFields": [],
        "where": ""
    },
    "Carretera": {
        "outFields": [],
        "where": ""
    },
    "Municipio": {
      "outFields": [],
        "where": ""

    }



    /*
    "Abasto": {
        "outFields": [],
        "where": ""
    }*/
}

var urls = {}

function obtenerURLServicios(serviciosObj, geo, exceptLayers){
  var promises = [];
  var layersNames = [];
  var layersNamesCopy = [];
  var serviceUrls = [];
  Object.keys(serviciosObj).forEach(function(serviceUrl, idx){
    serviceUrls.push(serviceUrl);
    var serviceRequest = esri.request({
      url: serviceUrl,
      content: { f: "json" },
      handleAs: "json"
    });
    promises.push(serviceRequest);
    layersNames.push([]);
    layersNamesCopy.push([]);
    Object.keys(serviciosObj[serviceUrl]).forEach(function(layerDataIdx){
      layersNames[idx].push(serviciosObj[serviceUrl][layerDataIdx]["name"]);
      layersNamesCopy[idx].push(serviciosObj[serviceUrl][layerDataIdx]["name"]);
    })
  });

  Promise.all(promises).then(function(data){
    data.forEach(function(serviceInfo, serviceInfoIdx){
      serviceInfo.layers.forEach(function(layer, layerIdx){
        var indexOfLayer = layersNames[serviceInfoIdx].indexOf(layer.name);
        if(indexOfLayer !== -1){
          layersNames[serviceInfoIdx][indexOfLayer] = "";
          var matchLayerInfo = serviciosObj[serviceUrls[serviceInfoIdx]][indexOfLayer];
          var layerInfo = layer;
          if(matchLayerInfo["parent"] === "" && layerInfo.parentLayerId === -1){
            urls[matchLayerInfo["tipo"]] = serviceUrls[serviceInfoIdx] + "/" + layerInfo.id;
          } else {
            var parentLayerInfo = serviceInfo.layers[layerInfo.parentLayerId];
            if(parentLayerInfo.name === matchLayerInfo["parent"]){
              if(typeof matchLayerInfo["tipo"] === "string"){
                urls[matchLayerInfo["tipo"]] = serviceUrls[serviceInfoIdx] + "/" + layerInfo.id;
              } else{
                matchLayerInfo["tipo"].forEach(function(el){
                  urls[el] = serviceUrls[serviceInfoIdx] + "/" + layerInfo.id;
                })
              }
            } else {
                console.log("No se encontró: (servicio)" + parentLayerInfo.name + ", (proporcionado)" + matchLayerInfo["parent"])
            }
          }

          layersNamesCopy[serviceInfoIdx].splice(indexOfLayer, 1);
          if(layersNamesCopy[serviceInfoIdx].length === 0) return;
        }
      });
    });

    var evt = new CustomEvent('urls-listas', {detail: {geometry: geo, exceptLayers: exceptLayers}});
    document.dispatchEvent(evt);
  }, function(reason){
    console.log("Ocurrió un error", reason);
  })
}

function realizarAnalisis(geo, exceptLayers = []){
    pobTotal = [];
    pobTotalAjustada = {};
    pobTotalXEstado = [];
    estados = [];

    //TOTALES
    TotalPobFinal = 0;
    TotalPEA = 0;
    TotalVivFinal = 0;
    TotalPobFem = 0;
    TotalPobMas = 0;
    TotalMenor12 = 0;
    TotalMenor12F = 0;
    TotalMenor12M = 0;
    TotalMayor60 = 0;
    TotalMayor60F = 0;
    TotalMayor60M = 0;


    resultadosAnalisis = 0;


    if(Object.keys(urls) == 0) obtenerURLServicios(nombresCapas, geo, exceptLayers);
    else {
        if(queryPromises.length > 0){
            queryPromises.forEach(function(query){
                console.log("cancelando", query);
                query.cancel();
            })
        }
        if(queryTaskPobArray.length > 0){
            queryTaskPobArray.forEach(function(query){
                console.log("cancelando Pob", query);
                query.cancel();
            })
        }
        var evt = new CustomEvent('urls-listas', {detail: {geometry: geo, exceptLayers: exceptLayers}});
        document.dispatchEvent(evt);
    }
    console.log(estados);



}



document.addEventListener('urls-listas', function(response){
    var geo = response.detail.geometry;
    var exceptLayers = response.detail.exceptLayers;
    queryPromises = [];
    resultados = {};
    if(exceptLayers.length > 0){
        removeLayers(exceptLayers);
    }
    Object.keys(queryParams).forEach(function(key){
        var queryTask = new esri.tasks.QueryTask(urls[key]);
        var query = new esri.tasks.Query();
        query.returnGeometry = false;
        query.geometry = geo;
        query.outFields = queryParams[key].outFields;
        query.where = queryParams[key].where;
        query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
        if(tiposAnalisisEspecial["Poblacion"] && tiposAnalisisEspecial["Poblacion"].includes(key)){
            queryPromises.push(queryTask.executeForIds(query));
        }else{
            queryPromises.push(queryTask.executeForCount(query));//Solo cuenta el resto de los valores cuando no tiene otra funcion que hacer como el dela poblacion
        }

    })

    Promise.all(queryPromises).then(function(result){
        Object.keys(queryParams).forEach(function(key, idx){
            if(tiposAnalisisEspecial["Poblacion"] && tiposAnalisisEspecial["Poblacion"].includes(key)){
                var tipo;
                if(key == "PoblacionAgeb") tipo = "ageb";
                else if(key == "PoblacionRural") tipo = "rural";
                else if(key == "PoblacionITER") tipo = "iter";
                processResultPob(tipo, urls[key], queryParams[key].outFields, result[idx], 0);
            }else {
                resultados[key] = result[idx];
            }
        })
        if(resultadosAnalisis === Object.keys(tiposAnalisisEspecial).length){
            var evt = new CustomEvent('analisis-completo', { 'detail': resultados });//manda una bandera de termino con el nombre 'analisis-completo'
            document.dispatchEvent(evt);
        }
    }, function(error){
        console.log(err);
    })
});

document.addEventListener('poblacion-obtenida', function(){
    sumaPoblacion();
    resultados["Poblacion"] = TotalPobFinal;
    resultados["TotalPEA"] = TotalPEA;
    resultados["Viviendas"] = TotalVivFinal;
    resultados["TotalPobFem"] = TotalPobFem;
    resultados["TotalPobMas"] = TotalPobMas;
    resultados["TotalMenor12"] = TotalMenor12;
    resultados["TotalMenor12F"] = TotalMenor12F;
    resultados["TotalMenor12M"] = TotalMenor12M;
    resultados["TotalMayor60"] = TotalMayor60;
    resultados["TotalMayor60F"] = TotalMayor60F;
    resultados["TotalMayor60M"] = TotalMayor60M;
    resultadosAnalisis++;

    if(resultadosAnalisis === Object.keys(tiposAnalisisEspecial).length){
        var evt = new CustomEvent('analisis-completo', { 'detail': resultados });
        document.dispatchEvent(evt);
    }
})


function removeLayers(layerNames){
    var index;
    layerNames.forEach(function(name){
        index = Object.keys(queryParams).indexOf(name);
        if(index != -1)
            delete queryParams[name];
        Object.keys(tiposAnalisisEspecial).forEach(function(tipo){
            index = tiposAnalisisEspecial[tipo].indexOf(name);
            if(index != -1) tiposAnalisisEspecial[tipo].splice(index, 1);
        })
    })

    Object.keys(tiposAnalisisEspecial).forEach(function(tipo){
        if(tiposAnalisisEspecial[tipo].length == 0) delete tiposAnalisisEspecial[tipo];
    })
}

function getQuery(array, objectidName = "OBJECTID"){
    if(array.length <= maxFeaturesReturned)
        return  objectidName + " IN (" + array.join(',') + ")";

    return objectidName + " IN (" + array.splice(0, maxFeaturesReturned).join(",") + ") OR " + getQuery(array, objectidName);
}

function processResultPob(type, url, outFields, idsArray, suma, pobResult = []){
    if(!idsArray){
         pobTotalAjustada[type] = [];
         if(Object.keys(pobTotalAjustada).length === tiposAnalisisEspecial["Poblacion"].length){
            var evt = new CustomEvent('poblacion-obtenida');
            document.dispatchEvent(evt);
        }
    } else {
        var objId = type == "ageb" ? "OBJECTID_1" : "OBJECTID";
        var ids = idsArray.splice(0, maxFeaturesReturned);
        var queryTask = new esri.tasks.QueryTask(url);
        var query = new esri.tasks.Query();
        query.returnGeometry = false;
        query.outFields = outFields;
        query.where = objId + " IN (" + ids.join(",") + ")";

        var queryPob = queryTask.execute(query, function(result){
            for (var idx in result.features) {
                if(!pobResult.hasOwnProperty(result.features[idx].attributes.NOM_ENT)){
                    if(!estados.includes(result.features[idx].attributes.NOM_ENT)) estados.push(result.features[idx].attributes.NOM_ENT);
                    pobResult[result.features[idx].attributes.NOM_ENT] = {
                        "Estado": result.features[idx].attributes.NOM_ENT,
                        "TotPob": result.features[idx].attributes.POBTOT,
                        "POBPEA": result.features[idx].attributes.POBPEA,
                        "TotViv": result.features[idx].attributes.VIVTOT,
                        "PobMas": result.features[idx].attributes.POBMAS,
                        "PobFem": result.features[idx].attributes.POBFEM,
                        "Menor12": result.features[idx].attributes.POBTOT - result.features[idx].attributes.P_12YMAS,
                        "Menor12M": result.features[idx].attributes.POBMAS - result.features[idx].attributes.P_12YMAS_M,
                        "Menor12F": result.features[idx].attributes.POBFEM - result.features[idx].attributes.P_12YMAS_F,
                        "Mas60": result.features[idx].attributes.P_60YMAS,
                        "Mas60M": result.features[idx].attributes.P_60YMAS_M,
                        "Mas60F": result.features[idx].attributes.P_60YMAS_F
                    }
                } else {
                    pobResult[result.features[idx].attributes.NOM_ENT] = {
                        "Estado": result.features[idx].attributes.NOM_ENT,
                        "TotPob": pobResult[result.features[idx].attributes.NOM_ENT]["TotPob"] + result.features[idx].attributes.POBTOT,
                        "POBPEA": pobResult[result.features[idx].attributes.NOM_ENT]["POBPEA"] + result.features[idx].attributes.POBPEA,
                        "TotViv": pobResult[result.features[idx].attributes.NOM_ENT]["TotViv"] + result.features[idx].attributes.VIVTOT,
                        "PobMas": pobResult[result.features[idx].attributes.NOM_ENT]["PobMas"] + result.features[idx].attributes.POBMAS,
                        "PobFem": pobResult[result.features[idx].attributes.NOM_ENT]["PobFem"] + result.features[idx].attributes.POBFEM,
                        "Menor12": pobResult[result.features[idx].attributes.NOM_ENT]["Menor12"] + result.features[idx].attributes.POBTOT - result.features[idx].attributes.P_12YMAS,
                        "Menor12M": pobResult[result.features[idx].attributes.NOM_ENT]["Menor12M"] + result.features[idx].attributes.POBMAS - result.features[idx].attributes.P_12YMAS_M,
                        "Menor12F": pobResult[result.features[idx].attributes.NOM_ENT]["Menor12F"] + result.features[idx].attributes.POBFEM - result.features[idx].attributes.P_12YMAS_F,
                        "Mas60": pobResult[result.features[idx].attributes.NOM_ENT]["Mas60"] + result.features[idx].attributes.P_60YMAS,
                        "Mas60M": pobResult[result.features[idx].attributes.NOM_ENT]["Mas60M"] + result.features[idx].attributes.P_60YMAS_M,
                        "Mas60F": pobResult[result.features[idx].attributes.NOM_ENT]["Mas60F"] + result.features[idx].attributes.P_60YMAS_F
                    }
                }
                suma += result.features[idx].attributes.POBTOT;
            }

            if(idsArray.length > 0) {
                processResultPob(type, url, outFields, idsArray, suma, pobResult);
                console.log("Restantes: " + type + ":" + idsArray.length)
            } else {
                pobTotal.push(pobResult);

                console.log(type, suma);

                Object.keys(pobResult).forEach(function(d){
                    ajustaDatosObjPob(pobResult[d]);
                });

                pobTotalAjustada[type] = pobResult;

                if(Object.keys(pobTotalAjustada).length === tiposAnalisisEspecial["Poblacion"].length){
                    var evt = new CustomEvent('poblacion-obtenida');
                    document.dispatchEvent(evt);
                }
            }
        })

        queryTaskPobArray.push(queryPob);
    }
}
//Inicia codigo para el Conteo de Centrales de Abasto















//Termina el conteo para centrales de abasto








function sumaPoblacion(){
    var obj;

    if(estados.length > 0){
        estados.forEach(function(edo){
            if(pobTotalAjustada["ageb"] && Object.keys(pobTotalAjustada["ageb"]).includes(edo) && pobTotalAjustada["rural"] && Object.keys(pobTotalAjustada["rural"]).includes(edo) ){
                obj = {
                    "Estado": edo,
                    "TotPob": pobTotalAjustada["ageb"][edo].TotPob + pobTotalAjustada["rural"][edo].TotPob,
                    "TotViv": pobTotalAjustada["ageb"][edo].TotViv + pobTotalAjustada["rural"][edo].TotViv,
                    "POBPEA": pobTotalAjustada["ageb"][edo].POBPEA + pobTotalAjustada["rural"][edo].POBPEA,
                    "PobMas": pobTotalAjustada["ageb"][edo].PobMas + pobTotalAjustada["rural"][edo].PobMas,
                    "PobFem": pobTotalAjustada["ageb"][edo].PobFem + pobTotalAjustada["rural"][edo].PobFem,
                    "Menor12": pobTotalAjustada["ageb"][edo].Menor12 + pobTotalAjustada["rural"][edo].Menor12,
                    "Menor12M": pobTotalAjustada["ageb"][edo].Menor12M + pobTotalAjustada["rural"][edo].Menor12M,
                    "Menor12F": pobTotalAjustada["ageb"][edo].Menor12F + pobTotalAjustada["rural"][edo].Menor12F,
                    "Mas60": pobTotalAjustada["ageb"][edo].Mas60 + pobTotalAjustada["rural"][edo].Mas60,
                    "Mas60M": pobTotalAjustada["ageb"][edo].Mas60M + pobTotalAjustada["rural"][edo].Mas60M,
                    "Mas60F": pobTotalAjustada["ageb"][edo].Mas60F + pobTotalAjustada["rural"][edo].Mas60F
                }
            } else if(pobTotalAjustada["ageb"] && Object.keys(pobTotalAjustada["ageb"]).includes(edo)){
                // console.log("Rural no contiene: " + edo);
                obj = {
                    "Estado": edo,
                    "TotPob": pobTotalAjustada["ageb"][edo].TotPob,
                    "POBPEA": pobTotalAjustada["ageb"][edo].POBPEA,
                    "TotViv": pobTotalAjustada["ageb"][edo].TotViv,
                    "PobMas": pobTotalAjustada["ageb"][edo].PobMas,
                    "PobFem": pobTotalAjustada["ageb"][edo].PobFem,
                    "Menor12": pobTotalAjustada["ageb"][edo].Menor12,
                    "Menor12M": pobTotalAjustada["ageb"][edo].Menor12M,
                    "Menor12F": pobTotalAjustada["ageb"][edo].Menor12F,
                    "Mas60": pobTotalAjustada["ageb"][edo].Mas60,
                    "Mas60M": pobTotalAjustada["ageb"][edo].Mas60M,
                    "Mas60F": pobTotalAjustada["ageb"][edo].Mas60F
                }
            } else if(pobTotalAjustada["rural"] && Object.keys(pobTotalAjustada["rural"]).includes(edo)){
                // console.log("AGEB no contiene: " + edo);
                obj = {
                    "Estado": edo,
                    "TotPob": pobTotalAjustada["rural"][edo].TotPob,
                    "POBPEA": pobTotalAjustada["rural"][edo].POBPEA,
                    "TotViv": pobTotalAjustada["rural"][edo].TotViv,
                    "PobMas": pobTotalAjustada["rural"][edo].PobMas,
                    "PobFem": pobTotalAjustada["rural"][edo].PobFem,
                    "Menor12": pobTotalAjustada["rural"][edo].Menor12,
                    "Menor12M": pobTotalAjustada["rural"][edo].Menor12M,
                    "Menor12F": pobTotalAjustada["rural"][edo].Menor12F,
                    "Mas60": pobTotalAjustada["rural"][edo].Mas60,
                    "Mas60M": pobTotalAjustada["rural"][edo].Mas60M,
                    "Mas60F": pobTotalAjustada["rural"][edo].Mas60F
                }
            } else if(pobTotalAjustada["iter"] && Object.keys(pobTotalAjustada["iter"]).includes(edo)){
                // console.log("AGEB no contiene: " + edo);
                obj = {
                    "Estado": edo,
                    "TotPob": pobTotalAjustada["iter"][edo].TotPob,
                    "POBPEA": pobTotalAjustada["iter"][edo].POBPEA,
                    "TotViv": pobTotalAjustada["iter"][edo].TotViv,
                    "PobMas": pobTotalAjustada["iter"][edo].PobMas,
                    "PobFem": pobTotalAjustada["iter"][edo].PobFem,
                    "Menor12": pobTotalAjustada["iter"][edo].Menor12,
                    "Menor12M": pobTotalAjustada["iter"][edo].Menor12M,
                    "Menor12F": pobTotalAjustada["iter"][edo].Menor12F,
                    "Mas60": pobTotalAjustada["iter"][edo].Mas60,
                    "Mas60M": pobTotalAjustada["iter"][edo].Mas60M,
                    "Mas60F": pobTotalAjustada["iter"][edo].Mas60F
                }
            }

            pobTotalXEstado.push(obj);
        });

        pobTotalXEstado.forEach(function(value, idx){
            ajustaDatosObjPob(value);
        });

        pobTotalXEstado.forEach(function(value, idx){
            TotalPobFinal += value.TotPob;
            TotalVivFinal += value.TotViv;
            TotalPEA += value.POBPEA;
            TotalMenor12 += value.Menor12;
            TotalMayor60 += value.Mas60;

            TotalPobFem += value.PobFem;
            TotalPobMas += value.PobMas;

            TotalMenor12F += value.Menor12F;
            TotalMenor12M += value.Menor12M;

            TotalMayor60F += value.Mas60F;
            TotalMayor60M += value.Mas60M;
        })
    } else {
        TotalPobFinal = 0;
        TotalVivFinal = 0;
        TotalPEA = 0;
        TotalMenor12 = 0;
        TotalMayor60 = 0;

        TotalPobFem = 0;
        TotalPobMas = 0;

        TotalMenor12F = 0;
        TotalMenor12M = 0;

        TotalMayor60F = 0;
        TotalMayor60M = 0;
    }
}

function ajustaDatosObjPob(obj){
  /**
   ****Función Ajuste Población****
   *Cálculo de población Femenino y Masculino a partir de AGEB y Localidad Rural
   *obteniendo la diferencia del total con respecto a la suma de ambos campos
   *ajustando el resultado datos tomados de INEGI al 2010 (Total = 112,336,538
   *Mujeres = 57,481,307 Hombres = 51,855,231//Con porcentaje de Mujeres = 51.17%
   *Hombres 48.83%)
   **/

  //Diferencia de poblacion Completa
    var difPobTot = obj.TotPob - (obj.PobFem + obj.PobMas);
    var difPobFem = difPobTot * 0.512;
    var difPobMas = difPobTot * 0.488;
    difPobFem = Math.round(difPobFem);
    difPobMas = Math.round(difPobMas);
    obj.PobFem = obj.PobFem + difPobFem;
    obj.PobMas = obj.PobMas + difPobMas;
  //Diferencia Menores a 12 años
    var difPobTot12 = obj.Menor12 - ( obj.Menor12M + obj.Menor12F );
    var difPobFem12 = difPobTot12 * 0.512;
    var difPobMas12 = difPobTot12 * 0.488;
    difPobFem12 = Math.round(difPobFem12);
    difPobMas12 = Math.round(difPobMas12);
    obj.Menor12F = obj.Menor12F + difPobFem12;
    obj.Menor12M = obj.Menor12M + difPobMas12;
  //Diferencia Mayores a 60
    var difPobTot60 = obj.Mas60 - ( obj.Mas60M + obj.Mas60F );
    var difPobFem60 = difPobTot60 * 0.512;
    var difPobMas60 = difPobTot60 * 0.488;
    difPobFem60 = Math.round(difPobFem60);
    difPobMas60 = Math.round(difPobMas60);
    obj.Mas60F = obj.Mas60F + difPobFem60;
    obj.Mas60M = obj.Mas60M + difPobMas60;

    return obj;
}


/*
**********************************************************
	Fin funciones de Obtener resultados outStatistics
**********************************************************
*/
