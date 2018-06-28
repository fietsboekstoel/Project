# Lief dagboek:
## 7 juni 2018:
### Gedaan:
- csv’s voor footprint per land geselecteerd voor alle grafieken (omdat het niet in z'n geheel van de website te downloaden was)
- csv's voor footprint per jaar geselecteerd
- globalisation index: landen erin gesynchroniseerd met overige csv’s

### Gepland:
- de csv's van de andere extra variabelen synchroniseren met de footprint csv's
- missing data signaleren en verwerken
- landcodes voor alle landen toevoegen voor het maken van de landkaart
- alle csv's JSONifyen

## 8 juni 2018:
### Gedaan:
- verder gewerkt aan csv's
- format gekozen:
  Map & Scatter: per jaar -> per land -> totaalvalue footprint + alle andere extra variabelen
  Line: per land -> per jaar -> totaalvalue footprint + subvalues footprint

### Gepland:
- csv verwerken afmaken
- landcodes toevoegen
- missing data signaleren en verwerken

## 11 juni 2018:
### Gedaan:
- verder gewerkt aan csv's

### Gepland:
- csv's eindelijk eens af hebben
- landcodes van 2 naar 3 letters
- missing data signaleren en verwerken

## 12 juni 2018:
### Gedaan:
- csv's afgemaakt
- landcodes toegevoegd
- json's gemaakt van de csv's (3 stuks, namelijk: 1) alle footprint data, 2) alle extra variabelen behalve de globalisatiegraad, en 3) de globalisatie data)
- inventarisatie over het maken van een kaart

### Gepland:
- de JSON's transformeren naar logische indeling voor de verschillende visualisaties
- kleurfunctie voor kaart schrijven/vinden
- kaart maken

## 13/14/15 juni 2018: (13 vergeten te pushen, 14 ook vergeten te pushen door de hackathon)
### Gedaan:
- JSON's gebruikt om de juiste data te isoleren voor de map
- Kaart gemaakt
- Slider gemaakt en aan kaart gekoppeld
- JSON's gebruikt om de juiste data te isoleren voor de scatterplot
- eindje gekomen met de scatterplot

### Gepland:
- scatterplot afmaken
- knoppen maken om verschillende variabelen op de y-as te kunnen laten zien
- knoppen koppelen aan update functie van scatterplot

## 18 juni 2018:
### Gedaan:
- Eerste versie basis scatter af
- gewerkt aan indeling pagina
- inventarisatie gedaan voor stacked area graph voor planning

### Gepland:
- update functie scatterplot
- knoppen koppelen aan update

## 19 juni 2018:
### Gedaan:
- Map colorCode
- Dropdown voor y-as variabelen vd scatter
- update scatter (en map) bijna helemaal werkend
- lay-out van de pagina iets verbeterd

### Gepland:
- waar voeg ik die colorCode toe in het aanmaken van de map?
- update helemaal werkend krijgen
- verder aan area/line graph
- kleurenfunctie verbeteren

## 20 juni 2018:
### Gedaan:
- colorcoding vd map
- updates werkend
- area graph afgemaakt
- area graph interactie werkend

## 21 en 22 juni 2018 (21 vergeten te updaten):
### Gedaan:
- na een hoop gedoe m'n tooltips beter werkend gekregen
- oplichtende dots in de scatter plot obv hoveren over kaart
- y-as kloppend
- kleurfunctie verbeterd
- beginnetje gemaakt met missing data ondervangen

### Gepland:
- na het weekend alle puntjes op de to-do lijst afwerken

## 25 juni 2018:
### Gedaan:
- oplichtend land obv hoveren over scatter dot
- titel scatter plot
- bezig met astitels etc stacked area graph
- bezig met lay out van pagina
- bezig met y-as probleempjes van de scatter

### Gepland:
- verder met To Do list

## 26 juni 2018:
### Gedaan:
- kleuren area graph aangepast op inhoud
- astitels bij area graph
- mededeling dat er geen detaildata is voor sommige landen toegevoegd
- grafiektitel map

### Gepland:
- grafiektitel area graph mee laten veranderen
- geen data mededeling voor landen die uberhaupt geen data hebben
- rest van to do lijst

## 27 juni 2018:
### Gedaan:
- missing data gecoverd
- legenda's aangevuld
- tooltips aangepast
- y en x as omgedraaid
- assen mooier gemaakt
- assistance weggedaan als variabele
- titels toegevoegd
- assen toegevoegd
- komma's uit de tick labels
- lay out pagina verbeterd

### Gepland:
- rest van de to-do list

## To do:
### Belangrijk:
-	bug verkeerd land eruit

###	Map:

###	Scatter:
-	Lijntjes bij tooltip?
-	scatterArrays functie eruit?


###	Line/stacked area:
-	Legenda aanpassen als totaal splitsen niet meer lukt
-	Updatefunctie verbeteren
-	Wanneer geen data alleen totaal aangeven

###	Verder:
- outliers weghalen?
-	Dingen “waar nodig” doen met switch
-	Slider mooier
-	Alles mooier
-	Tabs?
-	Data sources toevoegen
-	Filenames github
-	Informatieve tekst toevoegen
1. relevantie
2. gebruikte concepten
3. eenheden

Planning donderdag:
1 uur no data error en totaalvalue splitsen
1 uur lay out verbeteren (navbar, scroll, afbeeldingen)
1 uur info + buttons
1 uur verdere Dingen (crosshairs, map tooltip, onhover opacity veranderen in onclick kleur met herstellen bij nieuwe klikken of updaten (+ error met no data for this country for this variable and/or year) tooltip/crosshairs stackes area)
1 uur report
1 uur github etc

Vragen:
- bug Bahamas
- tooltip map geen data
