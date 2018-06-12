// HEADER maken

// year is nu een woord
// functie van die value ipv alleen value voor de fillkey
// nu is het een string en niet een object?

function colorCode(value){
  return value
}

function dataTransform(extradata, globindexdata, footprintdata){
  // extradata = allextravariables.json
  // footprintdata = footprintdetails.json
  // globindexdata = globalisationindex.json

  console.log(extradata)
  console.log(footprintdata)
  console.log(globindexdata)

  mapdata= []
  string = "{"
  numberOfCountries = 127
  // console.log(footprintdata.length)
  for (year = 1961; year < 2016; year++){
    currentYear = year
    for (countryNumber = 0; countryNumber < numberOfCountries; countryNumber++) {
      currentCountryCode = extradata[countryNumber]["Country Code"]
      // console.log(currentCountryCode)
      // console.log(year)
      for (datapoint = 0; datapoint < footprintdata.length; datapoint++) {
        unit = footprintdata[datapoint]
        // console.log(unit)
        // console.log(unit.countryCode)
        if (unit.countryCode == currentCountryCode && unit.year == year) {
          // console.log(unit.totalFootprint)
          totalFootprint = unit.totalFootprint
          break
        }
      }
      string = string + currentCountryCode + " : {fillkey : " + colorCode(totalFootprint) + "}"
      if (countryNumber < numberOfCountries - 1){
        string = string + ", "
      }
      else {
        string = string + "}"
      }
    }
    yearDict = {year : string}
    mapdata.push(yearDict)
  }
  console.log(mapdata)
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
  dataperyear = 1
  datapercountry = 2
  return dataperyear,datapercountry
  }
