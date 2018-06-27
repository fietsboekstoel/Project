// HEADER MAKEN
var currentYear;

window.onload = function(){

  // ensure both data sets are loaded before continuing
  d3.queue()
    .defer(d3.json, "scripts/allextravariables.json")
    .defer(d3.json, "scripts/globalisationindex.json")
    .defer(d3.json, "scripts/footprintdetails.json")
    .defer(d3.json, "scripts/countryandcode.json")
    .awaitAll(transformData);

  function transformData(error, response){
    if (error) throw error;
    var extra = response[0];
    var globind = response[1];
    var footprint = response[2];
    var countryCodes = response[3];
    var readyData = dataTransform(extra, globind, footprint);
    currentYear = 1961;
    var correctYearDict = currentYear - 1961;
    // console.log(readyData)
    // console.log(readyData[correctYearDict][selectedYear])
    var mapData = readyData[0];
    var scatterData = readyData[1];
    // mapMaker(readyData[correctYearDict][selectedYear])
    mapMaker(mapData);
    scatterMaker(scatterData);
    areaMaker("null", countryCodes);
    areaLegendMaker();
  };

};
