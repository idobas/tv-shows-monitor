import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class ShowsTable extends Component {

  renderShows(showInfo) {
    const {poster, plot, year, magnetLink} = showInfo;
    const filteredEpisodeList = showInfo.episodesList.filter(episode => {
      return episode.released.toString() !== 'Invalid Date' && episode.released <= new Date();
    });
    const {season, episode} = filteredEpisodeList[filteredEpisodeList.length - 1];
    const lastEpisode = `Season ${season}, Episode ${episode}`;

    return (
      <tr key={plot}>
        <td><img src={poster}/></td>
        <td><p>{plot}</p></td>
        <td><span>{year}</span></td>
        <td>
          <span>{lastEpisode}</span>
          <a className='btn btn-primary' href={magnetLink}>
            Download latest episode
          </a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Plot</th>
            <th>Year</th>
            <th>Last Released Episode</th>
          </tr>
        </thead>
        <tbody>
          {this.props.showsInfo.map(this.renderShows.bind(this))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    showsInfo: state.showsInfo
  }
}

export default connect(mapStateToProps)(ShowsTable);
