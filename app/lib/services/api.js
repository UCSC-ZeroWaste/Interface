'use strict';
import request from 'superagent';

export const fetchRecords = (url) => {
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
};
