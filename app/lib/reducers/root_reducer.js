import {combineReducers} from 'redux';
import DataReducer from './data_reducer';
import ViewReducer from './view_reducer';
import CollegeReducer from './college_reducer';

const rootReducer = combineReducers({
  data: DataReducer,
  view: ViewReducer,
  college: CollegeReducer
});

export default rootReducer;
