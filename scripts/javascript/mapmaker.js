/**
* Rebecca de Feijter - 10639918
* Programmeerproject
*
* - mapMaker: draws initial color coded map for first year in dataset (by means of datamaps)
* - colorCode: converts footprint value to color value for map
* - sliderUpdate: calls to update map with correct data selection when slider is used
* - updateMap: updates values and color coding of map
*/


/** Function draws world map with countries colored based on national ecological
* footprint.
*/
function mapMaker(alldata) {

    // add map title
    d3.select("#mapHere")
      .append("h2")
      .attr("class", "title map")
      .text("National ecological footprints in number of earths");

    // initial map is based on data of first year
    startYear = 1961;
    selectedData = alldata[0][startYear];
    var countryName;

    // create map (Datamaps)
    var basic_choropleth = new Datamap({
        element: document.getElementById("mapHere"),
        projection: "mercator",
        height: 400,
        fills: {defaultFill: "#FFF0F2"},
        data: selectedData,
        geographyConfig: {borderColor: "#DEDEDE",
                          highlightBorderWidth: 2,
                          highlightFillColor: function(geo) {
                          return geo["fillColor"] || "#FFF0F2";
                          },
                          highlightBorderColor: "#ffffff",

                          // add tooltip for countries with data
                          popupTemplate: function(geo, data) {
                              if (data == null) {
                                  countryName = "<div class='hoverinfo'>" +
                                                  geo.properties.name + "<\div>";
                              }
                              else {
                                  countryName = "<div class='hoverinfo'>" +
                                                geo.properties.name + ": " +
                                                Math.round(data.value * 100) /
                                                100 + "<\div>";
                              }
                              return countryName;
                          },}
    });

    // update stacked area graph upon clicking on a country in map
    d3.selectAll("path")
      .on("click", function() {
          var className = this.getAttribute("class");
          className = className.slice(-3,);
          areaUpdate(className);
          $("html, body").animate({
                scrollTop: $("#sixthrow").offset().top -
                    $("nav").outerHeight()}, "slow");
      });

    // light up corresponding scatter plot dot upon hovering over country
    d3.selectAll("#mapHere").on("mouseover", function(info) {
          if (d3.event.target.tagName == "path"){
              var className = d3.select(d3.event.target).data()[0].id;
              className = "circle#" + className;
              d3.selectAll(className)
                .style("opacity", 0.3);
          }
    });

    // return color of corresponding dot to initial color
    d3.selectAll("#mapHere").on("mouseout", function(info) {
          if (d3.event.target.tagName == "path"){
              var className = d3.select(d3.event.target).data()[0].id;
              className = "circle#" + className;
              d3.selectAll(className)
                .style("opacity", 1);
          }
    });

    // add legend explaining color for 'no data'
    d3.select("#noDataLegend")
      .append("svg")
      .attr("class", "legendMapSvg")
      .attr("height", "30px");

    d3.select(".legendMapSvg")
      .append("rect")
      .attr("class", "legend")
      .attr("y", 10)
      .attr("x", 3)
      .style("fill", "#FFF0F2");

    d3.select(".legendMapSvg")
      .append("text")
      .attr("class", "mapLegendText")
      .attr("y", 10 + 12)
      .attr("x", 3 + 35)
      .style("font", "15px")
      .text("= No data available");

    // when map is finished it responds to changing the slider
    sliderUpdate(basic_choropleth, alldata);
};


/** Function determines color code of map countries based on footprint values.
*/
function colorCode(value) {
    var colorScale = d3.scale.linear()
                             .domain([0, 1, 6])
                             .range(["green", "white", "black"]);

    var colorValue = colorScale(value);
    return colorValue;
};


/** Function calls to update map and adjusts slider text when slider is used.
*/
function sliderUpdate(existingMap, alldata) {
    document.getElementById("slider").addEventListener("input", function(e) {
        var requestedYear = parseInt(e.target.value);
        updateMap(existingMap, requestedYear, alldata);
        document.getElementById("activeYear").innerText = requestedYear;
    });
};


/** Function updates colors of map countries based on year selected in slider
*   using a readymade function of Datamaps.
*/
function updateMap(existingMap, requestedYear, alldata) {
    correctYearDict = requestedYear - 1961;
    existingMap.updateChoropleth(alldata[correctYearDict][requestedYear]);
};
