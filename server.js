'use strict';

require('localenv');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const bodyParser = require('body-parser');
const express = require('express');
const twilio = require('twilio');

const createYaaSService = require('./services/yaas-service').createYaaSService;
// const createTwilioService = require('./services/twilio-service').createTwilioService;

const v0Routes = require('./api/v0');
const app = express();

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
// const twilioService = createTwilioService(twilioClient);
const yaas = createYaaSService(process.env.YAAS_URL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v0', v0Routes(yaas));

const server = app.listen(process.env.YAAS_MMS_PORT, () => {
  console.log('server running on port', process.env.YAAS_MMS_PORT);
});

module.exports = server;
