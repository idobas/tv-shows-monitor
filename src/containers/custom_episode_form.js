import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {fetchEpisodeDownloadLink} from '../actions/index';

class CustomEpisodeForm extends Component {
  render() {
    const {fields: {season, episode}, handleSubmit, showName} = this.props;
    return (
      <form onSubmit={handleSubmit(data => this.props.fetchEpisodeDownloadLink({...data, showName}))}>
        <h3>Choose the required episode</h3>
        <div className='form-group'>
          <label>Season:</label>
          <input type='text' className='form-control' {...season}/>
        </div>
        <div className='form-group'>
          <label>Episode number:</label>
          <input type='text' className='form-control' {...episode}/>
        </div>
        <button type='submit' className='btn btn-primary custom-download-button'>
          Get download link
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'CustomEpisodeForm',
  fields: ['season', 'episode']
}, null, {fetchEpisodeDownloadLink})(CustomEpisodeForm);
