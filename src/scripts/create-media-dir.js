const path = require('path');
const fs = require('fs');

const MEDIA_DIR = path.resolve('media');

function createMediaDir() {
  fs.access(MEDIA_DIR, (error) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.mkdir(MEDIA_DIR, (err) => {
          if (err) {
            throw err;
          }
        });
      } else {
        throw error;
      }
    }
  });
}

createMediaDir();
