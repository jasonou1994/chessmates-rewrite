import React, { Component } from 'react';
import Players from './components/Players.jsx';
import SignIn from './components/SignIn.jsx';
import Board from './components/Board.jsx';
import Welcome from './components/Welcome.jsx';
const connectionController = require('./controllers/connectionController');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount () {
    connectionController.establishSSE();
  }

  render() {
    return (
      <div>
        <SignIn></SignIn>
        <Welcome></Welcome>
        <Players></Players>
        <Board />
      </div>
    );
  }
}
