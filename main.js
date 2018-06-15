// HEADER MAKEN

window.onload = function(){

  // ensure both data sets are loaded before continuing
  d3.queue()
    .defer(d3.json, "scripts/allextravariables.json")
    .defer(d3.json, "scripts/globalisationindex.json")
    .defer(d3.json, "scripts/footprintdetails.json")
    .awaitAll(transformData);

  function transformData(error, response){
    if (error) throw error;
    extra = response[0];
    globind = response[1];
    footprint = response[2];
    readyData = dataTransform(extra, globind, footprint);
    selectedYear = 1961;
    correctYearDict = selectedYear - 1961;
    // console.log(readyData)
    // console.log(readyData[correctYearDict][selectedYear])
    mapData = readyData[0];
    scatterData = readyData[1];
    // mapMaker(readyData[correctYearDict][selectedYear])
    mapMaker(mapData);
    scatterMaker(scatterData);
  };

};
