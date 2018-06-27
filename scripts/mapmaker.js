// titel
// legenda
// colorfunction verbeteren
// update werkt nog niet
// highlight kleur dezelfde kleur?
// tooltip aanvullen

function mapMaker(alldata) {
  d3.select("#mapHere")
    .append("h2")
    .attr("class", "title map")
    .text("National ecological footprints in number of earths")

  startYear = 1961;
  selectedData = alldata[0][startYear];
  console.log("hier dan", selectedData)
  // keyArray = Object.keys(selectedData)
    var basic_choropleth = new Datamap({
    element: document.getElementById("mapHere"),
    projection: "mercator",
    height: 400,
    fills: {defaultFill: "#FFF0F2"},
            // fillColor: function(d) {
            //   return colorCode(d)
            // }},
    data: selectedData,
    geographyConfig: {borderColor: '#DEDEDE',
                      highlightBorderWidth: 2,
                      // don't change color on mouse hover
                      highlightFillColor: function(geo) {
                      return geo['fillColor'] || "#FFF0F2";
                      },
                      // only change border
                      highlightBorderColor: '#ffffff',
                      popupTemplate: function(geo, data) {
                        console.log("data", data)
                        var countryName = "<div class='hoverinfo'>" + geo.properties.name + ":" + "<\div>" + "<br>",
                        footprintValue = "<div class='hoverinfo'>" + Math.round(data.value * 100) / 100 + "<\div>";
                        return countryName + footprintValue;
                      },}
    });
    d3.selectAll("path")
      .on('click', function() {
        console.log(this);
        var className = this.getAttribute("class");
        className = className.slice(-3,);
        console.log(className);
        areaUpdate(className);
      });

      d3.selectAll('#mapHere').on('mouseover', function(info) {
        if (d3.event.target.tagName == "path"){
         //since you want the bubble only
          var className = d3.select(d3.event.target).data()[0].id;
          // console.log(className)
            className = "circle#" + className;
            d3.selectAll(className)
              .style("opacity", 0.3);
        }
      });
      d3.selectAll('#mapHere').on('mouseout', function(info) {
        if (d3.event.target.tagName == "path"){
          //since you want the bubble only
          var className = d3.select(d3.event.target).data()[0].id;
          className = "circle#" + className;
          d3.selectAll(className)
            .style("opacity", 1);
        }
      });
      // .on('mouseover', function() {
      //   var className = this.getAttribute("class");
      //   className = className.slice(-3,);
      //   className = "circle#" + className
      //   d3.selectAll(className)
      //     .style("fill", "pink");
      //   })
      // .on('mouseout', function() {
      //   var className = this.getAttribute("class");
      //   className = className.slice(-3,);
      //   className = "circle#" + className
      //   d3.selectAll(className)
      //     .style("fill", "black");
      // });
      // .on("mouseover", function() {
      //   var allDots = d3.selectAll(".dot");
      //   var className = this.getAttribute("class");
      //   className = className.slice(-3,);
      //   console.log(className)
      //   for (i = 0; i < allDots.length; i++) {
      //     console.log(allDots[i].id)
      //     if (allDots[i].id == className) {
      //       console.log(allDots[i])
      //       // allDots[i].style("fill": "blue")
      //     };
      //   };
      // });


    //   .style("fill", function(d) {
    //     console.log(d.id)
    //     countryCode = d.id;
    //     console.log(selectedData[countryCode])
    //     if (selectedData[countryCode]) {
    //       countryDict = selectedData[countryCode]
    //       return selectedData[countryCode].fillKey;
    //     }
    //     else {
    //       return "#efefef"
    //     }
    //     console.log(countryDict.fillKey)
    //
    //   });
    // console.log(basic_choropleth)

    // add legend for no data
    d3.select("#noDataLegend")
    .append("svg")
    .attr("class", "legendMapSvg")
    .attr("height", "30px")

    d3.select(".legendMapSvg")
            .append("rect")
            .attr("class", "legend")
            .attr("y", 10)
            .attr("x", 3)
            // .attr("height", 15)
            // .attr("width", 30)
            .style("fill", "#FFF0F2");

    d3.select(".legendMapSvg")
            .append("text")
            .attr("class", "mapLegendText")
            .attr("y", 10 + 12)
            .attr("x", 3 + 35)
            .style("font", "15px")
            // .style("font-weight", "bold")
            .text("= No data available");

    sliderUpdate(basic_choropleth, alldata);
};

function sliderUpdate(existingMap, alldata) {
  document.getElementById("slider").addEventListener('input', function(e) {
    var requestedYear = parseInt(e.target.value);
    console.log("map year update?")
    // update the map
    updateMap(existingMap, requestedYear, alldata);

    // // converting 0-23 hour to AMPM format
    // var ampm = hour >= 12 ? 'PM' : 'AM';
    // var hour12 = hour % 12 ? hour % 12 : 12;

    // update text in the UI
    document.getElementById('activeYear').innerText = requestedYear;
    });
};


function colorCode(value) {
  // min en max nodig?
  // dan op basis daarvan percentages verdelen
  var colorScale = d3.scale.linear()
                           .domain([0, 1, 6])
                           .range(["green", "white", "black"]);

  // console.log(color(value))

  var colorValue = colorScale(value);
  return colorValue;

  // if (value < 0.9) {
  //   return "mwah";
  // }
  // else {
  //   return "muchos";
  // };
};

function updateMap(existingMap, requestedYear, alldata) {
  // console.log(requestedYear)
  // console.log(alldata)
  // update color fill of countries based on data selection
  correctYearDict = requestedYear - 1961;


  // console.log(existingMap.data)
  // existingMap.data = alldata[correctYearDict][requestedYear]
  // console.log(existingMap.data)
  existingMap.updateChoropleth(alldata[correctYearDict][requestedYear]);

  // allPaths = d3.selectAll("path")
  //   .style("fill", function(d) {
  //     console.log(this.getAttribute("class"))
  //     currentCountry = this.getAttribute("class")
  //     currentCountry = currentCountry.slice(17,)
  //     console.log(currentCountry)
  //     rightDict = alldata[correctYearDict][requestedYear][currentCountry]
  //     if (rightDict) {
  //       value = rightDict["value"]
  //       // value = rightDict.getAttribute("value")
  //       console.log(value)
  //       color = colorCode(value)
  //       return color
  //     }
  //     else {
  //       return "#fff7fb"
  //     }

      // color = colorCode(value)
      // bepaal welk land door class met subunit name te pakken
      // zoek value in huidige dataselectie voor dat land
      // return colorCode(value)
      // return color
    // })
  // console.log(allPaths)

  return;
};
