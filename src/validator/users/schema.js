const Joi = require('joi');

const UserPayloadSchema = Joi.object({
    username: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
