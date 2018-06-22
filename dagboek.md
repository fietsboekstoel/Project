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

## To do:
### Belangrijk:
-	Wat te doen met missing data?

###	Map:
-	titel
-	Locatie
-	Kleurfunctie
-	highlightkleur
-	legenda
-	tooltip aanvullen

###	Scatter:
-	Y values correct
-	Y-as label locatie
-	Assen + 1 vanwege ticks (hardcoden?)
-	Loga as?
-	Dingen “waar nodig” doen met switch?
-	Tooltip aanvullen & locatie
-	Lijntjes bij tooltip
-	Koppelen aan land op map
-	scatterArrays functie eruit?
-	Negatieve waarden voor development assistance

###	Line/stacked area:
-	Astitels
-	Titel
-	Legenda (en woorden eruit)
-	Komma’s uit de tic labels
-	Updatefunctie verbeteren
-	Kleuren anders?
-	Wanneer geen data alleen totaal aangeven

###	Verder:
- outliers weghalen?
-	Slider mooier
-	Alles mooier
-	Tabs?
-	Data sources toevoegen
-	Filenames github
-	Informatieve tekst toevoegen
1. relevantie
2. gebruikte concepten
3. eenheden
