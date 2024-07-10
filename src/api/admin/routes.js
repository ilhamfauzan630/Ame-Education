const routes = (handler) => [
    {
        method: 'POST',
        path: '/admin',
        handler: (request, h) => handler.postAdminHandler(request, h),
    },
    {
        method: 'GET',
        path: '/admin/{id}',
        handler: (request, h) => handler.getAdminByIdHandler(request, h),
    },
    {
        method: 'POST',
        path: '/admin/verify',
        handler: (request, h) => handler.verifyAdminCredentialHandler(request, h),
    }
];

module.exports = routes;
