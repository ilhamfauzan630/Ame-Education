class StaticHandler {
    constructor() {}

    async getStaticFileHandler(request, h) {
        return h.file('./build/index.html');
    }
}

module.exports = StaticHandler;
