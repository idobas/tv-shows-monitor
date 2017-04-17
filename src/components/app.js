import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import ShowsTable from '../containers/shows_table';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <ShowsTable/>
      </div>
    );
  }
}
