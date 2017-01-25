'use strict';

require('localenv');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const bodyParser = require('body-parser');
const express = require('express');
const logInfo = require('./lib/log').logInfo;
const yaasConstructor = require('./services/yaas-service');
const v0Routes = require('./api/v0');

const app = express();
const yaas = yaasConstructor.createYaaSService(process.env.YAAS_URL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v0', v0Routes(yaas));

const server = app.listen(process.env.YAAS_MMS_PORT, () => {
  logInfo('server running on port:', process.env.YAAS_MMS_PORT);
});

module.exports = server;
