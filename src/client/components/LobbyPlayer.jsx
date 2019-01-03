import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from '../actions/actions';
const connectionController = require('../controllers/connectionController');

const mapStateToProps = store => ({
});

const mapDispatchToProps = dispatch => ({
});

class LobbyPlayer extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className='lobbyPlayer'>
        {this.props.name}
      </div>
    )
  }
}

LobbyPlayer.propTypes = {
  name : PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyPlayer);
