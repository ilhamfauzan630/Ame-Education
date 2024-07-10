class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postUserHandler = this.postAdminHandler.bind(this);
        this.getUserByIdHandler = this.getAdminByIdHandler.bind(this);
    }

    async postAdminHandler(request, h) {
        this._validator.validateAdminPayload(request.payload);

        const { username, password } = request.payload;

        const adminId = await this._service.addAdmin({ username, password });

        const response = h.response({
            status: 'success',
            message: 'Admin berhasil ditambahkan',
            data: {
                adminId,
            },
        });
        response.code(201);
        return response;
    }

    async getAdminByIdHandler(request) {
        const { id } = request.params;
        const admin = await this._service.getAdminById(id);

        return {
            status: 'success',
            data: {
                admin,
            },
        };
    }

    async verifyAdminCredentialHandler(request, h) {
        const { username, password } = request.payload;
        const adminId = await this._service.verifyAdminCredential(username, password);

        const response = h.response( {
            status: 'success',
            message: 'login berhasil',
            data: {
                adminId,
            },
        });

        return response;
    }
}

module.exports = UsersHandler;
