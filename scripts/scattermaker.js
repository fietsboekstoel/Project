// missing data struggle
// in theorie zijn er nu datapunten (want geen error) maar je ziet ze niet??
// de assen en locatie svg kloppen nog niet
// moet nog kunnen shiften tussen variabelen en dus op een handige plek aanroepen


function scatterMaker(scatterData) {
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
  console.log(scatterData)
  var startYear = 1961;
  // behalve de dicts ook nog ff een list of lists meegeven voor berekenen min en max
  var scatterArrays = makeScatterArrays(scatterData, startYear)
  drawScatter(scatterArrays, scatterData, "assistance", startYear);
  // volgorde: agri, assist, livest, globind, pop, footprint, countrycode

};

function makeScatterArrays(scatterArrayData, year) {
  console.log(scatterArrayData)
  var startYear = 1961;
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
  console.log(rightYearDict)
  console.log(rightYearDict)
  rightYearDict = rightYearDict[year]
  console.log(rightYearDict)
  var countryNameList = Object.keys(rightYearDict);

  for (countryNumber = 0; countryNumber < numberOfCountries; countryNumber++) {

    console.log(countryNameList)

    console.log("loop 1")
    console.log(rightYearDict)
    // rightYearCountryDict = rightYearDict[1]
    // console.log(rightYearDict)
    console.log(countryNameList[countryNumber])

    var rightYearCountryDict = rightYearDict[countryNameList[countryNumber]]
    console.log(rightYearCountryDict);

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

  // determine highest and lowest value of x and y variables for scaling

  // NU WORDT "" EN null MEEGENOMEN ALS 0

  var minValueAgri = Math.min.apply(Math, scatterArrays[0])
  var maxValueAgri = Math.max.apply(Math, scatterArrays[0])

  var minValueAssist = Math.min.apply(Math, scatterArrays[1])
  var maxValueAssist = Math.max.apply(Math, scatterArrays[1])

  var minValueLivestock = Math.min.apply(Math, scatterArrays[2])
  var maxValueLivestock = Math.max.apply(Math, scatterArrays[2])

  var minValueGlobind = Math.min.apply(Math, scatterArrays[3])
  var maxValueGlobind = Math.max.apply(Math, scatterArrays[3])

  var minValuePopulation = Math.min.apply(Math, scatterArrays[4])
  var maxValuePopulation = Math.max.apply(Math, scatterArrays[4])

  var minValueFootprint = Math.min.apply(Math, scatterArrays[5])
  var maxValueFootprint = Math.max.apply(Math, scatterArrays[5]) + 0.5

  console.log(minValueAgri, minValueAssist, minValueLivestock, minValueGlobind, minValuePopulation, minValueFootprint)
  console.log(maxValueAgri, maxValueAssist, maxValueLivestock, maxValueGlobind, maxValuePopulation, maxValueFootprint)

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
    var totalScatterWidth = 700;
    var totalScatterHeight = 500;
    var scatterMargin = {left: 50, top: 10, right: 50, bottom: 100};

    // define variables for width and height of graph (rather than the svg)
    var scatterWidth = totalScatterWidth - scatterMargin.left - scatterMargin.right;
    var scatterHeight = totalScatterHeight - scatterMargin.top - scatterMargin.bottom;

    // create svg to draw on
    var svg = d3.select("body")
                .append("svg")
                .attr("class", "graph")
                .attr("width", totalScatterWidth)
                .attr("height", totalScatterHeight)
                .append("g")
                .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");

    // use the right minimal and maximal value based on data (birds/mammals)
    var yDomainSelection;
    var xDomainSelection = [minValueFootprint, maxValueFootprint];

    if (selection == "agriLand"){
      yDomainSelection = [maxValueAgri, minValueAgri]
    }
    else if (selection == "livestock") {
      yDomainSelection = [maxValueAssist, minValueAssist]
    }
    else if (selection == "globInd") {
      yDomainSelection = [maxValueGlobind, minValueGlobind]
    }
    else if (selection == "population") {
      yDomainSelection = [maxValuePopulation, minValuePopulation]
    }
    else {
      yDomainSelection = [maxValueAssist, minValueAssist]
    };

    // functions for scaling x and y values from data to graph area
    var yScale = d3.scale.linear()
                         .domain(yDomainSelection)
                         .range([scatterMargin.top, totalScatterHeight - scatterMargin.bottom]);

    var xScale = d3.scale.linear()
                         .domain(xDomainSelection)
                         .range([0, scatterWidth])

    // create and draw y and x axis
    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left");
    svg.append("g")
       .attr("class", "axis")
       .call(yAxis);

    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom");
    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + (scatterHeight + scatterMargin.top) + ")")
       .call(xAxis)
   //
   //  // create and call tooltip to appear when hovering on data point
   //  var tooltip = d3.tip()
   //                  .attr('class', 'tooltip')
   //                  .html(function(d) {
   //                    var tooltipText = "<strong>Country: </strong><span>" + d.country + "</span>" + "<br>",
   //                    tooltipThreat = "<strong>Number of threatened species: </strong><span>" + d["threatenedSpecies" + selection] + "</span>" + "<br>",
   //                    tooltipTotal = "<strong>Total number of species: </strong><span>" + d["totalSpecies" + selection] + "</span>" + "<br>",
   //                    tooltipPerc = "<strong>Percentage threatened species: </strong><span>" + d["percentage" + selection] + "%</span>" + "<br>"
   //
   //                    return tooltipText + tooltipThreat + tooltipTotal + tooltipPerc
   //                  });
   //  svg.call(tooltip);
   //
   console.log(scatterData[year-1961][year])
    // draw dots/data points of scatter plot based on data (birds/mammals)
    svg.selectAll("circle")
       .data(scatterData[year-1961][year])
       .enter()
       .append("circle")

       // // add class of data point for color based on 3rd variable of percentage
       // .attr("class", function(d) {
       //   if (d["percentage" + selection] >= 30) {
       //     return "high"
       //   }
       //   else if (d["percentage" + selection] >= 20 && d["percentage" + selection] < 30) {
       //     return "medium"
       //   }
       //   else {
       //     return "low"
       //   }
       // })
       .attr("cx", function(d) {
          return xScale(d["footprint"]);
        })
       .attr("cy", function(d) {
          return yScale(d["assistance"]);
        })
       .attr("r", 7);
       // .on('mouseover', tooltip.show)
       // .on('mouseout', tooltip.hide);

   //  // add y-axis label
   //  svg.append("text")
   //     .attr("class", "axisLabel")
   //     .attr("transform", "rotate(-90)")
   //     .attr("y", 0 - margin.left)
   //     .attr("x", 0 - graphHeight / 2)
   //     .attr("dy", "1em")
   //     .text("Number of threatened species");
   //
   //  // add x-axis label
   //  svg.append("text")
   //     .attr("class", "axisLabel")
   //     .attr("y", totalHeight - 70)
   //     .attr("x", graphWidth / 2)
   //     .text("Total number of species");
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

  };
