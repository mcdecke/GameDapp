const routes = require('next-routes')();

routes
//new monster
.add('/new', '/new')
//existing monster
.add('/:address', '/monsters/monster');

module.exports = routes;
