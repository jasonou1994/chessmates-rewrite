const playerController = require('../players/playerController.js');

let connectionController = {};
connectionController.connections = [];
connectionController.establishSSE = establishSSE;

function establishSSE (req, res, next) {
  res.currentId = 1;
  connectionController.connections.push(res);

  res.header(200);
  res.header('Content-Type', 'text/event-stream');
  // res.header('Cache-Control', 'no-cache');
  res.header('Connection', 'keep-alive');

  next();
}

module.exports = connectionController;