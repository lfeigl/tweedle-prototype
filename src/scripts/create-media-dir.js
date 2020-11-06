const { resolve } = require('path');
const { access, mkdir } = require('fs');
const { promisify } = require('util');

const accessAsync = promisify(access);
const mkdirAsync = promisify(mkdir);
const MEDIA_DIR = resolve('media');

async function createMediaDir() {
  try {
    await accessAsync(MEDIA_DIR);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdirAsync(MEDIA_DIR);
    } else {
      throw error;
    }
  }
}

createMediaDir();
