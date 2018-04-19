import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import VenueList from './VenueList';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={ VenueList } />
        </Switch>
      </Router>

    );
  }
}

export default App;
