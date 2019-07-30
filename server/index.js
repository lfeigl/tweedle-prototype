#!/usr/bin/env node
/* eslint no-unused-vars: 0, no-console: 0 */

const dotenv = require('dotenv');
const config = dotenv.config();
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const authentication = require('./authentication.js');
const getMediaApi = require('./get/index.js');
const port = process.env.TWEEDLE_PORT || 3000;
const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('Tweedle - Open API for downloading all media of a Twitter profile.');
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
        console.log(`[Tweedle] Listening on port ${port}.`);

        try {
            console.log('[Tweedle] Authenticating to Twitter API...');
            await authentication.authenticate();
            console.log('[Tweedle] Authenticated.');
        } catch (err) {
            console.error(err);
        }
    });
}
