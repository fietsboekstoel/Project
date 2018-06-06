# Design:
## File overview:
- project.html
- main.js
- dataLoader.js
- dataSelect.js
- mapMaker.js (als het te groot wordt, splitsen in mapMaker en mapHelper)
- scatterMaker.js (als het te groot wordt, splitsen in scatterMaker en scatterHelper)
- lineMaker.js (als het te groot wordt, splitsen in lineMaker en lineHelper)

## Files in detail:
### project.html
- d3 (met tip en queue) importeren
- bootstrap importeren
- indeling pagina bepalen obv divs mbv bootstrap (zoals gedaan in linked views opdracht van Data processing)
- slider toevoegen voor updaten van map en scatter
- buttons toevoegen voor verschillende y-variabelen in scatter
- navigatiebalk toevoegen met link naar data source en verschillende tabs voor informatieve homepage en pagina met grafieken?

### main.js
- onload functie zodat geheel pas verschijnt als alles geladen is
- data inladen mbv aanroepen dataloader.js
- map aanmaken mbv map.js
- scatter plot aanmaken mbv scatter.js
- filled line graph maken mbv line.js
- aanroepen van updatefuncties bij klikken/sliden

### dataLoader.js
- error check niet vergeten
- alleen punten meenemen waarvan geen data missen? (zowel wat betreft jaar als andere variabelen)
- data importeren
  * footprint = API te downloaden als JSON (1961-2014) van ruim 200 landen --> functie schrijven die per land reduceert tot dict met nodige variabelen (of proberen het geheel als 1 API te downloaden)
  * Extra variabelen = csv per variabele (?) (min 1970 - max 2014) --> convert to JSON zoals bij Data processing week 3
- welk format heb ik nodig voor map maken?
- dict maken per land voor scatter
- dict maken per land/per subvariabele voor filled line graph

### dataSelect.js
- aan te roepen door main/mapMaker/scatterMaker/lineMaker
- selecteert de te gebruiken selectie aan data obv aangeklikte buttons/landen of gesleepte slider

### mapMaker.js ("(u)" = te veranderen bij update)
- functie om map te maken (nog nooit gedaan dus nog niet helemaal uit)
- kleurenrange om mee te vullen
- functie om map te kleuren obv dataselectie adhv kleurenrange (u)
- eerste jaar als beginpunt nemen?

### scatterMaker.js ("(u)" = te veranderen bij update)
- svg aanmaken
- titel (aan te passen obv current jaar) (u)
- margins bepalen
- x-as blijft hetzelfde (=footprint)(zodat je verschillen tussen jaren goed kan zien verschuiven)
- y-as domain bepalen obv aangeklikte selectie (u)
- assenfuncties, assentitels en assen tekenen (u: y-as en functie en label daarvan)
- variabele als default kiezen?
- datapunten toevoegen obv selectie (u)
- tooltip toevoegen obv selectie (u)
- info/beschrijving/references bij grafiek toevoegen?

### lineMaker.js ("(u)" = te veranderen bij update)
- svg aanmaken
- titel (aan te passen obv current land) (u)
- margins bepalen
- x-as blijft hetzelfde (=jaren)
- y-as blijft ook hetzelfde (=aantal 'earths')
- assenfuncties, assentitels en assen tekenen
- variabele als default kiezen? data voor de hele wereld samen? zorgen dat dat ook weer aan te klikken is?
- kleurenrange vaststellen
- lijnen toevoegen obv selectie (u)
- tooltip toevoegen obv selectie (u)
- area onder de lijnen inkleuren obv values adhv kleurenrange
- info/beschrijving/references bij grafiek toevoegen?


## Verdere ideeën etc:
- Slider ook kleuren of met blije en boze smiley maken oid obv de values in dat jaar (omdat het in z'n geheel allemaal steeds meer verslechtert)
- In de scatter: alle punten voor dat jaar in heel lichtgrijs in de graph zetten en dan het huidige punt in een duidelijke kleur, zodat je trends eventueel ook kan zien (maar ligt eraan hoeveel punten er dan in de grafiek staan).
- Instructies voor gebruik ook als tab/tooltip/menu om ruimte te besparen.

## Eerste grote stappen:
- Uitvinden hoe je een map maakt en wat je daarvoor nodig hebt qua dataformat
- Data importeren
- Bedenken hoe om te gaan met missing data

## Later niet vergeten:
- Handige/leuke plek vinden om datasets etc te referencen
- Mooie overgangen maken
- Elke dag pushen
