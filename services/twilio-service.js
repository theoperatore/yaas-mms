'use strict';

function message(body, media) {
  return `<Message><Body>${body}</Body><Media>${media}</Media>`;
}

function response(body, media) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response>${message(body, media)}</Response>`;
}

module.exports = function createTwilioService(twilioClient) {
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
    createTwimlResponseForMMS(text, gifUrl) {
      return response(text, gifUrl);
    }
  };
}
