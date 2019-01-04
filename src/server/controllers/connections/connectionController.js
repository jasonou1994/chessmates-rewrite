const playerController = require('../players/playerController.js');

let connectionController = {};
connectionController.connections = [];
connectionController.establishSSE = establishSSE;
connectionController.setCookie = setCookie;

function establishSSE (req, res, next) {
  console.log('----- connectionController.establishSSE called. -----');

  res.header(200);
  res.header('Content-Type', 'text/event-stream');
  res.header('Connection', 'keep-alive');

  connectionController.connections.push({
    id : req.body.uuid,
    eventId : 1,
    name : null,
    sse : res,
  });

  console.log(connectionController.connections);

  req.on('close', () => {
    console.log('hi');
    //remove player from database, if exists
  })

  next();
}

function setCookie (req, res, next) {
  console.log('----- connectionController.setCookie called. -----');
  if(!req.cookies['chessmates']){
    const uuid = uuidv4();
    res.cookie('chessmates', uuid, {expire : new Date() + 9999});
  }
  next();
}

module.exports = connectionController;