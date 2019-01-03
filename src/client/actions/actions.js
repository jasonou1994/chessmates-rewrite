import * as types from './actionTypes'

const actions = {
  updateLobbyPlayers : (lobbyPlayers) => ({
    type: types.UPDATE_LOBBY_PLAYERS,
    payload : lobbyPlayers,
  }),
}

export default actions