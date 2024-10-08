class FormHandler {
    constructor (service, validator) {
        this._service = service;
        this._validator = validator;

        this.postFormHandler = this.postFormHandler.bind(this);
        this.getFormByIdHandler = this.getFormByIdHandler.bind(this);
    }

    async postFormHandler (request, h) {
        this._validator.validateFormPayload(request.payload);

        const { nama_kursus, jumlah_pertemuan, harga, nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId } = request.payload;

        const formId = await this._service.addForm({ nama_kursus, jumlah_pertemuan, harga, nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId});

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
        const forms = await this._service.getFormById(id);

        return {
            status: 'success',
            data: {
                forms,
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

    async getFormByUserIdHandler (request) {
        const { userId } = request.params;
        const forms = await this._service.getFormByUserId(userId);

        return {
            status: 'success',
            data: {
                forms,
            },
        };
    }

    async putFormByIdHandler (request, h) {
        this._validator.validateUpdateFormPayload(request.payload);

        const { id } = request.params;
        const { status } = request.payload;

        await this._service.editFormById(id, status );

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

    async getActiveFormsHandler () {
        const forms = await this._service.getActiveForms();
        return {
            status: 'success',
            data: {
                forms,
            },
        };
    }

    async getPendingFormsHandler () {
        const forms = await this._service.getPendingForms();
        return {
            status: 'success',
            data: {
                forms,
            },
        };
    }
}

module.exports = FormHandler;
