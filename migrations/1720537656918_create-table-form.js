/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('form', {
        id : {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        nama: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        alamat: {
            type: 'TEXT',
            notNull: true,
        },
        phone: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        ttl: {
            type: 'TEXT',
            notNull: true,
        },
        pendidikan: {
            type: 'TEXT',
            notNull: true,
        },
        agama: {
            type: 'TEXT',
            notNull: true,
        },
        orangtua: {
            type: 'TEXT',
            notNull: true,
        },
        pekerjaan: {
            type: 'TEXT',
            notNull: true,
        },
        create_at: {
            type: 'TEXT',
            notNull: true,
        },
        update_at: {
            type: 'TEXT',
            notNull: true,
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('form');
};
