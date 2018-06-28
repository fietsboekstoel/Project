# Report:
My application contains a world map, a scatter plot and a stacked area graph.
The map is color coded based on national ecological footprint.
The scatter plot visualizes the relation between ecological footprint and other variables.
The stacked area graph visualizes how several components contributed to the ecological footprint over time.

![](doc/eerstevisualisatie.png)

![](doc/tweedevisualisatie.png)

![](doc/derdevisualisatie.png)

## Technical design:
### Data conversion and transformation:
By means of convertCSV2JSON.py (in folder scripts/python) CSV's are converted into JSON files (all of these files are in the data folder).
Later on, datatransformer.js transforms the JSON's to suitable dictionary formats for the map and scatter plot visualisations.

### Files:
Main.js (in folder scripts/javascript) loads data and calls on the following other files:
- datatransformer.js (see Data conversion and transformation)
- mapmaker.js: draws and updates the world map visualisation
- scattermaker.js: draws and updates the scatter plot visualisation
- areamaker.js: draws and updates the stacked area visualisation

Furthermore, (in scripts/css) a style document footprint.css is included, as well as an html file index.html that contains several interactive html elements and the basic lay out of the page.

### Links/interaction:
- Slider: The basis of the slider is included in the html. The functions that make sure the slider updates the map and the scatter plot can be found in mapmaker.js and scattermaker.js, respectively.
- Dropdown: The basis of the dropdown menu is included in the html. The function that makes sure the scatter plot updates based on the chosen dropdown option is included in scattermaker.js.
- Clicking on a country in the map or the scatter plot will update the stacked area graph (initially displaying data for the whole world) with data for that specific country.
- Hovering over a country in either the map or the scatter plot will cause that country to light up in the other visualisation.

### Functions per file:
#### main.js:
- window.onload function
- transformData: function for organizing data returned by queue and calling functions for drawing visualisations
#### datatransformer:
- dataTransform: converts standars JSONs (converted from CSV) to more practical dictionaries
#### mapmaker.js:
- mapMaker: draws initial color coded map for first year in dataset (by means of datamaps)
- colorCode: converts footprint value to color value for map
- sliderUpdate: calls to update map with correct data selection when slider is used
- updateMap: updates values and color coding of map
#### scattermaker.js:
- scatterMaker: calls to draw initial scatter plot for first year in dataset with agricultural land as x-axis variable.
- drawScatter: actually draws first complete scatter plot
- calculateMinMax: calculates suitable domain based on selected x-axis variable
- scatterOptions: calls to update scatter plot based on change in selected variable from dropdown menu
- scatterSliderUpdate: calls to update scatter plot based on change in selected year from slider
- updateScatter: actually updates x-axis, datapoints and title of scatter plot
#### areamaker.js:
- areaMaker: draws stacked area graph
- areaUpdate: removes current area graph and calls areaMaker again
- areaLegendMaker: draws legend for stacked area graph
#### index.html: (contains elements)
- navigation bar with buttons
- information (text)
- map legend
- slider basis
- dropdown basis
- extra supersecret button

## Challenges:
- Data over ontwikkelingshulp: in eerste instantie wilde ik graag als een van de extra variabelen voor de scatter plot data hebben over ontwikkelingshulp, omdat ik dacht dat dat ook verband zou kunnen houden met de voetafdruk van landen. De data die ik had gevonden bleek echter nogal nietszeggend te zijn omdat het waardes bleek te bevatten van hoeveel een land dat jaar als lening had gekregen en niks over de totale lening van een land. Daar kwam ik helaas pas deze week achter en daarom heb ik die variabele eruit gehaald. Wel heb ik met de variabelen "population density" en "globalisation" twee variabelen die ook op maatschappelijk gebied samenhangen met de ecologische voetafdruk.

- X vs Y as: Eerst wilde ik in mijn scatter plot de ecologische voetafdruk op de x-as zetten en de te kiezen variabelen op de y-as. Dat leek mij intuitief het meest logisch omdat de x-as dan niet zou veranderen. Vanwege de spreiding van de data en de verhoudingen van mijn beeldscherm zag dat er alleen niet heel goed en duidelijk uit. Om die esthetische reden heb ik gekozen om het om te draaien: de voetafdruk op de y-as en de andere variabelen op de x-as.

- Kleurenrange wereldkaart: Ik heb lang gedaan over het vinden van een geschikte set aan kleuren om zowel een overschot("goed") als een tekort("slecht") weer te geven met een bepaalde kleur als middelpunt daartussen, en ook nog een duidelijke kleur te hebben voor landen waarvoor data ontbrak. Voor de ontbrekende data wil je een kleur kiezen die wel verschilt van de rest maar niet te opvallend is zodat het niet alle aandacht direct opeist (aangezien die landen verder geen informatie bevatten). Verder wil je voor de kleurenrange kleuren kiezen die het liefst ook nog intuitief goed en slecht representeren, zoals groen en rood, maar die zijn dan weer niet kleurenblindvriendelijk.
Uiteindelijk heb ik gekozen voor een range van groen via wit naar zwart, en lichtroze voor de ontbrekende data.

- In eerste instantie leek het me mooi en duidelijk om tegelijk de kaart en de scatter plot te kunnen zien veranderen op basis van de slider. Helaas bleek dat niet binnen het scherm te passen omdat dan de meeste landen zo klein zouden worden dat de kaart weinig informatief meer zou zijn. Daarom heb ik uiteindelijk besloten om de pagina zo in te delen dat je de hele kaart met info, legenda en slider in een keer kunt bekijken, en als je daarna naar beneden scrollt de hele scatter plot met dropdown menu en de slider erbij in een keer kunt bekijken. Bij het klikken op 1 van die 2 visualisaties scrollt de pagina vanzelf naar de derde visualisatie die daar ook weer beeldvullend is inclusief legenda.

- Alle gedownloade data handig samenvoegen heeft me helaas vrij veel tijd gekost. In het vervolg zou ik misschien kiezen voor een grote dataset waar alles in staat en die in een keer te gebruiken is. Daarna is op tijd klaar zijn denk ik mijn grootste challenge gebleven.
