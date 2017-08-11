import {RECEIVE_RECORDS, RECEIVE_ERROR} from '../actions/record_actions';
import {COLLEGE_SET} from '../constants/constants';
import _ from 'underscore';
import merge from 'lodash/merge';

const defaultState = {};

const RecordsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RECORDS:
      return parsePickupData(action.pickupData);
    case RECEIVE_ERROR:
      return action.error;
    default:
      return state;
  }
};


function parsePickupData(data) {
  let relevantPickups = data.filter(function(pickup){
    return COLLEGE_SET.includes(pickup.Site);
  });
  return _.groupBy(relevantPickups, 'Site');
}

export default RecordsReducer;
