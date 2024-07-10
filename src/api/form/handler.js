class FormHandler {
    constructor (service, validator) {
        this._service = service;
        this._validator = validator;

        this.postFormHandler = this.postFormHandler.bind(this);
        this.getFormByIdHandler = this.getFormByIdHandler.bind(this);
    }

    async postFormHandler (request, h) {
        this._validator.validateFormPayload(request.payload);

        const { nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId } = request.payload;

        const formId = await this._service.addForm({ nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId});

        const response = h.response({
            status: 'success',
            message: 'Form berhasil ditambahkan',
            data: {
                formId,
            },
        });
        response.code(201);
        return response;
    }

    async getFormByIdHandler (request) {
        const { id } = request.params;
        const form = await this._service.getFormById(id);

        return {
            status: 'success',
            data: {
                form,
            },
        };
    }

    async getFormsHandler () {
        const forms = await this._service.getForms();
        return {
            status: 'success',
            data: {
                forms,
            },
        };
    }

    async putFormByIdHandler (request, h) {
        this._validator.validateFormPayload(request.payload);

        const { id } = request.params;
        const { nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId } = request.payload;

        await this._service.editFormById(id, { nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId });

        return {
            status: 'success',
            message: 'Form berhasil diperbarui',
        };
    }

    async deleteFormByIdHandler (request) {
        const { id } = request.params;

        await this._service.deleteFormById(id);
        
        return {
            status: 'success',
            message: 'Form berhasil dihapus',
        };
    }
}

module.exports = FormHandler;
