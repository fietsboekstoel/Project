/**
* Rebecca de Feijter - 10639918
* Programmeerproject
*
* - scatterMaker: calls to draw initial scatter plot for first year in dataset
*   with agricultural land as x-axis variable.
* - drawScatter: actually draws first complete scatter plot
* - calculateMinMax: calculates suitable domain based on selected x-axis variable
* - scatterOptions: calls to update scatter plot based on change in selected
*   variable from dropdown menu
* - scatterSliderUpdate: calls to update scatter plot based on change in
*   selected year from slider
* - updateScatter: actually updates x-axis, datapoints and title of scatter plot
*/

// introducing global variables for communication between multiple functions
var xScale, yScale, xAxis, yAxis, tooltip, svg, currentSelection, scatterArrays,
scatterData, scatterMargin, totalScatterHeight, codeData;

// initial scatter plot is drawn for first year in dataset
var startYear = 1961;
var currentYear = 1961;

/** Function calls to draw initial interactive scatter plot for first year in
*   dataset and with agricultural land as x-axis value.
*/
function scatterMaker(totalScatterData, updateAreaData) {
    codeData = updateAreaData
    scatterData = totalScatterData;
    currentSelection = "agriLand";
    currentYear = startYear;
    drawScatter(scatterArrays, scatterData, currentSelection, currentYear);
};


/** Function calls to determine domain of axes and draws initial scatter plot
*/
function drawScatter(scatterArrays, scatterData, selection, year) {

    // determine highest and lowest value of x and y variables for scaling
    calculatedMinMax = calculateMinMax(scatterData, selection)

    // add graph title for initial scatter plot
    d3.select("#scatterHere")
      .append("h2")
      .attr("class", "title scatter")
      .text("Relation between ecological footprint and amount of agricultural \
             land per country");

    // consider size of svg and margin to place axis labels in within svg
    var totalScatterWidth = d3.select("#scatterHere")[0][0].clientWidth;
    totalScatterHeight = 300;
    scatterMargin = {left: 50, top: 10, right: 50, bottom: 40};

    // define variables for width and height of graph (rather than the svg)
    var scatterWidth = totalScatterWidth - scatterMargin.left -
                       scatterMargin.right;
    var scatterHeight = totalScatterHeight - scatterMargin.top -
                       scatterMargin.bottom;

    // create svg to draw on
    svg = d3.select("#scatterHere")
            .append("svg")
            .attr("class", "graph")
            .attr("width", totalScatterWidth)
            .attr("height", totalScatterHeight)
            .append("g")
            .attr("transform", "translate(" + scatterMargin.left + "," +
                                            scatterMargin.top + ")");


    // use the right minimal and maximal value based on data
    var yDomainSelection = [calculatedMinMax[3], calculatedMinMax[2]];
    var xDomainSelection = [calculatedMinMax[0], calculatedMinMax[1]];

    // scaling x and y values from data to graph area
    yScale = d3.scale.linear()
                     .domain(yDomainSelection)
                     .range([scatterMargin.top, totalScatterHeight -
                             scatterMargin.bottom])
                     .nice();

    xScale = d3.scale.linear()
                     .domain(xDomainSelection)
                     .range([0, scatterWidth])
                     .nice();

    // create and draw y and x axis
    yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left");

    svg.append("g")
       .attr("class", "y axis")
       .call(yAxis);

    xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");

    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + (scatterHeight +
                                     scatterMargin.top) + ")")
       .call(xAxis);

    // create and call tooltip to appear when hovering on data point
    tooltip = d3.tip()
                .attr("class", "tooltip")
                .html(function(d) {
                    year = currentYear;

                    // round off values to two decimal points
                    var tooltipFootprint = Math.round(scatterData[year - startYear][year][d].footprint * 100) / 100,
                    tooltipAgriLand = Math.round(scatterData[year - startYear][year][d].agriLand * 100) / 100,
                    tooltipLivestock = Math.round(scatterData[year - startYear][year][d].livestock * 100) / 100,
                    tooltipPopulation = Math.round(scatterData[year - startYear][year][d].population * 100) / 100,
                    tooltipGlobInd = Math.round(scatterData[year - startYear][year][d].globInd * 100) / 100;
                    var tooltipList = [tooltipFootprint, tooltipAgriLand, tooltipLivestock, tooltipPopulation, tooltipGlobInd];

                    // set missing data points to "unknown"
                    for (i = 0; i < tooltipList.length; i++) {
                        if (tooltipList[i] == 0) {
                          tooltipList[i] = "unknown";
                        }
                      };

                    var tooltipText = "<strong>Country: </strong><span>" + scatterData[year - startYear][year][d].countryName + "</span>" + "<br>";
                    tooltipFootprint = "<strong>Ecological footprint: </strong><span>" + tooltipList[0] + "</span>" + "<br>";
                    tooltipAgriLand = "<strong>Agricultural land (%): </strong><span>" + tooltipList[1] + "</span>" + "<br>";
                    tooltipLivestock = "<strong>Livestock production: </strong><span>" + tooltipList[2] + "</span>" + "<br>";
                    tooltipPopulation = "<strong>Population density: </strong><span>" + tooltipList[3] + "</span>" + "<br>";
                    tooltipGlobInd = "<strong>Globalisation index: </strong><span>" + tooltipList[4] + "</span>" + "<br>";

                    return tooltipText + tooltipFootprint + tooltipAgriLand + tooltipLivestock + tooltipPopulation + tooltipGlobInd;
                });

    svg.call(tooltip);

    // draw data points of scatter plot based on data of selected x- variable
    svg.selectAll("circle")
       .data(Object.keys(scatterData[year - startYear][year]))
       .enter()
       .append("circle")
       .attr("class", "dot")
       .attr("id", function(d) {
          return scatterData[year - startYear][year][d]["countryCode"]
       })
       .attr("cy", function(d) {
          var yCor = scatterData[year - startYear][year][d]["footprint"];
          return yScale(yCor);
        })
       .attr("cx", function(d) {
          var xCor = scatterData[year - startYear][year][d][selection];
          return xScale(xCor);
        })
       .attr("r", function(d) {

          // leave data points with unknown values out of plot
          if (scatterData[year - startYear][year][d][selection] == 0) {
              return 0;
          }
          else {
              return 4;
          }
        })
       .on("mouseover", tooltip.show)
       .on("mouseout", tooltip.hide)

       // update stacked area graph upon clicking on a data point
       .on("click", function() {
          $("html, body").animate({
                scrollTop: $("#sixthrow").offset().top -
                    $("nav").outerHeight()}, "slow");

          areaUpdate(this.id, codeData);
          });

    // add y-axis label (remains unchanged hereafter)
    svg.append("text")
       .attr("class", "y axisLabel")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - scatterMargin.left)
       .attr("x", 0 - totalScatterHeight / 1.1)
       .attr("dy", "1em")
       .text("Ecological footprint (number of earths)");

    // light up country on map upon hovering over data point in scatter plot
    d3.selectAll("#scatterHere").on("mouseover", function() {
          if (d3.event.target.tagName == "circle"){
              var className = d3.select(d3.event.target).data()[0];
              className = ".datamaps-subunit." + className;
              currentColor = d3.selectAll(className)
              d3.selectAll(className)
                .style("opacity", 0.5);
          }
    });

    // return corresponding country on map to initial color
    d3.selectAll("#scatterHere").on("mouseout", function() {
          if (d3.event.target.tagName == "circle"){
              var className = d3.select(d3.event.target).data()[0];
              className = ".datamaps-subunit." + className;
              d3.selectAll(className)
                .style("opacity", 1);
          }
    });

    // when scatter is finished it responds to changing the slider
    scatterSliderUpdate();

    // when scatter is finished it responds to selecting a x-axis variable
    scatterOptions();

    // scroll to scatter plot by clicking button in navbar
    d3.select(".scatterButton")
      .on("click", function() {
          $("html, body").animate({
              scrollTop: $("#thirdrow").offset().top -
                          $("nav").innerHeight()}, "slow");
      });
    };


/** Function calculates minimal and maximal values of each variable over all
*   years taken together.
*/
function calculateMinMax(scatterData, selection) {
    var minAgr, maxAgr, minPop, maxPop, minGlo, maxGlo, minLiv,
    maxLiv, minFoo, maxFoo;

    // iterates over all years in dataset
    for (i = 0; i < scatterData.length; i++) {
        var yearToCheck = scatterData[i][i + startYear];
        countryCodes = Object.keys(yearToCheck)

        // iterates over all countries in dataset
        for (j = 0; j < numberOfCountries; j++) {

            // sets min and max of variables to values of first country and year
            if (j == 0 && i == 0) {
                minAgr = yearToCheck[countryCodes[j]].agriLand;
                maxAgr = yearToCheck[countryCodes[j]].agriLand;
                minPop = yearToCheck[countryCodes[j]].population;
                maxPop = yearToCheck[countryCodes[j]].population;

                // first year data is available for globalisation index is 1970
                minGlo = scatterData[9][1970][countryCodes[j]].globInd;
                maxGlo = scatterData[9][1970][countryCodes[j]].globInd;
                minLiv = yearToCheck[countryCodes[j]].livestock;
                maxLiv = yearToCheck[countryCodes[j]].livestock;
                minFoo = yearToCheck[countryCodes[j]].footprint;
                maxFoo = yearToCheck[countryCodes[j]].footprint;
            }

            // after first year: checks whether lower or higher value is present
            else {
                if (parseInt(yearToCheck[countryCodes[j]].agriLand) > parseInt(maxAgr)) {
                    maxAgr = yearToCheck[countryCodes[j]].agriLand;
                }
                else if (parseInt(yearToCheck[countryCodes[j]].agriLand) < parseInt(minAgr)) {
                    minAgr = yearToCheck[countryCodes[j]].agriLand
                }
                if (parseInt(yearToCheck[countryCodes[j]].population) > parseInt(maxPop)) {
                    maxPop = yearToCheck[countryCodes[j]].population;
                }
                else if (parseInt(yearToCheck[countryCodes[j]].population) < parseInt(minPop)) {
                    minPop = yearToCheck[countryCodes[j]].population
                }
                if (parseInt(yearToCheck[countryCodes[j]].globInd) > parseInt(maxGlo)) {
                    maxGlo = yearToCheck[countryCodes[j]].globInd;
                }
                else if (parseInt(yearToCheck[countryCodes[j]].globInd) < parseInt(minGlo)) {
                    minGlo = yearToCheck[countryCodes[j]].globInd;
                }
                if (parseInt(yearToCheck[countryCodes[j]].livestock) > parseInt(maxLiv)) {
                    maxLiv = yearToCheck[countryCodes[j]].livestock;
                }
                else if (parseInt(yearToCheck[countryCodes[j]].livestock) < parseInt(minLiv)) {
                    minLiv = yearToCheck[countryCodes[j]].livestock
                }
                if (parseInt(yearToCheck[countryCodes[j]].footprint) > parseInt(maxFoo)) {
                    maxFoo = yearToCheck[countryCodes[j]].footprint;
                }
                else if (parseInt(yearToCheck[countryCodes[j]].footprint) < parseInt(minFoo)) {
                    minFoo = yearToCheck[countryCodes[j]].footprint
                }
            }
        }
    };

    // select correct min and max value depending on selected  x-axis variable
    if (selection == "agriLand") {
        var minValueX = minAgr;
        var maxValueX = maxAgr;
    }
    else if (selection == "livestock") {
        var minValueX = minLiv;
        var maxValueX = maxLiv;
    }
    else if (selection == "globInd") {
        var minValueX = minGlo;
        var maxValueX = maxGlo;
    }
    else if (selection == "population") {
        var minValueX = minPop;
        var maxValueX = maxPop;
    };

    // y-axis variable is always the footprint
    var minValueY = minFoo;
    var maxValueY = maxFoo;

    return [minValueX, maxValueX, minValueY, maxValueY]
};


/** Function calls to update scatter plot based on selected x-axis variable
*   from dropdown menu.
*/
function scatterOptions() {
    d3.select("select")
      .on("change",function() {
          currentSelection = d3.select("#scatterDropdown").node().value;
          updateScatter(currentSelection, currentYear, scatterData);
      });
};


/** Function calls to update scatter plot based on year selected by use of
*   slider.
*/
function scatterSliderUpdate() {
    document.getElementById("slider").addEventListener("input", function(e) {
        var requestedYear = parseInt(e.target.value);
        updateScatter(currentSelection, requestedYear, scatterData);
    });
};


/** Function updates scatterplot by adjusting x-axis, data points and title of
*   graph based on selected year and x-axis variable.
*/
function updateScatter(selection, year, scatterData) {
    currentYear = year;

    // select min and max value for selected variable
    calculateNewDomains = calculateMinMax(scatterData, selection);

    // rescale x-axis
    xScale.domain([calculateNewDomains[0], calculateNewDomains[1]])
          .nice();

    yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left");

    xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");

    // rescale data points
    var updateSvg = svg.selectAll(".dot")
       .data(Object.keys(scatterData[year - startYear][year]));

    updateSvg.transition()
             .duration(1000)
             .attr("id", function(d) {
                return scatterData[year - startYear][year][d]["countryCode"]
             })
             .attr("cy", function(d) {
                var yCor = +scatterData[year - startYear][year][d]["footprint"];
                return yScale(yCor);
              })
             .attr("cx", function(d) {
                var xCor = scatterData[year - startYear][year][d][selection];
                return xScale(xCor);
              })
             .attr("r", function(d) {
                if (scatterData[year - startYear][year][d][selection] == 0 || scatterData[year - startYear][year][d][selection] == null || scatterData[year - startYear][year][d][selection] == "") {
                    return 0;
                }
                else {
                    return 4;
                }
            });

    svg.selectAll(".dot")
       .on('mouseover', tooltip.show)
       .on('mouseout', tooltip.hide)
       .on('click', function() {areaUpdate(this.id, codeData)});

    // update X-Axis
    svg.select(".x.axis")
       .transition()
       .duration(1000);

    svg.select(".x.axis")
       .call(xAxis);

    // call tooltip for updated graph
    svg.call(tooltip);

    // update x-axis label based on selected variable from dropdown
    svg.selectAll(".x.axisLabel")
       .text(function() {
           if (selection == "agriLand") {
              return "Agricultural land (% of land area)";
           }
           else if (selection == "livestock") {
              return "Livestock production index";
           }
           else if (selection == "globInd") {
              return "KOF Globalisation index";
           }
           else if (selection == "population") {
              return "Population density (people per sq. km of land area)";
           }
       });

       // update graph title based on selected x-axis variable
       d3.select(".scatter.title")
         .text(function() {
             var titlePart1 = "Relation between ecological footprint and "
             var titlePart3 = " per country"

             if (selection == "agriLand") {
                var titlePart2 = "amount of agricultural land"
             }
             else if (selection == "livestock") {
                var titlePart2 = "livestock production index"
             }
             else if (selection == "population") {
                var titlePart2 = "population density"
             }
             else {
                var titlePart2 = "globalisation index"
             };

             title = titlePart1 + titlePart2 + titlePart3;
             return title;
         });
  };
