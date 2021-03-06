const connectionController = require('../connections/connectionController.js');
const sqlController = require('../sql/sqlController.js');

let playerController = {};
playerController.broadcastPlayers = broadcastPlayers;
playerController.addPlayerToConnection = addPlayerToConnection;
playerController.uniquePlayerCheck = uniquePlayerCheck;

function addPlayerToConnection (req, res, next) {
  connectionController.connections.forEach(conn => console.log(conn.id));
  let foundConn = connectionController.connections.find(conn => conn.id === req.body.uuid);

  console.log('Found Conn:', foundConn.id);

  foundConn.player = req.body.player;
  next();
}

function uniquePlayerCheck (req, res, next) {
  let isMatchedPlayer = sqlController.lobbyPlayersCache.find(player => player.name === req.body.player) ? true : false;

  // console.log(isMatchedPlayer);
  if (isMatchedPlayer) {
    res.send('Unable to add.')
  } else {
    next ();
  }

  res.end();
}

function broadcastPlayers (req, res, next) {
  connectionController.connections.forEach(conn => {
    playersArrCopy = JSON.parse(JSON.stringify(req.players));
    
    let player = playersArrCopy.find(player => player.name === conn.player);
    if (player) {
      player.player = true;
    }
    // console.log(playersArrCopy);
    
    conn.sse.write('event: lobbyPlayers\n');
    conn.sse.write('id: ' + conn.eventId + '\n');
    conn.sse.write('data :' + JSON.stringify(playersArrCopy)+'\n\n');
    conn.eventId++;
  });
}

module.exports = playerController;