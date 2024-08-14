const routes = require('./routes');

module.exports = {
    name: 'static',
    version: '1.0.0',
    register: async (server) => {
        server.route(routes());
    },
};
