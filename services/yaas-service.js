'use strict';

const querystring = require('querystring');

function sendQuestion(url, question) {
  const stringified = querystring.stringify({ q: question });
  const rUrl = `${url}?${stringified}`;
  return fetch(rUrl)
    .then(response => {
      if (response.statusCode >= 400) {
        throw new Error(`FETCH ERROR`, response);
      }

      return response;
    })
    .then(r => r.json());
}

function createYaaSService(url) {
  if (!url) {
    throw new Error(`NO_YAAS_URL: the url '${url}' is not valid`);
  }

  return {
    answer(question) {
      return sendQuestion(url, question);
    }
  }
}

exports.createYaaSService = createYaaSService;
