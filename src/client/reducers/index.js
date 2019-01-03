/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';

// import all reducers here
import lobbyPlayers from './lobbyPlayers';

// combine reducers
const reducers = combineReducers({
  lobbyPlayers
});

// make the combined reducers available for import
export default reducers;

