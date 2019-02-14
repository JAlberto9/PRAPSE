/// <reference path="ventanaResultados.js" />
/*
**********************************************************
	funciones de outStatistics

  Análisis  con Ageb y Puntual

  Última Actualización 23/12/2016
**********************************************************
*/

/////////////////////////////////////////////////////////
//Variables
var geomet;

var CantHospCC;
var CantEscuelitas;
var CantAeropuertos;
var CantSuper;
var CantBancos;
var CantHoteles;
var CantGas;
var CantPresas;
var CantGanadero;

var CantColonia;
var CantRefugios;

// Población
var pobTotal;
var pobTotalAjustada;
var pobTotalXEstado;
// Totales
var TotalPobFinal;
var TotalVivFinal;
var TotalPobFem;
var TotalPobMas;
var TotalMenor12;
var TotalMenor12F;
var TotalMenor12M;
var TotalMayor60;
var TotalMayor60F;
var TotalMayor60M;
// Totales AGEB
var TotPobAgeb;
var TotVivAgeb;
var TotFemAgeb;
var TotMasAgeb;
var Menor12Ageb;
var Menor12MAgeb;
var Menor12FAgeb;
var Mas60Ageb;
var Mas60MAgeb;
var Mas60FAgeb;
// Totales Rurales
var TotPobRur;
var TotVivRur;
var TotFemRur;
var TotMasRur;
var Menor12Rur;
var Menor12MRur;
var Menor12FRur;
var Mas60Rur;
var Mas60MRur;
var Mas60FRur;

/////////////////////////////////////////////////////////
//Funcion Poblacion

    //Ageb
function CalPobTot(geo) {
    showElem();

    pobTotal = [];
    pobTotalAjustada = [];
    pobTotalXEstado = [];

    geomet = geo;

    var popQueryTaskPobAgeb = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/Poblacion/FeatureServer/0");
    var popQueryPobAgeb = new esri.tasks.Query();

    var outFields = ["POBTOT","VIVTOT","POBFEM","POBMAS","P_12YMAS","P_12YMAS_M","P_12YMAS_F","P_60YMAS","P_60YMAS_M","P_60YMAS_F "];

    var statDefPobTotAgeb = new esri.tasks.StatisticDefinition
    statDefPobTotAgeb.statisticType = "sum";
    statDefPobTotAgeb.onStatisticField = "POBTOT";
    statDefPobTotAgeb.outStatisticFieldName = "TotalPobAGEBVar";

    var statDefVivTotAgeb = new esri.tasks.StatisticDefinition
    statDefVivTotAgeb.statisticType = "sum";
    statDefVivTotAgeb.onStatisticField = "VIVTOT";
    statDefVivTotAgeb.outStatisticFieldName = "TotalVivAGEBVar";

    var statDefFemAgeb = new esri.tasks.StatisticDefinition
    statDefFemAgeb.statisticType = "sum";
    statDefFemAgeb.onStatisticField = "POBFEM";
    statDefFemAgeb.outStatisticFieldName = "TotalFemAGEBVar";

    var statDefMasAgeb = new esri.tasks.StatisticDefinition
    statDefMasAgeb.statisticType = "sum";
    statDefMasAgeb.onStatisticField = "POBMAS";
    statDefMasAgeb.outStatisticFieldName = "TotalMasAGEBVar";

    //////////////////////////////////////////////////////////////////

    var statDefMenor12 = new esri.tasks.StatisticDefinition
    statDefMenor12.statisticType = "sum";
    statDefMenor12.onStatisticField = "P_12YMAS";
    statDefMenor12.outStatisticFieldName = "Total12Mas";

    var statDefMenor12M = new esri.tasks.StatisticDefinition
    statDefMenor12M.statisticType = "sum";
    statDefMenor12M.onStatisticField = "P_12YMAS_M";
    statDefMenor12M.outStatisticFieldName = "Total12MasM";

    var statDefMenor12F = new esri.tasks.StatisticDefinition
    statDefMenor12F.statisticType = "sum";
    statDefMenor12F.onStatisticField = "P_12YMAS_F";
    statDefMenor12F.outStatisticFieldName = "Total12MasF";

///////////////////////////////////////////////////////////////

    var statDefMayor60 = new esri.tasks.StatisticDefinition
    statDefMayor60.statisticType = "sum";
    statDefMayor60.onStatisticField = "P_60YMAS";
    statDefMayor60.outStatisticFieldName = "Total60Mas";

    var statDefMayor60M = new esri.tasks.StatisticDefinition
    statDefMayor60M.statisticType = "sum";
    statDefMayor60M.onStatisticField = "P_60YMAS_M";
    statDefMayor60M.outStatisticFieldName = "Total60MasM";

    var statDefMayor60F = new esri.tasks.StatisticDefinition
    statDefMayor60F.statisticType = "sum";
    statDefMayor60F.onStatisticField = "P_60YMAS_F";
    statDefMayor60F.outStatisticFieldName = "Total60MasF";

///////////////////////////////////////////////////////////////

    popQueryPobAgeb.returnGeometry = false;
    popQueryPobAgeb.geometry = geo;
    popQueryPobAgeb.outFields = outFields;
    popQueryPobAgeb.outStatistics = [statDefPobTotAgeb, statDefVivTotAgeb, statDefFemAgeb, statDefMasAgeb,statDefMenor12,statDefMenor12M,statDefMenor12F,statDefMayor60,statDefMayor60M,statDefMayor60F];
    popQueryPobAgeb.groupByFieldsForStatistics = ["NOM_ENT"];
    popQueryTaskPobAgeb.execute(popQueryPobAgeb, RespuestaPobAGEB);
}

    //Fin Ageb
    //Localidad Rural
var TotalPobLocRur;
function RespuestaPobAGEB(result){
  datosPobAGEB = [];
  pobTotalAjustada = [];

  TotalPobFinal = 0;
  TotalVivFinal = 0;
  TotalPobFem = 0;
  TotalPobMas = 0;
  TotalMenor12 = 0;
  TotalMenor12F = 0;
  TotalMenor12M = 0;
  TotalMayor60 = 0;
  TotalMayor60F = 0;
  TotalMayor60M = 0;

  for (var idx in result.features) {
    var obj = {
      "Estado": result.features[idx].attributes.NOM_ENT,
      "TotPob": result.features[idx].attributes.TotalPobAGEBVar,
      "TotViv": result.features[idx].attributes.TotalVivAGEBVar,
      "PobMas": result.features[idx].attributes.TotalMasAGEBVar,
      "PobFem": result.features[idx].attributes.TotalFemAGEBVar,
      "Menor12": result.features[idx].attributes.TotalPobAGEBVar - result.features[idx].attributes.Total12Mas,
      "Menor12M": result.features[idx].attributes.TotalMasAGEBVar - result.features[idx].attributes.Total12MasM,
      "Menor12F": result.features[idx].attributes.TotalFemAGEBVar - result.features[idx].attributes.Total12MasF,
      "Mas60": result.features[idx].attributes.Total60Mas,
      "Mas60M": result.features[idx].attributes.Total60MasM,
      "Mas60F": result.features[idx].attributes.Total60MasF
    }

    datosPobAGEB.push(obj);
  }

  pobTotal.push(datosPobAGEB);

  datosPobAGEB.forEach(function(value, idx){
      ajustaDatosObjPob(value);
  });

  pobTotalAjustada.push(datosPobAGEB);

  TotPobAgeb = 0;
  TotVivAgeb = 0;
  TotFemAgeb = 0;
  TotMasAgeb = 0;
  Menor12Ageb = 0;
  Menor12MAgeb = 0;
  Menor12FAgeb = 0;
  Mas60Ageb = 0;
  Mas60MAgeb = 0;
  Mas60FAgeb = 0;

  datosPobAGEB.forEach(function(value){
    TotPobAgeb += value.TotPob;
    TotVivAgeb += value.TotViv;
    TotFemAgeb += value.PobFem;
    TotMasAgeb += value.PobMas;
    Menor12Ageb += value.Menor12;
    Menor12MAgeb += value.Menor12M;
    Menor12FAgeb += value.Menor12F;
    Mas60Ageb += value.Mas60;
    Mas60MAgeb += value.Mas60M;
    Mas60FAgeb += value.Mas60F;
  });

  //console.log("FemAgevT:"+TotFemAgeb+":MasAgev:"+TotMasAgeb);

  var popQueryTaskLocRural = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/Localidades_Rurales/FeatureServer/0");
  var popQueryPobLocRur = new esri.tasks.Query();
  var outFields = ["POBTOT","VIVTOT","POBFEM","POBMAS","P_12YMAS","P_12YMAS_M","P_12YMAS_F","P_60YMAS","P_60YMAS_M","P_60YMAS_F "];

  var statDefPobLocRur = new esri.tasks.StatisticDefinition
  statDefPobLocRur.statisticType = "sum";
  statDefPobLocRur.onStatisticField = "POBTOT";
  statDefPobLocRur.outStatisticFieldName = "TotalPobLocRurVar";

  var statDefVivLocRur = new esri.tasks.StatisticDefinition
  statDefVivLocRur.statisticType = "sum";
  statDefVivLocRur.onStatisticField = "VIVTOT";
  statDefVivLocRur.outStatisticFieldName = "TotalVivLocRurVar";

  var statDefFemLocRur = new esri.tasks.StatisticDefinition
  statDefFemLocRur.statisticType = "sum";
  statDefFemLocRur.onStatisticField = "POBFEM";
  statDefFemLocRur.outStatisticFieldName = "TotalFemLocRurVar";

  var statDefMasLocRur = new esri.tasks.StatisticDefinition
  statDefMasLocRur.statisticType = "sum";
  statDefMasLocRur.onStatisticField = "POBMAS";
  statDefMasLocRur.outStatisticFieldName = "TotalMasLocRurVar";

//////////////////////////////////////////////////////////////////

  var statDefMenor12 = new esri.tasks.StatisticDefinition
  statDefMenor12.statisticType = "sum";
  statDefMenor12.onStatisticField = "P_12YMAS";
  statDefMenor12.outStatisticFieldName = "Total12Mas";

  var statDefMenor12M = new esri.tasks.StatisticDefinition
  statDefMenor12M.statisticType = "sum";
  statDefMenor12M.onStatisticField = "P_12YMAS_M";
  statDefMenor12M.outStatisticFieldName = "Total12MasM";

  var statDefMenor12F = new esri.tasks.StatisticDefinition
  statDefMenor12F.statisticType = "sum";
  statDefMenor12F.onStatisticField = "P_12YMAS_F";
  statDefMenor12F.outStatisticFieldName = "Total12MasF";

///////////////////////////////////////////////////////////////

  var statDefMayor60 = new esri.tasks.StatisticDefinition
  statDefMayor60.statisticType = "sum";
  statDefMayor60.onStatisticField = "P_60YMAS";
  statDefMayor60.outStatisticFieldName = "Total60Mas";

  var statDefMayor60M = new esri.tasks.StatisticDefinition
  statDefMayor60M.statisticType = "sum";
  statDefMayor60M.onStatisticField = "P_60YMAS_M";
  statDefMayor60M.outStatisticFieldName = "Total60MasM";

  var statDefMayor60F = new esri.tasks.StatisticDefinition
  statDefMayor60F.statisticType = "sum";
  statDefMayor60F.onStatisticField = "P_60YMAS_F";
  statDefMayor60F.outStatisticFieldName = "Total60MasF";

///////////////////////////////////////////////////////////////

  popQueryPobLocRur.returnGeometry = false;
  popQueryPobLocRur.geometry = geomet;
  popQueryPobLocRur.outFields = outFields;
  popQueryPobLocRur.outStatistics = [statDefPobLocRur, statDefVivLocRur, statDefFemLocRur, statDefMasLocRur, statDefMenor12,statDefMenor12M,statDefMenor12F,statDefMayor60,statDefMayor60M,statDefMayor60F];
  popQueryPobLocRur.groupByFieldsForStatistics = ["NOM_ENT"];
  popQueryTaskLocRural.execute(popQueryPobLocRur, RespuestaPoblacion);
}
    //Fin Localidad Rural
//Fin Funcion Poblacion
/////////////////////////////////////////////////////////
////////////////////////////////////////////
///Hospitales

function CalHospitales(geo) {

	geomet = geo;

    var popQueryTaskINSP = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/Centros_de_Salud_Nacional/FeatureServer/0");
    var popQueryINSP = new esri.tasks.Query();

    var outFields = ["CLUE"];

    var statDefINSP = new esri.tasks.StatisticDefinition
    statDefINSP.statisticType = "count";
    statDefINSP.onStatisticField = "CLUE";
    statDefINSP.outStatisticFieldName = "HOSPINSP";

    popQueryINSP.returnGeometry = false;
    popQueryINSP.geometry = geomet;
    popQueryINSP.outFields = outFields;
    popQueryINSP.outStatistics = [statDefINSP];
    popQueryTaskINSP.execute(popQueryINSP, RespuestaHospitales);

}
    //Fin INSP
///Fin Hospitales
///////////////////////////////////////////
//Colonias
function CalColonias(geo) {

    var popQueryTaskCol = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/Colonias/FeatureServer/0");
    var popQueryCol = new esri.tasks.Query();

    var outFields = ["CP"];

    var statDefCol = new esri.tasks.StatisticDefinition
    statDefCol.statisticType = "count";
    statDefCol.onStatisticField = "CP";
    statDefCol.outStatisticFieldName = "ColoniasCount";

    popQueryCol.returnGeometry = false;
    popQueryCol.geometry = geomet;
    popQueryCol.outFields = outFields;
    popQueryCol.outStatistics = [statDefCol];
    popQueryTaskCol.execute(popQueryCol, RespuestaColonias);
}
//Fin Colonias
///////////////////////////////////////////
///////////////////////////////////////////
//Refugios Temporales
function CalRefugios(geo) {

    var popQueryTaskRef = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/RefugiosTemporales_M%C3%A9xico/FeatureServer/0");
    var popQueryRef = new esri.tasks.Query();

    var outFields = ["Capacidad "];

    var statDefRef = new esri.tasks.StatisticDefinition
    statDefRef.statisticType = "count";
    statDefRef.onStatisticField = "Capacidad ";
    statDefRef.outStatisticFieldName = "RefugiosCount";

    popQueryRef.returnGeometry = false;
    popQueryRef.geometry = geomet;
    popQueryRef.outFields = outFields;
    popQueryRef.outStatistics = [statDefRef];
    popQueryTaskRef.execute(popQueryRef, RespuestaRefugios);
}
//Fin Refugios Temporales
///////////////////////////////////////////
//Funciones supermercados, bancos, hoteles, gasolineras
function CalBancos(geo){
    //geomet=geo;
    //esriConfig.defaults.io.proxyUrl = "http://servicios2.cenapred.unam.mx/Proxy/proxy.ashx";
    //var popQueryTaskBanco = new esri.tasks.QueryTask("http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/Portal/ANALISIS/FeatureServer/0");
    var popQueryTaskBanco = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/4actividades/FeatureServer/0");
    var popQueryBancos = new esri.tasks.Query();
    var outFields = ["CLASE_ACT"];

    var statDefBanco = new esri.tasks.StatisticDefinition
    statDefBanco.statisticType = "count";
    statDefBanco.onStatisticField = "CLASE_ACT";
    statDefBanco.outStatisticFieldName = "BANCO";

    popQueryBancos.returnGeometry = false;
    popQueryBancos.geometry = geo;
    popQueryBancos.outFields = outFields;
    popQueryBancos.where = "CLASE_ACT = 521110 OR CLASE_ACT = 522110";
    popQueryBancos.outStatistics = [statDefBanco];
    popQueryTaskBanco.execute(popQueryBancos,function(result){CantBancos= result.features[0].attributes.BANCO; CalHoteles(geo);})
    //popQueryTaskBanco.executeForCount(popQueryBancos,function(count){CantBancos=count;CalHoteles(geo)});
}

function CalHoteles(geo){
    var popQueryTaskHotel = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/4actividades/FeatureServer/0");
    var popQueryHoteles = new esri.tasks.Query();
    var outFields = ["CLASE_ACT"];
    var statDefHotel = new esri.tasks.StatisticDefinition
    statDefHotel.statisticType = "count";
    statDefHotel.onStatisticField = "CLASE_ACT";
    statDefHotel.outStatisticFieldName = "HOTEL";

    popQueryHoteles.returnGeometry = false;
    popQueryHoteles.geometry = geo;
    popQueryHoteles.outFields = outFields;
    popQueryHoteles.where = "CLASE_ACT = 721111 OR CLASE_ACT = 721112 OR CLASE_ACT = 721113 OR CLASE_ACT = 721190 OR CLASE_ACT = 721210 OR CLASE_ACT = 721311 OR CLASE_ACT = 721312";
    popQueryHoteles.outStatistics = [statDefHotel];
    popQueryTaskHotel.execute(popQueryHoteles,function(result){CantHoteles= result.features[0].attributes.HOTEL; CalGas(geo);})
    //popQueryTaskHotel.executeForCount(popQueryHoteles,function(count){CantHoteles=count;CalGas(geo)});
}
function CalGas(geo){
    var popQueryTaskGas = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/4actividades/FeatureServer/0");
    var popQueryGas = new esri.tasks.Query();
    var outFields = ["CLASE_ACT"];
    var statDefGas = new esri.tasks.StatisticDefinition
    statDefGas.statisticType = "count";
    statDefGas.onStatisticField = "CLASE_ACT";
    statDefGas.outStatisticFieldName = "GAS";

    popQueryGas.returnGeometry = false;
    popQueryGas.geometry = geo;
    popQueryGas.outFields = outFields;
    popQueryGas.where = "CLASE_ACT = 468411";
    popQueryGas.outStatistics = [statDefGas];
    popQueryTaskGas.execute(popQueryGas,function(result){CantGas = result.features[0].attributes.GAS; CalSuper(geo);})
    //popQueryTaskGas.executeForCount(popQueryGas,function(count){CantGas=count;CalSuper(geo)});
    }
function CalSuper(geo) {

    var popQueryTaskSuper = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/4actividades/FeatureServer/0");
    var popQuerySuper = new esri.tasks.Query();
    var outFields = ["CLASE_ACT"];

    var statDefSuper = new esri.tasks.StatisticDefinition
    statDefSuper.statisticType = "count";
    statDefSuper.onStatisticField = "CLASE_ACT";
    statDefSuper.outStatisticFieldName = "SUPER";

    popQuerySuper.returnGeometry = false;
    popQuerySuper.geometry = geo;
    popQuerySuper.outFields = outFields;
    popQuerySuper.where = "CLASE_ACT = 462111 OR CLASE_ACT = 462112 OR CLASE_ACT = 462210";
    popQuerySuper.outStatistics = [statDefSuper];
    popQueryTaskSuper.execute(popQuerySuper, RespuestaSuper);
   // popQueryTaskSuper.executeForCount(popQuerySuper,function(count){CantSuper=count;CalAeropuertos(geo)});
}
//Fin supermercados
/////////////////////////////////////////////////////////
//Funcion Escuelas
function CalEscuelas(geo) {

    var popQueryTaskEsc = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/Centros_de_Trabajo_Educativo_SEP_2012_2013/FeatureServer/0");
    var popQueryEsc = new esri.tasks.Query();

    var outFields = ["CCTT"];

    var statDefEsc = new esri.tasks.StatisticDefinition
    statDefEsc.statisticType = "count";
    statDefEsc.onStatisticField = "CCTT";
    statDefEsc.outStatisticFieldName = "TotEscVar";


    popQueryEsc.returnGeometry = false;
    popQueryEsc.geometry = geo;
    popQueryEsc.outFields = outFields;
    popQueryEsc.outStatistics = [statDefEsc];
    popQueryTaskEsc.execute(popQueryEsc, RespuestaEscuelas);


}
//Fin Funcion Escuela
//Funcion Aeropuertos

function CalAeropuertos(geo){

    var QueryTaskAero = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/Aeropuertos/FeatureServer/0");
    var QueryAero = new esri.tasks.Query();

    var outFields = ["CLASE"];

    var statDefAero = new esri.tasks.StatisticDefinition
    statDefAero.statisticType = "count";
    statDefAero.onStatisticField = "CLASE";
    statDefAero.outStatisticFieldName = "TotAeroVar";

    QueryAero.returnGeometry = false;
    QueryAero.geometry = geo;
    QueryAero.outFields = outFields;
    QueryAero.outStatistics = [statDefAero];
    QueryTaskAero.execute(QueryAero, RespuestaAeropuerto);
}
//Fin Funcion Aeropuertos

//Presas

function CalPresas(geo){

    var QueryTaskPres = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/presas/FeatureServer/0");
    var QueryPresas = new esri.tasks.Query();

    var outFields = ["ID_CT"];

    var statDefPresas = new esri.tasks.StatisticDefinition
    statDefPresas.statisticType = "count";
    statDefPresas.onStatisticField = "ID_CT";
    statDefPresas.outStatisticFieldName = "TotPresasVar";

    QueryPresas.returnGeometry = false;
    QueryPresas.geometry = geo;
    QueryPresas.outFields = outFields;
    QueryPresas.outStatistics = [statDefPresas];
    QueryTaskPres.execute(QueryPresas, RespuestaPresas);
}
//Fin Presas

//Camara Ganadera

function CalGanadero(geo){

    var QueryTaskGan = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/ganadero/FeatureServer/0");
    var QueryGanadero = new esri.tasks.Query();

    var outFields = ["UPP"];

    var statDefGanadero = new esri.tasks.StatisticDefinition
    statDefGanadero.statisticType = "count";
    statDefGanadero.onStatisticField = "UPP";
    statDefGanadero.outStatisticFieldName = "TotGanaderoVar";

    QueryGanadero.returnGeometry = false;
    QueryGanadero.geometry = geo;
    QueryGanadero.outFields = outFields;
    QueryGanadero.outStatistics = [statDefGanadero];
    QueryTaskGan.execute(QueryGanadero, RespuestaGanadero);
}

//Fin Camara Ganadera

/*
**********************************************************
	Fin Funciones de outStatistics
**********************************************************
*/

/*
**********************************************************
	funciones de Obtener resultados outStatistics y colocar en algun lugar
**********************************************************
*/
/////////////////////////////////////////////////////////
////Funcion Poblacion
function RespuestaPoblacion(result) {
  datosPobRural = [];

  for (var idx in result.features) {
    var obj = {
      "Estado": result.features[idx].attributes.NOM_ENT,
      "TotPob": result.features[idx].attributes.TotalPobLocRurVar,
      "TotViv": result.features[idx].attributes.TotalVivLocRurVar,
      "PobMas": result.features[idx].attributes.TotalMasLocRurVar,
      "PobFem": result.features[idx].attributes.TotalFemLocRurVar,
      "Menor12": result.features[idx].attributes.TotalPobLocRurVar - result.features[idx].attributes.Total12Mas,
      "Menor12M": result.features[idx].attributes.TotalMasLocRurVar - result.features[idx].attributes.Total12MasM,
      "Menor12F": result.features[idx].attributes.TotalFemLocRurVar - result.features[idx].attributes.Total12MasF,
      "Mas60": result.features[idx].attributes.Total60Mas,
      "Mas60M": result.features[idx].attributes.Total60MasM,
      "Mas60F": result.features[idx].attributes.Total60MasF
    }

    datosPobRural.push(obj);
  }

  pobTotal.push(datosPobRural);

  datosPobRural.forEach(function(value, idx){
      ajustaDatosObjPob(value);
  });

  pobTotalAjustada.push(datosPobRural);

  TotPobRur = 0;
  TotVivRur = 0;
  TotFemRur = 0;
  TotMasRur = 0;
  Menor12Rur = 0;
  Menor12MRur = 0;
  Menor12FRur = 0;
  Mas60Rur = 0;
  Mas60MRur = 0;
  Mas60FRur = 0;

  datosPobRural.forEach(function(value){
    TotPobRur += value.TotPob;
    TotVivRur += value.TotViv;
    TotFemRur += value.PobFem;
    TotMasRur += value.PobMas;
    Menor12Rur += value.Menor12;
    Menor12MRur += value.Menor12M;
    Menor12FRur += value.Menor12F;
    Mas60Rur += value.Mas60;
    Mas60MRur += value.Mas60M;
    Mas60FRur += value.Mas60F;
  });

  //Poblacion AGEB
  var estadosAGEB = [];
  pobTotalAjustada[1].forEach(function(value){
    estadosAGEB.push(value.Estado);
  });
  //console.log("AGEB: ", estadosAGEB);
  var estadosRural = [];
  pobTotalAjustada[1].forEach(function(value){
    estadosRural.push(value.Estado);
  });
  //console.log("Rural: ", estadosRural)
  pobTotalAjustada[1].forEach(function(objAGEB){
    var nomEnt = objAGEB.Estado;
    if(!estadosRural.includes(nomEnt)){
      console.log("Rural no contiene: " + nomEnt);
      var obj = {
        "Estado": nomEnt,
        "TotPob": objAGEB.TotPob,
        "TotViv": objAGEB.TotViv,
        "PobMas": objAGEB.PobMas,
        "PobFem": objAGEB.PobFem,
        "Menor12": objAGEB.Menor12,
        "Menor12M": objAGEB.Menor12M,
        "Menor12F": objAGEB.Menor12F,
        "Mas60": objAGEB.Mas60,
        "Mas60M": objAGEB.Mas60M,
        "Mas60F": objAGEB.Mas60F
      }

      pobTotalXEstado.push(obj);
    } else {
      pobTotalAjustada[0].forEach(function(objRural){
        if(nomEnt === objRural.Estado){
          var obj = {
            "Estado": nomEnt,
            "TotPob": objAGEB.TotPob + objRural.TotPob,
            "TotViv": objAGEB.TotViv + objRural.TotViv,
            "PobMas": objAGEB.PobMas + objRural.PobMas,
            "PobFem": objAGEB.PobFem + objRural.PobFem,
            "Menor12": objAGEB.Menor12 + objRural.Menor12,
            "Menor12M": objAGEB.Menor12M + objRural.Menor12M,
            "Menor12F": objAGEB.Menor12F + objRural.Menor12F,
            "Mas60": objAGEB.Mas60 + objRural.Mas60,
            "Mas60M": objAGEB.Mas60M + objRural.Mas60M,
            "Mas60F": objAGEB.Mas60F + objRural.Mas60F
          }

          pobTotalXEstado.push(obj);
        }
      });
    }
  });

  TotalPobFinal = TotPobRur + TotPobAgeb;
  TotalVivFinal = TotVivAgeb + TotVivRur;
  TotalMenor12 = Menor12Ageb + Menor12Rur;
  TotalMayor60 = Mas60Ageb + Mas60Rur;

  TotalPobFem = TotFemAgeb + TotFemRur;
  TotalPobMas = TotMasAgeb + TotMasRur;

  TotalMenor12F = Menor12FAgeb + Menor12FRur;
  TotalMenor12M = Menor12MAgeb + Menor12MRur;

  TotalMayor60F = Mas60FAgeb + Mas60FRur;
  TotalMayor60M = Mas60MAgeb + Mas60MRur;

  pobTotalXEstado.forEach(function(value, idx){
    ajustaDatosObjPob(value);
  });

  generaTabla(pobTotalXEstado);

  CalHospitales(geomet);
}

function generaTabla(arr){

  var html = "";
  var columns = Object.keys(arr[0]).length;
  var columnNames = ["Estado", "Población total", "Viviendas totales", "P. Masculina", "P. Femenina", "P < 12 años", "P < 12 años masculina", "P < 12 años femenina", "P > 60 años", "P > 60 años masculina", "P > 60 años femenina"];

  html += "<table><thead><tr>";
  columnNames.forEach(function(value, idx){
    html += "<td>" + value + "</td>";
  })

  html += "</tr></thead>";
  html += "<tbody>"
  for(var objIdx in arr){
    html += "<tr>";
    Object.keys(arr[objIdx]).forEach(function(value, idx){
      html += "<td>" + agregasComas(arr[objIdx][value]) + "</td>";
    })
    html += "</tr>";
  }

  html += "<tr><td><b>Total</b></td>";
  html += "<td><b>" + agregasComas(TotalPobFinal) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalVivFinal) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalPobMas) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalPobFem) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalMenor12) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalMenor12M) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalMenor12F) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalMayor60) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalMayor60M) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalMayor60F) + "</b></td>";
  html += "</tr></tbody><table>";

  $("#table-container")[0].innerHTML = html;
}

function ajustaDatosObjPob(obj){
  /**
   *
   * ****Función Ajuste Población****
   *Cálculo de población Femenino y Masculino a partir de AGEB y Localidad Rural
   *obteniendo la diferencia del total con respecto a la suma de ambos campos
   *ajustando el resultado datos tomados de INEGI al 2010 (Total = 112,336,538
   *Mujeres = 57,481,307 Hombres = 51,855,231//Con porcentaje de Mujeres = 51.17%
   *Hombres 48.83%)
   *
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

//Fin Funcion
function showElem() {
    document.getElementById("Img1").style.visibility = "visible";
}
function hideElem() {
    document.getElementById("Img1").style.visibility = "hidden";
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//Funcion Hospitales
function RespuestaHospitales(result) {

    CantHospCC = result.features[0].attributes.HOSPINSP;

		console.log("Hospitales 2015:"+CantHospCC);

    CalBancos(geomet);
}

//Fin Funcion Hospitales
/////////////////////////////////////////////////////////
//Funcion Supermercados
function RespuestaSuper(result) {

    CantSuper = result.features[0].attributes.SUPER;

	//console.log(":SuperM:"+CantSuper+":Hoteles:"+CantHoteles+":Bancos:"+CantBancos+":Gasolineras:"+CantGas);

    CalAeropuertos(geomet);
}
//Fin Funcion Supermercados
/////////////////////////////////////////////////////////
//Funcion Aeropuertos
function RespuestaAeropuerto(result){
    CantAeropuertos = result.features[0].attributes.TotAeroVar;
	CalGanadero (geomet);
}
//Fin Funcion Aeropuertos

//Camara Ganadera
function RespuestaGanadero(result){
	CantGanadero = result.features[0].attributes.TotGanaderoVar;
	//console.log("Ganadero:"+CantGanadero);
	CalPresas (geomet);
}
//Fin Camara Ganadera

//Presas
function RespuestaPresas(result){
	CantPresas = result.features[0].attributes.TotPresasVar;
	CalColonias(geomet);
}
//Fin Presas
////////////////////////////////////////////////////////
//Colonias
function RespuestaColonias(result){
	CantColonia = result.features[0].attributes.ColoniasCount;
	CalRefugios(geomet);
}
//Fin Colonias
/////////////////////////////////////////////////////////
//Colonias
function RespuestaRefugios(result){
	CantRefugios = result.features[0].attributes.RefugiosCount;
	CalEscuelas(geomet);
}
//Fin Colonias
/////////////////////////////////////////////////////////
//Funcion Escuelas
var EscTotGraf;
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

function listaEstados(arrEstados){
  var lista = [];
  arrEstados.forEach(function(obj){
    lista.push(obj.Estado);
  });

  return lista.join(", ");
}

function RespuestaEscuelas(result) {
    CantEscuelitas = result.features[0].attributes.TotEscVar;
    var TotHospitalesFinal;
    TotHospitalesFinal = CantHospCC;

    if(TotalPobFinal != 0){
      //$("footer").show();
      
     /* document.getElementById("huracanInfo").innerHTML =
      /*  "<span class='nombreVariable'>Sistemas Expuestos</span> " +
        "Población expuesta: <span class='nombreVariable'>" + agregasComas(TotalPobFinal) + "</span> " +
        "Población femenina expuesta: <span class='nombreVariable'>" + agregasComas(TotalPobFem) + "</span> "+
        "Población masculina expuesta: <span class='nombreVariable'>" + agregasComas(TotalPobMas) + "</span> " +
        "Menores a 12 años expuestos: <span class='nombreVariable'>" + agregasComas(TotalMenor12) + "</span> " +
        "Mayores a 60 años expuestos: <span class='nombreVariable'>" + agregasComas(TotalMayor60) + "</span> " +
        "Estados afectados: <span class='nombreVariable'>" + listaEstados(pobTotalXEstado);*/


        $("#Poblacion figcaption").text(agregasComas(TotalPobFinal));
        $("#Viviendas figcaption").text(agregasComas(TotalVivFinal));
        $("#Hospitales figcaption").text(agregasComas(TotHospitalesFinal));
        $("#Escuelas figcaption").text(agregasComas(CantEscuelitas));
        $("#Supermercados figcaption").text(agregasComas(CantSuper));
        $("#Aeropuertos figcaption").text(agregasComas(CantAeropuertos));
        $("#Hoteles figcaption").text(agregasComas(CantHoteles));
        $("#Bancos figcaption").text(agregasComas(CantBancos));
        $("#Gasolineras figcaption").text(agregasComas(CantGas));
        $("#Presas figcaption").text(agregasComas(CantPresas));
        $("#Ganadero figcaption").text(agregasComas(CantGanadero));
        $("#Colonias figcaption").text(agregasComas(CantColonia));
        
        //
        $("#pob_m_t").text(agregasComas(TotalPobMas));
        $("#pob_f_t").text(agregasComas(TotalPobFem));
        $("#pob_menor_12").text(agregasComas(TotalMenor12));
        $("#pob_m_menor_12").text(agregasComas(TotalMenor12M));
        $("#pob_f_menor_12").text(agregasComas(TotalMenor12F));
        $("#pob_mayor_60").text(agregasComas(TotalMayor60));
        $("#pob_m_mayor_60").text(agregasComas(TotalMayor60M));
        $("#pob_f_mayor_60").text(agregasComas(TotalMayor60F));

        /*Abrir el panel al hacer un análisis*/
        if($(".ui-panel").hasClass("ui-panel-closed"))
          $("#ui-settings-button")[0].click();
        if($("#analisis-container div")[0].attributes[1].value == "true")
          $("#analisis-container h4")[0].click();
        
    }

    hideElem();
}
//Fin Funcion
/////////////////////////////////////////////////////////
/*
**********************************************************
	Fin funciones de Obtener resultados outStatistics
**********************************************************
*/
