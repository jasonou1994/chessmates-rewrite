import * as types from '../actions/actionTypes';

const initialState = {
  players : [],
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case UPDATE_LOBBY_PLAYERS: {
      
    }
    default:
      return state;
  }
};

export default reducer;