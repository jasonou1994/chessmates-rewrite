import React, { Component } from 'react';
import Players from './components/Players.jsx';
import SignIn from './components/SignIn.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      player: {}
    };
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
