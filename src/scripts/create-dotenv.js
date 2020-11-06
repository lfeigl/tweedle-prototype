const path = require('path');
const fs = require('fs');

const DOTENV = path.resolve('.env');
const TEMPLATE = [
  '# Your Twitter app credentials:',
  'TWITTER_BEARER_TOKEN=',
  '# or',
  'TWITTER_CONSUMER_KEY=',
  'TWITTER_CONSUMER_SECRET=',
  '',
  '# Tweedle settings:',
  'TWEEDLE_PORT=1337',
];

function createDotenv() {
  fs.access(DOTENV, (error) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.writeFile(DOTENV, TEMPLATE.join('\n'), (err) => {
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

createDotenv();
