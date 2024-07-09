const Joi = require('joi');

const FormPayloadSchema = Joi.object({
    nama: Joi.string().required(),
    alamat: Joi.string().required(),
    phone: Joi.string().required(),
    ttl: Joi.string().required(),
    pendidikan: Joi.string().required(),
    agama: Joi.string().required(),
    orangtua: Joi.string().required(),
    pekerjaan: Joi.string().required(),
});

module.exports = { FormPayloadSchema };
