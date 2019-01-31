const path = require('path');
const fs = require('fs');
const MEDIA_DIR = path.resolve('media');

fs.access(MEDIA_DIR, (err) => {
    if (err) {
        if (err.code === 'ENOENT') {
            fs.mkdir(MEDIA_DIR, (err) => {
                if (err) throw err;
            });
        } else {
            throw err;
        }
    }
});
