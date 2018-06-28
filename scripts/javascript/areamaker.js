// HEADER MAKEN

// based on http://bl.ocks.org/mhkeller #muchos gracias
var codeData;

/** Function draws initial stacked area graph for data of the whole world and
*   also is used to draw a new stacked area graph for a specifically selected
*   country as an update function.
*/
function areaMaker(selectCode, codeCountryData) {
    codeData = codeCountryData

    // draw initial stacked area graph with data for the whole world
    if (selectCode == "null") {
        var selectCountry = "the world";
    }

    // draw stacked area graph for selected country
    else {
        for (i = 0; i < codeData.length; i++ ) {
            if (codeData[i].CountryCode == selectCode) {
                var selectCountry = codeData[i].CountryName;
            }
        }
    };

    // add graph title based on selected country/world
    d3.select("#areaHere")
      .append("h2")
      .attr("class", "title area")
      .text("Components of national ecological footprint of " + selectCountry + " over time");

    // consider margins on svg to place axis labels in
    var margin = {top: 50, right: 100, bottom: 100, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // initiate scale function for x-axis
    var x = d3.scale.linear()
        .range([0, width]);

    // initiate scale function for y-axis
    var y = d3.scale.linear()
        .range([height, 0]);

    // initiate color selection for stacked areas
    var color = d3.scale.ordinal()
                        .range(["#993300", "lightblue",
                                "#ffff99", "#6666ff", "green", "lightgreen", "black"]);

    // create and draw axes
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // initiate x-values and upper and lower y values per area
    var area = d3.svg.area()
                     .x(function(d) { return x(parseInt(d.year)); })
                     .y0(function(d) { return y(d.y0); })
                     .y1(function(d) { return y(d.y0 + d.y); });

    // stack areas
    var stack = d3.layout.stack()
        .values(function(d) { return d.values; });

    // create svg for stacked area graph
    var svg = d3.select("#areaHere").append("svg")
                                    .attr("class", "areaSvg")
                                    .attr("width", width + margin.left +
                                          margin.right)
                                    .attr("height", height + margin.top +
                                          margin.bottom)
                                    .append("g")
                                    .attr("transform", "translate(" +
                                          margin.left + "," + margin.top + ")");

    // load data from csv
    d3.csv("data/allfootprintdataadjusted.csv", function(error, data) {
        data = data.filter(function(row) {
            return row["countryCode"] == selectCode;
        })
        // hier error toevoegen voor geen data?

        // pick color for each column of data that you filter
        color.domain(d3.keys(data[0]).filter(function(key) {
            return key !== "year" && key != "countryName" && key != "totalFootprint" && key != "countryCode";
        }));

        // determine values per year
        var browsers = stack(color.domain().map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return {year:parseInt(d.year), y: d[name] * 1};
                })
            };
        }));

        // find the value of year with highest total value for scaling
        var maxYearVal = d3.max(data, function(d){
            var vals = d3.keys(d).map(function(key){
                return key !== "year" ? d[key] : 0 });
            return d3.sum(vals) / 1.9;
        });

        // determine domains for axes
        x.domain(d3.extent(data, function(d) {
            return parseInt(d.year);
        }));
        y.domain([0, maxYearVal]);

        var browser = svg.selectAll(".browser")
                         .data(browsers)
                         .enter().append("g")
                         .attr("class", "browser");

        // create areas
        browser.append("path")
               .attr("class", "area")
               .attr("d", function(d, i) {

                  // display error message if data is not available
                  if (isNaN(d.values[i].y)) {
                      d3.select(".noDataText")
                        .style("opacity", 1);
                  }
                  else {
                      return area(d.values);
                  }
                })
                .style("fill", function(d) { return color(d.name); });

        // create and draw axes
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

        // add x-axis label
        svg.append("text")
           .attr("class", "x axisLabel")
           .attr("y", height + 40)
           .attr("x", width - 100)
           .text("Time in years");
    });

    // create (invisible) error message for unavailable data
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


/** Function removes current components of stacked area graph and calls to draw
*   a new complete graph.
*/
function areaUpdate(selectCode) {
    d3.select(".areaSvg")
      .remove()
    d3.select(".title.area")
      .remove()

    areaMaker(selectCode, codeData);

  // redraw graph for whole world upon clicking button
  d3.select(".worldButton")
    .on("click", function() {
      			$("html, body").animate({
      		        scrollTop: $("#sixthrow").offset().top -
      		        		$("nav").outerHeight()}, "slow");
            areaUpdate("null")
    });
};


/** Function draws legend for stacked area graph.
*/
function areaLegendMaker() {

    // prepare and create svg for legend
    var totalAreaWidth = 500
    var totalAreaHeight = totalAreaWidth
    var legendX = 100

    d3.select("#areaLegendHere")
      .append("svg")
      .attr("class", "legendAreaGraph")
      .attr("height", totalAreaHeight)
      .attr("width", totalAreaWidth);

    // draw colored rectangle and text for each stacked area
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
};
