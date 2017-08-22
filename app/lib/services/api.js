'use strict';
import request from 'superagent';

export const fetchRecords = (url) => {
  return new Promise(function (resolve, reject) {
    request
      .get(url)
      .timeout({response: 10000})
      .set('Accept', 'text/json')
      .end(function (err, res) {
        console.log('API response: ', res);
        console.log('API error: ', err);
        if (err) {
          reject(err.message);
        } else if (res.status === 404) {
          reject(res);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
};
