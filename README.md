# tales-at-home

## setup
1. .ENV file toevoegen
2. yarn (om alle packages te installeren)
3. terminal commando : mongod (database runt in achtergrond)
4. terminal commando : yarn run development
5. surf naar localhost:3000


## front-end
Voor de front-end werken we met css ipv sass. We kunnen wel extra functionaliteiten toevoegen via post css. Op dit moment zijn volgende postcss uitbreidingen toegevoegd:

1. postcss-nested : https://github.com/postcss/postcss-nested
2. postcss-variables: https://www.npmjs.com/package/postcss-variables = ? https://github.com/postcss/postcss-simple-vars
3. postcss-mixins: https://github.com/postcss/postcss-mixins

Om extra's toevoegen, de plugin toevoegen via yarn en de postcss.config.js aanvullen.

## back-end
Om models toe te voegen moet je ingelogd zijn als admin. Die token kun je gebruiken om models toe te voegen of aan te passen.
email: talesathome@gmail.com
pass: talesathome

De token kun je krijgen door in postman te surfen naar http://localhost:3000/api/auth . Userinfo invullen bij body en een extra veld audience toevoegen. Value van audience is tales-at-home.

Om models toe te voegen doe je post naar  http://localhost:3000/api/models met in headers Authorization. Value = Bearer admin-token .
Velden voor models: name (string), image (string), description (string), themes (array, niet verplicht, kan achteraf). Om een array toe te voegen moet je bij je body voor raw kiezen en json formaat toevoegen.
Op diezelfde manier kun je ook een put doen om dingen aan te passen.
Als het niet direct lukt > vraag voor screenshots
