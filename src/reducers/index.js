import { combineReducers } from 'redux';
import ShowInfoReducer from './reducer_show_info';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  showsInfo: ShowInfoReducer,
  form: formReducer
});

export default rootReducer;
