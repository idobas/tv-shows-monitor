import { combineReducers } from 'redux';
import ShowInfoReducer from './reducer_show_info';

const rootReducer = combineReducers({
  showsInfo: ShowInfoReducer
});

export default rootReducer;
