import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  players : store.business.players,
});

const mapDispatchToProps = dispatch => ({
  // setNewRequestBody : (requestBodyObj) => {
  //   dispatch(actions.setNewRequestBody(requestBodyObj));
  // },
});

class Welcome extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    let player = this.props.players.filter(player => player.player === true).map((player, index) => {
      return <span>{player.name}</span>
    })

    console.log(player);
    return (
      <div id='welcome'>
        Welcome&nbsp
        <span>
          {player}
        </span>
      </div>
    )
  }
}

Welcome.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
