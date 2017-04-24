import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import CustomEpisodeForm from './custom_episode_form';

class ShowsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      currentShow: ''
    }
  }

  handleClose() {this.setState({isShowingModal: false});}

  openModal(title, event) {
    this.setState({
      isShowingModal: true,
      currentShow: title
    });
  }

  renderShows(showInfo) {
    const {poster, plot, year, magnetLink, title} = showInfo;
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
          <a className='btn btn-primary download-button' href={magnetLink}>
            Download episode
          </a>
          <div>Or</div>
          <a onClick={this.openModal.bind(this, title)}>
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
                  <CustomEpisodeForm showName={this.state.currentShow}/>
                  {this.props.magnet ? <a href={this.props.magnet}>Click here to download</a> : null}
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
    showsInfo: state.showsInfo.shows,
    magnet: state.showsInfo.magnet
  }
}

export default connect(mapStateToProps)(ShowsTable);
