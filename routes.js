const routes = require('next-routes')();

routes
//new player
.add('/new', '/players/newPlayer')
// existing player - screen w/ monster cards

//existing monster
.add('/:address', '/monsters/monsterView')
//new monster
.add('/:address/new', '/monsters/monsterNew');

module.exports = routes;
