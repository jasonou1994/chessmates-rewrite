const connectionController = require('../connections/connectionController.js');

let playerController = {};
playerController.createPlayer = createPlayer;
playerController.broadcastPlayers = broadcastPlayers;
playerController.players = [{ player : 'test1' },{ player : 'test2' }];

function createPlayer (req, res, next) {
  res.header(200);

  playerController.players.push(req.body);
  playerController.broadcastPlayers();
}

function broadcastPlayers () {
  connectionController.connections.forEach(conn => {
    conn.write('event: lobbyPlayers\n');
    conn.write('id: ' + conn.currentId + '\n');
    conn.write('data :' + JSON.stringify(playerController.players)+'\n\n');
    conn.currentId++;
  });
}

module.exports = playerController;