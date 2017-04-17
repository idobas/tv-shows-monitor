import React, {Component} from 'react';
import {connect} from 'react-redux';

class ShowsTable extends Component {
  renderShows(showInfo) {
/*    const poster = showInfo.poster;
    const plot = showInfo.plot;
    const year = showInfo.year;*/
    const {poster, plot, year} = showInfo;
    return (
      <tr>
        <td><img src={poster}/></td>
        <td><p>{plot}</p></td>
        <td><span>{year}</span></td>
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
          </tr>
        </thead>
        <tbody>
          {this.props.showsInfo.map(this.renderShows)}
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
