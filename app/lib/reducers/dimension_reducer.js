import merge from 'lodash/merge';
import {} from '../constants/constants';
import {UPDATE_LEADER_ROW_HEIGHT} from '../actions/view_actions';

const defaultState = {leaderRowHeight: '10px'};

const ViewReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case UPDATE_LEADER_ROW_HEIGHT:
      newState.leaderRowHeight = action.leaderRowHeight;
      return newState;
    default:
      return state;
  }
};

export default ViewReducer;
