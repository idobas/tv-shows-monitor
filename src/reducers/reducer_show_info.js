import {FETCH_SHOW_DATA, FETCH_DOWNLOAD_LINK} from '../actions/index';

const INITIAL_STATE = {
  shows: [],
  magnet: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_SHOW_DATA:
      return {...state, shows: [...state.shows, action.payload]};
    case FETCH_DOWNLOAD_LINK:
      return {...state, magnet: action.payload};
  }
  return state;
}
