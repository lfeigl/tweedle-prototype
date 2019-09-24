const { Router } = require('express');
const getApi = require('./get/index.js');

const router = new Router();

router.get('/get', getApi);

module.exports = router;
