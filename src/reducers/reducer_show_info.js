import {FETCH_SHOW_DATA} from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_SHOW_DATA:
      console.log(state);
      return [action.payload, ...state];
  }
  return state;
}
