import * as imdb from 'imdb-api';
import * as pirata from 'pirata';

export const FETCH_SHOW_DATA = 'FETCH_SHOW_DATA';
export const FETCH_DOWNLOAD_LINK = 'FETCH_DOWNLOAD_LINK';

function searchPirata(searchTerm) {
  return new Promise((resolve, reject) => {
    return pirata.search(searchTerm, (err, res) => {
      if (err) {
        reject();
      }
      else {
        resolve(res);
      }
    });
  });
}

function createFetchLastEpisodeRequest(showName) {
  return imdb.get(showName).then(data => {
    return data.episodes().then(episodes => {
      const filteredEpisodeList = episodes.filter(episode => {
        return episode.released.toString() !== 'Invalid Date' && episode.released <= new Date();
      });
      let {season, episode} = filteredEpisodeList[filteredEpisodeList.length - 1];
      season = parseInt(season);
      episode = parseInt(episode);
      const seasonFixed = season < 10 ? `0${season}` : season;
      const episodeFixed = episode < 10 ? `0${episode}` : episode;
      const searchTerm = `${showName} s${seasonFixed}e${episodeFixed}`;
      data.episodesList = episodes;

      return searchPirata(searchTerm).then(res => {
        if (res.length >= 1) {
          data.magnetLink = res[0].magnet;
        }
        return data;
      }).catch(err => console.log(err));
    });
  });
}

function getEpisodeDownloadLink(showName, season, episode) {
  season = parseInt(season);
  episode = parseInt(episode);
  const seasonFixed = season < 10 ? `0${season}` : season;
  const episodeFixed = episode < 10 ? `0${episode}` : episode;
  const searchTerm = `${showName} s${seasonFixed}e${episodeFixed}`;
  return searchPirata(searchTerm).then(res => {
    if (res.length >= 1) {
      return res[0].magnet;
    }
    else {
      return null;
    }
  });
}

export function fetchShowData(showName) {
  const request = createFetchLastEpisodeRequest(showName);
  return {
    type: FETCH_SHOW_DATA,
    payload: request
  }
}

export function fetchEpisodeDownloadLink(values) {
  const {showName, season, episode} = values;
  const request = getEpisodeDownloadLink(showName, season, episode);
  return {
    type: FETCH_DOWNLOAD_LINK,
    payload: request
  }
}
