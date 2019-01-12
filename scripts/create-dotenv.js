const fs = require('fs');
const DOTENV = '.env';
const TEMPLATE = [
    'TWITTER_BEARER_TOKEN=',
    '',
    'TWITTER_CONSUMER_KEY=',
    'TWITTER_CONSUMER_SECRET=',
    '',
    'TPMD_PORT=',
    '',
];

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
