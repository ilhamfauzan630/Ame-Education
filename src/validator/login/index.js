const InvariantError = require('../../exceptions/InvariantError');
const { LoginPayloadSchema } = require('./schema');

const LoginValidator = {
    validateLoginPayload: (payload) => {
        const validationResult = LoginPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = LoginValidator;
