const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AdminService {
    constructor() {
        this._pool = new Pool();
    }

    async addAdmin({username, password}) {
        await this.verifyNewUsername(username);

        const id = `adn-${nanoid(16)}`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: 'INSERT INTO admin VALUES($1, $2, $3) RETURNING id',
            values: [id, username, hashedPassword],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('admin gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async verifyNewUsername(username) {
        const query = {
            text: 'SELECT username FROM admin WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Gagal menambahkan admin. Username sudah digunakan.');
        }
    }

    async getUserById(adminId) {
        const query = {
            text: 'SELECT id, username FROM admin WHERE id = $1',
            values: [adminId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Admin tidak ditemukan');
        }

        return result.rows[0];
    }

    async verifyAdminCredential(username, password) {
        const query = {
            text: 'SELECT id, password FROM admin WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Kredensial yang Anda berikan salah');
        }

        const { id, password: hashedPassword } = result.rows[0];
        
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new InvariantError('Kredensial yang Anda berikan salah');
        }

        return id;
    }
}

module.exports = AdminService;