#!/usr/bin/env node
/* eslint no-console: 0 */

const dotenv = require('dotenv');
// load config from .env file
const config = dotenv.config();
const server = require('./server.js');
const authentication = require('./utils/authentication.js');

const port = process.env.TWEEDLE_PORT || 3000;

async function start() {
  try {
    server.listen(port);
    console.log(`[Tweedle] Listening on port ${port}.`);
    console.log('[Tweedle] Authenticating to Twitter API...');
    await authentication.authenticate();
    console.log('[Tweedle] Authenticated.');
  } catch (error) {
    console.error(error);
  }
}

if (config.error) {
  throw config.error;
} else {
  start();
}
