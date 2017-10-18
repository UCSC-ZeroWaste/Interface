import merge from 'lodash/merge';
import {UPDATE_AUTOPLAY} from '../actions/touch_actions';

const defaultState = {autoplay: true};

const TouchReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case UPDATE_AUTOPLAY:
      if (action.setting === 'off') {
        newState.autoplay = false;
      } else if (action.setting === 'on') {
        newState.autoplay = true;
      } else if (action.setting === 'toggle') {
        newState.autoplay = !state.autoplay;
      } else {
        console.log('Improper argument for setAutoplay action: ', action.setting);
      }

      if (newState.autoplay === true) {
        console.log('autoplay on');
      } else {
        console.log('autoplay off: ', newState.autoplay);
      }

      return newState;
    default:
      return state;
  }
};

export default TouchReducer;
