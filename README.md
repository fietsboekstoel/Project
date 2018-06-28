[Pages](https://fietsboekstoel.github.io/Project/)

# Rebecca's Programmeerproject

## Inhoud:
Het doel van mijn project is het visualiseren van nationale ecologische voetafdrukken en het verband daarvan met verschillende andere variabelen.
Die ecologische voetafdruk wordt uitgedrukt in aantal aardbollen. De daadwerkelijke capaciteit van de aarde is 1 aardbol. Daarom zijn landen die een voetafdruk van lager dan 1 hebben (groen tot wit gekleurd) aan het consumeren en produceren onder de capaciteit van de aarde. Landen die consumeren en produceren boven de capaciteit van de aarde ( wit tot zwart gekleurd) zijn middelen zoals grondstoffen en dergelijke op een hoger tempo aan het verbruiken dan ze weer aangevuld kunnen worden.

Daarvoor zijn er verschillende visualisaties aanwezig op mijn pagina:
- een wereldkaart
- een scatter plot
- een stacked area graph

### Wereldkaart:
De landen op de wereldkaart hebben een kleur gekregen op basis van hun ecologische voetafdruk (zie legenda). Hoveren met de muis over landen geeft de naam van het land en de exacte waarde van de voetafdruk weer. De pagina opent met de kaart ingekleurd voor het jaar 1961, met de slider onder de kaart kun je kijken hoe de voetafdruk van landen zich ontwikkelt tussen 1961 en 2014. Als je klikt op een land scrollt de pagina naar beneden zodat je de stacked area graph van dat land kunt bekijken.

### Scatter plot:
De scatter plot laat een punt per land zien, waarbij de y-as wederom de ecologische voetafdruk van dat land representeert, en de x-as bij het openen van de pagina het percentage landbouwgrond van een land. Ook bij de scatter plot kun je data door de jaren heen bekijken door het verschuiven van de slider. Ook kun je in plaats van percentage landbouwgrond als x-as variabele kiezen voor populatiedichtheid, veeproductie of globalisatiegraad.

## Structuur:
Met behulp van convertCSV2JSON.py (uit scripts/python) worden CSV's omgezet naar JSON files. Al deze files staan in de map "data".
Main.js (in de map scripts/javascript) laadt data in en roept de volgende andere files aan:
- datatransformer.js: maakt van de JSON's handige dictionary formats voor de verschillende visualisaties.
- mapmaker.js: maakt en update de landkaarttvisualisatie
- scattermaker.js: maakt en update de scatterplotvisualisatie
- areamaker.js: maakt en update de stacked-area-graphvisualisatie
Verder staat er (in scripts/css) een styledocument footprint.css, en bevat index.html enkele interactieve html-elementen en de basislay-out van de pagina.
