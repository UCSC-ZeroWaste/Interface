import {RECEIVE_RECORDS, RECEIVE_ERROR} from '../actions/record_actions';
import {COLLEGE_SET} from '../constants/constants';
import _ from 'underscore';
import merge from 'lodash/merge';

const nullState = Object.freeze({data: null, errors: null});

const RecordsReducer = (state = nullState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RECORDS:
      let data = parsePickupData(action.pickupData);
      return merge({}, nullState, {data: data});
    case RECEIVE_ERROR:
      return merge({}, nullState, {errors: action.errors});
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
