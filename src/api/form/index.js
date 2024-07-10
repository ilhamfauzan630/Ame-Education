const FormHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'form',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const formHandler = new FormHandler(service, validator);
        server.route(routes(formHandler));
    },
};
