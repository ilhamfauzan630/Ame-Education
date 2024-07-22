const routes = (handler) => [
    {
        method: 'POST',
        path: '/api/form',
        handler: (request, h) => handler.postFormHandler(request, h),
    },
    {
        method: 'GET',
        path: '/api/form',
        handler: (request, h) => handler.getFormsHandler(request, h),
    },
    {
        method: 'GET',
        path: '/api/form/{id}',
        handler: (request, h) => handler.getFormByIdHandler(request, h),
    },
    {
        method: 'GET',
        path: '/api/form/user/{userId}',
        handler: (request, h) => handler.getFormByUserIdHandler(request, h),
    },
    {
        method: 'GET',
        path: '/api/form/active',
        handler: (request, h) => handler.getActiveFormsHandler(request, h),
    },
    {
        method: 'GET',
        path: '/api/form/pending',
        handler: (request, h) => handler.getPendingFormsHandler(request, h),
    },
    {
        method: 'PUT',
        path: '/api/form/{id}',
        handler: (request, h) => handler.putFormByIdHandler(request, h),
    },
    {
        method: 'DELETE',
        path: '/api/form/{id}',
        handler: (request, h) => handler.deleteFormByIdHandler(request, h),
    },
];

module.exports = routes;
