'use strict';

const Router = require('express').Router;
const twilioService = require('../../services/twilio-service');
const createTwimlResponseForMMS = twilioService.createTwimlResponseForMMS;

function getUserQuestionFromPost(postBody) {
  return Promise.resolve(postBody.Body);
}

function mapYaaSResponseToTwimlData(yaasResponse) {
  return {
    text: yaasResponse.text,
    media: yaasResponse.gif.image_url,
  };
}

function respondWithTwiml(res) {
  return twiml => {
    console.log('responding with twiml: ', twiml);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    return res.end(twiml);
  }
}

function respondWithError(res) {
  return err => {
    console.error(err);
    return res.json(err);
  }
}

function respondWithHeartbeat() {
  return (req, res) => res.status(200).send('heartbeat');
}

function askYaasAndRespond(yaas) {
  return (req, res) => {
    return getUserQuestionFromPost(req.body)
      .then(yaas.answer)
      .then(mapYaaSResponseToTwimlData)
      .then(createTwimlResponseForMMS)
      .then(respondWithTwiml(res))
      .catch(respondWithError(res));
  }
}

module.exports = function getV0Routes(yaas) {
  const router = Router();

  router.get('/ping', respondWithHeartbeat());
  router.post('/sms', askYaasAndRespond(yaas));

  return router;
}
