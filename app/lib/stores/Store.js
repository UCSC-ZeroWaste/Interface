'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change',
    _records = [];

/**
 ** Set the values for records that will be used
 ** with components.
 **/
function setRecords (records) {
  _records = records;
}

var Store = assign({}, EventEmitter.prototype, {

  /**
   ** Emits change event.
   **/
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  /**
   ** Adds a change listener.
   **
   ** @param {function} callback Callback function.
   **/
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   ** Removes a change listener.
   **
   ** @param {function} callback Callback function.
   **/
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   ** Return the value for categories.
   **/
  getRecords: function () {
    return _records;
  }
});

Store.dispatchToken = Dispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case ActionConstants.RECEIVE_RECORDS:
      setRecords(action.records);
      break;

    default:
      return true;
  }

  Store.emitChange();

  return true;
});

module.exports = Store;
