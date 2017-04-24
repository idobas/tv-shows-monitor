import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
//import CustomEpisodeModal from './custom_episode_modal';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class ShowsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false
    }
  }

  handleClose() {this.setState({isShowingModal: false});}

  openModal(event){
    this.setState({
      isShowingModal: true
    });
  }

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
            Download episode
          </a>
          <div>Or</div>
          <a onClick={this.openModal.bind(this)}>
            Choose a custom episode to download...
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
          <tr>
            {
              this.state.isShowingModal &&
              <ModalContainer onClose={this.handleClose.bind(this)}>
                <ModalDialog onClose={this.handleClose.bind(this)}>
                  <h1>Dialog Content</h1>
                  <p>More Content. Anything goes here</p>
                </ModalDialog>
              </ModalContainer>
            }
          </tr>
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
