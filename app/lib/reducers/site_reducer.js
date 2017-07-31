import {UPDATE_CURRENT_SITE} from '../actions/views';
import merge from 'lodash/merge';

const defaultState = null;

const SiteReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case UPDATE_CURRENT_SITE:
      return action.site;
    default:
      return state;
  }
};

export default SiteReducer;
