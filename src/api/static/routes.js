const routes = (handler) => [
    {
        method: 'GET',
        path: '/menuTK',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/MenuTK',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/menuSD',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/MenuSD',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/menuSMP',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/MenuSMP',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/menuSMA',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/MenuSMA',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/form',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/Form',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/riwayat',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/Riwayat',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/box',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/Box',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/adminRegister',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/AdminRegister',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/adminLogin',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/AdminLogin',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/adminMenu',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/AdminMenu',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/adminPending',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/AdminPending',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/adminAktif',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
    {
        method: 'GET',
        path: '/AdminAktif',
        handler: (request, h) => handler.getStaticFileHandler(request, h),
    },
];

module.exports = routes;
