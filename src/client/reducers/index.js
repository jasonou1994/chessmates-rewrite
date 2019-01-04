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
import business from './business';

// combine reducers
const reducers = combineReducers({
  business
});

// make the combined reducers available for import
export default reducers;

