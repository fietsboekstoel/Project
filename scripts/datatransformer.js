// HEADER maken

// newmapdata = []
// for (i = 0; i < mapdata.length; i++){
//   console.log(mapdata[i])
//   newmapdata.push(JSON.parse( '"' + mapdata[i]) + '"')
// }
// console.log(newmapdata)
// mapdata = JSON.parse(mapdata)
// return [mapdata, scatterdata, linedata]

// // convert to per year
// // nu: [{},{},{}]
// // to do:
// {"1960" : {"AFG" : {"totalFootprint" : value,
//                 "globIndex" : value,
//                 "agriLand" : value,
//                 "assistance" : value,
//                 "livestock" : value,
//                 "population" : value}},
//         {"ALB" : {
//
//                 }}
// },
// {"1961" : {"AFG" : {
//
//                 }}
// }
//
// // voor de map:
// function colorCode(value){
//   if not value {
//     return default kleur
//   }
//   if (value > 0.5) {
//     return "#efefef"
//   }
//   else {
//     return "#ff0000"
//   }
// }
// "data" : {"1960" :
//             {"AFG" : {"fillkey" : colorCode(1960.AFG.totalFootprint)}},
//             {"ALB" : {"fillkey" : colorCode(1960.ALB.totalFootprint)}}
// }
//
//
// arrayPerYear = []
// yearToFill = json[0].year
// for (dict in jsonfile) {
//   if (dict.year == yearToFill) {
//
//   }
// }
// // je wil dat je data.1960 aanroept en op basis daarvan de kaart kleurt?
//
//
// dataperyear = 1
// datapercountry = 2


function dataTransform(extradata, globindexdata, footprintdata){

  // MAP PART

  mapdata= []
  scatterDictList = []

  // allCountriesPerYear = {}
  numberOfCountries = 127

  for (year = 1961; year < 2015; year++){
    allCountriesPerYear = {}


    for (countryNumber = 0; countryNumber < numberOfCountries; countryNumber++) {
      currentCountryCode = extradata[countryNumber]["Country Code"];
      var totalFootprint;

      for (datapoint = 0; datapoint < footprintdata.length; datapoint++) {
        unit = footprintdata[datapoint];

        if (unit.countryCode == currentCountryCode && unit.year == year) {
          totalFootprint = unit.totalFootprint;
          // console.log(colorCode(totalFootprint))
          break;
        };
      };
      allCountriesPerYear[currentCountryCode] = {"fillKey": colorCode(totalFootprint), "value": totalFootprint};
    };
    yearDict = {};
    yearDict[year] = allCountriesPerYear;
    mapdata.push(yearDict);
  };
  console.log(mapdata);


  // SCATTER PART

  // missing data!!

for (year = 1961; year < 2015; year++) {
  scatterYearDict = {}
  scatterYearDict[year] = {}
  currentDict = scatterYearDict

  for (countryNumber = 0; countryNumber < numberOfCountries; countryNumber++) {
    globInd = null

    currentCountryCode = extradata[countryNumber]["Country Code"]
    // console.log(currentCountryCode)

    // console.log(scatterDict)

    agriLand = extradata[countryNumber][year]
    // console.log(agriLand)

    assistance = extradata[countryNumber + numberOfCountries][year]
    // console.log(assistance)

    livestock = extradata[countryNumber + 2 * numberOfCountries][year]
    // console.log(livestock)

    population = extradata[countryNumber + 3 * numberOfCountries][year]
    // console.log(livestock)

    for (datapoint = 0; datapoint < footprintdata.length; datapoint++) {
      unit = footprintdata[datapoint]

      if (unit.countryCode == currentCountryCode && unit.year == year) {
        totalFootprint = unit.totalFootprint
        // console.log(colorCode(totalFootprint))
        break
      }
    }
    for (datapoint = 0; datapoint < globindexdata.length; datapoint++) {
      unit = globindexdata[datapoint]
      // console.log(unit)
      if (unit.countryCode == currentCountryCode && unit.year == year) {
        globInd = unit.KOFGI
        // console.log(globInd)
        break
      }
    }
  subDict = {"agriLand": agriLand,
             "assistance": assistance,
             "livestock": livestock,
             "population": population,
             "globInd": globInd,
             "footprint": totalFootprint}
  // console.log(scatterYearDict)
  // console.log(scatterYearDict[year])
  // console.log(year)
  currentDict[currentCountryCode] = subDict
  // console.log(scatterYearDict)

  }
  scatterDictList.push(scatterYearDict)
}
console.log(scatterDictList)



  return [mapdata, scatterDictList]
}
