const InvariantError = require('../../exceptions/InvariantError');
const { FormPayloadSchema, UpdateFormPayloadSchema } = require('./schema');

const FormValidator = {
    validateFormPayload: (payload) => {
        const validationResult = FormPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateUpdateFormPayload: (payload) => {
        const validationResult = UpdateFormPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = FormValidator;
