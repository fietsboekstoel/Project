// missing data struggle
// de assen updaten nog niet, en de punten nog niet goed
// assistance negatieve getallen
// tooltip aanvullen
// Titel
// alltime minmax ipv per jaar (scatterArrays nog nodig??)

// globale variabelen?
var xScale, yScale, xAxis, yAxis, tooltip, svg, currentYear, currentSelection, scatterArrays, scatterData;
var startYear = 1961;



function scatterMaker(totalScatterData) {
  scatterData = totalScatterData;
  // // ensure both data sets are loaded before continuing
  // // d3.queue()
  // //   .defer(d3.json, )
  // //   .defer(d3.request, birds)
  // //   .awaitAll(processData);
  //
  //   // introduce global variables
  //   var dictArray = []
  //   var arrayBirds = []
  //   var arrayMammals = []

  // // process data JSONs into right format for further use
  // function processData(error, response) {
  //
  //   // ensure no error has occurred
  //   if (error) throw error;
  //
  //   // parse response JSON
  //   var mammalsJSON = JSON.parse(response[0].responseText)
  //   var birdsJSON = JSON.parse(response[1].responseText)
  //
  //   // acquire country names from JSON
  //   var countries = mammalsJSON.structure.dimensions.observation[2].values
  //   var countryLength = countries.length
  //
  //   // acquire variable values from JSON
  //   var mammalsReady = mammalsJSON.dataSets[0].observations
  //   var birdsReady = birdsJSON.dataSets[0].observations
  //
  //   var numberOfVariables = 3
  //
  //   var counterarray = []
  //   var counter = 0
  //   var counterM = 0
  //   var counterMa = []

  //
  //   // create array including all three variable values per animal class
  //   for (i = 0; i < numberOfVariables; i++) {
  //     for (k = 0; k < countryLength; k++) {
  //       var key = i + ":" + 0 + ":" + k
  //
  //       // ensure bird data has no missing data
  //       if (birdsReady[key]) {
  //             arrayBirds.push(birdsReady[key][0])
  //       }
  //
  //       // raise error in case of missing data
  //       else {
  //         new Error("Missing data detected in bird data")
  //       }
  //
  //       // ensure mammal data has no missing data
  //       if (mammalsReady[key]) {
  //         arrayMammals.push(mammalsReady[key][0])
  //       }
  //
  //       // raise error in case of missing data
  //       else {
  //         new Error("Missing data detected in mammal data")
  //       }
  //     }
  //   }
  //
  //   // convert data from array of values to array of dicts per country
  //   for (i = 0; i < countryLength; i++) {
  //     var countryDict = {
  //       "country": countries[i].name,
  //       "totalSpeciesMammals": arrayMammals[i],
  //       "threatenedSpeciesMammals": arrayMammals[i + 10],
  //       "percentageMammals": arrayMammals[i + 20],
  //       "totalSpeciesBirds": arrayBirds[i],
  //       "threatenedSpeciesBirds": arrayBirds[i + 10],
  //       "percentageBirds": arrayBirds[i + 20]
  //     }
  //     dictArray.push(countryDict)
  //   }
  //
  //   // randomly choose either birds or mammals as first display
  //   if (Math.random() < 0.5) {
  //     makeGraph("Birds")
  //   }
  //   else {
  //     makeGraph("Mammals")
  //   }
  // }
  //
  // // draw actual graph
  // function makeGraph(selection){
  // console.log(scatterData)
  // var startYear = 1961;
  // behalve de dicts ook nog ff een list of lists meegeven voor berekenen min en max
  currentSelection = "agriLand"
  scatterArrays = makeScatterArrays(scatterData, startYear);
  currentYear = startYear;
  drawScatter(scatterArrays, scatterData, currentSelection, currentYear);
  // volgorde: agri, assist, livest, globind, pop, footprint, countrycode

};






function makeScatterArrays(scatterArrayData, year) {
  // console.log(scatterArrayData)
  // var startYear = 1961;
  var numberOfYears = 2015-startYear;
  var numberOfCountries = 127;
  var agriList = [];
  var assistList = [];
  var livestockList = [];
  var popuList = [];
  var globIndList = [];
  var footprintList = [];
  // countryList = []

  var rightYearDict = scatterArrayData[year - startYear];
  // console.log(rightYearDict)
  // console.log(rightYearDict)
  rightYearDict = rightYearDict[year]
  // console.log(rightYearDict)
  var countryNameList = Object.keys(rightYearDict);

  for (countryNumber = 0; countryNumber < numberOfCountries; countryNumber++) {

    // console.log(countryNameList)

    // console.log("loop 1")
    // console.log(rightYearDict)
    // rightYearCountryDict = rightYearDict[1]
    // console.log(rightYearDict)
    // console.log(countryNameList[countryNumber])

    var rightYearCountryDict = rightYearDict[countryNameList[countryNumber]]
    // console.log(rightYearCountryDict);

    agriList.push(rightYearCountryDict["agriLand"]);
    assistList.push(rightYearCountryDict["assistance"]);
    livestockList.push(rightYearCountryDict["livestock"]);
    popuList.push(rightYearCountryDict["population"]);
    globIndList.push(rightYearCountryDict["globInd"]);
    footprintList.push(rightYearCountryDict["footprint"]);

  };

  var scatterList = [];
  scatterList.push(agriList);
  scatterList.push(assistList);
  scatterList.push(livestockList);
  scatterList.push(globIndList);
  scatterList.push(popuList);
  scatterList.push(footprintList);
  scatterList.push(countryNameList)

  console.log(scatterList)
  return scatterList;
};




function drawScatter(scatterArrays, scatterData, selection, year) {
  // console.log(scatterArrays, scatterData, selection, year)

  // determine highest and lowest value of x and y variables for scaling

  // NU WORDT "" EN null MEEGENOMEN ALS 0
  calculatedMinMax= calculateMinMax(scatterData, selection)

   //
   //  // add graph title depending on data (birds/mammals)
   //  d3.select("body")
   //    .append("h1")
   //    .attr("class", "title")
   //    .text(function() {
   //      if (selection == "Birds") {
   //        title = "Relation between total number of bird species and number of threatened bird species per country"
   //      }
   //      else {
   //        title = "Relation between total number of mammal species and number of threatened mammal species per country"
   //      }
   //      return title
   //    });
   //
   //
    // consider size of svg and margin to place axis labels in within svg
    var totalScatterWidth = d3.select("#scatterHere")[0][0].clientWidth;
    // console.log(totalScatterWidth)
    var totalScatterHeight = 500;
    var scatterMargin = {left: 100, top: 10, right: 50, bottom: 100};

    // define variables for width and height of graph (rather than the svg)
    var scatterWidth = totalScatterWidth - scatterMargin.left - scatterMargin.right;
    var scatterHeight = totalScatterHeight - scatterMargin.top - scatterMargin.bottom;

    // create svg to draw on
    svg = d3.select("#scatterLocation")
                .append("svg")
                .attr("class", "graph")
                .attr("width", totalScatterWidth)
                .attr("height", totalScatterHeight)
                .append("g")
                .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");


    // use the right minimal and maximal value based on data (birds/mammals)
    var xDomainSelection = [calculatedMinMax[0], calculatedMinMax[1]];
    var yDomainSelection = [calculatedMinMax[3], calculatedMinMax[2]];

    // functions for scaling x and y values from data to graph area
    yScale = d3.scale.linear()
                         .domain(yDomainSelection)
                         .range([scatterMargin.top, totalScatterHeight - scatterMargin.bottom]);

    xScale = d3.scale.linear()
                         .domain(xDomainSelection)
                         .range([0, scatterWidth])

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
       .attr("transform", "translate(0," + (scatterHeight + scatterMargin.top) + ")")
       .call(xAxis)
   //
    // create and call tooltip to appear when hovering on data point
    tooltip = d3.tip()
                    .attr('class', 'tooltip')
                    .html(function(d) {
                      var tooltipText = "<strong>Country: </strong><span>" + scatterData[year-1961][year][d].countryName + "</span>" + "<br>";

                      return tooltipText;
                    });
    svg.call(tooltip);
   //
   console.log(scatterData[year-1961][year])
    // draw dots/data points of scatter plot based on data (birds/mammals)
    svg.selectAll("circle")
       .data(Object.keys(scatterData[year-1961][year]))
       .enter()
       .append("circle")
       .attr("cx", function(d) {
         var xCor = scatterData[year-1961][year][d]["footprint"];
          return xScale(xCor);
        })
       .attr("cy", function(d) {
         var yCor = scatterData[year-1961][year][d][selection];
          return yScale(yCor);
        })
       .attr("r", 4)
       .on('mouseover', tooltip.show)
       .on('mouseout', tooltip.hide);


       // locatie van de dropdown zo maken dat die als y-as label werkt?
// locatie van de y-as nog aanpassen op hoe veel getallen??

    // add y-axis label
    svg.append("text")
       .attr("class", "y axisLabel")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - 0.7 * scatterMargin.left)
       .attr("x", 0 - totalScatterHeight / 2)
       .attr("dy", "1em")
       .text("Agricultural land (% of land area)");
   //
    // add x-axis label
    svg.append("text")
       .attr("class", "axisLabel")
       .attr("y", totalScatterHeight - 50)
       .attr("x", totalScatterWidth / 8)
       .text("Ecological footprint (number of earths)");
   //
   //   // add color legend to svg
   //  var legendX = graphWidth + 20
   //
   //  // colored rectangle and text for high percentages
   //  svg.append("rect")
   //     .attr("class", "legend high")
   //     .attr("y", graphHeight / 3)
   //     .attr("x", legendX);
   //
   //  svg.append("text")
   //     .attr("class", "legendText")
   //     .attr("y", graphHeight / 3 + 12)
   //     .attr("x", legendX + 35)
   //     .text(">30% threatened");
   //
   //  // colored rectangle and text for medium percentages
   //  svg.append("rect")
   //     .attr("class", "legend medium")
   //     .attr("y", graphHeight / 3 + 20)
   //     .attr("x", legendX);
   //
   //  svg.append("text")
   //     .attr("class", "legendText")
   //     .attr("y", graphHeight / 3 + 20 + 12)
   //     .attr("x", legendX + 35)
   //     .text("20-30% threatened");
   //
   //  // colored rectangle and text for low percentages
   //  svg.append("rect")
   //       .attr("class", "legend low")
   //       .attr("y", graphHeight / 3 + 40)
   //       .attr("x", legendX);
   //
   //  svg.append("text")
   //     .attr("class", "legendText")
   //     .attr("y", graphHeight / 3 + 40 + 12)
   //     .attr("x", legendX + 35)
   //     .text("0-20% threatened");
   //
   //  // add personal info to page
   //  d3.select("body")
   //    .append("p")
   //    .attr("class", "info")
   //    .text("Rebecca de Feijter - 10639918 - Data Processing");
   //
   //  // add info about dataset to page
   //  d3.select("body")
   //    .append("p")
   //    .attr("class", "info")
   //    .text("The graphs on this page show the amount of mammal and bird \
   //          species living in a set of ten countries, as well as how many of \
   //          those species are threatened. The percentages of threatened \
   //          species are also represented by the colors of the data points \
   //          (see legend). Upon hovering over a data point, the exact values \
   //          for the variables of that country as well as the country name, are \
   //          displayed. By clicking the Mammals-button or the Birds-button, \
   //          the graph will switch between data about those two classes of \
   //          animals. The data was aqcuired for this assignment via the website \
   //          of the Organisation for Economic Co-operation and Development.");
   //
   //   // function for clearing the page
   //   function clearGraph() {
   //     d3.select("svg")
   //       .remove()
   //     d3.select("h1")
   //       .remove()
   //     d3.selectAll("p")
   //       .remove()
   //   }
   //
   //   // clear page and draw new graph upon clicking either button
   //   document.getElementById("mammalButton").onclick = function() {
   //     clearGraph();
   //     makeGraph("Mammals");
   //   };
   //   document.getElementById("birdButton").onclick = function() {
   //     clearGraph();
   //     makeGraph("Birds");
   //   };
    scatterSliderUpdate();
    scatterOptions();
  };





function calculateMinMax(scatterData, selection) {
    var minAgr, maxAgr, minAss, maxAss, minPop, maxPop, minGlo, maxGlo, minLiv, maxLiv, minFoo, maxFoo;
    for (i = 0; i < scatterData.length; i++) {
      joe = scatterData[i][i + 1961];
      // console.log(joe)
      countryCodes = Object.keys(joe)
      // console.log(countryCodes)
      for (j = 0; j < numberOfCountries; j++) {
        // console.log(joe[countryCodes[j]])
        if (j == 0 && i == 0) {
            minAgr = joe[countryCodes[j]].agriLand;
            // console.log(minAgr)
            maxAgr = joe[countryCodes[j]].agriLand;
            minAss = joe[countryCodes[j]].assistance;
            maxAss = joe[countryCodes[j]].assistance;
            minPop = joe[countryCodes[j]].population;
            maxPop = joe[countryCodes[j]].population;
            minGlo = joe[countryCodes[j]].globInd;
            maxGlo = joe[countryCodes[j]].globInd;
            minLiv = joe[countryCodes[j]].livestock;
            maxLiv = joe[countryCodes[j]].livestock;
            minFoo = joe[countryCodes[j]].footprint;
            maxFoo = joe[countryCodes[j]].footprint;
        }
        else {
          // console.log(joe[countryCodes[j]].livestock)
          if (joe[countryCodes[j]].agriLand > maxAgr) {
            maxAgr = joe[countryCodes[j]].agriLand;
          }
          else if (joe[countryCodes[j]].agriLand < minAgr) {
            minAgr = joe[countryCodes[j]].agriLand
            // console.log(minAgr)
          }
          if (joe[countryCodes[j]].assistance > maxAss) {
            maxAss = joe[countryCodes[j]].assistance;
          }
          else if (joe[countryCodes[j]].assistance < minAss) {
            minAss = joe[countryCodes[j]].assistance
          }
          if (joe[countryCodes[j]].population > maxPop) {
            maxPop = joe[countryCodes[j]].population;
          }
          else if (joe[countryCodes[j]].population < minPop) {
            minPop = joe[countryCodes[j]].population
          }
          if (joe[countryCodes[j]].globInd > maxGlo) {
            maxGlo = joe[countryCodes[j]].globInd;
          }
          else if (joe[countryCodes[j]].globInd < minGlo) {
            minGlo = joe[countryCodes[j]].globInd
          }
          if (joe[countryCodes[j]].livestock > maxLiv) {
            maxLiv = joe[countryCodes[j]].livestock;
          }
          else if (joe[countryCodes[j]].livestock < minLiv) {
            minLiv = joe[countryCodes[j]].livestock
          }
          if (joe[countryCodes[j]].footprint > maxFoo) {
            maxFoo = joe[countryCodes[j]].footprint;
          }
          else if (joe[countryCodes[j]].footprint < minFoo) {
            minFoo = joe[countryCodes[j]].footprint
          }
        }
      }
    }
    console.log("1", minAgr, "2", maxAgr, "3", minAss, "4", maxAss, "5", minGlo, "6", maxGlo, "7", minFoo, "8", maxFoo, "9", minLiv, "10", maxLiv, "11", minPop, "12", maxPop)

    if (selection == "agriLand") {
        // var minValueY = Math.min.apply(Math, scatterArrays[0])
        // var maxValueY = Math.ceil(Math.max.apply(Math, scatterArrays[0]) / 10) * 10
        var minValueY = minAgr;
        var maxValueY = maxAgr;
    }

    else if (selection == "assistance") {
        // var minValueY = Math.min.apply(Math, scatterArrays[1])
        // var maxValueY = Math.max.apply(Math, scatterArrays[1])
        var minValueY = minAss;
        var maxValueY = maxAss;
    }

    else if (selection == "livestock") {
        // var minValueY = Math.min.apply(Math, scatterArrays[2])
        // var maxValueY = Math.max.apply(Math, scatterArrays[2])
        var minValueY = minLiv;
        var maxValueY = maxLiv;
    }

    else if (selection == "globInd") {
        // var minValueY = Math.min.apply(Math, scatterArrays[3])
        // var maxValueY = Math.max.apply(Math, scatterArrays[3])
        var minValueY = minGlo;
        var maxValueY = maxGlo;
    }
    else if (selection == "population") {
        // var minValueY = Math.min.apply(Math, scatterArrays[4])
        // var maxValueY = Math.max.apply(Math, scatterArrays[4])
        var minValueY = minPop;
        var maxValueY = maxPop;
    }

// om as niet te veranderen: gehardcode?
    // var minValueX = Math.min.apply(Math, scatterArrays[5])
    // var maxValueX = Math.ceil(Math.max.apply(Math, scatterArrays[5]))
    var minValueX = minFoo; // 0;
    var maxValueX = maxFoo; // 11;
    // console.log(maxValueX)

    // console.log(minValueAgri, minValueAssist, minValueLivestock, minValueGlobind, minValuePopulation, minValueFootprint)
    // console.log(maxValueAgri, maxValueAssist, maxValueLivestock, maxValueGlobind, maxValuePopulation, maxValueFootprint)
    // console.log(minValueX, maxValueX, minValueY, maxValueY)
    return [minValueX, maxValueX, minValueY, maxValueY]
};





function scatterOptions() {
  d3.select("select")
    .on("change",function(d){
        currentSelection = d3.select("#scatterDropdown").node().value;
        // console.log(currentSelection);
        updateScatter(currentSelection, currentYear, scatterData);
  });
};

function scatterSliderUpdate() {
    document.getElementById("slider").addEventListener('input', function(e) {
        var requestedYear = parseInt(e.target.value);
        console.log("scatter year update?")
        updateScatter(currentSelection, requestedYear, scatterData);
    });
};




// hier ook nog meegeven de data?
function updateScatter(selection, year, scatterData) {
  // checken als allebei hetzelfde niet updaten?
    if (year != currentYear) {
        scatterArrays = makeScatterArrays(scatterData, year);
        currentYear = year;
    };

    calculateNewDomains = calculateMinMax(scatterData, selection);
    // console.log(calculateNewDomains)
    yScale.domain([calculateNewDomains[3], calculateNewDomains[2]]);
    xScale.domain([calculateNewDomains[3], calculateNewDomains[2]]);


// kunnen deze hieronder weg?
    yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left");

    xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");

    console.log(calculateNewDomains)
    console.log(Object.keys(scatterData[year-1961][year]))

    svg.selectAll("circle")
       .data(Object.keys(scatterData[year-1961][year]))
       .transition()
       .duration(1000)
       .attr("cx", function(d) {
            var xCor = scatterData[year-1961][year][d]["footprint"];
            return xScale(xCor);
        })
       .attr("cy", function(d) {
           var yCor = scatterData[year-1961][year][d][selection];
           return yScale(yCor);
        })
       .attr("r", 4)
       .on('mouseover', tooltip.show)
       .on('mouseout', tooltip.hide);

    // Update X Axis
    svg.select(".x.axis")
       .transition()
       .duration(1000)
       .call(xAxis);


    // Update Y Axis
    svg.select(".y.axis")
       .transition()
       .duration(1000)
       .call(yAxis);



    // create and call tooltip to appear when hovering on data point
    tooltip = d3.tip()
                    .attr('class', 'tooltip')
                    .html(function(d) {
                      var tooltipText = "<strong>Country: </strong><span>" + scatterData[year-1961][year][d].countryName + "</span>" + "<br>";

                      return tooltipText;
                    });
    svg.call(tooltip);

    // add y-axis label
    svg.select(".y.axislabel")
       .text(function() {
         if (selection == "agriLand") {
           return "Agricultural land (% of land area)"
         }
         else if (selection == "assistance") {
           return "Net development assistance received (current US$)"
         }
         else if (selection == "livestock") {
           return "Livestock production index"
         }
         else if (selection == "globInd") {
           return "KOF Globalisation index"
         }
         else if (selection == "population") {
           return "Population density (people per sq. km of land area)"
         }
       });

  };
