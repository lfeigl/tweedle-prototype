const path = require('path');
const fs = require('fs');

const MEDIA_DIR = path.resolve('media');

module.exports = () => {
  fs.access(MEDIA_DIR, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.mkdir(MEDIA_DIR, (error) => {
          if (error) throw error;
        });
      } else {
        throw err;
      }
    }
  });
};
