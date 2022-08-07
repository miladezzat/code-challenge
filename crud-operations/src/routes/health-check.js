const express = require('express');

const router = new express.Router();
const HttpStatus = require('http-status-codes');
const pjson = require('../../package.json');

router.get('/', async (req, res) => {
  res.status(HttpStatus.StatusCodes.OK).send({ version: pjson.version });
});

module.exports = router;
