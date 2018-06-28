// HEADER MAKEN
var currentYear;

window.onload = function(){

    // ensure all data sets are loaded before continuing
    d3.queue()
      .defer(d3.json, "data/allextravariables.json")
      .defer(d3.json, "data/globalisationindex.json")
      .defer(d3.json, "data/footprintdetails.json")
      .defer(d3.json, "data/countryandcode.json")
      .awaitAll(transformData);

    /** Function converts basic JSON's to dicts for each visualisation and creates
    * initial set of interactive visualisations.
    */
    function transformData(error, response){
        if (error) throw error;
        var extra = response[0];
        var globind = response[1];
        var footprint = response[2];
        var countryCodes = response[3];
        var readyData = dataTransform(extra, globind, footprint);
        var mapData = readyData[0];
        var scatterData = readyData[1];

        // start all visualisations at startyear 1961
        currentYear = 1961;
        // var correctYearDict = currentYear - 1961;

        // draw map, scatter plot, stacked area graph and legends
        mapMaker(mapData);
        scatterMaker(scatterData);
        areaMaker("null", countryCodes);
        areaLegendMaker();
    };

};
