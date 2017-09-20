import merge from 'lodash/merge';
import {COLLEGE_NAMES} from '../constants/constants';
import {UPDATE_VIEW, UPDATE_SITE, UPDATE_SCOPE, TOGGLE_MODAL, UPDATE_DEVICE} from '../actions/view_actions';

const defaultState = {view: 0, site: COLLEGE_NAMES[0], scope: 'local', modal: false, device: 'home', autoplay: true};

const ViewReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case UPDATE_VIEW:
      newState.view = action.view;
      return newState;
    case UPDATE_SITE:
      newState.site = action.site;
      return newState;
    case UPDATE_SCOPE:
      newState.scope = action.scope;
      return newState;
    case UPDATE_DEVICE:
      newState.device = action.device;
      return newState;
    case TOGGLE_MODAL:
      newState.modal = !state.modal;
      return newState;
    default:
      return state;
  }
};

export default ViewReducer;
