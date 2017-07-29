import {UPDATE_VIEW} from '../constants/ActionConstants';
import merge from 'lodash/merge';

const defaultState = {data: undefined};

const ViewReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case UPDATE_VIEW:
      return                ;
    default:
      return state;
  }
};

export default ViewReducer;
