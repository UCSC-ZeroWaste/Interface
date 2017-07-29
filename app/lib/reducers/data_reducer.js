import {GET_DATA} from '../constants/ActionConstants';
import merge from 'lodash/merge';

const defaultState = {data: undefined};

const DataReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case GET_DATA:
      return                ;
    default:
      return state;
  }
};

export default DataReducer;
