const routes = (handler) => [
    {
        method: 'POST',
        path: '/api/users/verify',
        handler: (request, h) => handler.verifyUserCredentialHandler(request, h),
    },
];

module.exports = routes;