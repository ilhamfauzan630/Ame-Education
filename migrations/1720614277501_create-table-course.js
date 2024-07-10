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
    pgm.createTable('courses', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        nama_kursus: {
            type: 'TEXT',
            notNull: true,
        },
        jumlah_pertemuan: {
            type: 'INTEGER',
            notNull: true,
        },
        harga: {
            type: 'INTEGER',
            notNull: true,
        },
        form_id: {
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
    pgm.dropTable('courses');
};
