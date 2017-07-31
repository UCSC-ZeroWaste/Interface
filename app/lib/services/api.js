'use strict';

var request = require('superagent');
/**
 ** Wrapper for calling a API
 **/
var Api = {
  get: function (url) {
    return new Promise(function (resolve, reject) {
      request
        .get(url)
        .set('Accept', 'text/json')
        .end(function (err, res) {
          if (res.status === 404 || err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }
};

module.exports = Api;
