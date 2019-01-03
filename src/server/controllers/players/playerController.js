const connectionController = require('../connections/connectionController.js');
const sqlController = require('../sql/sqlController.js');

let playerController = {};
playerController.broadcastPlayers = broadcastPlayers;

function broadcastPlayers (req, res, next) {
  connectionController.connections.forEach(conn => {
    conn.write('event: lobbyPlayers\n');
    conn.write('id: ' + conn.currentId + '\n');
    conn.write('data :' + JSON.stringify(req.players)+'\n\n');
    conn.currentId++;
  });
}

module.exports = playerController;