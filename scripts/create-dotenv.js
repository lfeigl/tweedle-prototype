const path = require('path');
const fs = require('fs');
const DOTENV = path.resolve('.env');
const TEMPLATE = [
    'TWITTER_BEARER_TOKEN=',
    '',
    'TWITTER_CONSUMER_KEY=',
    'TWITTER_CONSUMER_SECRET=',
    '',
    'TPMDL_PORT=',
    '',
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
