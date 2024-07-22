const routes = (handler) => [
    {
        method: 'GET',
        path: '/{param*}',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
];

module.exports = routes;
