const express = require('express');
const tempRouter = express.Router();
const {tempfun} = require('../controller/tempController');

tempRouter.route('/')
    .get(tempfun)

module.exports = tempRouter;