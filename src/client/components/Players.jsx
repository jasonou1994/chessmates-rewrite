import React from "react";
import PropTypes from "prop-types";
const connectionController = require('../controllers/connectionController');

class Players extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
    
  }

  render () {
    return (
      <div>
        players
      </div>
    )
  }
}

Players.propTypes = {
};

export default Players;

