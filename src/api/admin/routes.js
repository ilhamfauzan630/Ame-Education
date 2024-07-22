const routes = (handler) => [
    {
        method: 'POST',
        path: '/api/admin',
        handler: (request, h) => handler.postAdminHandler(request, h),
    },
    {
        method: 'GET',
        path: '/api/admin/{id}',
        handler: (request, h) => handler.getAdminByIdHandler(request, h),
    },
    {
        method: 'POST',
        path: '/api/admin/verify',
        handler: (request, h) => handler.verifyAdminCredentialHandler(request, h),
    }
];

module.exports = routes;
