// based on http://bl.ocks.org/mhkeller #muchos gracias

function areaMaker(selectCode) {
  // selectCode = "NOR"

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // var parseDate = d3.time.format("%y-%b-%d").parse;
    //     //formatPercent = d3.format(".0%");

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category20();
    // console.log(color)

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        //.tickFormat(formatPercent);

    var area = d3.svg.area()
        .x(function(d) {
          // console.log(d);
          return x(d.year); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) {
          // console.log(d);
          return y(d.y0 + d.y); });

    var stack = d3.layout.stack()
        .values(function(d) { return d.values; });
    // console.log(stack)

    var svg = d3.select("#areaHere").append("svg")
        .attr("class", "areaSvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("scripts/allfootprintdataadjusted.csv", function(error, data) {
        // for (i=0; i<200; i++) {
        //   console.log(data)};
        data = data.filter(function(row) {
        return row["countryCode"] == selectCode;})
      color.domain(d3.keys(data[0]).filter(function(key) {
        console.log(key);
        return key !== "year" && key != "countryName" && key != "totalFootprint" && key != "countryCode"; }));
      // data.forEach(function(d) {
      // 	d. = parseDate(d.date);
      // });

      var browsers = stack(color.domain().map(function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {year: d.year, y: d[name] * 1};
          })
        };
      }));

      // Find the value of the day with highest total value
      var maxYearVal = d3.max(data, function(d){
        var vals = d3.keys(d).map(function(key){ return key !== "year" ? d[key] : 0 });
        return d3.sum(vals) / 1.9;
      });

      // Set domains for axes
      x.domain(d3.extent(data, function(d) { return d.year; }));
      y.domain([0, maxYearVal])

      var browser = svg.selectAll(".browser")
          .data(browsers)
        .enter().append("g")
          .attr("class", "browser");

      browser.append("path")
          .attr("class", "area")
          .attr("d", function(d) { return area(d.values); })
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
};

function areaUpdate(selectCode) {
  console.log(selectCode)
    // verwijder vorige svg inhoud
    d3.select(".areaSvg")
         .remove()
    areaMaker(selectCode);

  d3.select(".worldButton")
    .on("click", function() {areaUpdate("null")});
}
