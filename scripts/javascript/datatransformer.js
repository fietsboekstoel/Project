// HEADER maken

/** Function reorganises JSONs to dicts that are suitable for the world map
*   visualisation and the scatter plot visualisation.
*/
function dataTransform(extradata, globindexdata, footprintdata){

    // first: data transformation for map data

    mapdata = [];
    scatterDictList = [];
    numberOfCountries = 126;

    // iterate over all years in dataset
    for (year = 1961; year < 2015; year++){
        allCountriesPerYear = {};

        // iterate over all countries in dataset
        for (countryNumber = 0; countryNumber < numberOfCountries; countryNumber++) {
            currentCountryCode = extradata[countryNumber]["Country Code"];
            var totalFootprint;

            // find data point of considered year and country
            for (datapoint = 0; datapoint < footprintdata.length; datapoint++) {
                unit = footprintdata[datapoint];
                if (unit.countryCode == currentCountryCode && unit.year == year) {
                    totalFootprint = unit.totalFootprint;
                    break;
                };
            };

            // create dict for coloring the world map
            allCountriesPerYear[currentCountryCode] = {"fillColor": colorCode(totalFootprint), "value": totalFootprint};
        };
        yearDict = {};
        yearDict[year] = allCountriesPerYear;

        // collect all color dicts
        mapdata.push(yearDict);
    };

    // then: data transformation for scatter plot data

    // iterate over all years in dataset
    for (year = 1961; year < 2015; year++) {
        scatterYearDict = {};

        // iterate over all countries in dataset
        for (countryNumber = 0; countryNumber < numberOfCountries; countryNumber++) {
            globInd = null;

            // find data point for this year and country in file
            currentCountryCode = extradata[countryNumber]["Country Code"];

            // select values for most x-axis variables
            agriLand = extradata[countryNumber][year];
            assistance = extradata[countryNumber + numberOfCountries][year];
            livestock = extradata[countryNumber + 2 * numberOfCountries][year];
            population = extradata[countryNumber + 3 * numberOfCountries][year];

            // select values for footprint, country name and country code
            for (datapoint = 0; datapoint < footprintdata.length; datapoint++) {
                unit = footprintdata[datapoint];
                if (unit.countryCode == currentCountryCode && unit.year == year) {
                    totalFootprint = unit.totalFootprint;
                    countryName = unit.countryName;
                    countryCode = unit.countryCode;
                    break;
                };
            };

            // select value for last x-axis variable
            for (datapoint = 0; datapoint < globindexdata.length; datapoint++) {
                unit = globindexdata[datapoint];
                if (unit.countryCode == currentCountryCode && unit.year == year) {
                    globInd = unit.KOFGI;
                    break;
                };
            };

            // create new dict with all selected values
            subDict = {"agriLand": agriLand,
                       "assistance": assistance,
                       "livestock": livestock,
                       "population": population,
                       "globInd": globInd,
                       "footprint": totalFootprint,
                       "countryName": countryName,
                       "countryCode": countryCode};

            // add dict to dict per year
            scatterYearDict[currentCountryCode] = subDict;
        };

        // collect all years
        scatterPerYearDict = {};
        scatterPerYearDict[year] = scatterYearDict;
        scatterDictList.push(scatterPerYearDict);
    };
    return [mapdata, scatterDictList];
};
