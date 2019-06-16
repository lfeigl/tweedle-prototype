/* eslint no-unused-vars: 0, no-console: 0 */

const dotenv = require('dotenv');
const config = dotenv.config();
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const authentication = require('./authentication.js');
const getMediaApi = require('./get-timeline.js');
const port = process.env.TPMDL_PORT || 3000;
const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('TPMDL - Twitter Profile Media Downloader');
});

server.get('/get', getMediaApi);

server.use((err, req, res, next) => {
    if (err.errors) {
        const error = _.head(err.errors);
        const status = _.head(err._headers.status);
        const statusCode = status.substring(0, 3);
        const statusText = status.substring(4, status.length);

        console.error(`Twitter API error ${error.code}: ${error.message}`);
        res.status(statusCode).send(statusText);
    } else {
        console.error(err.stack);
        res.status(500).send(err.message);
    }
});

if (config.error) {
    throw config.error;
} else {
    start();
}

function start() {
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
}
