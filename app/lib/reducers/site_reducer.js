import {UPDATE_SITE} from '../constants/ActionConstants';
import merge from 'lodash/merge';

const defaultState = {site: undefined};

const SiteReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case UPDATE_SITE:
      return                ;
    default:
      return state;
  }
};

export default SiteReducer;
