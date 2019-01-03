import * as types from '../actions/actionTypes';

const initialState = {
  players : [],
};

const reducer = (state=initialState, action) => {
  console.log(action.type);
  switch(action.type) {
    case 'UPDATE_LOBBY_PLAYERS': {
      return {
        ...state,
        players : JSON.parse(action.payload),
      }
    }
    default:
      return state;
  }
};

export default reducer;