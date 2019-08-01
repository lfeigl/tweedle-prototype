#!/usr/bin/env node
/* eslint no-console: 0 */

const dotenv = require('dotenv');
// load config from .env file
const config = dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const errorHandling = require('../middlewares/error-handling.js');
const authentication = require('../utils/authentication.js');
const getMediaApi = require('./get/index.js');

const port = process.env.TWEEDLE_PORT || 3000;
const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Tweedle - Open API for downloading all media of a Twitter profile.');
});

server.get('/get', getMediaApi);

server.use(errorHandling);

function start() {
  server.listen(port, async () => {
    console.log(`[Tweedle] Listening on port ${port}.`);

    try {
      console.log('[Tweedle] Authenticating to Twitter API...');
      await authentication.authenticate();
      console.log('[Tweedle] Authenticated.');
    } catch (error) {
      console.error(error);
    }
  });
}

if (config.error) {
  throw config.error;
} else {
  start();
}
