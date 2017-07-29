import {UPDATE_COLLEGE} from '../constants/ActionConstants';
import merge from 'lodash/merge';

const defaultState = {data: undefined};

const CollegeReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case UPDATE_COLLEGE:
      return                ;
    default:
      return state;
  }
};

export default CollegeReducer;
