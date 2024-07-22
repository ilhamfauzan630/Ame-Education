class StaticHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postUserHandler = this.postUserHandler.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    }

    async getStaticFileHandler(request, h) {    
        const { file } = request.params;
        const response = h.file(`../../public/${file}`);
        return response;
    }
}

module.exports = StaticHandler;
