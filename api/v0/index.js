'use strict';

const Router = require('express').Router;

module.exports = function getV0Routes(twilioService, yaas) {
  const router = Router();

  router.get('/ping', (req, res) => {
    return res.status(200).send('heartbeat');
  });

  router.post('/sms', (req, res) => {
    console.log(req.body);

    return yaas
      .answer('does this work right?')
      .then(yaasResponse => {
        const text = yaasResponse.text;
        const gifUrl = yaasResponse.gif.image_url;

        return twilioService.createTwimlResponseForMMS(text, gifUrl)
      })
      .then(twiml => {
        console.log('responding with twiml: ', twiml);
        res.send(twiml);
      })
      .catch(err => {
        console.error(err);
        res.json(err);
      });
  });

  return router;
}
