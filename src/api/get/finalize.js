const path = require('path');
const fs = require('fs');

const FILE_INFO_REGEXP = /^([\d-]+)\s\((\d+)\)(\.\w+)$/;

module.exports = (dir) => {
  let lastDate = null;

  fs.readdir(dir, (error, fileNames) => {
    if (error) {
      throw error;
    }

    fileNames.reverse().forEach((fileName) => {
      const fileInfo = fileName.match(FILE_INFO_REGEXP);

      if (Array.isArray(fileInfo)) {
        const date = fileInfo[1];
        const counter = fileInfo[2];
        const ext = fileInfo[3];

        if ((date !== lastDate || lastDate === null) && (counter === 1 || counter === '1')) {
          const newFileName = date + ext;
          const filePath = path.join(dir, fileName);
          const newFilePath = path.join(dir, newFileName);

          fs.rename(filePath, newFilePath, (err) => {
            if (err) {
              throw err;
            }
          });
        }

        lastDate = date;
      }
    });
  });
};
