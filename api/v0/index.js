'use strict';

const Router = require('express').Router;

module.exports = function getV0Routes(twilioService, yaas) {
  const router = Router();

  router.get('/ping', (req, res) => {
    return res.status(200).send('heartbeat');
  });

  router.post('/sms', (req, res) => {
    console.log(req.params.body);

    const testResp = twilioService.createTwimlResponseForMMS("A test message", "http://media0.giphy.com/media/msKNSs8rmJ5m/giphy.gif");
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(testResp);

    // return yaas
    //   .answer('does this work right?')
    //   .then(yaasResponse => {
    //     const text = yaasResponse.text;
    //     const gifUrl = yaasResponse.gif.image_url;
    //
    //     return twilioService.createTwimlResponseForMMS(text, gifUrl)
    //   })
    //   .then(twiml => {
    //     console.log('responding with twiml: ', twiml);
    //     res.send(twiml);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     res.json(err);
    //   });
  });

  return router;
}
