const Joi = require('joi');

const FormPayloadSchema = Joi.object({
    nama_kursus: Joi.string().required(),
    jumlah_pertemuan: Joi.number().required(),
    harga: Joi.number().required(),
    nama: Joi.string().required(),
    alamat: Joi.string().required(),
    phone: Joi.string().required(),
    ttl: Joi.string().required(),
    pendidikan: Joi.string().required(),
    agama: Joi.string().required(),
    orangtua: Joi.string().required(),
    pekerjaan: Joi.string().required(),
    userId: Joi.string().required(),
    status: Joi.string(),
});

module.exports = { FormPayloadSchema };
