/// <reference path="ventanaResultados.js" />
/*
**********************************************************
	funciones de outStatistics

    Análisis  Puntual
**********************************************************
*/

/////////////////////////////////////////////////////////
//Variables
var geomet;

var TotPobAgeb,TotVivAgeb,TotFemAgeb,TotMasAgeb;
var Mas12, Mas12M, Mas12F, Mas60, Mas60M, Mas60F, TotalPobMas, TotalPobFem,TotalPobMas12,TotalPobFem12,TotalPobMas60, TotalPobFem60;

var TotPobFinal,TotVivFinal,totalFem,totalMas,TotFemMas;

var DifPobTot,DifPobFem,DifPobMas,DifPobTot12,DifPobFem12,DifPobMas12,DifPobTot60,DifPobFem60,DifPobMas60,PobMas,PobFem;

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
var datosPob = [];

/////////////////////////////////////////////////////////
//Funcion Poblacion

    //Iter
function CalPobTot(geo) {
    showElem();
    geomet= geo;

    var popQueryTaskPobAgeb = new esri.tasks.QueryTask("http://services2.arcgis.com/EUQ4bXXEQJ9n6fdd/arcgis/rest/services/iter/FeatureServer/0");
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
    //popQueryPobAgeb.outStatistics = [statDefPobTotAgeb, statDefVivTotAgeb, statDefFemAgeb, statDefMasAgeb,statDefMenor12,statDefMenor12M,statDefMenor12F];
    popQueryPobAgeb.groupByFieldsForStatistics = ["NOM_ENT"];
    popQueryTaskPobAgeb.execute(popQueryPobAgeb, RespuestaPoblacion);
}

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
//Fin Funcion Escuelas

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
//Camara Unidades de produccion pecuaria
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
////Ajuste de Población
function RespuestaPoblacion(result) {
    //console.log(result);
    datosPob = [];

    TotPobFinal = 0;
    TotVivFinal = 0;
    PobFem = 0;
    PobMas = 0;
    Mas12 = 0;
    Mas12M = 0;
    Mas12F = 0;
    Mas60 = 0;
    Mas60M = 0;
    Mas60F = 0;

    for (var idx in result.features) {
      var obj = {
        "Estado": result.features[idx].attributes.NOM_ENT,
        "TotPobFinal": result.features[idx].attributes.TotalPobAGEBVar,
        "TotVivFinal": result.features[idx].attributes.TotalVivAGEBVar,
        "PobMas": result.features[idx].attributes.TotalMasAGEBVar,
        "PobFem": result.features[idx].attributes.TotalFemAGEBVar,
        "Menor12": result.features[idx].attributes.TotalPobAGEBVar - result.features[idx].attributes.Total12Mas,
        "Menor12M": result.features[idx].attributes.TotalMasAGEBVar - result.features[idx].attributes.Total12MasM,
        "Menor12F": result.features[idx].attributes.TotalFemAGEBVar - result.features[idx].attributes.Total12MasF,
        "Mas60": result.features[idx].attributes.Total60Mas,
        "Mas60M": result.features[idx].attributes.Total60MasM,
        "Mas60F": result.features[idx].attributes.Total60MasF
      }

      TotPobFinal += result.features[idx].attributes.TotalPobAGEBVar;
      TotVivFinal += result.features[idx].attributes.TotalVivAGEBVar;
      PobFem += result.features[idx].attributes.TotalFemAGEBVar;
      PobMas += result.features[idx].attributes.TotalMasAGEBVar;
      Mas12 += result.features[idx].attributes.Total12Mas;
      Mas12M += result.features[idx].attributes.Total12MasM;
      Mas12F += result.features[idx].attributes.Total12MasF;
      Mas60 += result.features[idx].attributes.Total60Mas;
      Mas60M += result.features[idx].attributes.Total60MasM;
      Mas60F += result.features[idx].attributes.Total60MasF;

      datosPob.push(obj);
    }

//Calculo para Menores a 12 años
    Menor12 = TotPobFinal - Mas12;
    Menor12M = PobMas - Mas12M;
    Menor12F = PobFem - Mas12F;
//Diferencia de poblacion Completa
    DifPobTot = TotPobFinal - (PobFem+PobMas);
    DifPobFem = DifPobTot * 0.512;
    DifPobMas = DifPobTot * 0.488;
    DifPobFem = Math.round(DifPobFem);
    DifPobMas = Math.round(DifPobMas);
    TotalPobFem = PobFem + DifPobFem;
    TotalPobMas = PobMas + DifPobMas;
    //TotalReal = TotalPobFem + TotalPobMas;
    //console.log("tot"+TotalReal);
//Diferencia Menores a 12 años
    DifPobTot12 = Menor12 -(Menor12M+Menor12F);
    DifPobFem12 = DifPobTot12 * 0.512;
    DifPobMas12 = DifPobTot12 * 0.488;
    DifPobFem12 = Math.round(DifPobFem12);
    DifPobMas12 = Math.round(DifPobMas12);
    TotalPobFem12 = Menor12F + DifPobFem12;
    TotalPobMas12 = DifPobMas12 + Menor12M;
    T12 = TotalPobFem12 + TotalPobMas12;
        console.log("totFe:"+Menor12+"TotMas"+T12);
//Diferencia Mayores a 60
    DifPobTot60 = Mas60 -(Mas60M+Mas60F);
    DifPobFem60 = DifPobTot60 * 0.512;
    DifPobMas60 = DifPobTot60 * 0.488;
    DifPobFem60 = Math.round(DifPobFem60);
    DifPobMas60 = Math.round(DifPobMas60);
    TotalPobFem60 = Mas60F + DifPobFem60;
    TotalPobMas60 = DifPobMas60 + Mas60M;

    /***
     * Fin Función Ajuste de Población *
    ***/

    datosPob.forEach(function(value, idx){
      ajustaDatosObjPob(value);
    });

    generaTabla(datosPob);

    CalHospitales(geomet);
}
//Fin Funcion

function generaTabla(arr){
  var html = "";
  var columns = Object.keys(arr[0]).length;

  html += "<table><thead><tr>";
  Object.keys(arr[0]).forEach(function(value, idx){
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
  html += "<td><b>" + agregasComas(TotPobFinal) + "</b></td>";
  html += "<td><b>" + agregasComas(TotVivFinal) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalPobMas) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalPobFem) + "</b></td>";
  html += "<td><b>" + agregasComas(Menor12) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalPobMas12) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalPobFem12) + "</b></td>";
  html += "<td><b>" + agregasComas(Mas60) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalPobMas60) + "</b></td>";
  html += "<td><b>" + agregasComas(TotalPobFem60) + "</b></td>";
  html += "</tr></tbody><table>";

  //html += '<a href="" id="csvPob">CSV</a>';

  $("#table-container")[0].innerHTML = html;
}

function ajustaDatosObjPob(obj){
  //Diferencia de poblacion Completa
      var difPobTot = obj.TotPobFinal - (obj.PobFem + obj.PobMas);
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

		//console.log("Hospitales 2015:"+CantHospCC);

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
function RespuestaEscuelas(result) {
    CantEscuelitas = result.features[0].attributes.TotEscVar;
    var TotHospitalesFinal;
    TotHospitalesFinal = CantHospCC;

    $("#Poblacion figcaption").text(agregasComas(TotPobFinal));
    $("#Viviendas figcaption").text(agregasComas(TotVivFinal));
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
    //////////////
    $("#pob_m_t").text(agregasComas(TotalPobMas));
    $("#pob_f_t").text(agregasComas(TotalPobFem));
    $("#pob_menor_12").text(agregasComas(Menor12));
    $("#pob_m_menor_12").text(agregasComas(TotalPobMas12));
    $("#pob_f_menor_12").text(agregasComas(TotalPobFem12));
    $("#pob_mayor_60").text(agregasComas(Mas60));
    $("#pob_m_mayor_60").text(agregasComas(TotalPobMas60));
    $("#pob_f_mayor_60").text(agregasComas(TotalPobFem60));

    if($(".ui-panel").hasClass("ui-panel-closed"))
      $("#ui-settings-button")[0].click();
    if($("#analisis-container div")[0].attributes[1].value == "true")
      $("#analisis-container h4")[0].click();



    //console.log("Pob:"+TotPobFinal+":Viv:"+TotVivFinal+":Esc:"+CantEscuelitas+":Hosp2015:"+TotHospitalesFinal+":Aero:"+CantAeropuertos+":SuperM:"+CantSuper+":Hoteles:"+CantHoteles+":Bancos:"+CantBancos+":Gasolineras:"+CantGas+":Presas:"+CantPresas+":Colonias:"+CantColonia+":Refugios:"+CantRefugios);

    hideElem();
}
//Fin Funcion
/////////////////////////////////////////////////////////
/*
**********************************************************
	Fin funciones de Obtener resultados outStatistics
**********************************************************
*/
