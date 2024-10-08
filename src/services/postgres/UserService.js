const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UserService {
    constructor() {
        this._pool = new Pool(
            {
                ssl: {
                    rejectUnauthorized: false // Use this option if you don't have a valid SSL certificate
                }
            }
        );
    }

    async addUser({username, phone, password}) {
        await this.verifyNewUsername(username);

        const id = `user-${nanoid(16)}`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, username, phone, hashedPassword],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('User gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async verifyNewUsername(username) {
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
        }
    }

    async getUserById(userId) {
        const query = {
            text: 'SELECT id, username FROM users WHERE id = $1',
            values: [userId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('User tidak ditemukan');
        }

        return result.rows[0];
    }
}

module.exports = UserService;