const express = require('express');
const bodyParser = require('body-parser');
const errorHandling = require('./middlewares/error-handling.js');
const getMediaApi = require('./server/get/index.js');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Tweedle - Open API for downloading all media of a Twitter profile.');
});

server.get('/get', getMediaApi);

server.use(errorHandling);

module.exports = server;
