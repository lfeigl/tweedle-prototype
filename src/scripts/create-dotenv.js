const { resolve } = require('path');
const { access, writeFile } = require('fs');
const { promisify } = require('util');

const accessAsync = promisify(access);
const writeFileAsync = promisify(writeFile);
const DOTENV = resolve('.env');
const TEMPLATE = [
  '# Your Twitter app credentials:',
  'TWITTER_BEARER_TOKEN=',
  '# or',
  'TWITTER_CONSUMER_KEY=',
  'TWITTER_CONSUMER_SECRET=',
  '',
  '# Tweedle settings:',
  'TWEEDLE_PORT=1337',
  '',
];

async function createDotenv() {
  try {
    await accessAsync(DOTENV);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFileAsync(DOTENV, TEMPLATE.join('\n'));
    } else {
      throw error;
    }
  }
}

createDotenv();
