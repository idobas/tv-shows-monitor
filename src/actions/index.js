import * as imdb from 'imdb-api';
export const FETCH_SHOW_DATA = 'FETCH_SHOW_DATA';

export function fetchShowData(showName) {
  const request = imdb.get(showName);
  return {
    type: FETCH_SHOW_DATA,
    payload: request
  }
}
