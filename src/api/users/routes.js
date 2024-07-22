const routes = (handler) => [
    {
        method: 'POST',
        path: '/api/users',
        handler: (request, h) => handler.postUserHandler(request, h),
    },
    {
        method: 'GET',
        path: '/api/users/{id}',
        handler: (request, h) => handler.getUserByIdHandler(request, h),
    },
];

module.exports = routes;
