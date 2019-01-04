const uuidv4 = require('uuid/v4');

const playerController = require('../players/playerController.js');

let connectionController = {};
connectionController.connections = [];
connectionController.establishSSE = establishSSE;
connectionController.setCookie = setCookie;

function establishSSE (req, res, next) {
  console.log('----- connectionController.establishSSE called. -----');
  res.currentId = 1;
  connectionController.connections.push({
    id : req.cookies['chessmates'],
    name : null,
    sse : res,
  });

  res.header(200);
  res.header('Content-Type', 'text/event-stream');
  // res.header('Cache-Control', 'no-cache');
  res.header('Connection', 'keep-alive');

  next();
}

function requestHeartbeat (req, res, next) {
  
}

function setCookie (req, res, next) {
  console.log('----- connectionController.setCookie called. -----');
  if(!req.cookies['chessmates']){
    const uuid = uuidv4();
    res.cookie('chessmates', uuid, {expire : new Date() + 9999});
    next();
  }
}

module.exports = connectionController;