import * as types from './actionTypes'

export const updateLobbyPlayers = (lobbyPlayers) => ({
  type: types.UPDATE_LOBBY_PLAYERS,
  payload : lobbyPlayers,
});