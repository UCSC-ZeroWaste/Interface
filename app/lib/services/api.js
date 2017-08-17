'use strict';
import request from 'superagent';

export const fetchRecords = (url) => {
  return new Promise(function (resolve, reject) {
    request
      .get(url)
      .timeout({response: 10000})
      .set('Accept', 'text/json')
      .end(function (err, res) {
        if (err) {
          reject(err.message);
        } else if (res.status === 404) {
          // console.log('api err/res', err, res);
          reject(res);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
};
