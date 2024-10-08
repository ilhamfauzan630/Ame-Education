require('dotenv').config();
const Hapi = require('@hapi/hapi');
const vision = require('@hapi/vision');
const inert = require('@hapi/inert');

// exeptions
const ClientError = require('./exceptions/ClientError');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UserService');
const UsersValidator = require('./validator/users');

// admin
const admin = require('./api/admin');
const AdminService = require('./services/postgres/AdminService');
const AdminValidator = require('./validator/admin');

// login
const login = require('./api/login');
const LoginService = require('./services/postgres/LoginService');
const LoginValidator = require('./validator/login');

// form
const form = require('./api/form');
const FormService = require('./services/postgres/FormService');
const FormValidator = require('./validator/form');

// static
const static = require('./api/static');


const init = async () => {
    const usersService = new UsersService();
    const adminService = new AdminService();
    const loginService = new LoginService();
    const formService = new FormService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: [
                    'http://localhost:3000',
                    'https://ama-education.vercel.app',
                    'https://amaeducation.my.id'
                ],
                additionalHeaders: [
                    'Access-Control-Allow-Origin',
                    'Access-Control-Request-Method',
                    'Allow-Origin',
                    'Origin',
                    'access-control-allow-origin',
                    'access-control-request-method',
                    'allow-origin',
                    'origin',
                ]
            }
        },
    });

    // registrasi plugin eksternal
    await server.register([
        {
            plugin: inert,
        },
        {
            plugin: vision,
        },
        {
            plugin: static,
        },
    ]);

    await server.register([{
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
        {
            plugin: login,
            options: {
                service: loginService,
                validator: LoginValidator,
            },
        },
        {
            plugin: form,
            options: {
                service: formService,
                validator: FormValidator,
            },
        },
        {
            plugin: admin,
            options: {
                service: adminService,
                validator: AdminValidator,
            },
        },

    ]);

    server.ext('onPreResponse', (request, h) => {
        // mendapatkan konteks response dari request
        const {
            response
        } = request;

        if (response instanceof Error) {

            // penanganan client error secara internal.
            if (response instanceof ClientError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message,
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }

            // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
            if (!response.isServer) {
                return h.continue;
            }

            // penanganan server error sesuai kebutuhan
            const newResponse = h.response({
                status: 'error',
                message: response.message,
            });
            newResponse.code(500);
            return newResponse;
        }

        // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
        return h.continue;
    });


    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();