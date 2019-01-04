const connectionController = require('../connections/connectionController.js');
const sqlController = require('../sql/sqlController.js');

let playerController = {};
playerController.broadcastPlayers = broadcastPlayers;
playerController.addPlayerToConnection = addPlayerToConnection;

function addPlayerToConnection (req, res, next) {
  let foundConn = connectionController.connections.find(conn => conn.id === req.body.uuid)
}

function broadcastPlayers (req, res, next) {
  connectionController.connections.forEach(conn => {
    conn.sse.write('event: lobbyPlayers\n');
    conn.sse.write('id: ' + conn.eventId + '\n');
    conn.sse.write('data :' + JSON.stringify(req.players)+'\n\n');
    conn.eventId++;
  });
}

module.exports = playerController;