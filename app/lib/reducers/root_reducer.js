import {combineReducers} from 'redux';
import RecordsReducer from './records_reducer';
import ViewReducer from './view_reducer';
// import SiteReducer from './site_reducer';

const rootReducer = combineReducers({
  currentView: ViewReducer,
  records: RecordsReducer
});

export default rootReducer;
