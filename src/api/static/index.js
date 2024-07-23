const StaticHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'static',
    version: '1.0.0',
    register: async (server) => {
        const usersHandler = new StaticHandler();
        server.route(routes(usersHandler));
    },
};
