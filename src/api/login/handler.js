class LoginHandler {
    constructor (service, validator) {
        this._service = service;
        this._validator = validator;
        
        this.verifyUserCredentialHandler = this.verifyUserCredentialHandler.bind(this);
    }

    async verifyUserCredentialHandler(request, h) {
        const { phone, password } = request.payload;
        const userId = await this._service.verifyUserCredential(phone, password);

        const response = h.response( {
            status: 'success',
            message: 'login berhasil',
            data: {
                userId,
            },
        });

        return response;
    }
}

module.exports = LoginHandler;
