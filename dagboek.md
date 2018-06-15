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

## To do:
- missing data opvangen
- min en max overal bepalen voor range van assen etc (rekening houden met missing data die meegenomen wordt als "0")
- update functie voor scatterplot op een handige plek
