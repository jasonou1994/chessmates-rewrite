import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import LobbyPlayer from "./LobbyPlayer.jsx";
const connectionController = require('../controllers/connectionController');

const mapStateToProps = store => ({
  players : store.business.players,
});

const mapDispatchToProps = dispatch => ({
  // setNewRequestBody : (requestBodyObj) => {
  //   dispatch(actions.setNewRequestBody(requestBodyObj));
  // },
});

class Players extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    // console.log(this.props)
    const players = this.props.players.filter(player => player.player !== true)
    .map((player, index) => {
      return <LobbyPlayer key={index} name={player.name}></LobbyPlayer>
    })
    console.log(players);
    return (
      <div>
        Players
        {players}
      </div>
    )
  }
}

Players.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);
