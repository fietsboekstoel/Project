// based on http://bl.ocks.org/mhkeller #muchos gracias
var codeData;

function areaMaker(selectCode, codeCountryData) {
  codeData = codeCountryData
  console.log(codeData)
  // selectCode = "NOR"
  if (selectCode == "null") {
    var selectCountry = "the world";
  }
  else {
    for (i = 0; i < codeData.length; i++ ) {
      console.log(codeData[i])
        if (codeData[i].CountryCode == selectCode) {
            var selectCountry = codeData[i].CountryName;
            console.log(selectCountry);
        }
    }
  };


  d3.select("#areaHere")
    .append("h2")
    .attr("class", "title area")
    .text("Components of national ecological footprint of " + selectCountry + " over time")

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // var parseDate = d3.time.format("%y-%b-%d").parse;
    //     //formatPercent = d3.format(".0%");

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
    // .range(['#fc8d62', '#8da0cb', '#e78ac3', '#66c2a5', '#a6d854', '#ffd92f']);
    // console.log(color)
    .range(["#993300", "lightblue", "#ffff99", "#6666ff", "green", "lightgreen", "black"]);
    // .rangeRoundBands([0,7]);


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        //.tickFormat(formatPercent);

    var area = d3.svg.area()
        .x(function(d) {
          // console.log("1");
          return x(parseInt(d.year)); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) {
          // console.log("2");
          return y(d.y0 + d.y); });

    var stack = d3.layout.stack()
        .values(function(d) { return d.values; });
    // console.log("3")

    var svg = d3.select("#areaHere").append("svg")
        .attr("class", "areaSvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // console.log("4")

    d3.csv("scripts/allfootprintdataadjusted.csv", function(error, data) {
        // for (i=0; i<200; i++) {
        //   console.log(data)};
        data = data.filter(function(row) {
          // console.log("5")
        return row["countryCode"] == selectCode;})
      color.domain(d3.keys(data[0]).filter(function(key) {
        console.log(key);
        return key !== "year" && key != "countryName" && key != "totalFootprint" && key != "countryCode"; }));
      // data.forEach(function(d) {
      // 	d. = parseDate(d.date);
      // });

      var browsers = stack(color.domain().map(function(name) {
        console.log("6")
        return {
          name: name,
          values: data.map(function(d) {
            return {year:parseInt(d.year), y: d[name] * 1};
          })
        };
      }));

      // Find the value of the day with highest total value
      var maxYearVal = d3.max(data, function(d){
        console.log("7")
        var vals = d3.keys(d).map(function(key){ return key !== "year" ? d[key] : 0 });
        return d3.sum(vals) / 1.9;
      });

      // Set domains for axes
      x.domain(d3.extent(data, function(d) {
        console.log(typeof(d.year))
        return parseInt(d.year); }));
      y.domain([0, maxYearVal])

      var browser = svg.selectAll(".browser")
          .data(browsers)
        .enter().append("g")
          .attr("class", "browser");

      browser.append("path")
          .attr("class", "area")
          .attr("d", function(d, i) {
            console.log(d)
              if (isNaN(d.values[i].y)) {
                console.log("true")
                d3.select(".noDataText")
                  .style("opacity", 1);
              }
              else {
                return area(d.values);
              }
          })
          .style("fill", function(d) { return color(d.name); });

      // browser.append("text")
      //     .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      //     .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
      //     .attr("x", -6)
      //     .attr("dy", ".35em")
      //     .text(function(d) { return d.name; });

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

          // add y-axis label
          svg.append("text")
             .attr("class", "y axisLabel")
             .attr("transform", "rotate(-90)")
             .attr("y", 0 - margin.left / 1.5)
             .attr("x", 0 - height / 1.3)
             .attr("dy", "1em")
             .text("Ecological footprint in number of earths");
         //
          // add x-axis label
          svg.append("text")
             .attr("class", "x axisLabel")
             .attr("y", height + 40)
             .attr("x", width - 100)
             .text("Time in years");
    });

    // var margin = {top: 20, right: 20, bottom: 30, left: 50},
    // width = 960 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;
    //
    // // var parseDate = d3.time.format("%y-%b-%d").parse,
    // //     formatPercent = d3.format(".0%");
    //
    // var x = d3.scale.linear()
    //     .range([0, width]);
    //
    // var y = d3.scale.linear()
    //     .range([height, 0]);
    //
    // var color = d3.scale.category20();
    //
    // var xAxis = d3.svg.axis()
    //     .scale(x)
    //     .orient("bottom");
    //
    // var yAxis = d3.svg.axis()
    //     .scale(y)
    //     .orient("left");
    //     // .tickFormat(formatPercent);
    //
    // var area = d3.svg.area()
    //     .x(function(d) { return x(d.year); })
    //     .y0(function(d) { return y(d.y0); })
    //     .y1(function(d) { return y(d.y0 + d.y); });
    //
    // var stack = d3.layout.stack()
    //     .values(function(d) { return d.values; });
    //
    // var svg = d3.select("body").append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //
    // d3.tsv("scripts/afghanistan.csv", function(error, data) {
    //   color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));
    //   //
    //   // data.forEach(function(d) {
    //   //   d.year = parseDate(d.year);
    //   // });
    //
    //   var browsers = stack(color.domain().map(function(name) {
    //     return {
    //       name: name,
    //       values: data.map(function(d) {
    //         return {year: d.year, y: d[name] / 100};
    //       })
    //     };
    //   }));
    //
    //   x.domain(d3.extent(data, function(d) { return d.year; }));
    //
    //   var browser = svg.selectAll(".browser")
    //       .data(browsers)
    //     .enter().append("g")
    //       .attr("class", "browser");
    //
    //   browser.append("path")
    //       .attr("class", "area")
    //       .attr("d", function(d) {
    // // debugger;
    // console.log(JSON.stringify(d.values));
    // var ar =  area(d.values);
    // return ar;
    // })
    //       .style("fill", function(d) { return color(d.name); });
    //
    //   browser.append("text")
    //       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
    //       .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
    //       .attr("x", -6)
    //       .attr("dy", ".35em")
    //       .text(function(d) { return d.name; });
    //
    //   svg.append("g")
    //       .attr("class", "x axis")
    //       .attr("transform", "translate(0," + height + ")")
    //       .call(xAxis);
    //
    //   svg.append("g")
    //       .attr("class", "y axis")
    //       .call(yAxis);
    // });
d3.select(".areaSvg")
  .append("text")
  .attr("class", "noDataText")
  .attr("y", 200)
  .attr("x", 350)
  .style("font", "30px")
  .style("font-weight", "bold")
  .style("opacity", 0)
  .text("No data available for this country");
};



function areaUpdate(selectCode) {
  console.log(selectCode)
    // verwijder vorige svg inhoud
    d3.select(".areaSvg")
         .remove()
    areaMaker(selectCode, codeData);

  d3.select(".worldButton")
    .on("click", function() {areaUpdate("null")});
};




function areaLegendMaker() {

  var totalAreaWidth = 500
  console.log(totalAreaWidth)
  var totalAreaHeight = totalAreaWidth
  var legendX = 100

  d3.select("#areaLegendHere")
    .append("svg")
    .attr("class", "legendAreaGraph")
    .attr("height", totalAreaHeight)
    .attr("width", totalAreaWidth);

console.log(totalAreaHeight/14)

// colored rectangle and text for amphibian data

d3.select(".legendAreaGraph")
  .append("rect")
  .attr("class", "legend grazing")
  .attr("y", totalAreaHeight / 14)
  .attr("x", legendX)
  .style("fill", "lightgreen");

d3.select(".legendAreaGraph")
  .append("text")
  .attr("class", "legendText")
  .attr("y", totalAreaHeight / 14 + 12)
  .attr("x", legendX + 35)
  .style("font", "15px")
  .text("= Grazing land");

d3.select(".legendAreaGraph")
  .append("rect")
  .attr("class", "legend forest")
  .attr("y", totalAreaHeight / 14 * 2)
  .attr("x", legendX)
  .style("fill", "green");

d3.select(".legendAreaGraph")
  .append("text")
  .attr("class", "legendText")
  .attr("y", totalAreaHeight / 14 * 2 + 12)
  .attr("x", legendX + 35)
  .style("font", "15px")
  .text("= Forest land");

d3.select(".legendAreaGraph")
  .append("rect")
  .attr("class", "legend fish")
  .attr("y", totalAreaHeight / 14 * 3)
  .attr("x", legendX)
  .style("fill", "#6666ff");

d3.select(".legendAreaGraph")
  .append("text")
  .attr("class", "legendText")
  .attr("y", totalAreaHeight / 14 * 3 + 12)
  .attr("x", legendX + 35)
  .style("font", "15px")
  .text("= Fishing grounds");

  d3.select(".legendAreaGraph")
    .append("rect")
    .attr("class", "legend crop")
    .attr("y", totalAreaHeight / 14 * 4)
    .attr("x", legendX)
    .style("fill", "#ffff99");

  d3.select(".legendAreaGraph")
    .append("text")
    .attr("class", "legendText")
    .attr("y", totalAreaHeight / 14 * 4 + 12)
    .attr("x", legendX + 35)
    .style("font", "15px")
    .text("= Cropland");

    d3.select(".legendAreaGraph")
      .append("rect")
      .attr("class", "legend carbon")
      .attr("y", totalAreaHeight / 14 * 5)
      .attr("x", legendX)
      .style("fill", "lightblue");

    d3.select(".legendAreaGraph")
      .append("text")
      .attr("class", "legendText")
      .attr("y", totalAreaHeight / 14 * 5 + 12)
      .attr("x", legendX + 35)
      .style("font", "15px")
      .text("= Carbon");

    d3.select(".legendAreaGraph")
      .append("rect")
      .attr("class", "legend built")
      .attr("y", totalAreaHeight / 14 * 6)
      .attr("x", legendX)
      .style("fill", "#993300");

    d3.select(".legendAreaGraph")
      .append("text")
      .attr("class", "legendText")
      .attr("y", totalAreaHeight / 14 * 6 + 12)
      .attr("x", legendX + 35)
      .style("font", "15px")
      .text("= Built-up land");

    d3.select(".legendAreaGraph")
      .append("rect")
      .attr("class", "legend total")
      .attr("y", totalAreaHeight / 14 * 7)
      .attr("x", legendX)
      .style("fill", "black");

    d3.select(".legendAreaGraph")
      .append("text")
      .attr("class", "legendText")
      .attr("y", totalAreaHeight / 14 * 7 + 12)
      .attr("x", legendX + 35)
      .style("font", "15px")
      .text("= Total (if no detailed data available)");
//
// // colored rectangle and text for mammal data
// svg.append("rect")
//   .attr("class", "legend mammal")
//   .attr("y", barPlotHeight / 3 + 20)
//   .attr("x", legendX);
//
// svg.append("text")
//   .attr("class", "legendText")
//   .attr("y", barPlotHeight / 3 + 20 + 12)
//   .attr("x", legendX + 35)
//   .text("Mammal species");
//
// // colored rectangle and text for bird data
// svg.append("rect")
//     .attr("class", "legend bird")
//     .attr("y", barPlotHeight / 3 + 40)
//     .attr("x", legendX);
//
// svg.append("text")
//   .attr("class", "legendText")
//   .attr("y", barPlotHeight / 3 + 40 + 12)
//   .attr("x", legendX + 35)
//   .text("Amphibian species");
};
