const path = require('path');
const fs = require('fs');
const DOTENV = path.resolve('.env');
const TEMPLATE = [
    '# Your Twitter app credentials:',
    'TWITTER_BEARER_TOKEN=#<bearer token>',
    '# or',
    'TWITTER_CONSUMER_KEY=#<consumer API key>',
    'TWITTER_CONSUMER_SECRET=#<consumer API secret key>',
    '',
    '# TPMDL settings:',
    'TPMDL_PORT=1337',
];

module.exports = () => {
    fs.access(DOTENV, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFile(DOTENV, TEMPLATE.join('\n'), (err) => {
                    if (err) throw err;
                });
            } else {
                throw err;
            }
        }
    });
};
