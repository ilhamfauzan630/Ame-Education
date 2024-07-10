const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModelForm } = require('../../utils');

class FormService {
    constructor () {
        this._pool = new Pool();
    }

    async addForm({nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId}) {
        const id = `form-${nanoid(16)}`;

        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO form VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
            values: [id, nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, createdAt, updatedAt, userId],
        };

        const result = await this._pool.query(query);
        return result.rows[0].id;
    }

    async getForms() {
        const query = {
            text: 'SELECT * FROM form',
        };

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getFormById(id) {
        const query = {
            text: 'SELECT * FROM form WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Form tidak ditemukan');
        }

        return result.rows.map(mapDBToModelForm)[0];
    }

    async editFormById(id, { nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId}) {
        const updateAt = new Date().toISOString();

        const query = {
            text: 'UPDATE form SET nama = $1, alamat = $2, phone = $3, ttl = $4, pendidikan = $5, agama = $6, orangtua = $7, pekerjaan = $8, user_id = $9, update_at = $10 WHERE id = $11 RETURNING id',
            values: [nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId, updateAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Form tidak ditemukan');
        }

        return result.rows.map(mapDBToModelForm)[0].id;
    }

    async deleteFormById(id) {
        const query = {
            text: 'DELETE FROM form WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Form tidak ditemukan atau sudah terhapus');
        }
    }
}

module.exports = FormService;
