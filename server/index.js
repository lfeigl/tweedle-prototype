/* eslint no-console: 0 */

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authentication = require('./authentication.js');
const getMediaApi = require('./get-media.js');
const port = process.env.TPMDL_PORT || 3000;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.send('TPMDL - Twitter Profile Media Downloader');
});

server.get('/get', getMediaApi);

server.listen(port, async () => {
    console.log(`TPMDL: Listening on port ${port}.`);

    try {
        console.log('TPMDL: Authenticate to Twitter API...');
        await authentication.authenticate();
        console.log('TPMDL: Authenticated.');
    } catch (err) {
        console.error(err);
    }
});
