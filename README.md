[Pages](https://fietsboekstoel.github.io/Project/)

# Rebecca's Programmeerproject

## Inhoud:
Het doel van mijn project is het visualiseren van nationale ecologische voetafdrukken en het verband daarvan met verschillende andere variabelen.
Die ecologische voetafdruk wordt uitgedrukt in aantal aardbollen. De daadwerkelijke capaciteit van de aarde is 1 aardbol. Daarom zijn landen die een voetafdruk van lager dan 1 hebben (groen gekleurd) aan het consumeren en produceren onder de capaciteit van de aarde. Landen die consumeren

Daarvoor zijn er verschillende visualisaties aanwezig op mijn pagina:
- een wereldkaart
- een scatterplot
- een stacked area graph

### Wereldkaart:
De landen op de wereldkaart hebben een kleur gekregen op basis van hun ecologische voetafdruk.

## Structuur:
Met behulp van convertCSV2JSON.py (uit scripts/python) worden CSV's omgezet naar JSON files. Al deze files staan in de map "data".
Main.js (in de map scripts/javascript) laadt data in en roept de volgende andere files aan:
- datatransformer.js: maakt van de JSON's handige dictionary formats voor de verschillende visualisaties.
- mapmaker.js: maakt en update de landkaarttvisualisatie
- scattermaker.js: maakt en update de scatterplotvisualisatie
- areamaker.js: maakt en update de stacked-area-graphvisualisatie
Verder staat er (in scripts/css) een styledocument footprint.css, en bevat index.html enkele interactieve html-elementen en de basislay-out van de pagina.
