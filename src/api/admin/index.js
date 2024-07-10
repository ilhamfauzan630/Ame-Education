const AdminLoginHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'admin',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const adminLoginHandler = new AdminLoginHandler(service, validator);
        server.route(routes(adminLoginHandler));
    },
};
