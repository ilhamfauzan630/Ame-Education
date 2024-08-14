const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const NotFoundError = require('../../exceptions/NotFoundError');

class LoginService {
    constructor() {
        this._pool = new Pool(
            {
                ssl: {
                    rejectUnauthorized: false // Use this option if you don't have a valid SSL certificate
                }
            }
        );
    }

    async verifyUserCredential(phone, password) {
        const query = {
            text: 'SELECT id, username, password FROM users WHERE phone = $1',
            values: [phone],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Username atau password yang Anda berikan salah');
        }

        const { id, username, password: hashedPassword } = result.rows[0];

        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new NotFoundError('Username atau password yang Anda berikan salah');
        }

        return {
            id,
            username,
        }
    }
}

module.exports = LoginService;
