const Joi = require('joi');

const LoginPayloadSchema = Joi.object({
    phone: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { LoginPayloadSchema };
