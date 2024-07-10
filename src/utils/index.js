const mapDBToModelForm = ({
    id,
    nama,
    alamat,
    phone,
    ttl,
    pendidikan,
    agama,
    orangtua,
    pekerjaan,
    created_at,
    updated_at,
    user_id,
}) => ({
    id,
    nama,
    alamat,
    phone,
    ttl,
    pendidikan,
    agama,
    orangtua,
    pekerjaan,
    createdAt: created_at,
    updatedAt: updated_at,
    userId: user_id,
});

module.exports = { mapDBToModelForm };