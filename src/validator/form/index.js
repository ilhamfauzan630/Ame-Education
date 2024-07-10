const InvariantError = require('../../exceptions/InvariantError');
const { FormPayloadSchema } = require('./schema');

const FormValidator = {
    validateFormPayload: (payload) => {
        const validationResult = FormPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = FormValidator;
