const routes = (handler) => [
    {
        method: 'POST',
        path: '/form',
        handler: (request, h) => handler.postFormHandler(request, h),
    },
    {
        method: 'GET',
        path: '/form',
        handler: (request, h) => handler.getFormsHandler(request, h),
    },
    {
        method: 'GET',
        path: '/form/{id}',
        handler: (request, h) => handler.getFormByIdHandler(request, h),
    },
    {
        method: 'GET',
        path: '/form/user/{userId}',
        handler: (request, h) => handler.getFormByUserIdHandler(request, h),
    },
    {
        method: 'PUT',
        path: '/form/{id}',
        handler: (request, h) => handler.putFormByIdHandler(request, h),
    },
    {
        method: 'DELETE',
        path: '/form/{id}',
        handler: (request, h) => handler.deleteFormByIdHandler(request, h),
    },
];

module.exports = routes;
