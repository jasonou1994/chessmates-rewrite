import React, { Component } from 'react';
import Players from './components/Players.jsx';
import SignIn from './components/SignIn.jsx';
const connectionController = require('./controllers/connectionController');
const uuidv4 = require('uuid/v4');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      player: {}
    };
  }

  componentWillMount () {
    connectionController.establishSSE(uuidv4());
  }

  render() {
    return (
      <div>
        <SignIn></SignIn>
        <Players></Players>
      </div>
    );
  }
}
