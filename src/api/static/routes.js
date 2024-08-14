const Path = require('path');
const Fs = require('fs');

const routes = () => [
    {
        method: 'GET',
        path: '/{param*}',
        handler: (request, h) => {
            const filePath = Path.join(__dirname, './education/build', request.params.param || 'index.html');

            // Cek apakah file ada
            if (Fs.existsSync(filePath)) {
                return h.file(filePath);
            }

            // Jika file tidak ada, kembalikan index.html
            return h.file(Path.join(__dirname, './education/build/index.html'));
        }
    },
];

module.exports = routes;
