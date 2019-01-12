const express = require('express');
const authenticate = require('./authentication.js');
const port = process.env.TPMD_PORT || 3000;
const server = express();
let app = null;

server.get('/', (req, res) => {
    res.send('TPMD - Twitter Profile Media Downloader');
});

server.listen(port, async () => {
    console.log(`TPMD: Listening on port ${port}.`);
    app = await authenticate();
});
