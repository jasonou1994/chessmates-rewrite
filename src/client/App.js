import React, { Component } from 'react';
import Players from './components/Players.jsx';
import SignIn from './components/SignIn.jsx';
const connectionController = require('./controllers/connectionController');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      player: {}
    };
  }

  componentWillMount () {
    connectionController.establishSSE();
    console.log('hi');
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
