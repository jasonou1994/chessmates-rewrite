const playerController = require('../players/playerController.js');

let connectionController = {};
connectionController.connections = [];
connectionController.establishSSE = establishSSE;

function establishSSE (req, res, next) {
  res.currentId = 1;
  connectionController.connections.push(res);

  console.log(playerController);

  res.header(200);
  res.header('Content-Type', 'text/event-stream');
  // res.header('Cache-Control', 'no-cache');
  res.header('Connection', 'keep-alive');

  //send over players
  res.write('event: lobbyPlayers\n');
  res.write('id: ' + res.currentId + '\n');
  res.write('data :' + JSON.stringify(playerController.players)+'\n\n');
  res.currentId++;
}

module.exports = connectionController;