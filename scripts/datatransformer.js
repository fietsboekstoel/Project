// HEADER maken

function dataTransform(extradata, globindexdata, footprintdata){

  // MAP PART

  mapdata= [];
  scatterDictList = [];

  // allCountriesPerYear = {}
  numberOfCountries = 126;

  for (year = 1961; year < 2015; year++){
    allCountriesPerYear = {};


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
      allCountriesPerYear[currentCountryCode] = {"fillColor": colorCode(totalFootprint), "value": totalFootprint};
    };
    yearDict = {};
    yearDict[year] = allCountriesPerYear;
    mapdata.push(yearDict);
  };
  console.log(mapdata);


  // SCATTER PART

  // missing data!!

for (year = 1961; year < 2015; year++) {
  scatterYearDict = {};
  // scatterYearDict[year] = {}
  // currentDict = scatterYearDict[year]
  // console.log(currentDict)

  for (countryNumber = 0; countryNumber < numberOfCountries; countryNumber++) {
    globInd = null;

    currentCountryCode = extradata[countryNumber]["Country Code"];
    // console.log(currentCountryCode)

    // console.log(scatterDict)

    agriLand = extradata[countryNumber][year];
    // console.log(agriLand)

    assistance = extradata[countryNumber + numberOfCountries][year];
    // console.log(assistance)

    livestock = extradata[countryNumber + 2 * numberOfCountries][year];
    // console.log(livestock)

    population = extradata[countryNumber + 3 * numberOfCountries][year];
    // console.log(livestock)

    for (datapoint = 0; datapoint < footprintdata.length; datapoint++) {
      unit = footprintdata[datapoint];

      if (unit.countryCode == currentCountryCode && unit.year == year) {
        totalFootprint = unit.totalFootprint;
        countryName = unit.countryName;
        countryCode = unit.countryCode;
        // console.log(colorCode(totalFootprint))
        break;
      };
    };
    for (datapoint = 0; datapoint < globindexdata.length; datapoint++) {
      unit = globindexdata[datapoint];
      // console.log(unit)
      if (unit.countryCode == currentCountryCode && unit.year == year) {
        globInd = unit.KOFGI;
        // console.log(globInd)
        break;
      };
    };
    subDict = {"agriLand": agriLand,
               "assistance": assistance,
               "livestock": livestock,
               "population": population,
               "globInd": globInd,
               "footprint": totalFootprint,
               "countryName": countryName,
               "countryCode": countryCode};
    // console.log(scatterYearDict)
    // console.log(scatterYearDict[year])
    // console.log(year)
    scatterYearDict[currentCountryCode] = subDict;
    // console.log(currentDict)
    // console.log(scatterYearDict)
    // scatterDictList[year] = currentDict
    // console.log(scatterDictList);
  };
  scatterPerYearDict = {};
  // console.log(year)
  scatterPerYearDict[year] = scatterYearDict;
  scatterDictList.push(scatterPerYearDict);

}
console.log(scatterDictList)



  return [mapdata, scatterDictList];
}
