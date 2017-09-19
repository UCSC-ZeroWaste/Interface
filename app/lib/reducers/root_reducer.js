import {combineReducers} from 'redux';
import RecordsReducer from './records_reducer';
import ViewReducer from './view_reducer';
import TouchReducer from './touch_reducer';

const rootReducer = combineReducers({
  currentView: ViewReducer,
  records: RecordsReducer,
  touch: TouchReducer
});

export default rootReducer;
