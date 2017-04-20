'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var Store = require('../stores/Store');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Api = require('../services/api');

var ActionCreator = {
  getRecords: function () {
    Api
      .get('http://zerowaste.ucsc.edu:3001/api/db')
      .then(function (records) {
        Dispatcher.handleViewAction({
          actionType: ActionConstants.RECEIVE_RECORDS,
          records: records
        });
      })
    .catch(function () {
      Dispatcher.handleViewAction({
        actionType: ActionConstants.RECEIVE_ERROR,
        error: 'There was a problem getting the records.'
      });
    });
  }
};

module.exports = ActionCreator;
