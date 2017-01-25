'use strict';

function media(url) {
  return `<Media>${url}</Media>`;
}

function body(text) {
  return `<Body>${text}</Body>`;
}

function message(text, url) {
  return `<Message>${body(text)}${media(url)}</Message>`;
}

function response(text, url) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response>${message(text, url)}</Response>`;
}

function createTwimlResponseForMMS(data) {
  if (!data.text) {
    throw new Error("TWIML_ERROR: cannot respond without text");
  }

  return response(data.text, data.media);
}

function createTwilioService(twilioClient) {
  return {
    sendMMS(twilioMessageObject) {
      return new Promise((resolve, reject) => {
        twilioClient.messages.create(twilioMessageObject, (err, message) => {
          return err
            ? reject(err)
            : resolve(message);
        });
      });
    },
  };
}

exports.createTwimlResponseForMMS = createTwimlResponseForMMS;
exports.createTwilioService = createTwilioService;
