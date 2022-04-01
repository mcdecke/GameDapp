const routes = require('next-routes')();

routes
//new player
.add('/new', '/players/newPlayer')

// existing player - screen w/ monster cards
.add('/:address', '/monsters/monsterView')

//new monster
.add('/:address/new', '/monsters/monsterNew')

// specific monster
.add('/:address/:name', '/monsters/monsterTrain');



module.exports = routes;
