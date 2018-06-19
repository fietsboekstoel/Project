// titel
// legenda
// colorfunction verbeteren
// update werkt nog niet
// highlight kleur dezelfde kleur?
// tooltip aanvullen

function mapMaker(alldata) {
  startYear = 1961;
  selectedData = alldata[0][startYear];
  // keyArray = Object.keys(selectedData)
    var basic_choropleth = new Datamap({
    element: document.getElementById("mapHere"),
    projection: "mercator",
    fills: {defaultFill: "#efefef"},
            // fillColor: function(d) {
            //   return colorCode(d)
            // }},
    data: selectedData,
    geographyConfig: {borderColor: '#DEDEDE',
                      highlightBorderWidth: 2,
                      // don't change color on mouse hover
                      highlightFillColor: function(geo) {
                      return geo['fillKey'] || '#fa9fb5';
                      },
                      // only change border
                      highlightBorderColor: '#B7B7B7'}
    });
    d3.selectAll("path")
      .style("fill", function(d) {
        console.log(d.id)
        countryCode = d.id;
        console.log(selectedData[countryCode])
        if (selectedData[countryCode]) {
          countryDict = selectedData[countryCode]
          return selectedData[countryCode].fillKey;
        }
        else {
          return "#efefef"
        }
        console.log(countryDict.fillKey)

      });
    // console.log(basic_choropleth)
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
                           .domain([0, 1, 11])
                           .range(["green", "white", "red"]);

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
