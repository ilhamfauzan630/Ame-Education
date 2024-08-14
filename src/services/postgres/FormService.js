const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModelForm, mapDBToModelFormCourse } = require('../../utils');

class FormService {
    constructor () {
        this._pool = new Pool(
            {
                ssl: {
                    rejectUnauthorized: false // Use this option if you don't have a valid SSL certificate
                }
            }
        );
    }

    async addForm({ nama_kursus, jumlah_pertemuan, harga, nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, userId }) {
        const form_id = `form-${nanoid(16)}`;
        const course_id = `course-${nanoid(16)}`;

        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const form_query = {
            text: 'INSERT INTO form VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
            values: [form_id, nama, alamat, phone, ttl, pendidikan, agama, orangtua, pekerjaan, createdAt, updatedAt, userId],
        };

        const course_query = {
            text: 'INSERT INTO courses VALUES($1, $2, $3, $4, $5)',
            values: [course_id, nama_kursus, jumlah_pertemuan, harga, form_id],
        };

        const form_result = await this._pool.query(form_query);
        
        await this._pool.query(course_query);

        return form_result.rows[0].id;
    }

    async getForms() {
        const query = {
            text: 'SELECT * FROM courses INNER JOIN form ON form.id = courses.form_id',
        };

        const result = await this._pool.query(query);

        return result.rows.map(mapDBToModelForm);
    }

    async getFormById(id) {
        const query = {
            text: 'SELECT * FROM courses INNER JOIN form ON form.id = courses.form_id WHERE form.id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Form tidak ditemukan');
        }

        return result.rows.map(mapDBToModelForm)[0];
    }

    async getFormByUserId(userId) {
        const query = {
            text: 'SELECT * FROM courses INNER JOIN form ON form.id = courses.form_id WHERE user_id = $1',
            values: [userId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Form tidak ditemukan');
        }

        return result.rows.map(mapDBToModelForm);
    }

    async editFormById(id, status) {
        const updateAt = new Date().toISOString();

        const form_query = {
            text: 'UPDATE form SET update_at = $1, status = $2 WHERE id = $3 RETURNING id',
            values: [updateAt, status, id],
        };

        const result = await this._pool.query(form_query);

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

    async getActiveForms() {
        const query = {
            text: 'SELECT * FROM courses INNER JOIN form ON form.id = courses.form_id WHERE status = $1',
            values: ['active'],
        };

        const result = await this._pool.query(query);

        return result.rows.map(mapDBToModelForm);
    }

    async getPendingForms() {
        const query = {
            text: 'SELECT * FROM courses INNER JOIN form ON form.id = courses.form_id WHERE status = $1',
            values: ['pending'],
        };

        const result = await this._pool.query(query);

        return result.rows.map(mapDBToModelForm);
    }
}

module.exports = FormService;
