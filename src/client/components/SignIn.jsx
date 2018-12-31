import React from "react";
import PropTypes from "prop-types";
import connectionController from '../controllers/connectionController.js';

class SignIn extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      user : "username",
    }
  }

  handlePlayerUpdate = (e) => {
    this.setState({
      user: e.target.value,
    })
  }

  submitPlayer = () => {
    connectionController.submitPlayer(this.state.user);
    console.log('clicked');
  }

  render () {
    return (
      <div id='players'>
        Sign In
        <input type='text' value={this.state.user} onChange={this.handlePlayerUpdate}></input>
        <button onClick={this.submitPlayer}>Submit</button>
      </div>
    )
  }
}

SignIn.propTypes = {
};

export default SignIn;

