import {RECEIVE_RECORDS, RECEIVE_ERROR} from '../actions/record_actions';
import merge from 'lodash/merge';

const defaultState = [];

const RecordsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RECORDS:
      return action.pickups;
    case RECEIVE_ERROR:
      return action.error;
    default:
      return state;
  }
};

export default RecordsReducer;
